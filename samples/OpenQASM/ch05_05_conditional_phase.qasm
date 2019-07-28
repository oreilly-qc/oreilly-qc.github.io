// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media
//
// More samples like this can be found at http://oreilly-qc.github.io
//
// A complete set of all OpenQASM samples (including this one) can be found at
//  https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/OpenQASM
//
// OpenQASM code was generated with the help of Qiskit (http://qiskit.org) 
// A complete set of all Qiskit samples (including this one) can be found at
//  https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/Qiskit

// Run this sample in the IBM Q Experience Circuit Composer
// at https://quantum-computing.ibm.com

// Example 5-5: Quantum conditional phase flip

OPENQASM 2.0;
include "qelib1.inc";

qreg a[3];
qreg b[2];

h a[0];
h a[1];
x b[0];
h b[1];

barrier a[0],a[1],a[2],b[0],b[1];
x a[1];
cx a[1],a[2];
x a[0];
cx a[0],a[1];
ccx a[0],a[1],a[2];

barrier a[0],a[1],a[2],b[0],b[1];
x b[1];
h b[1];
ccx a[2],b[0],b[1];
h b[1];
x b[1];

barrier a[0],a[1],a[2],b[0],b[1];
ccx a[0],a[1],a[2];
cx a[0],a[1];
x a[0];
cx a[1],a[2];
x a[1];
