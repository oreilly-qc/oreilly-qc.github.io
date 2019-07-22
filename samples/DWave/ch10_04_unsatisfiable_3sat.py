## Programming Quantum Computers
##   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
##   O'Reilly Media
## Book info: http://shop.oreilly.com/product/0636920167433.do

## To run this using a D-Wave system, go to https://www.dwavesys.com/take-leap
## To run this online in QCEngine, go to http://oreilly-qc.github.io?p=10-4

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
##  Example 10-4 (unsatisfiable): (a OR b) AND (NOT a OR c) AND (NOT b OR NOT c) AND (a OR c) AND b
##
##   ...notice that this adds one AND gate to the program in Example 10-3...
##  Example 10-3 (satisfiable):   (a OR b) AND (NOT a OR c) AND (NOT b OR NOT c) AND (a OR c)
##  ...rendering it unsatisfiable. So our system should not be able to come up with a solution.

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
csp.add_constraint(gates.and_gate(['and1', 'and2', 'and12'])) # AND gate
csp.add_constraint(gates.and_gate(['and12', 'b', 'result'])) # AND gate
bqm = dwavebinarycsp.stitch(csp)

## Run the solver
sampler = ExactSolver()
response = sampler.sample(bqm)

## Interpret the results
lowest_energy = None
lowest_success_energy = None
success_sample = None
print('All results: --------------------------------')
for datum in response.data(['sample', 'energy']):     
    print(datum.sample, datum.energy)
    success = datum.sample['result']
    if lowest_energy is None or datum.energy < lowest_energy:
        lowest_energy = datum.energy
    if success:
        if lowest_success_energy is None or datum.energy < lowest_success_energy:
            lowest_success_energy = datum.energy
            success_sample = datum.sample

print('--------------------------------')
if lowest_success_energy <= lowest_energy:
    print('  Success! Solution found at lowest energy. This is satisfiable.')
    print(success_sample, lowest_success_energy)
else:
    print('  Faulure. No solutions found at lowest energy. This is not satisfiable.')



