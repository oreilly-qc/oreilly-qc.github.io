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

// Example 4-2: A Fly in the teleporter

OPENQASM 2.0;
include "qelib1.inc";

qreg fly[6];
qreg epair1[6];
qreg epair2[6];
creg send0c0[1];
creg send0c1[1];
creg send0c2[1];
creg send0c3[1];
creg send0c4[1];
creg send0c5[1];
creg send1c0[1];
creg send1c1[1];
creg send1c2[1];
creg send1c3[1];
creg send1c4[1];
creg send1c5[1];

// Construct the fly we're going to send.
// Note: This is the 6-qubit mini-fly. See the Qiskit and QCEngine
//       versions for a larger better-looking fly.
h fly[0];
h fly[1];
h fly[2];
h fly[3];
h fly[4];
h fly[5];
x fly[0];
x fly[2];
x fly[3];
x fly[4];
x fly[5];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[3];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
x fly[3];
x fly[4];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[1];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[1];
x fly[3];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[3];
x fly[4];
x fly[5];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
x fly[3];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[1];
x fly[3];
x fly[4];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[1];
x fly[3];
ccx fly[0],fly[1],epair1[0];
ccx fly[3],fly[4],epair1[1];
h fly[5];
ccx epair1[0],epair1[1],fly[5];
h fly[5];
ccx fly[3],fly[4],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
x fly[2];
cx fly[2],fly[0];
cx fly[2],fly[1];
h fly[0];
h fly[1];
h fly[2];
h fly[3];
h fly[4];
h fly[5];
x fly[0];
x fly[1];
x fly[2];
x fly[3];
x fly[4];
x fly[5];
// Do a Grover iteration to make the fly look nice
ccx fly[0],fly[1],epair1[0];
ccx fly[2],fly[3],epair1[1];
ccx epair1[0],epair1[1],epair1[2];
h fly[5];
ccx epair1[2],fly[4],fly[5];
h fly[5];
ccx epair1[0],epair1[1],epair1[2];
ccx fly[2],fly[3],epair1[1];
ccx fly[0],fly[1],epair1[0];
x fly[0];
x fly[1];
x fly[2];
x fly[3];
x fly[4];
x fly[5];
h fly[0];
h fly[1];
h fly[2];
h fly[3];
h fly[4];
h fly[5];

// Make an entangled pair
barrier fly[0],fly[1],fly[2],fly[3],fly[4],fly[5],epair1[0],epair1[1],epair1[2],epair1[3],epair1[4],epair1[5],epair2[0],epair2[1],epair2[2],epair2[3],epair2[4],epair2[5];
h epair1[0];
h epair1[1];
h epair1[2];
h epair1[3];
h epair1[4];
h epair1[5];
cx epair1[0],epair2[0];
cx epair1[1],epair2[1];
cx epair1[2],epair2[2];
cx epair1[3],epair2[3];
cx epair1[4],epair2[4];
cx epair1[5],epair2[5];

// Alice sends!
barrier fly[0],fly[1],fly[2],fly[3],fly[4],fly[5],epair1[0],epair1[1],epair1[2],epair1[3],epair1[4],epair1[5],epair2[0],epair2[1],epair2[2],epair2[3],epair2[4],epair2[5];
cx fly[0],epair1[0];
cx fly[1],epair1[1];
cx fly[2],epair1[2];
cx fly[3],epair1[3];
cx fly[4],epair1[4];
cx fly[5],epair1[5];
h fly[0];
h fly[1];
h fly[2];
h fly[3];
h fly[4];
h fly[5];
measure fly[0] -> send0c0[0];
measure epair1[0] -> send1c0[0];
measure fly[1] -> send0c1[0];
measure epair1[1] -> send1c1[0];
measure fly[2] -> send0c2[0];
measure epair1[2] -> send1c2[0];
measure fly[3] -> send0c3[0];
measure epair1[3] -> send1c3[0];
measure fly[4] -> send0c4[0];
measure epair1[4] -> send1c4[0];
measure fly[5] -> send0c5[0];
measure epair1[5] -> send1c5[0];

// Apply noise on the line, if any
barrier fly[0],fly[1],fly[2],fly[3],fly[4],fly[5],epair1[0],epair1[1],epair1[2],epair1[3],epair1[4],epair1[5],epair2[0],epair2[1],epair2[2],epair2[3],epair2[4],epair2[5];
rx(0.0) epair2[0];
rx(0.0) epair2[1];
rx(0.0) epair2[2];
rx(0.0) epair2[3];
rx(0.0) epair2[4];
rx(0.0) epair2[5];

// Bob receives!
barrier fly[0],fly[1],fly[2],fly[3],fly[4],fly[5],epair1[0],epair1[1],epair1[2],epair1[3],epair1[4],epair1[5],epair2[0],epair2[1],epair2[2],epair2[3],epair2[4],epair2[5];
if(send1c0==1) x epair2[0];
if(send0c0==1) z epair2[0];
if(send1c1==1) x epair2[1];
if(send0c1==1) z epair2[1];
if(send1c2==1) x epair2[2];
if(send0c2==1) z epair2[2];
if(send1c3==1) x epair2[3];
if(send0c3==1) z epair2[3];
if(send1c4==1) x epair2[4];
if(send0c4==1) z epair2[4];
if(send1c5==1) x epair2[5];
if(send0c5==1) z epair2[5];
barrier fly[0],fly[1],fly[2],fly[3],fly[4],fly[5],epair1[0],epair1[1],epair1[2],epair1[3],epair1[4],epair1[5],epair2[0],epair2[1],epair2[2],epair2[3],epair2[4],epair2[5];
