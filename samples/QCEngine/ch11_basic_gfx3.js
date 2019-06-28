// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=11-3
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Visual setup for the circle chart
qc_options.color_by_phase = true;

qc.reset(8);
qx = qint.new(2, 'qx');
qy = qint.new(2, 'qy');
qacc = qint.new(4, 'qacc');

var tx = 2;
var ty = 3;

qc.label('init');
qc.write(0);
qx.had();
qy.had();
qc.label('');

qacc.cnot(qy)
qc.label('Hz Line y=3');
qacc.add(ty * 4);
qacc.not(~3);
qc.cphase(180, qacc.bits());
qacc.not(~3);
qacc.subtract(ty * 4);
qc.label('');
qacc.cnot(qy);

qacc.cnot(qx)
qc.label('Vert Line y=3');
qacc.add(tx * 4);
qacc.not(~10);
qc.cphase(180, qacc.bits());
qacc.not(~10);
qacc.subtract(tx * 4);
qc.label('');
qacc.cnot(qx);
