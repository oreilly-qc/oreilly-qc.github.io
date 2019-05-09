
// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=12-3

// These are the two parameters
var number_to_factor = 15;    // Just 15,21 in this simple version.
var precision_bits = 4;       // This can be anything you want.

function main()
{
  qc_options.speed_is_priority = false;


  var ok = do_simple_shor(number_to_factor, precision_bits);
  if (ok)
    print_magnitudes(precision);
}

// This is the original version, which does not allow for expansion.
// It works, though.
function do_simple_shor(N, precision_bits)
{
  // Quantum part, with coprime = 2
  var do_modulo = true;
  var scratch = null;
  if (N == 15 || N == 21)
    do_modulo = false;  // Not needed for these two
  var max_value = 1;
  var mod_engaged = false;

  var N_bits = 1;
  var scratch_bits = 0;
  while ((1 << N_bits) < N)
    N_bits++;
  if (N != 15) // For this implementation, numbers other than 15 need an extra bit
    N_bits++;
  if (do_modulo)
    scratch_bits = 1;
  var total_bits = N_bits + precision_bits + scratch_bits;

  qc.reset(total_bits);
  num = qint.new(N_bits, 'work');
  precision = qint.new(precision_bits, 'precision');
  if (do_modulo)
    scratch = qint.new(1, 'scratch');
  qc.label('init');
  num.write(1);
  precision.write(0);
  precision.hadamard();
  if (do_modulo)
    scratch.write(0);

  var N_sign_bit_place = 1 << (N_bits - 1);
  var N_sign_bit = num.bits(N_sign_bit_place);
  for (var iter = 0; iter < precision_bits; ++iter)
  {
    var condition = precision.bits(1 << iter);
    var N_sign_bit_with_condition = num.bits(N_sign_bit_place);
    N_sign_bit_with_condition.orEquals(condition);

    var shifts = 1 << iter;
    if (!do_modulo)
    {
      qc.label('iter ' + iter);
      shifts %= num.numBits;
//      num.rollLeft(shifts, condition);
        if (shifts == 1)
            num.rollLeft(shifts, condition);
        else if (shifts == 2)
{
    qc.exchange(0x2|0x8, 32);
    qc.exchange(0x1|0x4, 32);
//            num.rollLeft(shifts, condition);
}
    }
    else
    {
      for (var sh = 0; sh < shifts; ++sh)
      {
        qc.label('num *= coprime');
        num.rollLeft(1, condition);   // Multiply by the coprime
        if (do_modulo)
        {
          max_value <<= 1;
          if (max_value >= N)
            mod_engaged = true;
          if (mod_engaged)
          {
            qc.label('modulo N');
            var wrap_mask = scratch.bits();
            var wrap_mask_with_condition = scratch.bits();
            wrap_mask_with_condition.orEquals(condition);

            // Here's the modulo code.
            num.subtract(N, condition); // subtract N, causing this to go negative if we HAVEN'T wrapped.
            scratch.cnot(N_sign_bit_with_condition); // Skim off the sign bit
            num.add(N, wrap_mask_with_condition); // If we went negative, undo the subtraction.
            num.not(1);
            scratch.cnot(num, 1, condition); // If it's odd, then we wrapped, so clear the wrap bit
            num.not(1);
          }
        }
      }
    }
  }
  qc.label('QFT');
  precision.QFT();
//  precision.reverseBits();  // TODO: This is a temporary fix
  qc.label('');
precision.read();

  return true;
}

function print_magnitudes(qint_var)
{
  // Print the values
  qc.print('-- Results ('+number_to_factor +
           ','+precision_bits+') --------------\n');
  var max_index = qint_var.peekHighestProbability();
  var max_prob = qint_var.peekProbability(max_index);
  for (var i = 0; i < 1 << qint_var.numBits; ++i)
  {
    var str = '';
    var mag = qint_var.peekProbability(i);
    str += '|'+i+'| = '+mag.toFixed(8) + '  ';
    var bars = Math.ceil(mag * 10 / max_prob);
    for (var j = 0; j < bars; ++j)
      str += '|';
    qc.print(str + '\n');
  }
}

var num = null;
var precision = null;
main();

