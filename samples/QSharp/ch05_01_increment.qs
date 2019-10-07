// Example 5-1: Integer increment-by-one operation (using library operation)

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation LibraryIncrementAndDecrement () : Unit {
    // allocate the qubit register
    using (register = Qubit[4]) {
        // initialize the inputs
        X(register[0]);
        H(register[2]);
        T(register[2]);
        
        DumpMachine(());
        // note that at this point non-zero amplitudes are at the basis states |1❭ and |5❭

        // Increment the register using library implementation of the increment from Microsoft.Quantum.Arithmetic
        Message("Increment (library implementation)");
        IncrementByInteger(1, LittleEndian(register));
        DumpMachine(());

        Message("Decrement (library implementation)");
        IncrementByInteger(-1, LittleEndian(register));
        DumpMachine(());

        // make sure the qubits are back to the |0❭ state
        ResetAll(register);
    }
}