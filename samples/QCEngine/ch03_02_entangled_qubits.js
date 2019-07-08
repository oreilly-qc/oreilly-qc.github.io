// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=3-1

qc.reset(2);
a = qint.new(1, 'a');
b = qint.new(1, 'b');
qc.write(0);
qc.nop();

qc.label('entangle');
a.had();           // Place into superposition
b.cnot(a);         // Entangle
qc.label();

qc.nop();
a_result = a.read();  // The two bits will be random,
b_result = b.read();  // but always the same.
qc.print(a_result);
qc.print(b_result);
