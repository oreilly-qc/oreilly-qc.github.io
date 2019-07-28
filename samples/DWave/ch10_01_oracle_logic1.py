## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
## Book info: http://shop.oreilly.com/product/0636920167433.do

## To run this using a D-Wave system, go to https://www.dwavesys.com/take-leap
## To run this online in QCEngine, go to http://oreilly-qc.github.io?p=10-1

## D-Wave provides a quantum constraint-solving system ideal for solving
## the the Quantum Search problems in Chapter 10

## Rather than using a QPU gate-based solution as shown in the QCEngine version,
## this demo implements the same circuit using quantum annealing to find
## the answer, by linking it to the "energy level" of a system.

## In this example, we build the circuit shown in Figure 10-3 in the book,
## and then simply print out all of the energy values.

## Required imports
import dwavebinarycsp
import dwavebinarycsp.factories.constraint.gates as gates
import operator
from dimod.reference.samplers import ExactSolver

## Set up the logic gates, exactly as shown in Figure 10-3 in the book.
csp = dwavebinarycsp.ConstraintSatisfactionProblem(dwavebinarycsp.BINARY)
csp.add_constraint(operator.ne, ['b', 'not_b'])
csp.add_constraint(gates.or_gate(['a', 'not_b', 'a_or_not_b']))
csp.add_constraint(gates.and_gate(['c', 'a_or_not_b', 'result']))
bqm = dwavebinarycsp.stitch(csp)

## Run the solver
sampler = ExactSolver()
response = sampler.sample(bqm)

## Interpret the results
print('All results: --------------------------------')
for datum in response.data(['sample', 'energy']):
    print(datum.sample, datum.energy)


