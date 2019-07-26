// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=6-3

var n2f = [0,1,2];
var number_of_iterations = 5;

var num_qubits = 4;
qc.reset(num_qubits);
var reg = qint.new(num_qubits, 'reg')
reg.write(0);
reg.hadamard();

for (var i = 0; i < number_of_iterations; ++i)
{
    // Flip the marked values
    for (var j = 0; j < n2f.length; ++j)
    {
        number_to_flip = n2f[j];
        reg.not(~number_to_flip);
        reg.cphase(180);
        reg.not(~number_to_flip);
    }

    reg.Grover();

    var prob = 0;
    for (var j = 0; j < n2f.length; ++j)
    {
    // Peek at the probability
        number_to_flip = n2f[j];
        prob += reg.peekProbability(number_to_flip);
    }
    qc.print(''+prob+'\n');
}
