// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-8

// Rotate kth state in register by k times 20 degrees
var phi = 20;

// Let's consider a 4 qubit register
qc.reset(4);
// First HAD so that we can see the result for all k values at once
qc.write(0);
qc.had();
// Apply 2^k phase operations to kth qubit
for (var i = 0; i < 4; i++) {
    var val = 1 << i;
    for (var j = 0; j < val; j++) {
        qc.phase(phi, val);
    }
}