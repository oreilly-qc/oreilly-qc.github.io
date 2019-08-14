// Example 3-3: Phase kickback

// open namespace which defines diagnostic routines
open Microsoft.Quantum.Diagnostics;

operation PhaseKickback () : Unit {
    // allocate two registers, control and target
    using ((reg1, reg2) = (Qubit[2], Qubit())) {
        // put each qubit of the control register into superposition of 0 and 1
        ApplyToEach(H, reg1);
        
        // initialize the target qubit into 1 state
        X(reg2);

        // output the wave function of the three-qubit state BEFORE phase kickback
        DumpMachine();
        
        // apply phase rotations controlled on the first register
        Controlled T(reg1[0..0], reg2);
        Controlled S(reg1[1..1], reg2);

        // output the wave function of the three-qubit state AFTER phase kickback
        DumpMachine();

        // make sure the qubits are back to the 0 state
        ResetAll(reg1 + [reg2]);
    }
}
