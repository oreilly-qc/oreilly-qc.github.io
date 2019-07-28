// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=10-2
qc_options.color_by_phase = true;
qc_options.book_render = true;
qc.reset(9);

var a = qint.new(4, 'a');
var b = qint.new(4, 'b');
var ancilla = qint.new(1, 'ancilla');


a.write(0);
a.had(0x1|0x2|0x4);

b.write(2);
ancilla.write(0);

qc.label('b = b-a')
b.subtract(a);
qc.label('');

qc.label('flip if b negative')

ancilla.not();
ancilla.had();
// anc = a > b
ancilla.cnot(b.bits(0x8));
ancilla.had();
ancilla.not();

qc.label('');

qc.label('uncompute');
b.add(a);


