// Example 8-2: Implementation of the phase estimation primitive

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Characterization;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Math;
open Microsoft.Quantum.Oracles;

operation QPE (powerUnitary : ((Int, Qubit[]) => Unit is Adj+Ctl), 
               eigenstate : Qubit[],
               phaseRegister : Qubit[]) : Unit {
    ApplyToEach(H, phaseRegister);
    
    // Apply conditional powers of U
    for (i in 0 .. Length(phaseRegister) - 1) {
        Controlled powerUnitary([phaseRegister[i]], (1 <<< i, eigenstate));
    }
    
    QFTLE(LittleEndian(phaseRegister));
}

// Helper operation to define powers of the rotation gate
operation RotatePower (power : Int, register : Qubit[]) : Unit is Adj + Ctl {
    // To apply higher powers of the rotation gate, we can rotate by multiples of the angle
    R1(-PI() * 5.0/6.0 * IntAsDouble(power), register[0]);
}

operation ImplementingQPE () : Unit {
    let precision = 3;
    // Allocate qubits to hold the eigenstate of H and the phase (in a big endian register)
    using ((eigenstate, phaseRegister) = (Qubit[1], Qubit[precision])) {
        // Prepare the eigenstate of the rotation gate corresponding to eigenphase of 150°;
        // for R1 gate, that is simply a |1⟩
        X(eigenstate[0]);
        
        // Call our implementation of quantum phase estimation
        QPE(RotatePower, eigenstate, phaseRegister);
        
        // Inspect the state we obtain after applying QPE
        DumpRegister((), phaseRegister);
        
        // Read out the phase
        let phase = IntAsDouble(MeasureInteger(LittleEndian(phaseRegister))) / IntAsDouble(1 <<< precision);
        Message($"Estimated phase = {phase * 360.0}°");

        ResetAll(eigenstate + phaseRegister);
    }
}