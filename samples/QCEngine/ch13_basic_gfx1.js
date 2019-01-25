// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=13-1

qc.reset(8);
qx = qint.new(4, 'qx');
qy = qint.new(4, 'qy');

// Clear the canvas
qc.write(0);
qx.hadamard();
qy.hadamard();

// Invert if qx >= 8
qc.phase(180, qx.bits(0x8));

// 50% gray in the corner
qx.cnot(qy, 0x1);
qc.phase(180, qy.bits(0x8, qx.bits(0x8|0x1)));
qx.cnot(qy, 0x1);
