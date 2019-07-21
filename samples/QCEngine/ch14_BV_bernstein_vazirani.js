// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=14-BV
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Secret oracle string
var str = "001101";

// If string is length n, we need n qubits for the oracle and n for the register
var n = str.length;
qc.reset(2*n);


var oracle = qint.new(n, 'oracle');
var register= qint.new(n, 'register');

//Write secret string
qc.label('secret string');
oracle.write(str);
qc.nop();
qc.label('');
qc.nop();


//Initialize register in superposition of all values
qc.label('initialize register')
qc.nop();
register.write(0);
register.had();
qc.nop();
qc.label('');

// Call oracle. 
// Bitwise multiplication of the strings is equivalent to performing AND. 
// We want the result of bitwise AND between oracle qubits and register qubits
// stored in the phase, we can use directly CZ gates without the need of ancillas

qc.nop();
qc.label('call oracle');
qc.nop();
register.cz(oracle);
qc.nop();
qc.label('');
qc.nop();



// Undo Hadamard in the register and read value
qc.label('read secret string');
qc.nop();
register.had();
register.read();
qc.nop();
qc.label('');
