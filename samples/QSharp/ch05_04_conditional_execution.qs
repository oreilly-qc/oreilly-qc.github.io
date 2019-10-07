// Example 5-4: Quantum-conditional execution

open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Arithmetic;

operation QuantumConditionalExecution () : Unit {
    using ((a, b) = (Qubit[3], Qubit[3])) {
        // Initialize the inputs
        X(a[0]);
        H(a[2]);
        Message("Register a");
        DumpRegister((), a);
        // At this point non-zero amplitudes of register a are at the basis states |1❭ and |5❭

        X(b[0]);
        H(b[1]);
        T(b[1]);
        Message("Register b");
        DumpRegister((), b);
        // At this point non-zero amplitudes of register b are at the basis states |1❭ and |3❭

        // a -= 3
        IncrementByInteger(-3, LittleEndian(a));
        
        // if (a < 0) then b++;
        (Controlled IncrementByInteger)([a[2]], (1, LittleEndian(b)));

        // a += 3
        IncrementByInteger(3, LittleEndian(a));
        
        // Note that now the registers a and b are entangled, so you can not look at just the state of the register b.
        Message("Stage of the system after the computation");
        DumpMachine(());
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(a + b);
    }
}