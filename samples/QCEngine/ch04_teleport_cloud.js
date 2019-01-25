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
qc.codeLabel('entangle');
ep.had();
bob.cnot(ep);
qc.codeLabel('');

alice.write(0);
qc.codeLabel('prep payload');
alice.had();
alice.phase(45);
alice.had();
qc.codeLabel('');
qc.nop();
qc.print('alice prob:' + alice.peekProbability(1));

qc.codeLabel('send');
ep.cnot(alice);
alice.had();
alice.read();
ep.read();
qc.codeLabel('');
qc.nop();

// ej TODO: Check code order issue
qc.codeLabel('apply gate');
bob.had();
bob.phase(30);
bob.had();
qc.codeLabel('');

qc.codeLabel('receive');
var bob_is_asleep = false;
if (bob_is_asleep) {
    bob.not();
    bob.phase(180);
} else {
    bob.cnot(ep);
    bob.cz(alice);
}
qc.codeLabel('');
qc.nop();


qc.codeLabel('verify');
bob.had();
bob.phase(-45-30);
bob.had();
bob.read();
qc.codeLabel('');
qc.nop();
