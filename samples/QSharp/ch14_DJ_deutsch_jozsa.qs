// Deutsch-Jozsa algorithm

operation ApplyConstantFunctionOracle (x : Qubit[]) : Unit {
    // Do nothing... (or add a global phase of -1, which is effectively the same)
}


operation ApplyBalancedFunctionOracle (x : Qubit[]) : Unit {
    // f(x) = 1 if qubit x[0] is equal to 1
    Z(x[0]);
}


// Operation that implements Deutsch-Jozsa algorithm
operation IsConstantFunction (N : Int, oracle : (Qubit[] => Unit)) : Bool {
    mutable isConstant = true;

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
        for (q in x) {
            if (M(q) == One) {
                set isConstant = false;
            }
        }
        
        ResetAll(x);
    }
    
    return isConstant;
}


operation RunDeutschJozsaAlgorithm () : Unit {
    for ((oracle, fStr) in [(ApplyConstantFunctionOracle, "f(x) = 0"), 
                            (ApplyBalancedFunctionOracle, "f(x) = x[0]")]) {
        let verdict = IsConstantFunction(2, oracle);
        Message($"Function {fStr} identified as {verdict ? "constant" | "balanced"}");
    }
}
