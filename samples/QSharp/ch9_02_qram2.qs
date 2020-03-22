// Example 9-2: Using a QPU to increment a number in QRAM

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;

operation LoadFromQRAM (data : Int[], indexRegister : Qubit[], dataRegister : Qubit[]) : Unit is Adj+Ctl {
    // Mock QRAM loading by using controlled-not gates, with indexRegister as controls
    for (i in 0 .. Length(data) - 1) {
        // Convert the data into a transformation we'll apply on dataRegister to encode it
        let encodeAi = ApplyPauliFromBitString(PauliX, true, IntAsBoolArray(data[i], Length(dataRegister)), _);
        (ControlledOnInt(i, encodeAi))(indexRegister, dataRegister);
    }
}

operation LoadAndIncrementDemo () : Unit {
    let data = [4, 3, 5, 1];
    using ((indexRegister, dataRegister) = (Qubit[2], Qubit[3])) {
        // Prepare index register in superposition
        H(indexRegister[0]);
        X(indexRegister[1]);
        Message("Preparing index register in superposition...");
        DumpMachine();

        // Load the data from QRAM using the index register in superposition as indices
        Message("Loading the data from QRAM...");
        LoadFromQRAM(data, indexRegister, dataRegister);
        DumpMachine();
        
        // Perform the increment using library operation
        Message("Incrementing the data...");
        IncrementByInteger(1, LittleEndian(dataRegister));
        DumpMachine();
        
        ResetAll(indexRegister + dataRegister);
    }
}
