namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    // Example 2-2: Random byte

    // open namespace which defines arithmetic operations
    open Microsoft.Quantum.Arithmetic;

    operation RandomByte () : Unit {
        // allocate 8 qubits
        use qs = Qubit[8];
        // put each qubit into superposition of 0 and 1
        ApplyToEach(H, qs);

        // measure the register and store the result
        // MeasureInteger returns the qubits to the |0⟩ state, so no separate Reset is required
        let randomByte = MeasureInteger(LittleEndian(qs));
        
        Message($"{randomByte}");
    }
}
