// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=14-S
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Secret oracle string
var str = "01";

// If string is length n, we need n qubits for the oracle and n for the register
var n = str.length;
qc.reset(3*n);

var oracle = qint.new(n, 'oracle');
var register= qint.new(n, 'register');
var scratch = qint.new(n, 'scratch');

// Initialize register and scratch register
scratch.write(0);

// Prepare register in superposition
register.write(0);
register.had();

//Write secret string
qc.label('secret string');
qc.nop();
oracle.write(str);
qc.nop();
qc.label('');
qc.nop();



// Call oracle
qc.label('oracle');

qc.not(oracle.bits(0x1)|register.bits(0x1));

qc.not(0x1|0x4);

qc.cnot(0x10,0x1|0x4);
qc.not(0x1|0x4|0x10);

qc.not(0x2|0x8);
qc.cnot(0x20,0x2|0x8);
qc.not(0x2|0x8|0x20);


qc.label('');
qc.nop();


//Read scratch register (we can throw away results, they give us little information)
scratch.read();

//Read register
qc.label('read register');
register.had();
output = register.read();
qc.label('');

// The output we obtain is not the string str, but rather a string z such that
// z OR str =  0. By running this algorithm a number of times, we will obtain a
// collection of z strings such that they form a system of n equations, which
// we can solve in polynomial time. How many times? It can be shown by probabilistic
// arguments that we only need O(n) attempts. Compare this with the O(2^{n/2})
// of queries that can be shown to be needed to solve the problem classically.

//////////// Definitions
// Define bit OR between registers
function bit_or(q1, q2, out)
{
    qc.not(q1|q2);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2|out);
}
