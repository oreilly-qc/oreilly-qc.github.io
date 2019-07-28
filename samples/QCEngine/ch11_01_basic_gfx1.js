// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=11-1
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// Visual setup for the circle chart
qc_options.color_by_phase = true;

qc.reset(8);
qx = qint.new(4, 'qx');
qy = qint.new(4, 'qy');

// Clear the canvas
qc.label('init');
qc.write(0);
qx.hadamard();
qy.hadamard();

// Leave some space
qc.label('');
qc.nop();
qc.nop();

// Invert if qx >= 8
qc.label('invert if qx >= 8');
qc.phase(180, qx.bits(0x8));

// Leave some space
qc.label('');
qc.nop();
qc.nop();
qc.nop();
qc.nop();

// 50% gray in the corner
qc.label('50% gray in the corner');
qx.cnot(qy, 0x1);
qc.cphase(180, qy.bits(0x8, qx.bits(0x8|0x1)));
qx.cnot(qy, 0x1);
