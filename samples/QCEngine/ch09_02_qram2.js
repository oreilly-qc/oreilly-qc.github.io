// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-2
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-2
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

var a = [4, 3, 5, 1];
var reg_qubits = 3;
var qram_qubits = qram_qubits_required(4, reg_qubits);
qc.reset(2 + reg_qubits + qram_qubits);
var qreg = qint.new(3, 'qreg');
var addr = qint.new(2, 'addr');
var qram = qram_initialize(a, reg_qubits);
qreg.write(0);

qc.label('set addr');
addr.write(2);
addr.hadamard(0x1);
qc.label('');

// Swap the QRAM address(es) into the working register
qram_load(addr, qreg);

qc.label('increment');
qreg.add(1);

// Swap the working register back into QRAM
qram_store(addr, qreg);


// This QRAM implementation is for illustration only.
// The actual implementation on a QPU will be quite different.

// In this illustrative model, QRAM works by using CSWAP to
// shuffle the desired address(es) into location 0, and then
// SWAP that with the register we're loading into.
// Looking at the diagram, we can see that many of these
// operations *might* be able to be done in parallel,
// depending on our QPU hardware.

var qram_qints = null;
function qram_qubits_required(num_addresses, qubits_per_entry)
{
    var qubits_required = num_addresses * qubits_per_entry;
    qc.print('This QRAM requires '+qubits_required+' qubits.\n');
    return qubits_required;
}

function qram_initialize(init_data, qubits_per_entry) {
    qc.label('init QRAM');
    qram_qints = [];
    for (var i = 0; i < init_data.length; ++i)
    {
        qram_qints.push(qint.new(qubits_per_entry, 'qram['+i+']'));
        qram_qints[i].write(init_data[i]);
    }
    qc.label('');
}

function qram_load(address, register)
{
    qc.label('QRAM load');
    // Swap into address zero
    qram_swap_to_zero(address);
    // Swap into our register
    qram_qints[0].swap(register);
    qc.label('');
}

function qram_store(address, register)
{
    qc.label('QRAM store');
    // Swap into our register
    qram_qints[0].swap(register);
    // Swap into address zero
    qram_swap_to_zero(address);
    qc.label('');
}

function qram_swap_to_zero(address)
{
    var reg_qubits = qram_qints[0].numBits;
    var addr_qubits = address.numBits;
    var num_addresses = 1 << addr_qubits;
    for (var i = 0; i < addr_qubits; ++i)
    {
        var condition_bit = 1 << i;
        for (var addr1 = 0; addr1 < num_addresses; ++addr1)
        {
            if (addr1 & condition_bit)
            {
                var addr2 = addr1 ^ condition_bit;
                qram_qints[addr1].cswap(qram_qints[addr2], ~0,
                                        address.bits(condition_bit));
            }
        }
    }
}

