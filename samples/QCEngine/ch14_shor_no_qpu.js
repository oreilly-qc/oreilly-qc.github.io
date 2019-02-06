// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=14-2

function ShorNoQPU(N, precision_bits, coprime) {
    // Classical replacement for the quantum part of Shor
    work = 1;
    max_loops = Math.pow(2, precision_bits);
    for (iter = 0; iter < max_loops; ++iter) {
        work = (work * coprime) % N;
        if (work == 1) // found the repeat
            return iter + 1;
    }
    return 0;
}
