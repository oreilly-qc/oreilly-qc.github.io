// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=9-5

function theta_from_summed_squares(left_ss, right_ss)
{
    // Given sum of squares of left and right halves
    // calcs theta (in deg) needed for roty to achieve this
    return Math.acos(Math.sqrt(left_ss/(left_ss+right_ss))) * (180/Math.PI)
}

function calc_theta(left_amps, right_amps)
{
    // Calc theta for rotating between two subsets of states
    // to yield total amplitude specified in arrays

    // sum_squares returns the sum of squares of elements in an array
    var left_ss = sum_squares(left_amps);
    var right_ss = sum_squares(right_amps);
    return theta_from_summed_squares(left_ss, right_ss);

}

// The (normalized) vector to amplitude encode
var v = [0.00,
        0.085,
        0.169,
        0.254,
        0.338,
        0.423,
        0.507,
        0.592];

// Setup a QPU register with enough qubits and
// initialize in all zeros state
qc.reset(3);
qc.write(0);

// First spread - between halves of register
// (halve_vec returns two arrays that are first and last half of elements from given array)
[first_half, second_half] = halve_vec(v);
var theta = calc_theta(first_half, second_half);
roty(4, theta); // <-- act on highest weight qubit

// Second spread - between quarters of register
// Spread into quarters in *first* half of register
[first_quarter, second_quarter] = halve_vec(first_half);
var theta_first_half = calc_theta(first_quarter, second_quarter);
// Condition on highest weight qubit being 0 since acting on left half
qc.not(4);
roty(2, theta_first_half, 4); // <-- act on second highest weight qubit (with conditional qubit)
qc.not(4);
//
// Spread into quarters in *second* half of register
[third_quarter, fourth_quarter] = halve_vec(second_half);
var theta_second_half = calc_theta(third_quarter, fourth_quarter);
// Condition on highest weight qubit being 0 since acting on left half
roty(2, theta_second_half, 4); // <-- act on second highest weight qubit (with conditional qubit)


// Third spread - between eighths of register
// Spread into final states in first quarter of register
[first_eighth, second_eighth] = halve_vec(first_quarter);
var theta_first_quarter = calc_theta(first_eighth, second_eighth);
// Condition on higher weight qubits being 00 since acting on first quarter
qc.not(4);
qc.not(2);
roty(1, theta_first_quarter, 4|2); // <-- act on second highest weight qubit (with conditional qubits)
qc.not(2);
qc.not(4);
//
// Spread into final states in second quarter of register
[third_eighth, fourth_eighth] = halve_vec(second_quarter);
var theta_second_quarter = calc_theta(third_eighth, fourth_eighth);
// Condition on higher weight qubits being 01 since acting on second quarter
qc.not(4);
roty(1, theta_second_quarter, 4|2); // <-- act on second highest weight qubit (with conditional qubits)
qc.not(4);
//
// Spread into final states in third quarter of register
[fifth_eighth, sixth_eighth] = halve_vec(third_quarter);
var theta_third_quarter = calc_theta(fifth_eighth, sixth_eighth);
// Condition on higher weight qubits being 10 since acting on third quarter
qc.not(2);
roty(1, theta_third_quarter, 4|2); // <-- act on second highest weight qubit (with conditional qubits)
qc.not(2);
//
// Spread into final states in fourth quarter of register
[seventh_eighth, eighth_eighth] = halve_vec(fourth_quarter);
var theta_fourth_quarter = calc_theta(seventh_eighth, eighth_eighth);
// Condition on higher weight qubits being 11 since acting on fourth quarter
roty(1, theta_fourth_quarter, 4|2); // <-- act on second highest weight qubit (with conditional qubits)

// Print out the amplitudes of all states to check they encode our vector
test_print();
