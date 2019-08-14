// Example 3-1: Creating a multi-qubit state that can be expressed in terms of its qubits

// open namespace which defines diagnostic routines
open Microsoft.Quantum.Diagnostics;

operation SeparableState () : Unit {
    // allocate the qubits
    using ((q1, q2, q3) = (Qubit(), Qubit(), Qubit())) {
        // put each of the qubits q2 and q3 into superposition of 0 and 1
        H(q2);
        H(q3);
        
        // output the wave function of the three-qubit state
        DumpMachine();

        // make sure the qubits are back to the 0 state
        ResetAll([q1, q2, q3]);
    }
}
