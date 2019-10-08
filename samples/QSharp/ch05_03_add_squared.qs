// Example 5-3: Some interesting arithmetic

open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Arithmetic;

operation AddBSquared () : Unit {
    using ((a, b) = (Qubit[4], Qubit[2])) {
        // Initialize the inputs
        X(a[0]);
        H(a[2]);
        T(a[2]);
        Message("Register a");
        DumpRegister((), a);
        // At this point non-zero amplitudes of register a are at the basis states |1❭ and |5❭

        X(b[0]);
        H(b[1]);
        T(b[1]);
        Message("Register b");
        DumpRegister((), b);
        // At this point non-zero amplitudes of register b are at the basis states |1❭ and |3❭

        // Allocate extra qubits to hold the value of b² temporarily;
        // note that the register has to have twice the number of qubits in register b.
        using (anc = Qubit[4]) {
            // Compute anc = b * b
            SquareI(LittleEndian(b), LittleEndian(anc));
            
            // Compute a += anc
            AddI(LittleEndian(anc), LittleEndian(a));
            
            // Uncompute the extra qubits, so that they can be released
            Adjoint SquareI(LittleEndian(b), LittleEndian(anc));
        }

        // Note that now the registers a and b are entangled, so you can not look at just the state of the register b.
        Message("Stage of the system after computing a += b * b");
        DumpMachine(());
        // The output of this operation can be deciphered in a same way as the previous one:
        // basis states |18❭ and |22❭ remain unchanged, since they correspond to the number 1 written in register b;
        // basis state |58❭ corresponds to little-endian binary 010111, which represents b = 3 and a + b * b = 1 + 3² = 10,
        // and basis state |62❭ is binary 011111, which is b = 3 and a + b * b = 5 + 3² = 14. 
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(a + b);
    }
}