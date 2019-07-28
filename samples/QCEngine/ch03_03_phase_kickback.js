// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=3-3

qc.reset(3);
// Create two registers
var reg1 = qint.new(2, 'Register 1');
var reg2 = qint.new(1, 'Register 2');
reg1.write(0);
reg2.write(1);
// Place the first register in superposition
reg1.had();
// Perform phase rotations on second register,
//conditioned on qubits from the first
qc.phase(45, 0x4, 0x1);
qc.phase(90, 0x4, 0x2);
