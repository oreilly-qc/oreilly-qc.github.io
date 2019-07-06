## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io

## This sample demonstrates root-of-not.

from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute, Aer, IBMQ, BasicAer
import math
%matplotlib inline

# Set up the registers
reg   = QuantumRegister(1, name='reg')
reg_c = ClassicalRegister(1, name='regc')
qc    = QuantumCircuit(reg, reg_c)


# One root-of-not gate
qc.h(reg)
qc.rz(math.radians(-90), reg)
qc.h(reg)
qc.barrier()
# One root-of-not gate
qc.h(reg)
qc.rz(math.radians(-90), reg)
qc.h(reg)
qc.barrier()


# Run the program 
backend = BasicAer.get_backend('statevector_simulator')
job = execute(qc, backend)
result = job.result()

# Display the output and draw the circuit
outputstate = result.get_statevector(qc, decimals=3)
print(outputstate)
qc.draw()


