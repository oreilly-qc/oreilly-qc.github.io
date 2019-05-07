// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=12-3

qc.reset(16);
qx = qint.new(4, 'qx');
qy = qint.new(4, 'qy');
qacc = qint.new(8, 'qacc');

var tx = 2;
var ty = 3;

// Hz Line y=3
qacc.cnot(qy)
qacc.add(ty * 4);
qacc.not(~3);
qc.cphase(180, qacc.bits());
qacc.not(~3);
qacc.subtract(ty * 4);
qacc.cnot(qy);

// Vt Line x=10
qacc.cnot(qx)
qacc.add(tx * 4);
qacc.not(~10);
qc.cphase(180, qacc.bits());
qacc.not(~10);
qacc.subtract(tx * 4);
qacc.cnot(qx);
