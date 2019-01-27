// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-6

// This sample demonstrates logic using CNOT and Toffoli gates.

qc.reset(3);

// c = ~c
c.write(0);
c.not();
c.read();

// if (b) then c = ~c
qc.write(2, 2|4);
c.cnot(b);
qc.read(2|4);

// if (a and b) then c = ~c
qc.write(1|2);
qc.cnot(4, 1|2);
qc.read(1|2|4);
