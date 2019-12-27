// Example 10-2: Kittens and tigers

open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Measurement;

operation MirrorRegister (register : Qubit[]) : Unit {
    within {
        ApplyToEachA(H, register);
        ApplyToEachA(X, register);
    } apply {
        Controlled Z(Most(register), Tail(register));
    }
}

operation KittensAndTigers () : Unit {
    // Allocate the qubits
    using ((boxes, noteA, scratch) = (Qubit[2], Qubit(), Qubit())) {
        // Prepare the boxes in a superposition of all states
        ApplyToEach(H, boxes);
        
        within {
            // Compute note A ("at least one of these boxes contains a kitten" = boxA or boxB)
            (ControlledOnInt(0, X))(boxes, noteA);
            X(noteA);
            
            // Compute note B ("boxA contains a tiger")
            X(boxes[0]);
            
            // Put phase-encoded scratch qubit in |-❭ state
            X(scratch);
            H(scratch);
        } apply {
            // Compute the last XNOR
            CNOT(boxes[0], scratch);
            CNOT(noteA, scratch);
            X(scratch);
        }
        
        // Dump the state of qubits "boxes" (two other qubits are not entangled with them any longer).
        // At this point the answer is phase-encoded.
        Message("Computation result encoded in phases");
        DumpRegister((), boxes);
        
        // Convert the phase encoding into magnitudes encoding
        MirrorRegister(boxes);
        
        // Dump the state of qubits "boxes"  again.
        // At this point the answer is magnitudes-encoded.
        Message("Computation result encoded in amplitudes");
        DumpRegister((), boxes);

        // Perform measurements to extract the result
        let catA = MResetZ(boxes[0]) == One ? "kitten" | "tiger";
        let catB = MResetZ(boxes[1]) == One ? "kitten" | "tiger";
        Message($"Box A contains {catA}");
        Message($"Box B contains {catB}");
    }
}