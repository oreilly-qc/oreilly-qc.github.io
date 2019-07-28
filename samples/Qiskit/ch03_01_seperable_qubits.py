## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io

from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute, Aer, IBMQ, BasicAer
import math
## Uncomment the next line to see diagrams when running in a notebook
#%matplotlib inline

## Example 3-1: Seperable Qubits
# Set up the program
qubit1 = QuantumRegister(1, name='q1')
qubit2 = QuantumRegister(1, name='q2')
qubit3 = QuantumRegister(1, name='q3')
qc = QuantumCircuit(qubit1, qubit2, qubit3)

qc.h(qubit2)              # put it into a superposition of 0 and 1
qc.h(qubit3)              # put it into a superposition of 0 and 1

backend = BasicAer.get_backend('statevector_simulator')
job = execute(qc, backend)
result = job.result()

outputstate = result.get_statevector(qc, decimals=3)
print(outputstate)
qc.draw()        # draw the circuit
