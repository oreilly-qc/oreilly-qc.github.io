// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-1

function main()
{
    var a = [4, 3, 5, 1];
    var reg_qubits = 3;
    qc.reset(2 + reg_qubits + qram_qubits_required(a.length, reg_qubits));
    var qreg = qint.new(3, 'qreg');
    var addr = qint.new(2, 'addr');
    var qram = qram_initialize(a, reg_qubits);

    qreg.write(0);
    addr.write(2);
    addr.hadamard(0x1);

    increment(addr, qreg);
}

function increment(addr, qreg)
{
    qram_load(addr, qreg);
    qreg.add(1);
    qram_store(addr, qreg);
}

main();
