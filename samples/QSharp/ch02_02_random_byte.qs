namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    // Example 2-2: Random byte

    // open namespace which defines arithmetic operations
    open Microsoft.Quantum.Arithmetic;

    operation RandomByte () : Unit {
        // allocate 8 qubits
        using (qs = Qubit[8]) {
            // put each qubit into superposition of 0 and 1
            ApplyToEach(H, qs);

            // measure the register and store the result
            let randomByte = MeasureInteger(LittleEndian(qs));
        
            // make sure the qubits are back to the 0 state
            ResetAll(qs);
        
            Message($"{randomByte}");
        }
    }
}
