// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-6

// Setup
var num_qubits = 4;
qc.reset(num_qubits);
var qin = qint.new(num_qubits, 'qin');

qc.label('write freq');
qin.write(0);

// Write the frequencies we want to register
qin.had(1);
qc.cnot(14,1);
qin.not(2);
qc.cnot(1,2);
qin.not(2);

//Inverse QFT to turn into a signal
qc.label('invQFT');
qin.invQFT()
