// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-5

// Initialize
qc_options.color_by_phase = true;
var num_qubits = 5;
qc.reset(num_qubits);
var a = qint.new(3, 'a');
var b = qint.new(2, 'b');
// prepare
qc.label('a = 0,1,2,3');
a.write(0);
a.hadamard(0x1|0x2);
qc.label('');
qc.nop();
qc.label('b = 1,3');
b.write(1);
b.hadamard(0x2);
qc.label('');
qc.nop();

//Flip the phase if +a+ is less than 3 and +b+ is equal to 1
qc.label('a -= 3        ');
a.subtract(3);
qc.label('');
qc.nop();
qc.label('flip if (a < 0 && b==1)');
b.not(~1);
qc.phase(180, a.bits(0x4), b.bits());
b.not(~1);
qc.label('');
qc.nop();
qc.label('        a += 3');
a.add(3);
qc.label('');
