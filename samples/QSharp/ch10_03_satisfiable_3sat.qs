// Example 10-3: Satisfiable 3-SAT problem

open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Measurement;

// Helper operation to compute OR of several inputs and write it to the output
// negate[i] = true if variable i is included in the clause negated
operation ComputeOrClause (inputs : Qubit[], negate : Bool[], output : Qubit) : Unit is Adj {
    within {
        // Flip the inputs that have to be negated, so as to calculate a normal OR of inputs
        ApplyPauliFromBitString(PauliX, true, negate, inputs);
    } apply {
        (ControlledOnInt(0, X))(inputs, output);
        X(output);
    }
}

operation MirrorRegister (register : Qubit[]) : Unit {
    within {
        ApplyToEachA(H, register);
        ApplyToEachA(X, register);
    } apply {
        Controlled Z(Most(register), Tail(register));
    }
}

operation SolveSatisfiableSAT () : Unit {
    // Allocate the qubits
    using ((inputs, clauses) = (Qubit[3], Qubit[4])) {
        // Prepare the inputs in a superposition of all states
        ApplyToEach(H, inputs);
        
        within {
            // Clause 1: a OR b = inputs[0] OR inputs[1]
            ComputeOrClause(inputs[0..1], [false, false], clauses[0]);
            // Clause 2: NOT a OR c = NOT inputs[0] OR inputs[2]
            ComputeOrClause(inputs[0..2..2], [true, false], clauses[1]);
            // Clause 3: NOT b OR NOT c = NOT inputs[1] OR NOT inputs[2]
            ComputeOrClause(inputs[1..2], [true, true], clauses[2]);
            // Clause 4: a OR c = inputs[0] OR inputs[2]
            ComputeOrClause(inputs[0..2..2], [false, false], clauses[3]);
        } apply {
            // Compute the (phase-encoded) result
            Controlled Z(Most(clauses), Tail(clauses));
        }
        
        // Dump the state of inputs (the clauses are not entangled with them any longer).
        // At this point the answer is phase-encoded.
        Message("Computation result encoded in phases");
        DumpRegister((), inputs);
        
        // Convert the phase encoding into magnitudes encoding
        MirrorRegister(inputs);
        
        // Dump the state of qubits "boxes"  again.
        // At this point the answer is magnitudes-encoded.
        Message("Computation result encoded in amplitudes");
        DumpRegister((), inputs);

        // Perform measurements to extract the result
        let solution = ResultArrayAsBoolArray(MultiM(inputs));
        Message($"Variables [a, b, c] = {solution}");
        
        ResetAll(inputs);
    }
}