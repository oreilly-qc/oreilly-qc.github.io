// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-1

// This sample demonstrates increment and decrement of
// integers in superposition.

var num_qubits = 4;
qc.reset(num_qubits);
var a = qint.new(num_qubits, 'a');

// prepare
qc.label('prepare')
a.write(1);
a.hadamard(0x4);
a.phase(45, 0x4);
qc.nop();

qc.label('')
qc.nop();
qc.label('increment')
// increment
a.add(1);

qc.label('')
qc.nop();
qc.label('decrement')
// decrement
a.subtract(1);

qc.label('')
qc.nop();
