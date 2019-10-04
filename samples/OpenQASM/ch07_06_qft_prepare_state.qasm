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

// Example 7-6: QFT prepare a state

OPENQASM 2.0;
include "qelib1.inc";
qreg signal[4];

// Prepare signal
h signal[0];
cx signal[0],signal[1];
cx signal[0],signal[2];
cx signal[0],signal[3];
x signal[1];
cx signal[1],signal[0];
x signal[1];
barrier signal[0],signal[1],signal[2],signal[3];

// invQFT
swap signal[0],signal[3];
swap signal[1],signal[2];
h signal[0];
cu1(-1.57079632679490) signal[1],signal[0];
h signal[1];
cu1(-0.785398163397448) signal[2],signal[0];
cu1(-1.57079632679490) signal[2],signal[1];
h signal[2];
cu1(-0.392699081698724) signal[3],signal[0];
cu1(-0.785398163397448) signal[3],signal[1];
cu1(-1.57079632679490) signal[3],signal[2];
h signal[3];

