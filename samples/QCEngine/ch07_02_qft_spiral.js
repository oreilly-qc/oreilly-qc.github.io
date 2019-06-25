// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-2

var num_qubits = 4;
qc.reset(num_qubits);
var signal = qint.new(num_qubits, 'signal')

// prepare the signal
qc.label('prep');
signal.write(0);
signal.hadamard();
signal.phase(45, 1);
signal.phase(90, 2);
signal.phase(180, 4);

// Run the QFT
qc.label('QFT');
signal.QFT()
