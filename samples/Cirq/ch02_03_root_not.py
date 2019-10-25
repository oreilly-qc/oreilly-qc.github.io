## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io

## This sample demonstrates root-of-not.

import cirq
import math

## Example 2-3: Root-of-not
# Set up the program
def main():
    qc = QPU()
    qc.reset(1)

    qc.had();
    qc.phase(-90);
    qc.had();
    qc.had();
    qc.phase(-90);
    qc.had();

    qc.rootnot();
    qc.rootnot();

    qc.draw() # draw the circuit
    result = qc.run() # run the circuit

    print(result)


######################################################################
## The below class is a light interface, to convert the
## book's syntax into the syntax used by Cirq.
class QPU:
    def __init__(self):
        self.circuit = cirq.Circuit()
        self.simulator = cirq.Simulator()
        self.qubits = None

    def reset(self, num_qubits):
        self.qubits = [cirq.GridQubit(i, 0) for i in range(num_qubits)]

    def mask_to_list(self, mask):
        return [q for i,q in enumerate(self.qubits) if (1 << i) & mask]

    def had(self, target_mask=~0):
        target = self.mask_to_list(target_mask)
        self.circuit.append(cirq.H.on_each(*target))

    def phase(self, theta_degrees, target_mask=~0):
        target = self.mask_to_list(target_mask)
        theta_radians = theta_degrees * math.pi / 180.0
        self.circuit.append(cirq.Rz(theta_radians).on_each(*target))

    def rootnot(self, target_mask=~0):
        sqrt_x = cirq.X**0.5
        target = self.mask_to_list(target_mask)
        self.circuit.append(sqrt_x.on_each(*target))

    def read(self, target_mask=~0, key=None):
        if key is None:
            key = 'result'
        target = self.mask_to_list(target_mask)
        self.circuit.append(cirq.measure(*target, key=key))

    def draw(self):
        print('Circuit:\n{}'.format(self.circuit))

    def run(self):
        return self.simulator.simulate(self.circuit)


if __name__ == '__main__':
    main()

