// Example 8-1: Using the phase estimation primitive

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Characterization;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Math;
open Microsoft.Quantum.Oracles;

// Helper operation to define powers of H gate
operation HPower (power : Int, register : Qubit[]) : Unit is Adj + Ctl {
    // We know that H² = I, so we just need to apply H if power is odd
    if (power % 2 == 1) {
        H(register[0]);
    }
}

operation UsingQPE () : Unit {
    let precision = 4;
    // Allocate qubits to hold the eigenstate of H and the phase (in a big endian register)
    using ((eigenstate, phaseRegister) = (Qubit[1], Qubit[precision])) {
        // Prepare the eigenstate of H gate corresponding to eigenphase of 180°
        // (for 0° we'd use 0.25 * PI() as rotation angle)
        Ry(-0.75 * PI(), eigenstate[0]);
        
        // Call library implementation of quantum phase estimation
        let phaseRegisterBE = BigEndian(phaseRegister);
        let powerUnitary = DiscreteOracle(HPower);
        QuantumPhaseEstimation(powerUnitary, eigenstate, phaseRegisterBE);
        
        // Read out the phase
        let phase = IntAsDouble(MeasureInteger(BigEndianAsLittleEndian(phaseRegisterBE))) / IntAsDouble(1 <<< precision);
        Message($"Estimated phase = {phase * 360.0}°");

        ResetAll(eigenstate + phaseRegister);
    }
}