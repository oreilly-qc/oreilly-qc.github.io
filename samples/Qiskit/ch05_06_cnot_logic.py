## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io
##
## A complete notebook of all Chapter 5 samples (including this one) can be found at
##  https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/Qiskit

from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute, Aer, IBMQ, BasicAer
import math
## Uncomment the next line to see diagrams when running in a notebook
#%matplotlib inline

## Example 5-6: CNOT Logic

# Set up the program
a = QuantumRegister(1, name='a')
b = QuantumRegister(1, name='b')
c = QuantumRegister(1, name='c')
r1 = ClassicalRegister(1, name='r1')
r2 = ClassicalRegister(2, name='r2')
r3 = ClassicalRegister(3, name='r3')
qc = QuantumCircuit(a, b, c, r1, r2, r3)

## initialization
qc.reset(c)
qc.x(c)
qc.measure(c, r1)
qc.barrier()

qc.reset(b)
qc.reset(c)
qc.x(b)
qc.cx(b, c)
qc.measure(b, r2[0])
qc.measure(c, r2[1])
qc.barrier()

qc.reset(a)
qc.reset(b)
qc.reset(c)
qc.x(a)
qc.x(b)
qc.ccx(a, b, c)
qc.measure(a, r3[0])
qc.measure(b, r3[1])
qc.measure(c, r3[2])
    
## That's the program. Everything below runs and draws it.

backend = BasicAer.get_backend('statevector_simulator')
job = execute(qc, backend)
result = job.result()

counts = result.get_counts(qc)
print('counts:',counts)

outputstate = result.get_statevector(qc, decimals=3)
for i,amp in enumerate(outputstate):
    if abs(amp) > 0.000001:
        print('|{}> {}'.format(i, amp))
qc.draw()        # draw the circuit
