// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-4

function main()
{
    // Setup a single qubit in state |0>
    qc.reset(1);
    qc.write(0);

    // Specify the amplitude we want |1> state to have
    var amp_1 = 0.25;

    // Calculate the value of theta needed according to our equation
    var theta = Math.acos(amp_1);

    // Convert from radians to degrees
    theta = theta * (180/Math.PI);

    // Use ROTY operation on qubit.
    // Signature is: roty(qubit, theta)
    roty(1,theta)

    // Take a look at numerical values of the amplitudes of
    // 0 and 1 states to check that the rotation worked
    qc.print("\n");
    qc.print(qc.qReg.peekComplexValue(0).x);
    qc.print("\n");
    qc.print(qc.qReg.peekComplexValue(1).x);
}

function roty(target, theta, control)
{
    // We can also do any 2x2 unitary, but the syntax isn't great
    // Also, this doesn't show up visually as a gate.
    var theta = theta * (Math.PI/180)
    var mtx2x2 = [[{real: Math.cos(theta/2), imag: 0.0}, {real: -Math.sin(theta/2), imag: 0.0}],
                  [{real: Math.sin(theta/2), imag: 0.0}, {real: Math.cos(theta/2), imag: 0.0}]];
    if (control === undefined) {
        qc.qReg.op2x2(target, blockOp_2x2, mtx2x2);
    } else {
        qc.qReg.cop2x2(target, control, blockOp_2x2, mtx2x2);
    }
}

main();

