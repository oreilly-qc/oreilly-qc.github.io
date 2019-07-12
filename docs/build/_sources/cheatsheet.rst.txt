.. _cheatsheet-label:

.. |br| raw:: html

   <br />

Cheatsheet
==========

.. contents:: Contents
   :local:

This page gives a summary of essential QCEngine commands. For more detail on how to combine these commands into full quantum programs see the :ref:`quickstart <quickstart-label>` section.


Working with qubits
-------------------

A number of methods exist for helping setup and create qubits for use in QCEngine programs. In many commands qubits from either the whole QPU or a QInt object (introduced below) can be specified using either hexadecimal, binary, or decimal notation. For example, :code:`0x4`, :code:`0b001` and :code:`4` would all specify the third of three qubits (having a weight of :math:`2^2=4`). Multiple qubits can be selected using JavaScript's bitwise OR operation between hexadecimal or binary values (for example, :code:`0x2|0x4`, :code:`0b010|0b001` and :code:`3` all specify the second two of three qubits (having weights :math:`2^1=2` and :math:`2^2=4`).

:code:`qc.reset(num_qubits)`
    Reset the QPU and initialize it with :code:`num_qubits` qubits. |br|
    **Example:** :code:`qc.reset(4)`

:code:`qc.write(val, qubit)`
    Write the integer value :code:`val` in binary to the qubit at location :code:`qubit`. If no :code:`qubit` argument is passed, then write the value using all qubits in the QPU if called as a method on :code:`qc` or in the QInt if called as a method on a :code:`qint` object. |br|
    **Example:** :code:`qc.write(2)`

:code:`qint.new(num_qubits, qint_label)`
    Create a QInt with the first :code:`num_qubits` free in the QPU and label it with the string :code:`qint_label` in circuit diagrams. QInt's provide a way to group qubits together and act on them in these groups. |br|
    **Example:** :code:`var myqint = qint.new(2, 'myqint')`

:code:`qc.discard()`
    Remvoves a specified qubit from the QPU. Can be used as a method on the `qc` object or a QInt object. If called without an argument then discards all qubits associated with the parent object. |br|
    **Example:** :code:`qc.discard(0x2);`

:code:`qint.bits()`

:code:`qint.peekProbability(value)`
    Returns the probability of observing the specified value if the parent QInt were to have all of its qubits measured. Note that although :code:`qint.peekProbability()` can be useful for debugging QPU programs, a real QPU could not implement this function directly as in general it is not possible to determine the amplitudes (and therefore probabilities) of a QPU register's possible configurations. Take care not to rely on it for any critical component of your QPU programs. |br|
    **Example:** :code:`myqint.peekProbability(2)`

:code:`qint.numBits()`
    Returns an integer specifying the number of qubits contained within a QInt object. |br|
    **Example:** :code:`myqint.numBits()`

:code:`qint.reverseBits(qubits)`
    When called with no argument, reverses the ordering of all qubits in a QInt (so that first becomes last, second becomes second from last, etc...). The argument qubits can be used to specify a subset of qubits to be reversed. |br| 
    **Example:** :code:`myqint.reverseBits(0x1|0x2|0x4)`

Single-qubit operations
-----------------------

Most single-qubit operations can either be performed as methods of the :code:`qc` object or of a :code:`qint` object. In either case, a specific qubit for the operation to act on can be specified using hexadecimal, or if no specific qubit is specified, the single-qubit operation is applied separately to all qubits in the object. When used as a :code:`qc` method, qubit specifications are relative to all qubits from the whole QPU. For :code:`qint` methods, qubit specifications are relative only to qubits in the :code:`qint`.

:code:`qc.had(qubit)` (alias :code:`qc.hadamard(qubit)`)
    Applies the Hadamard operation (HAD) to :code:`qubit`, creating an equal superposition when acted on :math:`|0\rangle`, and an equal superposition with a relative phase of :math:`180^{\circ}` when acted on :math:`|1\rangle`. Can also be acted on a qint as :code:`qint.had(qubit)`. When called without a specific qubit address, acts HAD operations on all qubits in the parent object. |br|
    **Example:** :code:`qc.had(0x2)`

:code:`qc.phase(angle, qubit)`
    
:code:`qc.rootnot(qubit)`

:code:`qc.read()`

:code:`qc.not()`

:code:`qc.roty(qubit)`


Multi-qubit operations
----------------------

Many single-qubit operations can be used as multi-qubit operations simply by passing an additional argument specifying an additional condition qubit, whose value determines whether or not the operation is applied to the previously specified target qubit. In many cases, when called as methods on a :code:`qint` object, single qubit operations can also be conditioned by passing a qubit argument. The :code:`qint` that the operation is called on will then be the target qubit for the operation, whilst the other qubit(s) passed as the argument to this method will be the condition qubit(s). For example, :code:`qc.phase(angle, qubit)` is a single-qubit operation, but :code:`qc.phase(angle, target_qubit, condition_qubit)` and :code:`myqint.phase(angle, condition_qubit)` are both multi-qubit operations performing a conditional phase.

:code:`qc.cnot(condition_qubit, target_qubit)`

:code:`qint.exchange(qubit)`

:code:`qc.phase(control_qubit, target_qubit)`
    :code:`qint.cphase(angle)` convenience?

:code:`qc.cswap()`

Primitives
----------

This section contains a reference commands for performing either full-blown primitives (such as the Quantum Fourier Transform), or smaller components of primitives (such as basic arithmetic functions).

:code:`qc.QFT()`

:code:`qc.invQFT()`

:code:`qc.Grover()`

:code:`qc.phase_est(q_in, q_out, cont_u)`
    See code example 8.1

:code:`qc.amplitude_encode()`
    See example 9.3

Arithmetic primitives
^^^^^^^^^^^^^^^^^^^^^

:code:`qint.add(value)`
    Value can be a qint as well as an integer

:code:`qint.subtract(value)`
    Value can be a qint as well as an integer

:code:`qc.addSquared(value)`

Formatting commands
-------------------

:code:`qc.label(label)`

:code:`qc.nop()`

:code:`qc_options.color_by_phase=bool`

:code:`qc_options.book_render=bool`

:code:`qc.print(qint)`

:code:`qc.panel_chart.widgets`

:code:`qc.clearOutput()`

:code:`qc.disableAnimation()`

:code:`qc.disableRecording()`
