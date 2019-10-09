// Example 6-3: Amplitude amplification iterations with multiple values flipped

open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;

// Operation that flips the sign of multiple marked values
operation FlipMultipleStates (markedValues : Int[], register : Qubit[]) : Unit is Adj {
    ApplyToEachA(Flip(_, register), markedValues);
}

operation MultipleTerms () : Unit {
    let markedStates = [0, 1, 2];
    let numberOfIterations = 4;
    // Allocate the qubit register
    using (register = Qubit[4]) {
        // Prep
        ApplyToEach(H, register);
        
        for (i in 1 .. numberOfIterations) {
            // Flip
            FlipMultipleStates(markedStates, register);
            // Mirror
            Mirror(register);
            DumpMachine(());
        }
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(register);
    }
}
