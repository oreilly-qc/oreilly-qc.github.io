// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=13-4

qc_options.color_by_phase = true;

var xy_bits = 4;
var acc_bits = 10;
qc.reset(2 * xy_bits + acc_bits);
var qx = qint.new(xy_bits, 'qx');
var qy = qint.new(xy_bits, 'qy');
var qacc = qint.new(acc_bits, 'qacc');
qc.codeLabel('init');
qc.write(0);
qx.hadamard();
qy.hadamard();
qc.codeLabel('');
qc.nop();

var radius = 13;
qc.codeLabel('fill if x^2 + y^2 < r^2');

qacc.addSquared(qx);
qacc.addSquared(qy);
qacc.subtract(radius * radius);
qacc.phase(180, 1 << (acc_bits - 1));
qacc.add(radius * radius);
qacc.subtractSquared(qy);
qacc.subtractSquared(qx);

qc.codeLabel('');
qc.nop();
