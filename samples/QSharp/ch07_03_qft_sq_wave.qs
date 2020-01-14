// Example 7-3: Square-wave QFT

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation SquareWaveQFT () : Unit {
    using (register = Qubit[4]) {
        let wavePeriod = 2;   // can range from 1 to 4
        // Prepare the state
        ApplyToEach(H, register);
        Z(register[wavePeriod - 1]);
        
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