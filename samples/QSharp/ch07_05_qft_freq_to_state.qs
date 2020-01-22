// Example 7-5: Converting frequency into state

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation FrequencyToState () : Unit {
    using (register = Qubit[4]) {
        // Write frequency to register
        X(register[0]);
        X(register[1]);
        
        // Observe the amplitudes of the prepared state
        DumpMachine();
        
        // Apply QFT
        QFTLE(LittleEndian(register));
        
        // Observe the amplitudes of the state after QFT transformation
        DumpMachine();
        
        // Make sure to reset qubits to the |0❭ state before releasing them
        ResetAll(register);
    }
}