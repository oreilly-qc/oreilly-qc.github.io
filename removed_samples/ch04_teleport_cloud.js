// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=4-3

// An example of quantum cloud computation, achieved through teleportation

qc.reset(3);
var alice = qint.new(1, 'alice');
var ep    = qint.new(1, 'ep');
var bob   = qint.new(1, 'bob');

ep.write(0);
bob.write(0);
qc.label('entangle');
ep.had();
bob.cnot(ep);
qc.label('');

alice.write(0);
qc.label('prep payload');
alice.had();
alice.phase(45);
alice.had();
qc.label('');
qc.nop();
qc.print('alice prob:' + alice.peekProbability(1));

qc.label('send');
ep.cnot(alice);
alice.had();
alice.read();
ep.read();
qc.label('');
qc.nop();

// ej TODO: Check code order issue
qc.label('apply gate');
bob.had();
//bob.phase(30);
bob.had();
qc.label('');

qc.label('receive');
bob.cnot(ep);
bob.cz(alice);

qc.label('');
qc.nop();


qc.label('verify');
bob.had();
//bob.phase(-45-30);
bob.phase(-45);
bob.had();
bob.read();
qc.label('');
qc.nop();
