// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=2-2

// This sample generates a single random byte,
// using eight unentangled qubits.

qc.reset(8);         // allocate some qubits
qc.write(0);         // write the value zero
qc.had();            // place them all into superposition of 0 and 1
var result = qc.read();
qc.print('result: ' + result + '\n');
