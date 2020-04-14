// Example 12-2: Factoring without a QPU

open Microsoft.Quantum.Diagnostics;
open Microsoft.Quantum.Math;

operation EstimatePeriodNoQPU(generator : Int, modulus : Int) : Int {
    let bitsize = BitSizeI(modulus);
    let bitsPrecision = 2 * bitsize + 1;
    mutable work = 1;
    for (iter in 0 .. (2 <<< bitsPrecision) - 1) {
        set work = (work * generator) % modulus;
        if (work == 1) {
            return iter + 1;
        }
    }
    return 0;
}

operation RunShorsAlgorithmNoQPU () : Unit {
    ShorsAlgorithm(EstimatePeriodNoQPU);
}
