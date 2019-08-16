// Example 3-5: Custom conditional phase

// open namespace which defines diagnostic routines
open Microsoft.Quantum.Diagnostics;

operation CustomConditionalPhase () : Unit {
    // allocate two qubits
    using ((q1, q2) = (Qubit(), Qubit())) {
        // put each of the qubits into superposition of 0 and 1
        H(q1);
        H(q2);
        
        // apply phases
        T(q2);
        CNOT(q1, q2);
        Adjoint T(q2);
        CNOT(q1, q2);
        T(q1);
        
        // output the wave function of the two-qubit state
        DumpMachine();
        
        // apply a single gate equivalent to the earlier sequence of gates
        Controlled S([q1], q2);

        // output the wave function of the two-qubit state
        DumpMachine();

        // make sure the qubits are back to the 0 state
        ResetAll([q1, q2]);
    }
}
