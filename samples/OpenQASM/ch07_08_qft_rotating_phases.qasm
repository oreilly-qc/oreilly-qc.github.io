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

// Example 7-8: QFT rotating phases

OPENQASM 2.0;
include "qelib1.inc";
qreg signal[4];

// Rotate kth state in register by k times 20 degrees
// First HAD so that we can see the result for all k values at once
h signal[0];
h signal[1];
h signal[2];
h signal[3];


// Apply 2^k phase operations to kth qubit
rz(0.349065850398866) signal[0];
rz(0.349065850398866) signal[1];
rz(0.349065850398866) signal[1];
rz(0.349065850398866) signal[2];
rz(0.349065850398866) signal[2];
rz(0.349065850398866) signal[2];
rz(0.349065850398866) signal[2];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
rz(0.349065850398866) signal[3];
