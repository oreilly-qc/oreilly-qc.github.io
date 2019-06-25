// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-4

// Setup
qc.reset(8);

// create equal superposition
qc.label('prep');
qc.write(0);
qc.had();

// Introduce a negative sign with a certain frequency
// (By placing the phase on different qubits we can alter
// the frequency of the square wave)
qc.phase(180, 16);

// Apply the QFT
qc.label('QFT');
qc.QFT();
