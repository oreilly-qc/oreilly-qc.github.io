// Example 7-8: Rotating phases by different angles

open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Math;

operation RotatingPhases () : Unit {
    // Rotate k-th basis state by k*20 degrees
    let phi = 20.0 / 180.0 * PI();  // the rotation angle in radians
    
    using (register = Qubit[4]) {
        // Put the register in superposition of all basis states to see all results at once
        ApplyToEach(H, register);
        // DumpMachine();
        
        for (i in 0 .. 3) {
            R1(phi * IntAsDouble(1 <<< i), register[i]);
        }
        
        // Observe the amplitudes of the resulting state
        DumpMachine();
        
        // Make sure to reset qubits to the |0❭ state before releasing them
        ResetAll(register);
    }
}