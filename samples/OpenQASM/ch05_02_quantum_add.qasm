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

// Example 5-2: Adding Two Quantum Integers

OPENQASM 2.0;
include "qelib1.inc";

qreg a[4];
qreg b[2];
qreg scratch[2];

x a[0];
h a[2];
rz(0.785398163397448) a[2];
x b[0];
h b[1];
rz(1.57079632679490) b[1];

// a += b
barrier a[0],a[1],a[2],a[3],b[0],b[1],scratch[0],scratch[1];
ccx b[0],a[0],scratch[0];
ccx a[1],a[2],scratch[1];
ccx scratch[0],scratch[1],a[3];
ccx a[1],a[2],scratch[1];
ccx b[0],a[0],scratch[0];
ccx b[0],a[0],scratch[0];
ccx scratch[0],a[1],a[2];
ccx b[0],a[0],scratch[0];
ccx b[0],a[0],a[1];
cx b[0],a[0];
ccx b[1],a[1],scratch[0];
ccx scratch[0],a[2],a[3];
ccx b[1],a[1],scratch[0];
ccx b[1],a[1],a[2];
cx b[1],a[1];