namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    // Example 2-3: Root-of-NOT

    open Microsoft.Quantum.Diagnostics;

    operation SqrtNOT (q : Qubit) : Unit {
        H(q);
        S(q);
        H(q);
    }

    operation RunSqrtNOT () : Unit {
        // allocate a qubit
        using (q = Qubit()) {
            // apply SqrtNOT gate to the |0⟩ state
            SqrtNOT(q);
            Message("Qubit state after the first application of SqrtNOT");
            DumpMachine();

            // apply SqrtNOT gate again and verify that the qubit ends up in the |1⟩ state
            SqrtNOT(q);
            Message("Qubit state after the second application of SqrtNOT");
            DumpMachine();
        
            // make sure the qubit is back to the 0 state
            Reset(q);
        }
    }
}
