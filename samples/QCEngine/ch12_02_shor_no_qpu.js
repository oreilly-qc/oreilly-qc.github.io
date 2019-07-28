// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=12-2
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Special note: This implementation of Shor's algorithm is for
// illustration purposes, to help develop an intuition regarding
// what the algorithm does. It is not intended to be an optimal
// implementation on any specific QPU or simulation.


function ShorNoQPU(N, precision_bits, coprime) {
    // Classical replacement for the quantum part of Shor
    var work = 1;
    var max_loops = Math.pow(2, precision_bits);
    for (iter = 0; iter < max_loops; ++iter) {
        work = (work * coprime) % N;
        if (work == 1) // found the repeat
            return [iter + 1];
    }
    return 0;
}

function shor_sample()
{
    var N = 15;             // The number we're factoring
    var precision_bits = 4; // See the text for a description
    var coprime = 2;        // must be 2 in this QPU implementation

    var result = Shor(N, precision_bits, coprime);

    if (result != null)
        qc.print('Success! '+N+'='+result[0]+'*'+result[1]+'\n');
    else
        qc.print('Failure: No non-trivial factors were found.\n')
}

function Shor(N, precision_bits, coprime)
{
    var repeat_period = ShorNoQPU(N, precision_bits, coprime); // quantum part
    var factors = ShorLogic(N, repeat_period, coprime);      // classical part
    return check_result(N, factors);
}

function gcd(a, b)
{
    // return the greatest common divisor of a,b
    while (b) {
      var m = a % b;
      a = b;
      b = m;
    }
    return a;
}

function check_result(N, factor_candidates)
{
    for (var i = 0; i < factor_candidates.length; ++i)
    {
        var factors = factor_candidates[i];
        if (factors[0] * factors[1] == N)
        {
            if (factors[0] != 1 && factors[1] != 1)
            {
                // Success!
                return factors;
            }
        }
    }
    // Failure
    return null;
}

function ShorLogic(N, repeat_period_candidates, coprime)
{
    qc.print('Repeat period candidates: '+repeat_period_candidates+'\n');
    var factor_candidates = [];
    for (var i = 0; i < repeat_period_candidates.length; ++i)
    {
        var repeat_period = repeat_period_candidates[i];
    // Given the repeat period, find the actual factors
        var ar2 = Math.pow(coprime, repeat_period / 2.0);
        var factor1 = gcd(N, ar2 - 1);
        var factor2 = gcd(N, ar2 + 1);
        factor_candidates.push([factor1, factor2]);
    }
    return factor_candidates;
}

function estimate_num_spikes(spike, range)
{
    if (spike < range / 2)
        spike = range - spike;
    var best_error = 1.0;
    var e0 = 0;
    var e1 = 0;
    var e2 = 0;
    var actual = spike / range;
    var candidates = []
    for (denom = 1.0; denom < spike; ++denom)
    {
        var numerator = Math.round(denom * actual);
        var estimated = numerator / denom;
        var error = Math.abs(estimated - actual);
        e0 = e1;
        e1 = e2;
        e2 = error;
        // Look for a local minimum which beats our
        // current best error
        if (e1 <= best_error && e1 < e0 && e1 < e2)
        {
            var repeat_period = denom - 1;
            candidates.push(repeat_period);
            best_error = e1;
        }
    }
    return candidates;
}

shor_sample();


