// Example 5-5: Phase-encoding the result

open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Arithmetic;

operation PhaseEncoding () : Unit {
    using ((a, b) = (Qubit[3], Qubit[2])) {
        // Initialize the inputs
        H(a[0]);
        H(a[1]);
        Message("Register a");
        DumpRegister((), a);
        // At this point non-zero amplitudes of register a are at the basis states |0❭, |1❭, |2❭, and |3❭

        X(b[0]);
        H(b[1]);
        Message("Register b");
        DumpRegister((), b);
        // At this point non-zero amplitudes of register b are at the basis states |1❭ and |3❭

        Message("Complete state of the system");
        DumpMachine(());

        // a -= 3
        IncrementByInteger(-3, LittleEndian(a));
        
        // if (a < 0) and b == 1 then flip the phase
        (ControlledOnInt(1, Z))(b, a[2]);

        // a += 3
        IncrementByInteger(3, LittleEndian(a));
        
        // Note that now the registers a and b are entangled, so you can not look at just the state of the register b.
        Message("Stage of the system after the computation");
        DumpMachine(());
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll(a + b);
    }
}