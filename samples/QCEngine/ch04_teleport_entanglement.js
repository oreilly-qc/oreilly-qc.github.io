// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=4-4

// An example of teleporting entanglement

qc.reset(4);
var alice  = qint.new(1, 'alice');
var ep1    = qint.new(1, 'ep-a');
var ep2    = qint.new(1, 'ep-b');
var bob    = qint.new(1, 'bob');
var r1;
var r2;

ep1.write(0);
ep2.write(0);
qc.label('entangle');
ep1.had();
ep2.cnot(ep1);
qc.label('');

alice.write(0);
qc.label('prep alice');
alice.had();
alice.phase(45);
alice.had();
qc.label('');

bob.write(0);
qc.label('prep bob');
bob.had();
bob.phase(30);
bob.had();
qc.label('');


qc.label('teleport');
ep1.cnot(alice);
bob.cnot(ep2);
ep2.had();
r1 = ep1.read();
r2 = ep2.read();
qc.label('');

qc.label('conditional');
bob.cnot(ep1);
alice.cz(ep2);
qc.label('');
