// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=14-DJ
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Example of constant function
function oracle_constant(reg,scratch) {
    // Regardless of input x, oracle returns f(x) = 1
    scratch.phase(180);
}

// Example of balanced function
function oracle_balanced(reg, scratch) {
    // Oracle returns f(x) = 1 if qubit 0x1 in register register is equal to 1.
    scratch.cz(reg, 0x1);
}



qc.reset(4);
var reg = qint.new(3,'reg');
var scratch = qint.new(1,'scratch');

qc.write(0);

// Prepare scratch qubit in |->
qc.label('scratch in |->');
scratch.had();
scratch.phase(180);
qc.nop();
qc.label('');
qc.nop();


//Prepare register in superposition of all values |00...0> to |11...1>
qc.label('all values');
qc.nop();
reg.had();
qc.nop();
qc.label('');

// Apply function
oracle_constant(reg, scratch);
