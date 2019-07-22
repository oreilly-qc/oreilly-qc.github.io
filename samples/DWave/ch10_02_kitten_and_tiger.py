## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media

## To run this using a D-Wave system, go to https://www.dwavesys.com/take-leap
## To run this online in QCEngine, go to http://oreilly-qc.github.io?p=10-2

## D-Wave provides a quantum constraint-solving system ideal for solving
## the "Tiger and Kitten" puzzle.

## Rather than using a QPU gate-based solution as shown in the QCEngine version,
## this demo implements the same circuit using quantum annealing to find
## the answer, by linking it to the "energy level" of a system.

## The D-Wave website contqins an extensive set of tools, documentation,
## and learning materials to help you get started.

## Required imports
import dwavebinarycsp
import dwavebinarycsp.factories.constraint.gates as gates
import operator
from dimod.reference.samplers import ExactSolver

## Set up the logic gates, exactly as shown in Figure 10-7 of the book.
csp = dwavebinarycsp.ConstraintSatisfactionProblem(dwavebinarycsp.BINARY)
csp.add_constraint(gates.or_gate(['boxA', 'boxB', 'AorB']))         # OR gate
csp.add_constraint(operator.ne, ['boxA', 'notA'])                   # NOT gate
csp.add_constraint(gates.xor_gate(['AorB', 'notA', 'notAxorAorB'])) # XOR gate
csp.add_constraint(operator.ne, ['notAxorAorB', 'result'])          # NOT gate
bqm = dwavebinarycsp.stitch(csp)

## Run the solver
sampler = ExactSolver()
response = sampler.sample(bqm)

lowest_energy = None
boxA_contains = None
boxB_contains = None
print('All results: --------------------------------')
for datum in response.data(['sample', 'energy']):     
    print(datum.sample, datum.energy)
    success = datum.sample['result']
    if success:
        if lowest_energy is None or datum.energy < lowest_energy:
            lowest_energy = datum.energy
            boxA_contains = 'kitten' if datum.sample['boxA'] else 'tiger'
            boxB_contains = 'kitten' if datum.sample['boxB'] else 'tiger'

print('Box A contains a {}!'.format(boxA_contains))
print('Box B contains a {}!'.format(boxB_contains))


