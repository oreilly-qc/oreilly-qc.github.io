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

// Example 5-6: CNOT Logic

OPENQASM 2.0;
include "qelib1.inc";

qreg a[1];
qreg b[1];
qreg c[1];
creg r1[1];
creg r2[2];
creg r3[3];
reset c[0];

x c[0];
measure c[0] -> r1[0];

barrier a[0],b[0],c[0];
reset b[0];
reset c[0];
x b[0];
cx b[0],c[0];
measure b[0] -> r2[0];
measure c[0] -> r2[1];

barrier a[0],b[0],c[0];
reset a[0];
reset b[0];
reset c[0];
x a[0];
x b[0];
ccx a[0],b[0],c[0];
measure a[0] -> r3[0];
measure b[0] -> r3[1];
measure c[0] -> r3[2];
