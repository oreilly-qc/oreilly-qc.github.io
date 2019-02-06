// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-6

// This sample demonstrates logic using CNOT and Toffoli gates.

qc.reset(3);
var a = qint.new(1, 'a');
var b = qint.new(1, 'b');
var c = qint.new(1, 'c');

c.write(0);
c.not();
c.read();

// if (b) then c = ~c
b.write(1);
c.write(0);
c.cnot(b);
b.read();
c.read();

// if (a and b) then c = ~c
qc.write(0x1|0x2);
qc.cnot(0x4, 0x1|0x2);
qc.read();

qc.nop();
