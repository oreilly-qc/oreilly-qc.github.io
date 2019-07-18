.. _quickstart-label:

QCEngine quickstart
===================

Installation
------------

Assuming you're reading this documentation through a web-browser, no installation is required to use QCEngine. Simply visit `the QCEngine website <https://oreilly-qc.github.io/>`_ to immediately start using it's JavaScript interface.

The QCengine UI
---------------

Before detailing how to start writing problems, it's worth describing the different UI elements on the QCEngine webpage which allow you to control simulations and the numerous visualizations that it offers. When using the QCEngine UI, three windows are displayed:


The code window
^^^^^^^^^^^^^^^
This is used to enter and run code. JavaScript entered in the text-box will be syntax-highlighted. The window can be resized using the handle on the bottom right .

.. image:: _static/ui_codewindow.png

* The **Run Program** button executes the code currently in the code window and will generate visualizations of the results in the other windows.
* The **Examples dropdown menu** (set to `Ex 2-1: Random qubit` in the above image) can be used to populate the code window with existing code samples from book, referred to by their Example number.
  * The **Engine dropdown menu** (set to `QCEngine` in the above image) can be used to change the simulator engine language for the pre-existing book code-samples. Many code samples are also provided in the `Qiskit <https://qiskit.org/>`_ and `OpenQASM <https://github.com/Qiskit/openqasm>`_ languages.
* The **magnifier** buttons can be used to alter the text-size of code in the code window.

The circuit window
^^^^^^^^^^^^^^^^^^
After the **Run Program** button has been clicked in the code window, the *circuit window* will display a circuit diagram for the code (assuming it is free from syntax errors).

.. image:: _static/ui_circwindow.png

* The **magnifier** buttons can be used to resize the circuit diagram within the circuit window. Using **ctrl-scroll** (holding `ctrl` whilst using a mouse/trackpad scroll gesture) also zooms in/out of the circuit diagram. 

* The circuit window interacts closely with the *circle notation window* (see below). When the cursor is hovered over a circuit diagram, a vertical orange bar appears to show which point in the circuit is currently being visualized in the *circle notation window* (defaults to the end of the circuit). Clicking on another part of the circuit will refresh the *circle notation window* to show a visualization of the QPU's state at this new point in the circuit (and the vertical orange marker line in the circuit will move accordingly). This interface can be used to 'step through' a QPU circuit.

The circle notation window
^^^^^^^^^^^^^^^^^^^^^^^^^^

This shows a visualization of the state of the QPU at a given point within the code. How to interpret circle notation is explained in detail in Chapter 2 of `Programming Quantum Computers <https://www.amazon.com/Programming-Quantum-Computers-Essential-Algorithms/dp/1492039683>`_.

.. image:: _static/ui_circwindow.png

* The **magnifier** buttons can be used to resize the circle notation shown within the circle notation window. Using **ctrl-scroll** (holding `ctrl` whilst using a mouse/trackpad scroll gesture) also zooms in/out of the circle notation. 

* The remaining **visualization assistance** buttons in the header of the circle notation window provide a number of options for making circle notation more easily visible (especially useful for large QPU registers visualized by large numbers of circles). These include adding 'rotation needles' for more prominently showing the rotation of circles, coloring the circles dependent on their rotation, and scaling the filled area of the circles (equivalent to a global phase - see page 20 of `Programming Quantum Computers <https://www.amazon.com/Programming-Quantum-Computers-Essential-Algorithms/dp/1492039683>`_).

* The point in the circuit at which a QPU's state is represented in the circle notation window can be altered by interacting with the *circuit window* (see above).


The output window
^^^^^^^^^^^^^^^^^

The output window displays output printed from a QCEngine program using the `qc.print()` function. JavaScript output (for example, printed using `console.log()` will still appear in your web-browsers developer JS console as normal.

.. image:: _static/ui_outputwindow.png

* The **magnifier** buttons can be used to resize the text-size used in the output window. 

* The **eraser** button clears any current output in the output window.


Labeling qubits
----------------



The :code:`qc` object
---------------------

Using :code:`qint`s
--------------------
