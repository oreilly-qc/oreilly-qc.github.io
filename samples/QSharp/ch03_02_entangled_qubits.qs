// Example 3-2: Make a Bell pair

operation PrepareAndMeasureBellPair () : Unit {
    // allocate the qubits
    using ((a, b) = (Qubit(), Qubit())) {
        // put qubit a in superposition
        H(a);
        
        // entangle qubits a and b
        CNOT(a, b);
        
        // measure both qubits and output the results
        Message($"Measurement results: {M(a)}, {M(b)}");
        
        // make sure the qubits are back to the 0 state
        ResetAll([a, b]);
    }
}

operation PrepareMultipleBellPairs () : Unit {
    // repeat the experiment multiple times to observe the correlation between measurement results:
    // the two bits will be random but always the same
    for (i in 1..10) {
        PrepareAndMeasureBellPair();
    }
}
