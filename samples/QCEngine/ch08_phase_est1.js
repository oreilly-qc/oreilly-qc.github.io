// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=8-1
// Using the phase_est primitive

function main()
{
    var angle_rad = -Math.PI / 4; // Phase to use for unitaries eigenvalues
    var out_res = 3; // Number of qubits for representing answer
    var N = 1; // Number of iterations to run for generating stats
    // var angle_deg = angle_rad * (180/Math.PI);
    var angle_deg = -150;
    var out = phase_est(angle_deg, out_res);
}

// This is the unitary
function cont_u(theta, q1, q2, iter)
{
    // Perform the controlled unitary between q1 and q2 iter times
    var single_op = true;
    if (single_op)
    {
        qc.phase(-theta / 2 * iter, q2);
        qc.cnot(q2,q1);
        qc.phase(theta * iter, q2);
        qc.cnot(q2,q1);
        qc.phase(-theta / 2 * iter, q2);
    }
    else
    {
        for (i=0; i<iter; i++) {
            qc.phase(-theta / 2, q2);
            qc.cnot(q2,q1);
            qc.phase(theta, q2);
            qc.cnot(q2,q1);
            qc.phase(-theta / 2, q2);
        }
    }
}

function phase_est(theta, out_res)
{
    // Main phase estimation single run
    // var theta = 80 // The val we want to find
    // var out_res = 5
    qc.reset(out_res+1);
    // The output register that will read phi
    var q_out = qint.new(out_res, 'q_out');
    // The register that we will apply conditional u on
    var q_in = qint.new(1, 'q_in');
    // Prepare the input register in eigenstate
    q_in.write(0);
    // HAD the output register
    q_out.had();
    // Apply conditional powers of u
    for (j = 0; j < out_res; j++) 
        cont_u(theta, 2**j, 2**(out_res), 2**j);

    // Inverse QFT on output register
    // (Note qft backwards and doesn't include 
    // exchanges in QCEngine at the moment)
    qft_flip(out_res);
    q_out.QFT();
}

var qft_flip = function(N, flipqint)
{
    for (i=0; i<=Math.floor(N/2)-1; i++) {
        var val = 1<<i | 1<<(N-i-1);
        qc.exchange(val);
    }
}


// Kick it
main();
