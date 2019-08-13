// Example 3-6: Remote-controlled randomness

// open namespace which defines type conversion functions
open Microsoft.Quantum.Convert;
// open namespace which defines MResetZ
open Microsoft.Quantum.Measurement;

operation RemoteControlledRandomness () : Unit {
    let attempts = 1000;
    mutable result = [0, 0, 0, 0];
    for (i in 1 .. attempts) {
        // allocate two qubits
        using ((a, b) = (Qubit(), Qubit())) {
            H(a);
            // measuring a now will give us 0 or 1 with 50% probability

            H(b);
            T(b);
            H(b);
            // measuring b now will give us 0 with 85% probability and 1 with 15% probability

            // entangle a and b
            CNOT(a, b);
            // now, you can read *either* qubit and get 0 or 1 with 50% probability;
            // if the result is 0, then the probability of the *remaining* qubit measuring 1 is 15%, else it's 85%;
            // if the result is 1, the probabilities are the other way around

            // let's measure qubit a first
            // (we'll convert measurement results into integer to keep statistics in an array)
            let index = (MResetZ(a) == One ? 1 | 0) * 2 + (MResetZ(b) == One ? 1 | 0);
            set result w/= index <- result[index] + 1;
        }
    }
    Message($"Overall measurement counts (out of {attempts}): {result}");
    let a0b0_percentage = IntAsDouble(result[0]) / IntAsDouble(result[0] + result[1]) * 100.0;
    Message($"When a was measured to be 0, b was measured 0 {a0b0_percentage}% of times");
    let a1b0_percentage = IntAsDouble(result[2]) / IntAsDouble(result[2] + result[3]) * 100.0;
    Message($"When a was measured to be 1, b was measured 0 {a1b0_percentage}% of times");
}
