// Example 6-1: Applying the mirror subroutine to a flipped phase

open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;

// Operation that flips the sign of the marked value in the register
operation Flip (markedValue : Int, register : Qubit[]) : Unit is Adj {
    let bits = IntAsBoolArray(markedValue, Length(register));
    ApplyPauliFromBitString(PauliX, false, bits, register);
    Controlled Z(Most(register), Tail(register));
    ApplyPauliFromBitString(PauliX, false, bits, register);    
}

// "Mirror" operation
operation Mirror (register : Qubit[]) : Unit is Adj {
    ApplyToEachA(H, register);
    ApplyToEachA(X, register);
    Controlled Z(Most(register), Tail(register));
    ApplyToEachA(X, register);
    ApplyToEachA(H, register);
}

operation OneIteration () : Unit {
    let markedState = 3;
    // Allocate the qubit register
    using (register = Qubit[4]) {
        // Prep
        ApplyToEach(H, register);
        
        // Flip
        Flip(markedState, register);
        DumpMachine(());
        // Note that at this point the marked state will have negative amplitude

        // Mirror
        Mirror(register);
        DumpMachine(());
        // Note that after mirroring step the probability of measuring the marked state 
        // (the first column in square brackets, also indicated by a row of asterisks before it)
        // is larger than the others
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(register);
    }
}
