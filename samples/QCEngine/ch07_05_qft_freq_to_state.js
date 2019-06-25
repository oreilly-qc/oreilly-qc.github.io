// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-5

// Setup
var num_qubits = 4;
qc.reset(num_qubits);
var qin = qint.new(num_qubits, 'qin');

// Write the frequency we want to register
qc.label('write freq');
qin.write(3);

// Inverse QFT to turn into a signal
qc.label('invQFT');
qin.invQFT()


