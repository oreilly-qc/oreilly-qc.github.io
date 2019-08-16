namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    // Example 2-1: Random bit

    operation RandomBit () : Unit {
        // allocate one qubit
        using (q = Qubit()) {
            // put it into superposition of 0 and 1
            H(q);

            // measure the qubit and store the result
            let bit = M(q);
        
            // make sure the qubit is back to the 0 state
            Reset(q);
        
            Message($"{bit}");
        }
    }
}
