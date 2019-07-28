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

// Example 5-1: Increment and Decrement

OPENQASM 2.0;
include "qelib1.inc";

qreg a[4];
qreg scratch[1];

x a[0];
h a[2];
rz(0.785398163397448) a[2];

// Increment
barrier a[0],a[1],a[2],a[3],scratch[0];
ccx a[0],a[1],scratch[0];
ccx scratch[0],a[2],a[3];
ccx a[0],a[1],scratch[0];
ccx a[0],a[1],a[2];
cx a[0],a[1];
x a[0];

// Decrement
barrier a[0],a[1],a[2],a[3],scratch[0];
x a[0];
cx a[0],a[1];
ccx a[0],a[1],a[2];
ccx a[0],a[1],scratch[0];
ccx scratch[0],a[2],a[3];
ccx a[0],a[1],scratch[0];