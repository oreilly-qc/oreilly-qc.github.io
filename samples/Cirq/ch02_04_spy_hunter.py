## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io

import cirq
import math

## Example 2-4: Quasntum Spy Hunter
# Set up the program

def main():
    qc = QPU()
    qc.reset(3)
    a = 0x1
    fiber = 0x2
    b = 0x4

    # Generate two random bits
    send_had = random_bit()
    send_value = random_bit()

    # Prepare Alice's qubit
    if send_value:
        qc.x(a)
    if send_had:
        qc.had(a)

    # Send the qubit!
    qc.exchange(fiber, a)

    # Activate the spy
    spy_is_present = True
    if (spy_is_present):
        spy_had = 1
        if spy_had:
            qc.had(fiber)
        qc.read(fiber, 'stolen_data')

    # Receive the qubit!
    recv_had = random_bit()
    qc.exchange(fiber, b)
    if recv_had:
        qc.had(b)
    qc.read(b, 'recv_val')

    qc.draw() # draw the circuit
    result = qc.run() # run the circuit

    print(result)
    recv_val = 1 if result.measurements['recv_val'][0] else 0

    # Now Alice emails Bob to tell
    # him her had setting and value.
    # If the had setting matches and the
    # value does not, there's a spy!
    if (send_had == recv_had):
        if (send_value != recv_val):
            print('Caught a spy!\n')

# Use a QPU to generate a random bit
def random_bit():
    rng = QPU()
    rng.reset(1)
    rng.had()
    rng.read()
    result = rng.run()
    bit = 1 if result.measurements['result'][0] else 0
    return bit


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

    def exchange(self, q0_mask, q1_mask):
        # Construct SWAP per Figure 3-21 in the book
        self.cnot(q0_mask, q1_mask)
        self.cnot(q1_mask, q0_mask)
        self.cnot(q0_mask, q1_mask)

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

