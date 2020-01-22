// Example 7-7: QFT frequency manipulation

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation QFTFrequencyManipulation () : Unit {
    using (register = Qubit[4]) {
        // Write frequency to register
        X(register[1]);
        // Uncomment the line below to observe the amplitudes of the prepared state
        // DumpMachine();
        
        // Apply QFT to prepare our initial state
        let registerLE = LittleEndian(register);
        QFTLE(registerLE);
        // Observe the amplitudes of the initial state
        DumpMachine();
        
        // Move back to frequency space
        Adjoint QFTLE(registerLE);
        
        // Increase the frequency of the signal
        IncrementByInteger(1, registerLE);
        
        // Move back to signal space
        QFTLE(registerLE);
        // Observe the amplitudes of the resulting state
        DumpMachine();
        
        // Make sure to reset qubits to the |0❭ state before releasing them
        ResetAll(register);
    }
}