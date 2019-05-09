// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-1

function main()
{
    var a = [4, 3, 5, 1];

    qc.reset(3);
    var qreg = qint.new(3, 'qreg');

    qc.print(a);
    increment(a, 2, qreg);
    qc.print(a);
}

function increment(a, index, qreg)
{
    qreg.write(a[index]);
    qreg.add(1);
    a[index] = qreg.read();
}
main();

