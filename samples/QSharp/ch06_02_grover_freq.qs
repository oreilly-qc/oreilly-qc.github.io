// Example 6-2: Repeated amplitude amplification iterations

open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;

operation RepeatedIterations () : Unit {
    let markedState = 3;
    let numberOfIterations = 4;
    // Allocate the qubit register
    using (register = Qubit[4]) {
        // Prep
        ApplyToEach(H, register);
        DumpMachine(());
        
        for (i in 1 .. numberOfIterations) {
            Flip(markedState, register);
            Mirror(register);
            DumpMachine(());
            // Observe how the probability of measuring the marked state changes after each iteration
        }
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(register);
    }
}
