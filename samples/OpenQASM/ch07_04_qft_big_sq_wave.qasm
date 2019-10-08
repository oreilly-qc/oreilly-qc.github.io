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

// Example 7-4: QFT big square wave

OPENQASM 2.0;
include "qelib1.inc";
qreg signal[8];

// Prepare signal
h signal[0];
h signal[1];
h signal[2];
h signal[3];
h signal[4];
h signal[5];
h signal[6];
h signal[7];
rz(3.14159265358979) signal[4];

// QFT
barrier signal[0],signal[1],signal[2],signal[3],signal[4],signal[5],signal[6],signal[7];
h signal[7];
cu1(-1.57079632679490) signal[6],signal[7];
h signal[6];
cu1(-0.785398163397448) signal[5],signal[7];
cu1(-1.57079632679490) signal[5],signal[6];
h signal[5];
cu1(-0.392699081698724) signal[4],signal[7];
cu1(-0.785398163397448) signal[4],signal[6];
cu1(-1.57079632679490) signal[4],signal[5];
h signal[4];
cu1(-0.196349540849362) signal[3],signal[7];
cu1(-0.392699081698724) signal[3],signal[6];
cu1(-0.785398163397448) signal[3],signal[5];
cu1(-1.57079632679490) signal[3],signal[4];
h signal[3];
cu1(-0.0981747704246810) signal[2],signal[7];
cu1(-0.196349540849362) signal[2],signal[6];
cu1(-0.392699081698724) signal[2],signal[5];
cu1(-0.785398163397448) signal[2],signal[4];
cu1(-1.57079632679490) signal[2],signal[3];
h signal[2];
cu1(-0.0490873852123405) signal[1],signal[7];
cu1(-0.0981747704246810) signal[1],signal[6];
cu1(-0.196349540849362) signal[1],signal[5];
cu1(-0.392699081698724) signal[1],signal[4];
cu1(-0.785398163397448) signal[1],signal[3];
cu1(-1.57079632679490) signal[1],signal[2];
h signal[1];
cu1(-0.0245436926061703) signal[0],signal[7];
cu1(-0.0490873852123405) signal[0],signal[6];
cu1(-0.0981747704246810) signal[0],signal[5];
cu1(-0.196349540849362) signal[0],signal[4];
cu1(-0.392699081698724) signal[0],signal[3];
cu1(-0.785398163397448) signal[0],signal[2];
cu1(-1.57079632679490) signal[0],signal[1];
h signal[0];
swap signal[0],signal[7];
swap signal[1],signal[6];
swap signal[2],signal[5];
swap signal[3],signal[4];


