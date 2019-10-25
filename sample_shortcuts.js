// This is a list of the shortcut links provided to shorten book sample URLs

// var sample_shortcuts = {
//     teleport1 : 'samples/QCEngine/ch04_basic_teleportation.js',
// };

var engine_list = [
    {name : 'QCEngine', link_name: 'QCEngine', suffix : '.js',   subdir : 'samples/QCEngine/', dir_list : ''},
    {name : 'Qiskit',   link_name: 'Qiskit',   suffix : '.py',   subdir : 'samples/Qiskit/',   dir_list : ''},
    {name : 'OpenQASM', link_name: 'OpenQASM', suffix : '.qasm', subdir : 'samples/OpenQASM/', dir_list : ''},
    {name : 'QSharp',   link_name: 'Q#',       suffix : '.qs',   subdir : 'samples/QSharp/',   dir_list : ''},
    {name : 'Cirq',     link_name: 'Cirq',     suffix : '.py',   subdir : 'samples/Cirq/',     dir_list : ''},
];

var sample_menu = [
    {shortcut:'2-1', menu_title:'Ex 2-1: Random bit',         sample_file: 'ch02_01_random_bit',  num_qubits: 1, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-2', menu_title:'Ex 2-2: Random byte',        sample_file: 'ch02_02_random_byte', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-3', menu_title:'Ex 2-3: Root-of-not',        sample_file: 'ch02_03_root_not',    num_qubits: 1, num_instructions: 13, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-4', menu_title:'Ex 2-4: Quantum Spy Hunter', sample_file: 'ch02_04_spy_hunter',  num_qubits: 3, num_instructions: 35, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'3-1', menu_title:'Ex 3-1: Separable qubits',             sample_file: 'ch03_01_separable_qubits',          num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-2', menu_title:'Ex 3-2: Entangled qubits',             sample_file: 'ch03_02_entangled_qubits',          num_qubits: 2, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-3', menu_title:'Ex 3-3: Phase kickback',               sample_file: 'ch03_03_phase_kickback',    num_qubits: 3, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-4', menu_title:'Ex 3-4: Swap test',                    sample_file: 'ch03_04_swaptest', num_qubits: 3, num_instructions: 10, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-5', menu_title:'Ex 3-5: Custom conditional-phase',     sample_file: 'ch03_05_custom_cphase',     num_qubits: 3, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-6', menu_title:'Ex 3-6: Remote-controlled randomness', sample_file: 'ch03_06_remote_random', num_qubits: 2, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'4-1', menu_title:'Ex 4-1: Basic teleportation',            sample_file: 'ch04_01_basic_teleportation',   num_qubits: 3, num_instructions: 24, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'4-2', menu_title:'Ex 4-2: A fly in the teleporter',        sample_file: 'ch04_02_teleport_fly',          num_qubits: 24, num_instructions: 60, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'5-1', menu_title:'Ex 5-1: Increment and decrement',        sample_file: 'ch05_01_increment',             num_qubits: 4, num_instructions: 18, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-2', menu_title:'Ex 5-2: Adding two quantum integers',    sample_file: 'ch05_02_quantum_add',           num_qubits: 8, num_instructions: 20, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-3', menu_title:'Ex 5-3: Add-squared',                    sample_file: 'ch05_03_add_squared',           num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-4', menu_title:'Ex 5-4: Quantum conditional execution',  sample_file: 'ch05_04_conditional_execution', num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-5', menu_title:'Ex 5-5: Quantum conditional phase flip', sample_file: 'ch05_05_conditional_phase',     num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 4, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-6', menu_title:'Ex 5-6: CNOT logic',                     sample_file: 'ch05_06_cnot_logic',            num_qubits: 3, num_instructions: 12, num_circle_cols: 8, num_circle_rows: 4, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'6-1', menu_title:'Ex 6-1: Apply mirror to flipped phase', sample_file: 'ch06_01_grover_iterations', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'6-2', menu_title:'Ex 6-2: Repeated iterations',           sample_file: 'ch06_02_grover_freq',       num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'6-3', menu_title:'Ex 6-3: Multiple flipped entries',      sample_file: 'ch06_03_grover_multi',       num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'7-1', menu_title:'Ex 7-1: QFT to distinguish 3 states', sample_file: 'ch07_01_qft_distinguish',    num_qubits: 4, num_instructions: 16, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-2', menu_title:'Ex 7-2: QFT of simple QPU signal',    sample_file: 'ch07_02_qft_signal',         num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-3', menu_title:'Ex 7-3: QFT square wave',             sample_file: 'ch07_03_qft_sq_wave',           num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-4', menu_title:'Ex 7-4: QFT big square wave',         sample_file: 'ch07_04_qft_big_sq_wave',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-5', menu_title:'Ex 7-5: QFT Frequency to state',      sample_file: 'ch07_05_qft_freq_to_state',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-6', menu_title:'Ex 7-6: QFT Prepare a state',         sample_file: 'ch07_06_qft_prepare_state',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-7', menu_title:'Ex 7-7: QFT frequency manipulation',  sample_file: 'ch07_07_qft_freq_manip', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-8', menu_title:'Ex 7-8: QFT rotating phases',         sample_file: 'ch07_08_qft_rotating_phases', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'8-1', menu_title:'Ex 8-1: Phase estimation 1', sample_file: 'ch08_01_phase_est1', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'8-2', menu_title:'Ex 8-2: Phase estimation 2', sample_file: 'ch08_02_phase_est2', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'9-1', menu_title:'Ex 9-1: QRAM 1',             sample_file: 'ch09_01_qram1', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-2', menu_title:'Ex 9-2: QRAM',               sample_file: 'ch09_02_qram2', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-3', menu_title:'Ex 9-3: QRAM',               sample_file: 'ch09_03_qram3', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'10-1', menu_title:'Ex 10-1: Phase Logic 1',       sample_file: 'ch10_01_oracle_logic1', num_qubits: 4, num_instructions: 18, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'10-2', menu_title:'Ex 10-2: Kitten and Tiger',    sample_file: 'ch10_02_kitten_and_tiger', num_qubits: 4, num_instructions: 34, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'10-3', menu_title:'Ex 10-3: Satisfiable 3-Sat',   sample_file: 'ch10_03_satisfiable_3sat', num_qubits: 4, num_instructions: 34, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'10-4', menu_title:'Ex 10-4: Unsatisfiable 3-Sat', sample_file: 'ch10_04_unsatisfiable_3sat', num_qubits: 4, num_instructions: 34, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'11-1', menu_title:'Ex 11-1: Simple Rectangles',        sample_file: 'ch11_01_basic_gfx1',     num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-2', menu_title:'Ex 11-2: Drawing Curves',           sample_file: 'ch11_02_basic_gfx4',     num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-3', menu_title:'Ex 11-3: Drawing into small tiles', sample_file: 'ch11_03_basic_gfx3',     num_qubits: 16, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-4', menu_title:'Ex 11-4: Quantum Supersampling',    sample_file: 'ch11_04_supersampling1', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-5', menu_title:'Ex 11-5: Build QSS Lookup Table',   sample_file: 'ch11_05_lookup_table', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-6', menu_title:'Ex 11-6: Adding Color',             sample_file: 'ch11_06_crazy_color', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'12-1', menu_title:'Ex 12-1: Shor\'s Factoring Algorithm',  sample_file: 'ch12_01_shor1',          num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-2', menu_title:'Ex 12-2: Shor without a QPU',           sample_file: 'ch12_02_shor_no_qpu',    num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-3', menu_title:'Ex 12-3: Shor step-by-step',            sample_file: 'ch12_03_shor_step_by_step',    num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-4', menu_title:'Ex 12-4: Shor classical followup',      sample_file: 'ch12_04_shor_spike_est', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-A', menu_title:'Ex 12-A: Shor time/space trade',        sample_file: 'ch12_A_shor_time_space', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'14-GD', menu_title:'Ex 14-GD: General Gate Decomposition', sample_file: 'ch14_GD_gate_decomposition', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'14-GT', menu_title:'Ex 14-GT: Gate Teleportation',         sample_file: 'ch14_GT_gate_teleportation', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'14-DJ', menu_title:'Ex 14-DJ: Deutsch-Jozsa',              sample_file: 'ch14_DJ_deutsch_jozsa',      num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'14-BV', menu_title:'Ex 14-BV: Bernstein-Vazirani',         sample_file: 'ch14_BV_bernstein_vazirani', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'14-S',  menu_title:'Ex 14-S: Simon',                       sample_file: 'ch14_S_simon',              num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
];

