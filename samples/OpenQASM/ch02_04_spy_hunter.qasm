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
//
// Run this sample in the IBM Q Experience Circuit Composer
// at https://quantum-computing.ibm.com

// Example 2-4: Quasntum Spy Hunter

OPENQASM 2.0;
include "qelib1.inc";

// Set up the program
qreg alice[1];
qreg fiber[1];
qreg bob[1];
creg ahad[1];
creg aval[1];
creg fval[1];
creg bhad[1];
creg bval[1];

// Use Alice's QPU to generate two random bits
reset alice[0];
h alice[0];
measure alice[0] -> ahad[0];
reset alice[0];
h alice[0];
measure alice[0] -> aval[0];

// Prepare Alice's qubit
reset alice[0];
if(aval==1) x alice[0];
if(ahad==1) h alice[0];

// Send the qubit!
swap alice[0],fiber[0];

// Activate the spy
barrier alice[0],fiber[0],bob[0];
h fiber[0];
measure fiber[0] -> fval[0];
reset fiber[0];
if(fval==1) x fiber[0];
h fiber[0];
barrier alice[0],fiber[0],bob[0];

// Use Bob's QPU to generate a random bit
reset bob[0];
h bob[0];
measure bob[0] -> bhad[0];

// Receive the qubit!
swap fiber[0],bob[0];
if(bhad==1) h bob[0];
measure bob[0] -> bval[0];
