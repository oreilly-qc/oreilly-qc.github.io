// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-1

// Initialize
num_qubits = 6;
qc.reset(num_qubits);
a = qint.new(4, 'a');
b = qint.new(2, 'b');
// prepare
qc.codeLabel('prepare');
a.write(1);
a.hadamard(0x4);
a.phase(45, 0x4);
b.write(1);
b.hadamard(0x2);
b.phase(90, 0x2);
qc.nop();
qc.codeLabel('');
qc.nop();

qc.codeLabel('a += b');

// a += b * b
a.addSquared(b);

qc.codeLabel('');
qc.nop();
