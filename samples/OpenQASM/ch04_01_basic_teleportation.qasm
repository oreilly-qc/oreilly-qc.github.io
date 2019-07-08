// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this on an actual quantum computer,
//    1. go to https://quantum-computing.ibm.com
//    2. Click "Switch to Qasm Editor" and paste in the code sample.

// To run the JS version in a browser, go to http://oreilly-qc.github.io?p=4-1

// This sample demonstrates basic teleportation (postselected).

include "qelib1.inc";
qreg q[5];
creg c[5];

// Step 1: Create an entangled pair
h q[2];
cx q[2],q[4];
barrier q[0],q[1],q[2],q[3],q[4];

// Step 2: Prepare a payload
x q[0];
h q[0];
t q[0];
barrier q[0],q[1],q[2],q[3],q[4];

// Step 3: Send
h q[0];
h q[2];
cx q[2],q[0];
h q[2];
measure q[0] -> c[0];
measure q[2] -> c[2];
barrier q[3],q[4];

// Step 4: Receive
x q[4];
z q[4];
barrier q[3],q[4];

// Step 5: Verify
tdg q[4];
h q[4];
x q[4];
measure q[4] -> c[4];
