namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    operation QRNG () : Result {
        // allocate one qubit
        using(q = Qubit()){
            // place it into superposition of 0 and 1
            H(q);

            // read the qubit and return the result
            let result = M(q);
            
            // Make sure the qubit is back to the 0 state
            Reset(q);
            
            return result;
        }
    }
}
