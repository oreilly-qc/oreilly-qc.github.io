// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=2-4


qc.reset(3);
qc.discard();
a = qint.new(1, 'alice');
fiber = qint.new(1, 'fiber');
b = qint.new(1, 'bob');

function random_bit(q) {
    q.write(0);
    q.had();
    return q.read();
}

// Generate two random bits
qc.label('get two random bits');
send_basis = random_bit(a);
send_value = random_bit(a);
qc.label('');

// Prepare Alice's qubit
a.write(0);
qc.label('set value');
qc.nop();
if (send_value)
    a.not();
qc.nop();
qc.label('');
qc.nop();
qc.label('set basis');
qc.nop();
if (send_basis)
    a.had();
qc.nop();
qc.label('');

// Send the qubit!
fiber.exchange(a);

// Activate the spy
var spy_is_present = true;
if (spy_is_present)
{
    var spy_basis = 1;
    qc.nop();
    qc.label('spy');
    if (spy_basis)
        fiber.had();
    stolen_data = fiber.read();
    fiber.write(0);
    if (stolen_data)
        fiber.not();
    if (spy_basis)
        fiber.had();
    qc.label('');
    qc.nop();
}

// Receive the qubit!
recv_basis = random_bit(b);
fiber.exchange(b);
qc.label('set basis');
qc.nop();
if (recv_basis)
    b.had();
qc.nop();
qc.label('');
qc.nop();
qc.label('read value');
qc.nop();
recv_val = b.read();
qc.nop();
qc.label('');
qc.nop();

// Now Alice emails Bob to tell
// him her basis and value.
// If the basis matches and the
// value does not, there's a spy!
if (send_basis == recv_basis)
    if (send_value != recv_val)
        qc.print('Caught a spy!\n');
