// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=7-1

qc_options.color_by_phase = true;
qc_options.book_render = true;

var num_qubits = 4;
qc.reset(num_qubits);
var signal = qint.new(num_qubits, 'signal')
var which_signal = 'A';

// prepare the signal
qc.label('prepare');
signal.write(0);
signal.hadamard();
if (which_signal == 'A') {
    signal.phase(180, 1);
} else if (which_signal == 'B') {
    signal.phase(90, 1);
    signal.phase(180, 2);
} else if (which_signal == 'C') {
    signal.phase(45, 1);
    signal.phase(90, 2);
    signal.phase(180, 4);
}
qc.label();
qc.nop();

qc.label('QFT');
signal.QFT();
qc.label();
qc.nop();
