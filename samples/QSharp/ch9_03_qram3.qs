// Example 9-3: Preparing amplitude-encoded vectors

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Math;
open Microsoft.Quantum.Preparation;

operation AmplitudeEncodingDemo () : Unit {
    let data = [-1.0, 1.0, 1.0, 5.0, 5.0, 6.0, 6.0, 6.0];
    let N = Length(data);
    
    // Convert array of real data points to an array of ComplexPolar data type
    mutable dataComplexPolar = new ComplexPolar[N];
    for (i in 0 .. N - 1) {
        set dataComplexPolar w/= i <- ComplexAsComplexPolar(Complex(data[i], 0.0));
    }
    
    // Allocate register of right size to amplitude encode vector
    let nQubits = Round(Lg(IntAsDouble(N)));
    using (register = Qubit[nQubits]) {
        let phase = PrepareArbitraryState(dataComplexPolar, LittleEndian(register));
        DumpMachine();
        ResetAll(register);
    }
}
