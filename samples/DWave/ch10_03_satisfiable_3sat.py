## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
## Book info: http://shop.oreilly.com/product/0636920167433.do

## To run this using a D-Wave system, go to https://www.dwavesys.com/take-leap
## To run this online in QCEngine, go to http://oreilly-qc.github.io?p=10-3

## D-Wave provides a quantum constraint-solving system ideal for solving
## the the Quantum Search problems in Chapter 10

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

## Set up the logic gates, to implement this function:
##  (a OR b) AND (NOT a OR c) AND (NOT b OR NOT c) AND (a OR c)
csp = dwavebinarycsp.ConstraintSatisfactionProblem(dwavebinarycsp.BINARY)
csp.add_constraint(operator.ne, ['a', 'na'])                   # NOT gate
csp.add_constraint(operator.ne, ['b', 'nb'])                   # NOT gate
csp.add_constraint(operator.ne, ['c', 'nc'])                   # NOT gate
csp.add_constraint(gates.or_gate(['a', 'b', 'a_or_b']))         # OR gate
csp.add_constraint(gates.or_gate(['na', 'c', 'na_or_c']))         # OR gate
csp.add_constraint(gates.or_gate(['nb', 'nc', 'nb_or_nc']))         # OR gate
csp.add_constraint(gates.or_gate(['a', 'c', 'a_or_c']))         # OR gate
csp.add_constraint(gates.and_gate(['a_or_b', 'na_or_c', 'and1'])) # AND gate
csp.add_constraint(gates.and_gate(['nb_or_nc', 'a_or_c', 'and2'])) # AND gate
csp.add_constraint(gates.and_gate(['and1', 'and2', 'result'])) # AND gate
csp.fix_variable('result', 1)   # Specify that the result should be one
bqm = dwavebinarycsp.stitch(csp)

## Run the solver
sampler = ExactSolver()
response = sampler.sample(bqm)

## Print all of the results
for datum in response.data(['sample', 'energy']):
    print(datum.sample, datum.energy)

def check_result(a, b, c):
    # Check to make sure a result is valid
    return (a or b) and (not a or c) and (not b or not c) and (a or c)

## Interpret the results
## Find the lowest-energy sample
min_energy = min([x.energy for x in response.data(['energy'])])
winners = [x for x in response.data(['sample', 'energy']) if x.energy == min_energy]
sat_winners = [x for x in winners if check_result(x.sample['a'], x.sample['b'], x.sample['c'])]

print('--------------------------------')
if len(sat_winners) == len(winners):
    print('  Success! Condition satisfied with energy {}. This is satisfiable.'.format(min_energy))
    for w in winners:
        print('      energy {}: {}'.format(w.energy, w.sample))
else:
    print('Failure: {} of {} lowest-energy samples did not satisfy result=1. This is not satisfiable.'.format(len(winners) - len(sat_winners), len(winners)))

