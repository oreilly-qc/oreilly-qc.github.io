// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=10-2
qc_options.color_by_phase = true;
qc_options.book_render = true;

qc.reset(4);
var boxes = qint.new(2, 'boxes')
var noteA = qint.new(1, 'noteA')
var anc = qint.new(1,'anc')
qc.write(0);

// Put both boxes into a quantum kitten/tiger superposition
boxes.hadamard();

// Satisfy the note on box A using bit-logic
qc.label('noteA = A OR B');
qc.not(0x1|0x2);
qc.cnot(0x4,0x1|0x2)
qc.not(0x1|0x2|0x4);
qc.label('');
qc.nop();

// Satisfy the note on box B using bit-logic
qc.label('NOT A');
qc.nop();
qc.not(0x1);
qc.nop();
qc.label('');
qc.nop();

// Put the phase-logic ancilla qubit into the |-> state
anc.not();
anc.hadamard();

// Satisfy the final condition using phase-logic
qc.label('(A OR B) XNOR (NOT A)');
qc.cnot(0x8,0x4);
qc.cnot(0x8,0x1);
qc.not(0x8);
qc.label('');

// Return the ancilla to |0>
anc.hadamard();
anc.not();
qc.nop();

// Uncompute all of the bit-logic
qc.label('uncompute');
qc.not(0x1);
qc.nop();
qc.not(0x1|0x2|0x4);
qc.cnot(0x4,0x1|0x2)
qc.not(0x1|0x2);
qc.label('');
qc.nop();

// Use a Grover mirror to convert the flipped phase
qc.label('Grover mirror');
boxes.Grover();
qc.label('');

// Read and interpret the result!
var result = boxes.read();
qc.print('Box A contains a ' + (result & 1 ? 'kitten' : 'tiger') + '\n');
qc.print('Box B contains a ' + (result & 2 ? 'kitten' : 'tiger') + '\n');
qc.nop();


