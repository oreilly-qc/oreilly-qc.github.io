## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
## Book info: http://shop.oreilly.com/product/0636920167433.do

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
csp.add_constraint(operator.eq, ['result', 'one'])    # Specify that the result should be one
csp.fix_variable('one', 1)   # We could fix 'result' directly, but this is handy for printing
bqm = dwavebinarycsp.stitch(csp)

## Run the solver
sampler = ExactSolver()
response = sampler.sample(bqm)

## Print all of the results
for datum in response.data(['sample', 'energy']):
    print(datum.sample, datum.energy)

## Interpret the results
## Find the lowest-energy sample
print('--------------------------------')
winner = min([(x.energy, x.sample) for x in response.data(['sample', 'energy'])])
if winner[1]['result'] == 1:
    print('  Success! Condition satisfied with energy {}.'.format(winner[0]))
    print('      energy {}: {}'.format(winner[0], winner[1]))
    print('    Box A contains a {}!'.format('kitten' if winner[1]['boxA'] == 1 else 'tiger'))
    print('    Box B contains a {}!'.format('kitten' if winner[1]['boxB'] == 1 else 'tiger'))
else:
    print('Failure: Lowest-energy sample did not satisfy result=1')

