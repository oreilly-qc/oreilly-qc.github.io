// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-4

// In this sample, b will be incremented, but ONLY
// for terms where a is less than 3

// Initialize
var num_qubits = 6;
qc.reset(num_qubits);
var a = qint.new(3, 'a');
var b = qint.new(3, 'b');

// prepare
qc.label('a = (1, 5)');
a.write(1);
a.hadamard(0x4);
qc.label('');
qc.nop();
qc.label('b = (1, 3)');
b.write(1);
b.hadamard(0x2);
b.phase(45, 0x2);
qc.label('');
qc.nop();

// if a < 3 then b += 1
qc.label('a -= 3');
a.subtract(3);
qc.label('');
qc.nop();
qc.label('if (a < 0) then b++');
b.add(1, a.bits(0x4));
qc.label('');
qc.nop();
qc.label('a += 3');
a.add(3);
