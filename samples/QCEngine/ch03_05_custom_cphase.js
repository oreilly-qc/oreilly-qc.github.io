// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=3-5

var theta = 90;
qc.reset(2);
qc.write(0);
qc.hadamard();

// Using two CNOTs and three PHASEs...
qc.phase( theta / 2, 0x2);
qc.cnot(0x2, 0x1);
qc.phase(-theta / 2, 0x2);
qc.cnot(0x2, 0x1);
qc.phase( theta / 2, 0x1);

// Builds the same operation as a 2-qubit CPHASE
qc.phase(theta, 0x1, 0x2);
