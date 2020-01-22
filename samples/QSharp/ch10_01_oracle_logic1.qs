// Example 10-1: Encoding "(a OR NOT b) AND c" example in phase logic

open Microsoft.Quantum.Diagnostics;

operation RunExample101 () : Unit {
    // Allocate the qubits a, b and c and a qubit for storing the result
    using ((a, b, c, scratch) = (Qubit(), Qubit(), Qubit(), Qubit())) {
        // Prepare the "input" - a superposition of all states
        ApplyToEach(H, [a, b, c]);
        
        within {
            // Compute (a OR NOT b) and write the result into "scratch" using magnitude-based encoding
            // (within-apply construct will make sure that "within" block is uncomputed after "apply" block is done)
            
            // Convert b to NOT b
            X(b);
            
            // Compute OR of a and updated b
            (ControlledOnInt(0, X))([a, b], scratch);
            X(scratch);
        } apply {
            // Compute the last AND using phase-based encoding
            Controlled Z([c], scratch);
        }
        
        // Dump the state of qubits a, b and c (scratch qubit is not entangled with them any longer).
        // Note the negative phases of states |4❭, |5❭ and |7❭
        DumpRegister((), [a, b, c]);
        
        // Make sure the qubits are back to the |0❭ state
        ResetAll([a, b, c, scratch]);
    }
}