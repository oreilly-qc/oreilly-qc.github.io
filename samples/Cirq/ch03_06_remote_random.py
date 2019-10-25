## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io

import cirq
import math

# Example 3-6: Remote Randomness
# Set up the program
def main():
    qc = QPU()
    qc.reset(2)
    a = 0x1
    b = 0x2
    qc.had(a)
    # now prob of a is 50%
    qc.had(b)
    qc.phase(45, b)
    qc.had(b)
    # now prob of b is 15%
    qc.cnot(b, a)
    # Now, you can read *either*
    # qubit and get 50% prob.
    # If the result is 0, then
    # the prob of the *remaining*
    # qubit is 15%, else it's 85%

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

    def x(self, target_mask=~0):
        target = self.mask_to_list(target_mask)
        self.circuit.append(cirq.X.on_each(*target))

    def cnot(self, target_mask, control_mask):
        target = self.mask_to_list(target_mask)
        control = self.mask_to_list(control_mask)
        self.circuit.append(cirq.CNOT.on(control[0], target[0]))

    def ccnot(self, target_mask, control_mask):
        target = self.mask_to_list(target_mask)
        control = self.mask_to_list(control_mask)
        self.circuit.append(cirq.CCX.on(control[0], control[1], target[0]))

    def exchange(self, q0_mask, q1_mask, control_mask):
        if control_mask:
            # Construct CSWAP per Figure 3-22 in the book
            self.cnot(q0_mask, q1_mask)
            self.ccnot(q1_mask, q0_mask|control_mask)
            self.cnot(q0_mask, q1_mask)
        else:
            # Construct SWAP per Figure 3-21 in the book
            self.cnot(q0_mask, q1_mask)
            self.cnot(q1_mask, q0_mask)
            self.cnot(q0_mask, q1_mask)

    def phase(self, theta_degrees, target_mask=~0, control_mask=0):
        if control_mask:
            # Construct CRZ per Figure 3-27 in the book
            self.phase(theta_degrees / 2, target_mask)
            self.cnot(target_mask, control_mask)
            self.phase(-theta_degrees / 2, target_mask)
            self.cnot(target_mask, control_mask)
            self.phase(theta_degrees / 2, control_mask)
        else:
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

