// Example 7-6: Prepare a state with varying ampitudes using QFT

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Diagnostics;

operation PrepareStateWithQFT () : Unit {
    using (register = Qubit[4]) {
        // Write the frequencies we want to register (a superposition of |1❭ and |15❭)
        H(register[0]);
        ApplyToEach(CNOT(Head(register), _), Rest(register));
        X(register[1]);
        CNOT(register[1], register[0]);
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