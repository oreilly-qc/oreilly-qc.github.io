// Example 7-2: QFT of simple QPU register signal

open Microsoft.Quantum.Arithmetic;
open Microsoft.Quantum.Diagnostics;

operation PrepareState (register : Qubit[], state : String) : Unit {
    ApplyToEach(H, register);
    if (state == "A") {
        Z(register[0]);
    } elif (state == "B") {
        S(register[0]);
        Z(register[1]);
    } else {
        T(register[0]);
        S(register[1]);
        Z(register[2]);
    }
}

operation SimpleStateQFT () : Unit {
    using (register = Qubit[4]) {
        // use PrepareState operation from the previous sample to prepare the state
        PrepareState(register, "C");
        
        // Observe the amplitudes of the prepared state
        DumpMachine();
        
        // Apply QFT
        Adjoint QFTLE(LittleEndian(register));
        
        // Observe the amplitudes of the state after QFT transformation
        DumpMachine();
        
        // Make sure to reset qubits to the |0❭ state before releasing them
        ResetAll(register);
    }
}