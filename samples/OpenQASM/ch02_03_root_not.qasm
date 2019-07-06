// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media
//
// More samples like this can be found at http://oreilly-qc.github.io

// Run this sample in the IBM Q Experience Circuit Composer
// at https://quantum-computing.ibm.com

// This sample demonstrates the root-of-not operation

OPENQASM 2.0;
include "qelib1.inc";

qreg q[5];
creg c[5];

h q[0];
s q[0];
h q[0];
barrier q[0];
h q[0];
s q[0];
h q[0];
