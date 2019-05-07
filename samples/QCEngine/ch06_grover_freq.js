// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=6-2

var n2f = [0,1,2];             // Which terms to flip
var number_of_iterations = 50; // The number of Grover iterations

var num_qubits = 4;
qc.reset(num_qubits);
var reg = qint.new(num_qubits, 'reg')
reg.write(0);
reg.hadamard();

for (var i = 0; i < number_of_iterations; ++i)
{
    // Flip the marked value
    for (var j = 0; j < n2f.length; ++j)
    {
        var marked_term = n2f[j];
        reg.not(~marked_term);
        reg.cphase(180);
        reg.not(~marked_term);
    }

    reg.Grover();

    prob = 0;
    for (var j = 0; j < n2f.length; ++j)
    {
        var marked_term = n2f[j];
        prob += reg.peekProbability(marked_term);
    }
    qc.print('iters: '+i+' prob: '+prob);
}
