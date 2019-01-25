// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=4-1

// This sample demonstrates basic teleportation.

qc.reset(3);
var alice = qint.new(1, 'alice');
var ep    = qint.new(1, 'ep');
var bob   = qint.new(1, 'bob');

// First, create an entangled pair
qc.write(0, 2|4);
qc.codeLabel('entangle');
ep.had();
bob.cnot(ep);
qc.codeLabel('');

// Alice prepares her payload to teleport
alice.write(0);
qc.codeLabel('prep payload');
alice.had();
alice.phase(45);
alice.had();
qc.codeLabel('');
qc.nop();


// Alice sends the payload (and destroys it in the process)
qc.codeLabel('send');
ep.cnot(alice);
alice.had();
a1 = alice.read();
a2 = ep.read();
qc.codeLabel('');
qc.nop();

// Bob receives the payload, using the two bits Alice sent
qc.codeLabel('receive');
var bob_is_asleep = false;
if (bob_is_asleep) {
    bob.not();
    bob.phase(180);
} else {
    if (a1)
        bob.not();
    if (a2)
        bob.phase(180);
}
qc.codeLabel('');
qc.nop();

// Verify that the teleportation worked
qc.codeLabel('verify');
bob.had();
bob.phase(-45);
bob.had();
bob.read();
qc.codeLabel('');
qc.nop();
