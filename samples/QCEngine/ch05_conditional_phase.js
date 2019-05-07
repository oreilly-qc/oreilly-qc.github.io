// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-3

// Initialize
qc_options.color_by_phase = true;
num_qubits = 5;
qc.reset(num_qubits);
a = qint.new(3, 'a');
b = qint.new(2, 'b');
// prepare
qc.codeLabel('a = 0,1,2,3');
a.write(0);
a.hadamard(0x1|0x2);
qc.codeLabel('');
qc.nop();
qc.codeLabel('b = 1,3');
b.write(1);
b.hadamard(0x2);
qc.codeLabel('');
qc.nop();

//Flip the phase if +a+ is less than 3 and +b+ is equal to 1
qc.codeLabel('a -= 3        ');
a.subtract(3);
qc.codeLabel('');
qc.nop();
qc.codeLabel('flip if (a < 0 && b==1)');
b.not(~1);
qc.phase(180, a.bits(0x4), b.bits());
b.not(~1);
qc.codeLabel('');
qc.nop();
qc.codeLabel('        a += 3');
a.add(3);
qc.codeLabel('');
