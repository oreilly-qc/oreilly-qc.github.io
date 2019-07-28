## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
##
## More samples like this can be found at http://oreilly-qc.github.io
##
## A complete notebook of all Chapter 6 samples (including this one) can be found at
##  https://github.com/oreilly-qc/oreilly-qc.github.io/tree/master/samples/Qiskit

from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister, execute, Aer, IBMQ, BasicAer
import math
## Uncomment the next line to see diagrams when running in a notebook
#%matplotlib inline

## Example 6-2: Repeated iterations
##  (This code is the same as sample 6-1, and we encourage you to play with
##   the number of repeat iterations)

## Note that this looks different from the gates in the book, because
## we're building the operations from Toffoli gates
## Also, increasing the register size will require increasing the scratch size as well.

# Set up the program
reg = QuantumRegister(4, name='reg')
scratch = QuantumRegister(1, name='scratch')
qc = QuantumCircuit(reg, scratch)

def main():
    number_to_flip = 3
    number_of_iterations = 4

    qc.h(reg)

    for i in range(number_of_iterations):
        ## Flip the marked value
        qc.barrier()
        x_bits = ~number_to_flip
        x_list = [reg[x] for x in range(len(reg)) if x_bits & (1 << x)]
        qc.x(x_list)
        multi_cz([x for x in reg])
        qc.x(x_list)

        qc.barrier()
        Grover(reg)

###############################################
## Some utility functions

def Grover(qreg, condition_qubits=None):
    if condition_qubits is None:
        condition_qubits = []
    qc.h(qreg)
    qc.x(qreg)
    multi_cz([x for x in qreg] + condition_qubits)
    qc.x(qreg)
    qc.h(qreg)

def multi_cz(qubits):
    ## This will perform a CCCCCZ on as many qubits as we want,
    ## as long as we have enough scratch qubits
    multi_cx(qubits, do_cz=True)

def multi_cx(qubits, do_cz=False):
    ## This will perform a CCCCCX with as many conditions as we want,
    ## as long as we have enough scratch qubits
    ## The last qubit in the list is the target.
    target = qubits[-1]
    conds = qubits[:-1]
    scratch_index = 0
    ops = []
    while len(conds) > 2:
        new_conds = []
        for i in range(len(conds)//2):
            ops.append((conds[i * 2], conds[i * 2 + 1], scratch[scratch_index]))
            new_conds.append(scratch[scratch_index])
            scratch_index += 1
        if len(conds) & 1:
            new_conds.append(conds[-1])
        conds = new_conds
    for op in ops:
        qc.ccx(op[0], op[1], op[2])
    if do_cz:
        qc.h(target)
    if len(conds) == 0:
        qc.x(target)
    elif len(conds) == 1:
        qc.cx(conds[0], target)
    else:
        qc.ccx(conds[0], conds[1], target)
    if do_cz:
        qc.h(target)
    ops.reverse()
    for op in ops:
        qc.ccx(op[0], op[1], op[2])

main()

## That's the program. Everything below runs and draws it.

backend = BasicAer.get_backend('statevector_simulator')
job = execute(qc, backend)
result = job.result()

outputstate = result.get_statevector(qc, decimals=3)
total_prob = 0
for i,amp in enumerate(outputstate):
    if abs(amp) > 0.000001:
        prob = abs(amp) * abs(amp)
        total_prob += prob
        print('|{}> {} probability = {}%'.format(i, amp, round(prob * 100, 5)))
print('Total probability: {}%'.format(int(round(total_prob * 100))))
qc.draw()        # draw the circuit

