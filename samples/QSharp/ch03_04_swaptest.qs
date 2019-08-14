// Example 3-4: The swap test

// open namespace which defines type conversion functions
open Microsoft.Quantum.Convert;
// open namespace which defines MResetZ
open Microsoft.Quantum.Measurement;

// Returns True if the states of the input qubits are equal
operation SwapTest (input1 : Qubit, input2 : Qubit) : Bool {
    // allocate the output qubit
    using (output = Qubit()) {
        // initialize the output qubit
        H(output);
        
        // swap the input states conditioned on the output state
        Controlled SWAP([output], (input1, input2));
        
        // extract the result and return the output qubit back to 0 state
        H(output);
        X(output);
        
        return MResetZ(output) == One;
    }
}

operation RunSwapTest () : Unit {
    let attempts = 100;
    mutable reportedEqual = 0;
    // repeat the test multiple times to observe the probability of the states being reported equal
    for (i in 1..attempts) {
        // allocate qubits to be tested
        using ((input1, input2) = (Qubit(), Qubit())) {
            // initialize the qubits in the states we want to compare
            // leave input1 in the |0⟩ state and rotate input2 - the larger the angle, the further away are the states
            // try replacing 0.1 with 0.0 (when the states will be equal) 
            // and with 0.2, 0.3, ... up to 1.0 when the state is rotated all the way to the -|0⟩
            Ry(2.0 * 3.14 * 0.1, input2);

            // some other suggested state initializations:
            // X(input1); H(input1); H(input2); Z(input2);    // same state |-⟩, prepared in different ways
            // X(input1); H(input1); H(input2);               // orthogonal states: input1 in the |-⟩ state, input2 in the |+⟩ state
            
            if (SwapTest(input1, input2)) {
                set reportedEqual += 1;
            }

            ResetAll([input1, input2]);
        }
    }
    Message($"The states were reported equal {IntAsDouble(reportedEqual) / IntAsDouble(attempts) * 100.0 }% of the time");
}
