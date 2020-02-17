// Bernstein-Vazirani algorithm

operation ApplyProductOracle (x : Qubit[], r : Int[]) : Unit {
    // f(x) = Σᵢ rᵢ xᵢ modulo 2 for a given bit vector r (scalar product function)
    for (i in 0 .. Length(x) - 1) {
        if (r[i] == 1) {
            Z(x[i]);
        }
    }
}


// Operation that implements Bernstein-Vazirani algorithm
operation RecoveredVector (N : Int, oracle : (Qubit[] => Unit)) : Int[] {
    mutable r = new Int[N];

    // Allocate an array of N qubits for the input register x.
    using (x = Qubit[N]) {
        // Newly allocated qubits start in the |0⟩ state.
        // The first step is to prepare the qubits in the required state before calling the oracle.
        ApplyToEach(H, x);

        // Apply the oracle to the input register.
        oracle(x);

        // Apply a Hadamard gate to each qubit of the input register again.
        ApplyToEach(H, x);

        // Measure each qubit of the input register in the computational basis using the M operation.
        for (i in 0 .. Length(x) - 1) {
            set r w/= i <- M(x[i]) == One ? 1 | 0;
        }
        
        ResetAll(x);
    }
    
    return r;
}


operation RunBernsteinVaziraniAlgorithm () : Unit {
    for (r in [[0, 0], [1, 0], [0, 1], [1, 1]]) {
        let oracle = ApplyProductOracle(_, r);
        let recoveredR = RecoveredVector(2, oracle);
        Message($"Bit vector {r} recovered as {recoveredR}");
    }
}
