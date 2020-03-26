// Example 9-1: Using a QPU to increment a number in RAM

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Diagnostics;

operation IncrementInteger (a : Int, nBits : Int) : Int {
    using (register = Qubit[nBits]) {
        let registerLE = LittleEndian(register);
        // Write the integer into the quantum register (using little endian)
        ApplyPauliFromBitString(PauliX, true, IntAsBoolArray(a, nBits), register);
        
        // Perform the increment using library operation
        IncrementByInteger(1, registerLE);
        
        // Read the result from the register and return it
        return MeasureInteger(registerLE);
    }
}

operation IncrementIntegerDemo () : Unit {
    let nBits = 3;
    mutable a = [4, 3, 5, 1];
    Message($"Initial array: {a}");
    
    let indexUpdate = 2;
    set a w/= indexUpdate <- IncrementInteger(a[indexUpdate], nBits);
    Message($"Array after incrementing element {indexUpdate}: {a}");
}
