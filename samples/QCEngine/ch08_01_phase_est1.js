// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=8-1
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

//Specify the size of output register - determines precision
// of our answer
var m = 4;
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
// This state will have an eigenphase of 180.
// For eigenphase 0, we would instead use qin.roty(45);

// Define our conditional unitary
function cont_u(qcontrol, qtarget, control_count) {
    // For Hadamard, we only need to know if control_count
    // is even or odd, as applying HAD an even number of
    // times does nothing.
    if (control_count & 1)
        qtarget.chadamard(null, ~0, qcontrol.bits(control_count));
}
// Operate phase estimation primitive on registers
qc.label('phase estimation');
phase_est(qin, qout, cont_u);
// Read output register
qout.read();


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
