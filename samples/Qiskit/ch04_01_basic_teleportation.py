# Programming Quantum Computers
#   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
#   O'Reilly Media

# To run this sample, download Qiskit from https://qiskit.org/terra
# To run the JS version in a browser, go to http://oreilly-qc.github.io?p=4-1

import qiskit
import math

def sample_teleport1():
    # Set up the program
    alice = QuantumRegister(1, name='alice')
    ep    = QuantumRegister(1, name='ep')
    bob   = QuantumRegister(1, name='bob')
    alice_c = ClassicalRegister(1, name='alicec')
    ep_c    = ClassicalRegister(1, name='epc')
    bob_c   = ClassicalRegister(1, name='bobc')
    qc = QuantumCircuit(alice, ep, bob, alice_c, ep_c, bob_c)

    # entangle
    qc.h(ep)
    qc.cx(ep, bob)
    qc.barrier()

    # prep payload
    qc.reset(alice)
    qc.h(alice)
    qc.rz(math.radians(45), alice)
    qc.h(alice)
    qc.barrier()

    # send
    qc.cx(alice, ep)
    qc.h(alice)
    qc.measure(alice, alice_c)
    qc.measure(ep, ep_c)
    qc.barrier()

    # receive
    qc.x(bob).c_if(ep_c, 1)
    qc.z(bob).c_if(alice_c, 1)

    # verify
    qc.h(bob)
    qc.rz(math.radians(-45), bob)
    qc.h(bob)
    qc.measure(bob, bob_c)

    # Run the program!
    qis = QiskitHandler(qiskit_backend='local_qasm_simulator')
    qis.execute(qc, shots=100)
    qis.display(qc)





##################################################################################
## Below is boilerplate code for activating and running QISKit in all samples.

"""
Local simulators:
    local_qasm_simulator:        Currently does not support shots=1
    local_statevector_simulator: Currently does not support measure or reset
    local_unitary_simulator:     Currently does not draw the circuit diagram
"""

import getpass, time
from qiskit import ClassicalRegister, QuantumRegister, QuantumCircuit
from qiskit import available_backends, execute, register, least_busy, load_qasm_string
from qiskit.tools.visualization import plot_histogram, circuit_drawer

class QiskitHandler:
    def __init__(self, qiskit_backend=None, use_actual_hardware=False, run_locally=True, ibm_qe_api_token=None):
        self.ibm_qe_api_token = ibm_qe_api_token
        self.use_actual_hardware = use_actual_hardware
        self.run_locally = run_locally
        self.qiskit_backend = qiskit_backend
        self.setup()

    def setup(self):
        need_token = self.use_actual_hardware or not self.run_locally
        if need_token:
            if self.ibm_qe_api_token is None:
                self.ibm_qe_api_token = getpass.getpass('Please input your token and hit enter: ')
            self.qx_config = {
                'APItoken': self.ibm_qe_api_token,
                'url':'https://quantumexperience.ng.bluemix.net/api'}
            try:
                print('registering API token...')
                register(self.qx_config['APItoken'], self.qx_config['url'])

                print('\nYou have access to great power!')
                print(available_backends({'local': False, 'simulator': False}))
            except: 
                print('Something went wrong.\nDid you enter a correct token?')
                exit()

        # If no backend is requested, find the least busy one
        if self.qiskit_backend is None:
            self.qiskit_backend = least_busy(available_backends({'simulator': (not self.use_actual_hardware), 'local': self.run_locally}))

        print('available_backends: {}'.format(available_backends()))
        print('Using simulator backend: ' + self.qiskit_backend)

    def execute(self, circuit, shots=1, max_credits=3):
        self.job_exp = execute(circuit, backend=self.qiskit_backend, shots=shots, max_credits=max_credits)
        lapse = 0
        interval = 30
        while not self.job_exp.done:
            print('Status @ {} seconds'.format(interval * lapse))
            print(self.job_exp.status)
            time.sleep(interval)
            lapse += 1
        print(self.job_exp.status)

    def display(self, circuit):
        if self.qiskit_backend != 'local_unitary_simulator':
            print('drawing circuit...')
            circuit_drawer(circuit)
            print('drawing histogram...,')
            print('   (close graph windows to proceed)')
            plot_histogram(self.job_exp.result().get_counts(circuit))


if __name__ == '__main__':
    sample_teleport1()
