// Example 7-4: Square-wave QFT on a qubyte

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation SquareWaveQFTQubyte () : Unit {
    using (register = Qubit[8]) {
        // Prepare the state
        ApplyToEach(H, register);
        Z(register[4]);
        
        // Observe the amplitudes of the prepared state
        DumpMachine();
        
        // Apply QFT
        Adjoint QFTLE(LittleEndian(register));
        
        // Observe the amplitudes of the state after QFT transformation
        DumpMachine();
        
        // Make sure to reset qubits to the |0❭ state before releasing them
        ResetAll(register);
    }
}