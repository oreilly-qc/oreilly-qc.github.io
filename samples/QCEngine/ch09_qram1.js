// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-1
// Note: This sample may vary slightly from the text in the book,
// due to revisions or aesthetic tweaks.

var a = [4, 3, 5, 1];

qc.reset(4);
var qreg = qint.new(4, 'qreg');

qc.print('RAM before increment: '+a+'\n');
increment(a, 2, qreg);
qc.print('RAM after increment: '+a+'\n');

function increment(a, index, qreg)
{
    qreg.write(a[index]);
    qreg.add(1);
    a[index] = qreg.read();
}


