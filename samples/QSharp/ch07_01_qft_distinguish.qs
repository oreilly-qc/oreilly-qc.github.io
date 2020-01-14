// Example 7-1: Using QFT to distinguish between three states

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation PrepareState (register : Qubit[], state : String) : Unit {
    ApplyToEach(H, register);
    if (state == "A") {
        Z(register[0]);
    } elif (state == "B") {
        S(register[0]);
        Z(register[1]);
    } else {
        T(register[0]);
        S(register[1]);
        Z(register[2]);
    }
}

// An operation that is given a register in one of the states A, B or C
// and returns the letter of the state it recognized
operation ClassifyState (register : Qubit[]) : String {
    // Apply QFT
    // (Q# library implementation of QFT is inverse compared to the one used in the book,
    // so this code uses Adjoint QFTLE to match the desired effect).
    Adjoint QFTLE(LittleEndian(register));
    
    // Uncomment this line to see the amplitudes after QFT
    // DumpMachine();
    
    // Measure the register and interpret the results
    let frequency = MeasureInteger(LittleEndian(register));
    return frequency == 8 ? "A" | (frequency == 4 ? "B" | "C");
}

operation PrepareAndClassifyStates () : Unit {
    using (register = Qubit[4]) {
        for (inputState in ["A", "B", "C"]) {
            // Prepare the register in the given state
            PrepareState(register, inputState);
            
            // Uncomment this line to see the amplitudes of the prepared state
            // DumpMachine();
            
            // Classify the state
            let classifiedState = ClassifyState(register);
            Message($"State {inputState} recognized as {classifiedState}");
            
            // Make sure to reset qubits to the |0❭ state before reusing/releasing them
            ResetAll(register);
        }
    }
}