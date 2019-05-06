// This is a list of the shortcut links provided to shorten book sample URLs

// var sample_shortcuts = {
//     teleport1 : 'samples/QCEngine/ch04_basic_teleportation.js',
// };

var engine_list = [
    {name : 'QCEngine', suffix : '.js',   subdir : 'samples/QCEngine/', dir_list : ''},
    {name : 'Qiskit',   suffix : '.py',   subdir : 'samples/Qiskit/',   dir_list : ''},
    {name : 'QASM',     suffix : '.qasm', subdir : 'samples/QASM/',     dir_list : ''},
];

var sample_menu = [
    {shortcut:'2-1', menu_title:'Ex 2-1: Random bit',         sample_file: 'ch02_random_bit',  num_qubits: 1, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-2', menu_title:'Ex 2-2: Random byte',        sample_file: 'ch02_random_byte', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-3', menu_title:'Ex 2-3: Root-of-not',        sample_file: 'ch02_root_not',    num_qubits: 1, num_instructions: 13, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'2-4', menu_title:'Ex 2-4: Quantum Spy Hunter', sample_file: 'ch02_spy_hunter',  num_qubits: 3, num_instructions: 35, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'3-1', menu_title:'Ex 3-1: Separable qubits', sample_file: 'ch03_separable_qubits',          num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-2', menu_title:'Ex 3-2: Entangled qubits', sample_file: 'ch03_entangled_qubits',          num_qubits: 2, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-3', menu_title:'Ex 3-3: Phase kickback',           sample_file: 'ch03_phase_kickback',    num_qubits: 3, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-4', menu_title:'Ex 3-4: Custom conditional-phase', sample_file: 'ch03_custom_cphase',     num_qubits: 3, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-5', menu_title:'Ex 3-5: Swap test',                sample_file: 'ch03_swaptest', num_qubits: 3, num_instructions: 10, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'3-6', menu_title:'Ex 3-6: Remote-controlled randomness', sample_file: 'ch03_remote_random', num_qubits: 2, num_instructions: 8, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'4-1', menu_title:'Ex 4-1: Basic teleportation',            sample_file: 'ch04_basic_teleportation',   num_qubits: 3, num_instructions: 24, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'4-2', menu_title:'Ex 4-2: A fly in the teleporter',        sample_file: 'ch04_teleport_fly',          num_qubits: 24, num_instructions: 60, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'4-3', menu_title:'Ex 4-3: Quantum computing in the cloud', sample_file: 'ch04_teleport_cloud',        num_qubits: 3, num_instructions: 24, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'4-4', menu_title:'Ex 4-4: Teleporting entanglement',       sample_file: 'ch04_teleport_entanglement', num_qubits: 3, num_instructions: 24, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'5-1', menu_title:'Ex 5-1: Increment and decrement',        sample_file: 'ch05_increment',             num_qubits: 4, num_instructions: 18, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-2', menu_title:'Ex 5-2: Adding two quantum integers',    sample_file: 'ch05_quantum_add',           num_qubits: 8, num_instructions: 20, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-3', menu_title:'Ex 5-3: Add-squared',                    sample_file: 'ch05_add_squared',           num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-4', menu_title:'Ex 5-4: Quantum conditional execution',  sample_file: 'ch05_conditional_execution', num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 8, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-5', menu_title:'Ex 5-5: Quantum conditional phase flip', sample_file: 'ch05_conditional_phase',     num_qubits: 8, num_instructions: 26, num_circle_cols: 8, num_circle_rows: 4, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'5-6', menu_title:'Ex 5-6: CNOT logic',                     sample_file: 'ch05_cnot_logic',            num_qubits: 3, num_instructions: 12, num_circle_cols: 8, num_circle_rows: 4, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'6-1', menu_title:'Ex 6-1: Apply mirror to flipped phase', sample_file: 'ch06_grover_iterations', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'6-2', menu_title:'Ex 6-2: Repeated iterations', sample_file: 'ch06_grover_freq',       num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'6-3', menu_title:'Ex 6-3: Multiple flipped entries', sample_file: 'ch06_grover_multi',       num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'7-1', menu_title:'Ex 7-1: QFT to distinguish 3 states', sample_file: 'ch07_01_qft_distinguish',    num_qubits: 4, num_instructions: 16, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-2', menu_title:'Ex 7-2: QFT Spiral phase',            sample_file: 'ch07_02_qft_spiral',         num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-3', menu_title:'Ex 7-3: QFT square wave',             sample_file: 'ch07_03_qft_sq_wave',           num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-4', menu_title:'Ex 7-4: QFT big square wave',         sample_file: 'ch07_04_qft_big_sq_wave',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-5', menu_title:'Ex 7-5: QFT Frequency to state',      sample_file: 'ch07_05_qft_freq_to_state',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-6', menu_title:'Ex 7-6: QFT Prepare a state',         sample_file: 'ch07_06_qft_prepare_state',  num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-7', menu_title:'Ex 7-7: QFT frequency manipulation',  sample_file: 'ch07_07_qft_freq_manip', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'7-8', menu_title:'Ex 7-8: QFT rotating phases',         sample_file: 'ch07_08_qft_rotating_phases', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'8-1', menu_title:'Ex 8-1: Phase estimation 1', sample_file: 'ch08_phase_est1', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'8-2', menu_title:'Ex 8-2: Phase estimation 2', sample_file: 'ch08_phase_est2', num_qubits: 4, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'9-1', menu_title:'Ex 9-1: QRAM 1',             sample_file: 'ex_qram1', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-2', menu_title:'Ex 9-2: QRAM',               sample_file: 'ex_qram2', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-3', menu_title:'Ex 9-3: QRAM',               sample_file: 'ex_qram3', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-4', menu_title:'Ex 9-4: QRAM',               sample_file: 'ex_butter', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'9-5', menu_title:'Ex 9-5: Amplitude Encoding', sample_file: 'ex_ae_complete', num_qubits: 3, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'10-1', menu_title:'Ex 10-1: Phase Logic 1', sample_file: 'ch10_oracle_logic1', num_qubits: 4, num_instructions: 18, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'10-2', menu_title:'Ex 10-2: Phase Logic 2', sample_file: 'ch10_oracle_logic2', num_qubits: 8, num_instructions: 18, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'10-3', menu_title:'Ex 10-3: Kitten and Tiger', sample_file: 'ch10_kitten_and_tiger', num_qubits: 4, num_instructions: 34, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'11-1', menu_title:'Ex 11-1: Basic phase graphics 1', sample_file: 'ch11_basic_gfx1',     num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-2', menu_title:'Ex 11-2: Basic phase graphics 2', sample_file: 'ch11_basic_gfx2',     num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-3', menu_title:'Ex 11-3: Basic phase graphics 3', sample_file: 'ch11_basic_gfx3',     num_qubits: 16, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-4', menu_title:'Ex 11-4: Supersampling 4',        sample_file: 'ch11_supersampling1', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-5', menu_title:'Ex 11-5: Supersampling (All Options)',        sample_file: 'ch11_circles1', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'11-A', menu_title:'Ex 11-A: Supersampling Circles',        sample_file: 'ch11_circles2', num_qubits: 8, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},

    {shortcut:'12-1', menu_title:'Ex 12-1: Shor\'s Factroring Algorithm', sample_file: 'ch12_shor1',          num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-2', menu_title:'Ex 12-2: Shor without a QPU',           sample_file: 'ch12_shor_no_qpu',    num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-3', menu_title:'Ex 12-3: Shor step-by-step',           sample_file: 'ch12_shor_complete',    num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
    {shortcut:'12-4', menu_title:'Ex 12-4: Shor classical followup',      sample_file: 'ch12_shor_spike_est', num_qubits: 12, num_instructions: 6, num_circle_cols: 8, num_circle_rows: 1, circle_scale: 1.0, gate_scale: 1.0},
];
