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

:code:`qc.not(qubit)`
    Applies the :code:`NOT` operation to a qubit specified by :code:`qubit`. This flips the :math:`|0\rangle` and :code:`|1\rangle` values. Can also be applied to a qint as :code:`myqint.not(qubit)`.
    **Example:** :code:`qc.not(0x2)`

:code:`qc.had(qubit)` (alias :code:`qc.hadamard(qubit)`)
    Applies the Hadamard operation (HAD) to :code:`qubit`, creating an equal superposition when acted on :math:`|0\rangle`, and an equal superposition with a relative phase of :math:`180^{\circ}` when acted on :math:`|1\rangle`. Can also be acted on a qint as :code:`myqint.had(qubit)`. When called without a specific qubit address, acts HAD operations on all qubits in the parent object. |br|
    **Example:** :code:`qc.had(0x2)`

:code:`qc.phase(angle, qubit)`
    Applies the single-qubit :code:`PHASE` operation to a qubit, which applies a rotation to the relative phase of a qubit. Takes two arguments :code:`angle` (first argument) and :code:`qubit` (second argument). The :code:`angle` argument is the rotation angle to apply (in circle notation, the angle through which the :math:`|1\rangle` circle is rotated). This is equivalent to a :code:`ROTZ` operation. The :code:`qubit` argument references one or more qubits to apply the operation to. Can also be acted on a qint as :code:`myqint.phase(angle qubit)`. |br|
    **Example:** :code:`qc.phase(45, 0x4)`

:code:`qc.read(qubit)`
    Applies the :code:`READ` operation to a qubit specified with :code:`qubit`, producing a conventional :code:`0` or :code:`1` outcome with probabilities determined by the qubits state amplitudes. Following :code:`qc.read(qubit)`, any superposition within the qubit is destroyed. The :code:`0`/:code:`1` result of :code:`qc.read(qubit)` can be assigned to a JavaScript variable for future use. Can also be acted on a qint as :code:`myqint.read(qubit)`.
    **Example:** :code:`var result = qc.read(0x8)`

:code:`qc.rootnot(qubit)`
    Applies the square root of the :code:`NOT` operation to a qubit, such that applying the operation twice is equivalent to :code:`qc.not(qubit)`. Can also be acted on a qint as :code:`myqint.rootnot(qubit)`. |br|
    **Example:** :code:`qc.rootnot(qubit)`

:code:`qc.roty(angle, qubit)`
    Applies a rotation around the :math:`y` axis of the `Bloch sphere <https://en.wikipedia.org/wiki/Bloch_sphere>`_. Takes two arguments :code:`angle` (first argument) and :code:`qubit` (second argument). The :code:`angle` argument is the rotation angle to apply, and :code:`qubit` is the qubit to apply the rotation to.  Can also be applied to a qint as :code:`myqint.roty(angle, qubit)`.
    **Example:** :code:`qc.roty(45, 0x4)`


Multi-qubit operations
----------------------

Many single-qubit operations can be used as multi-qubit operations simply by passing an additional argument specifying an additional condition qubit, whose value determines whether or not the operation is applied to the previously specified target qubit. In many cases, when called as methods on a :code:`qint` object, single qubit operations can also be conditioned by passing a qubit argument. The :code:`qint` that the operation is called on will then be the target qubit for the operation, whilst the other qubit(s) passed as the argument to this method will be the condition qubit(s). For example, :code:`qc.phase(angle, qubit)` is a single-qubit operation, but :code:`qc.phase(angle, target_qubit, condition_qubit)` and :code:`myqint.phase(angle, condition_qubit)` are both multi-qubit operations performing a conditional phase.

:code:`qc.cnot(target_qubit, condition_qubit)`
    Applies the :code:`CNOT` operation between two qubits. Takes two arguments :code:`target_qubit` and :code:`condition_qubit`. The second argument (:code:`condition_qubit`) specifies the qubit whose value will determine whether or not a :code:`NOT` operation is applied to the :code:`target_qubit` specified in the first argument. 
    **Example:** :code:`qc.cnot(0x4, 0x2)`

