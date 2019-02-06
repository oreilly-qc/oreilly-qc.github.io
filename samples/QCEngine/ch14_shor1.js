// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=14-1

function shor_sample() {
    N = 35;             // The number we're factoring
    precision_bits = 4; // See the text for a description
    coprime = 2;        // must be 2 in this QPU implementation

    result = Shor(N, precision_bits, coprime);
}

function Shor(N, precision_bits, coprime) {
    repeat_period = ShorQPU(N, precision_bits, coprime); // quantum part
    factors = ShorLogic(N, repeat_period, coprime);      // classical part
    return factors;
}

function ShorLogic(N, repeat_period, coprime) {
    // Given the repeat period, find the actual factors
    ar2 = Math.pow(coprime, repeat_period / 2.0);
    factor1 = gcd(N, ar2 - 1);
    factor2 = gcd(N, ar2 + 1);
    return [factor1, factor2];
}
