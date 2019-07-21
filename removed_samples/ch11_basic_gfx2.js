// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=12-2
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

qc.reset(8);
qx = qint.new(4, 'qx');
qy = qint.new(4, 'qy');

// Horizontal Line at qy=3
qy.not(~3);
qc.cphase(180, qy.bits());
qy.not(~3);

// Vertical Line at qx=10
qx.not(~10);
qc.cphase(180, qx.bits());
qx.not(~10);

// Diagonal Line at qy=-(qx+1)
qx.add(qy);
qc.cphase(180, qx.bits());
qx.subtract(qy);