:code:`qc.exchange(qubits)`
    Exchanges a number of qubits specified by the :code:`qubits` argument. The qubits to be exchanged can be specified in binary, hexadecimal or decimal. For example, the middle two of four qubits can be exchanged using either :code:`qc.exchange(0b0110)`, :code:`qc.exchange(0x2|0x4)` or :code:`qc.exchange(6)`. Can also be applied to a qint as :code:`myqint.exchange(qubits)`.
    **Example:** :code:`qc.exchange(0x2|0x4)`

:code:`qc.phase(angle, control_qubit, target_qubit)`
    Applies a :code:`PHASE` operation with angle :code:`angle` on the qubit specified by the :code:`target_qubit` argument dependent on the value of the qubit specified by the :code:`control_qubit` argument. Note that this is the same method as the single qubit :code:`qc.phase(angle, qubit)`, only called with an additional :code:`target_qubit` argument. Can also be applied to a qint as :code:`myqint.phase(angle, control_qubit, target_qubit)`.
    **Example:** :code:`qc.phase(45, 0x2, 0x4)`

:code:`qc.swap(qubits)`
    Swaps the qubits specified by the :code:`qubits` argument. Can also be applied to a qint as :code:`myqint.swap(qubits)`.
    **Example:** :code:`qc.swap(0x2|0x4)`

:code:`qc.swap(target_qubits, control_qubit)`
    This alternative signature for the :code:`qc.swap()` method allows the qubits specified by the :code:`target_qubits` first parameter to be swapped conditional on the value of the :code:`control_qubit` specified in the second parameter. Can also be applied to a qint as :code:`myqint.swap(target_qubits, control_qubit)`.
    **Example:** :code:`qc.swap(0x2|0x4, 0x8)`


Primitives
----------

This section contains a reference for commands that perform either full-blown primitives (such as the Quantum Fourier Transform), or smaller components of primitives (such as basic arithmetic functions).

:code:`qc.QFT(qubits)`
    Applies the Quantum Fourier Transform (QFT) circuit to all qubits specified by the :code:`qubits` parameter. Can also be applied to a qint as :code:`myqint.QFT(qubits)`.
    **Example:** :code:`qc.QFT(0b1110)`

:code:`qc.invQFT(qubits)`
    Applies the inverse Quantum Fourier Transform circuit to all qubits specified by the :code:`qubits` parameter. Can also be applied to a qint as :code:`myqint.invQFT(qubits)`.
    **Example:** :code:`qc.invQFT(0b1110)`

:code:`qc.Grover(qubits)`
    Applies a Grover iteration to the qubits specified in the :code:`qubits` parameter. In `Programming Quantum Computers <https://www.amazon.com/Programming-Quantum-Computers-Essential-Algorithms/dp/1492039683>`_ this is referred to as the :code:`MIRROR` operation (see page 108). Can also be applied to a qint as :code:`myqint.Grover(qubits)`.
    **Example:** :code:`qc.Grover(0x2|0x4|0x8)`

:code:`qc.phase_est(q_in, q_out, cont_u)`
    Applies the phase estimation primitive. Takes two qint objects for its input arguments :code:`q_in` and :code:`q_out`. The first argument :code:`q_in` should reference a qint object containing the state for which the corresponding eigenphase is desired (this can either be an eigenstate or a superposition of eigenstates). The second argument :code:`q_out` should provide a qint object (with qubits initialized in the :math:`|0\rangle` state) that will be used to return a binary representation of the eigenphase. The number of qubits in :code:`q_out` determines the precision with which the eigenphase can be returned. The :code:`qc.phase_est()` method also takes a third argument :code:`cont_u`, which should be a reference to a JavaScript function that returns a controlled implementation of the operation whose eigenphases are to be determined. Can also be applied to a qint as :code:`myqint.phase_est(q_in, q_out, cont_u)`.
    **Example:** :code:`qc.phase_est(my_input_qint, my_output_qint, cont_u_fn)`
    .. See code example 8.1

