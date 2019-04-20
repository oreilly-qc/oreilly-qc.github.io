// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-1

var a = [4, 3, 5, 1];

qc.reset(3);
var qreg = qint.new(3, 'qreg');

function increment(index)
{
    qc.codeLabel('a[2]→qreg');
    //qreg.write(a[index]);
    qreg.write(0);
    qreg.not(a[index]);
    qc.codeLabel('');
    qc.nop();

    qc.codeLabel('add 1');
    qreg.add(1);
    qc.codeLabel('');
    qc.nop();

    qc.codeLabel('qreg→a[2]');
    a[index] = qreg.read();
    qc.codeLabel('');
    qc.nop();
}

qc.print(a);
increment(2);
qc.print(a);
