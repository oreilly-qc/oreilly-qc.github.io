// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=8-2
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

// The fine print: Phasae estimation with only 3 output qubits

function phase_est(q_in, q_out, cont_u)
{
    // Main phase estimation single run
    // HAD the output register
    q_out.had();

    // Apply conditional powers of u
    for (var j = 0; j < q_out.numBits; j++)
        cont_u(q_out, q_in, 1 << j);

    // Inverse QFT on output register
    q_out.invQFT();
}


//Specify the size of output register - determines precision
// of our answer
var m = 3;
// Specify the size of input register that will specify
// our eigenstate
var n = 1;
// Setup
qc.reset(m + n);
var qout = qint.new(m, 'output');
var qin = qint.new(n, 'input');
// Initialize output register all zeros
qout.write(0);
// Initialize input register as eigenstate of HAD
qc.label('init');
qin.write(0);
qin.roty(-135);
// In this example, the starting state is not important because
// out U has been chosen to have an eigenphase of 150 for all inputs.

// Define our conditional unitary
function cont_u(qcontrol, qtarget, control_count) {
    // In this example, the unitary chosen is a simple one which
    // should have an eigenphase of 150 degrees for all inputs.
    // By enabling single_op, we can perform multiple applications simply
    // by rotating the phase farther.

    // Perform the controlled unitary between q1 and q2 iter times
    var theta = 150;
    var single_op = true;
    var q1 = qcontrol.bits(control_count);
    var q2 = qtarget;
    if (single_op)
    {
        qc.phase(-theta / 2 * control_count, q2, q1);
        qc.cnot(q2,q1);
        qc.phase(-theta * control_count, q2, q1);
        qc.cnot(q2,q1);
        qc.phase(-theta / 2 * control_count, q2, q1);
    }
    else
    {
        for (var i = 0; i < control_count; ++i)
        {
            qc.phase(-theta / 2, q2, q1);
            qc.cnot(q2,q1);
            qc.phase(-theta, q2, q1);
            qc.cnot(q2,q1);
            qc.phase(-theta / 2, q2, q1);
        }
    }
}

// Operate phase estimation primitive on registers
qc.label('phase estimation');
phase_est(qin, qout, cont_u);
// Read output register
qout.read();


