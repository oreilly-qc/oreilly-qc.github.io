import os
import time

## This script just runs all of the samples in this directory.

samples = ['ch02_01_random_bit.py',
           'ch02_02_random_byte.py',
           'ch02_03_root_not.py',
           'ch02_04_spy_hunter.py',

           'ch03_01_seperable_qubits.py',
           'ch03_02_entangled_qubits.py',
           'ch03_03_phase_kickback.py',
           'ch03_04_swaptest.py',
           'ch03_05_custom_cphase.py',
           'ch03_06_remote_random.py',

           'ch04_01_basic_teleportation.py',
           'ch04_02_teleport_fly.py',

           'ch05_01_increment.py',
           'ch05_02_quantum_add.py',
           'ch05_03_add_squared.py',
           'ch05_04_conditional_execution.py',
           'ch05_05_conditional_phase.py',
           'ch05_06_cnot_logic.py',

           'ch06_01_grover_iterations.py',
           'ch06_02_grover_freq.py',
           'ch06_03_grover_multi.py',

           'ch07_01_qft_distinguish.py',
           ]

tic = time.time()
for sample in samples:
    print(sample + '--------------------------------------------')
    os.system('python ' + sample)
toc = time.time()

print('Finished {} samples in {} seconds.'.format(len(samples), int(toc - tic)))
