// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=10-3
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
qc.codeLabel('noteA = A OR B');
qc.not(0x1|0x2);
qc.cnot(0x4,0x1|0x2)
qc.not(0x1|0x2|0x4);
qc.codeLabel('');
qc.nop();

// Satisfy the note on box B using bit-logic
qc.codeLabel('NOT A');
qc.nop();
qc.not(0x1);
qc.nop();
qc.codeLabel('');
qc.nop();

// Put the phase-logic ancolla qubit into the |+> state
anc.not();
anc.hadamard();

// Satisfy the final condition using phase-logic
qc.codeLabel('(A OR B) XNOR (NOT A)');
qc.not(0x1);
qc.cnot(0x8,0x4);
qc.cnot(0x8,0x1);
qc.not(0x1|0x8);
qc.codeLabel('');

// Return the ancilla to |0>
anc.hadamard();
anc.not();
qc.nop();

// Uncompute all of the bit-logic
qc.codeLabel('uncompute');
qc.not(0x1);
qc.nop();
qc.not(0x1|0x2|0x4);
qc.cnot(0x4,0x1|0x2)
qc.not(0x1|0x2);
qc.codeLabel('');
qc.nop();

// Use a Grover mirror to convert the flipped phase
qc.codeLabel('Grover mirror');
boxes.Grover();
qc.codeLabel('');

// Read and interpret the result!
var result = boxes.read();
qc.print('Box A contains a ' + (result & 1 ? 'kitten' : 'tiger') + '\n');
qc.print('Box B contains a ' + (result & 2 ? 'kitten' : 'tiger') + '\n');
qc.nop();


