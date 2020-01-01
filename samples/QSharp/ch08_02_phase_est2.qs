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

// Helper operation to define powers of H gate
operation HPower (power : Int, register : Qubit[]) : Unit is Adj + Ctl {
    // We know that H² = I, so we just need to apply H if power is odd
    if (power % 2 == 1) {
        H(register[0]);
    }
}

operation ImplementingQPE () : Unit {
    let precision = 4;
    // Allocate qubits to hold the eigenstate of H and the phase (in a big endian register)
    using ((eigenstate, phaseRegister) = (Qubit[1], Qubit[precision])) {
        // Prepare the eigenstate of H gate corresponding to eigenphase of 180°
        // (for 0° we'd use 0.25 * PI() as rotation angle)
        Ry(-0.75 * PI(), eigenstate[0]);
        
        // Call our implementation of quantum phase estimation
        QPE(HPower, eigenstate, phaseRegister);
        
        // Read out the phase
        let phase = IntAsDouble(MeasureInteger(LittleEndian(phaseRegister))) / IntAsDouble(1 <<< precision);
        Message($"Estimated phase = {phase * 360.0}°");

        ResetAll(eigenstate + phaseRegister);
    }
}