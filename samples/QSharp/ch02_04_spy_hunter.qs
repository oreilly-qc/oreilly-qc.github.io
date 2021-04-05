namespace QSharp.Chapter2
{
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Intrinsic;

    // Example 2-4: Quantum Spy Hunter

    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Measurement;

    operation GetRangomBit () : Bool {
        use q = Qubit();
        H(q);
        return MResetZ(q) == One;
    }

    // operation that performs the spy hunting protocol, including spy simulation if necessary
    operation TryCatchASpy (spyPresent : Bool, spyAppliesH : Bool) : Bool {
        use (a, fiber, b) = (Qubit(), Qubit(), Qubit());
        // generate two random bits
        let (sendApplyH, sendValue) = (GetRangomBit(), GetRangomBit());

        // prepare Alice's qubit
        if (sendValue) {
            X(a);
        }
        if (sendApplyH) {
            H(a);
        }

        // send the qubit!
        SWAP(fiber, a);

        // activate the spy
        if (spyPresent) {
            if (spyAppliesH) {
                H(fiber);
            }
            let stolenData = M(fiber);
            if (spyAppliesH) {
                H(fiber);
            }
        }

        // receive the qubit!
        let receiveApplyH = GetRangomBit();
        SWAP(fiber, b);
        if (receiveApplyH) {
            H(b);
        }
        let receiveValue = (M(b) == One);

        // make sure all qubits are back to the 0 state
        ResetAll([a, fiber, b]);

        // Alice emails Bob to tell him her choice of operations and value.
        // If the choice matches and the value does not, there's a spy!
        return (sendApplyH == receiveApplyH) and (sendValue != receiveValue);
    }

    operation RunSpyHuntingProtocol () : Unit {
        let spyPresent = true;
        let spyAppliesH = false;
        Message($"Settings: spy {spyPresent ? "" | "not "}present" + 
                (spyPresent ? $", spy {spyAppliesH ? "applies H" | "does not apply H"}" | ""));
        let nAttempts = 1000;
        mutable nCaught = 0;
        for i in 1 .. nAttempts {
            if (TryCatchASpy(spyPresent, spyAppliesH)) {
                set nCaught += 1;
            }
        }
        Message($"Caught the spy in {nCaught} out of {nAttempts} attempts");
    }
}