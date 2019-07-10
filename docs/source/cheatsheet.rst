.. _cheatsheet-label:

.. |br| raw:: html

   <br />

Cheatsheet
==========

.. contents:: Contents
   :local:

This page gives a summary of essential QCEngine commands. For more detail on how to combine these commands into full quantum programs see the :ref:`quickstart <quickstart-label>` section.


Working with qubits
-----------------

:code:`qc.reset(num_qubits)`
    Reset the QPU and initialize it with :code:`num_qubits` qubits. |br|
    **Example:** :code:`qc.reset(4)`

:code:`qc.write(val, qubit)`
    Write the integer value :code:`val` in binary to the qubit at location :code:`qubit`. If no :code:`qubit` argument is passed, then write the value using all qubits in the QPU if called as a method on :code:`qc` or in the QInt if called as a method on a :code:`qint` object. |br|
    **Example:** :code:`qc.write(2)`

:code:`qint.new(num_qubits, qint_label)`
    Create a QInt with the first :code:`num_qubits` free in the QPU and label it with the string :code:`qint_label` in circuit diagrams. QInt's provide a way to group qubits together and act on them in these groups.|br|
    **Example:** :code:`qint.new(2, 'myqint')`

:code:`qc.discard()`

:code:`qint.bits()`

:code:`qint.peekProbability(value)`

:code:`qint.numBits`

:code:`qint.reverseBits()`

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
^^^^^^^^^^^^^^^^^^^^

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