:code:`qc.amplitude_encode(vector, myqint)`
    Applies the amplitude encoding algorithm for representing a JavaScript array of values (specified in the first parameter, :code:`vector`) in the amplitudes of the qubits contained in a qint object (specified in the second parameter, :code:`myqint`). Note that vectors passed to this method should be *normalized* in order to be faithfully represented in state amplitudes.
    **Example:** :code:`qc.amplitude_encode([2,3,4,1], myqint)`
    .. See example 9.3

Arithmetic primitives
^^^^^^^^^^^^^^^^^^^^^

:code:`qint.add(value)`
    Adds an integer specified in the :code:`value` parameter to the value represented in binary within a qint. Instead of an integer, the :code:`value` parameter can be passed a reference to another qint object which may encode a superposition of integer values. In this way :code:`qc.add()` can perform additions between QPU registers in superposition.
    **Example:** :code:`myqint.add(5)`
    **Example:** :code:`myqint.add(myotherqint)`

:code:`qint.subtract(value)`
    Subtracts an integer specified in the :code:`value` parameter to the value represented in binary within a qint. Instead of an integer, the :code:`value` parameter can be passed a reference to another qint object which may encode a superposition of integer values. In this way :code:`qc.add()` can perform subtractions between QPU registers in superposition.
    **Example:** :code:`myqint.subtract(5)`
    **Example:** :code:`myqint.subtract(myotherqint)`

:code:`qc.addSquared(value)`
    Squares and then adds an integer specified in the :code:`value` parameter to the value represented in binary within a qint. Instead of an integer, the :code:`value` parameter can be passed a reference to another qint object which may encode a superposition of integer values. In this way :code:`qc.add()` can perform the addSquared operation between QPU registers in superposition.
    **Example:** :code:`myqint.addSquared(5)`
    **Example:** :code:`myqint.addSquared(myotherqint)`


Formatting commands
-------------------

:code:`qc.print(qint)`
    This command can be used to print values to the QCEngine UI *output window*. One common usage would be to print the output of a :code:`qc.read()` operation as shown in the below example. Note consecutive calls to :code:`qc.print()` will not automatically occur on new lines in the *output window*. You can force new lines yourself using :code:`qc.print("\n")`.
    **Example:** :code:`qc.print(qc.read(0x2))`

:code:`qc.label(label)`
    Can be used to produce 'code labels' which group operations together in the circuit diagram shown in the QCEngine UI *circuit window* under a label specified by a string passed to the :code:`label` parameter. A call to :code:`qc.label(label)` specifies the point in the code where the code label with name :code:`label` should begin. A second empty call to the method, :code:`qc.label("")` declares where the labelled section of the circuit should end.
    **Example:** :code:`qc.label("My label name")`

:code:`qc.nop()`
    Used to insert space in the QCEngine UI *circuit window*. Useful for spacing out operations in the circuit diagram to increase readability.
    **Example:** :code:`qc.nop()`

:code:`qc_options.color_by_phase=bool`
    Setting this attribute of the :code:`qc_options` object to :code:`true` will color the filled areas in the circle notation shown in the QCEngine UI *circle window* according to their relative rotations. This increases visibility in differences in phases in the circle notation for QPUs containing large numbers of qubits. Note that the same effect can be achieved using the buttons in the *circle window* header.
    **Example:** :code:`qc_options.color_by_phase=true`

:code:`qc_options.book_render=bool`
    Setting this attribute of the :code:`qc_options` object to :code:`true` will use bold needles with small circles at their tips to represent the relative rotations of circles in the QCEngine UI *circle window*. This increases visibility in differences in phases in the circle notation for QPUs containing large numbers of qubits. Note that the same effect can be achieved using the buttons in the *circle window* header.
    **Example:** :code:`qc_options.book_render=true`

:code:`qc.panel_chart.widgets`

:code:`qc.clearOutput()`

:code:`qc.disableAnimation()`

:code:`qc.disableRecording()`
