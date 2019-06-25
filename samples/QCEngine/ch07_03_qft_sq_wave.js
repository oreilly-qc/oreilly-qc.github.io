// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-3

var num_qubits = 4;
qc.reset(num_qubits);
var signal = qint.new(num_qubits, 'signal')
var wave_period = 2; // A:1 B:2 C:4 D:8

// prepare the signal
qc.label('prep');
signal.write(0);
signal.hadamard();
signal.phase(180, wave_period);

qc.label('QFT');
signal.QFT()
