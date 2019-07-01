// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=10-3
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

var num_qubits = 3;
var num_ancilla = 4;

qc.reset(num_qubits+num_ancilla);
var reg = qint.new(num_qubits, 'reg');
qc.write(0);
reg.hadamard();

qc.label('clause 1');
bit_or(0x1,0x2,0x8);

qc.label('clause 2');
qc.not(0x1);
bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('clause 3');
qc.not(0x2|0x4);
bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('clause 4');
bit_or(0x1,0x4,0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('flip phase');
phase_and(0x8|0x10|0x20|0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('inv clause 4');
inv_bit_or(0x1,0x4,0x40);

qc.label('inv clause 3');
qc.not(0x2|0x4);
inv_bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('inv clause 2');
qc.not(0x1);
inv_bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('inv clause 1');
inv_bit_or(0x1,0x2,0x8);

qc.label('Grover mirror');
reg.Grover();


//////////// Definitions
// Define bit OR and inverse
function bit_or(q1, q2, out)
{
    qc.not(q1|q2);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2|out);
}

function inv_bit_or(q1, q2, out)
{
    qc.not(q1|q2|out);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2);
}
// Define phase AND
function phase_and(qubits)
{
    qc.cz(qubits);
}


