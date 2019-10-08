// Example 5-2: Adding two quantum integers

open Microsoft.Quantum.Diagnostics;

// Open namespace which defines arithmetic operations
open Microsoft.Quantum.Arithmetic;

operation QuantumAddition () : Unit {
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

        // The library operation AddI will add the first parameter to the second one
        AddI(LittleEndian(b), LittleEndian(a));
        
        // Note that now the registers a and b are entangled, so you can not look at just the state of the register b.
        Message("Stage of the system after computing a += b");
        DumpMachine(());
        // The output of this operation is a bit tricky to decipher, since it represents both registers a and b.
        // Register a is the lowest 4 bits of the overall state, and register b is the highest 2 bits.
        // Thus, the non-zero amplitude 0.5 of the basis state |18❭ corresponds to the little-endian bit mask 010010,
        // which can be split up into registers a and b as 0100 10, 
        // which in turn is converted to decimal numbers 2 and 1:
        // the first number is the basis state of register a, storing the sum of basis states |1❭ and |1❭,
        // and the second number is the input state of register b (|1❭).
        // The amplitude of this state is a product of the amplitudes of the basis states |1❭ and |1❭ that were added, 1/sqrt(2) * 1/sqrt(2).
        // The rest of the states can be traced in a similar way.
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(a + b);
    }
}