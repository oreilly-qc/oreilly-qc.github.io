.. _javascript-label:

JavaScript Introduction
=======================

.. contents:: Contents

To provide a zero-install experience, QCEngine runs in JavaScript. Consequently some basic knowledge of JavaScript syntax and patterns is very useful for writing QCEngine simulation programs. Here we give a whistle-stop tour of just the most basic ideas in JavaScript that you might want to bear in mind if this is your first time using JavaScript. By no means is this short guide intended to be even remotely exhaustive. A more comprehensive and nuanced introduction can be found in `JavaScript: The Good Parts <https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742>`_. An *extremely* comprehensive and nuanced introduction can be found in `JavaScript: The Definitive Guide <https://www.amazon.com/JavaScript-Definitive-Guide-Activate-Guides/dp/0596805527>`_.

Basic grammar
-------------

To get started with JavaScript for QCEngine there are a few basic syntax gotchas that you should master.

Line termination
^^^^^^^^^^^^^^^^

All statements in JavaScript should be terminated with a semicolon. For example:

.. code-block:: javascript

    2+2;

Variable declaration
^^^^^^^^^^^^^^^^^^^^

Variables are declared in JavaScript using the :code:`var` keyword as follows:

.. code-block:: javascript

    var a = 42;

A variable can be declared uninitialized as follows:

.. code-block:: javascript

    var a;

Note JavaScript is untyped. Most pertinently, this means that variables do not need to have a type declared when they are assigned as above.

Functions
^^^^^^^^^

Functions in JavaScript can be defined with the following syntax:

.. code-block:: javascript

    function my_function(param1, param2) {
        var a = param1 + param2;
        return a;
    }

Comments
^^^^^^^^

Comment lines in JavaScript are designated with a double forwards-slash. For example:

.. code-block:: javascript

    // This is a JavaScript comment
    // It will not be run as code
    var a = 42; // Comments can also occur after code on the same line

Control structures
------------------

Control structures like loops and conditional statements are simple enough in JavaScript. Like functions they use braces to denote code-blocks.

Loops
^^^^^

Although it may look slightly unwieldy at first, the syntax for for-loops in JavaScript is fairly simple. Loops require us to define and manipulate a loop counter (which we denote :code:`i` in the below example).

.. code-block:: javascript

    var i;
    for (i = 0; i < 100; i++) {
        console.log(i);
    }

(The above example also makes use of the JavaScript :code:`console.log()` function, which prints its arguments to the JavaScript console, which can be `accessed in the developer tools of various web-browsers <https://webmasters.stackexchange.com/questions/8525/how-do-i-open-the-javascript-console-in-different-browsers>`_). 

Note that the extent of the loop is defined by three separated statements in the parentheses immediately following the :code:`for` keyword. First we provide any initialization for the loop (here we provide a starting value for the loop counter, :code:`i=0`). Then we provide a condition for when the loop will terminate (here we place a bound on the value of the loop counter, :code:`i < 100`). Then finally we provide any updates that should occur at the end of each iteration of the loop (here, we increase the value of the loop counter by 1 using the incrementation operator, :code:`i++`). The code that is executed during each iteration of the loop is placed within the braces :code:`{` and :code:`}`.

JavaScript also implements while-loops with the following syntax:

.. code-block:: javascript

    var i = 0;
    while (i < 10) {
        console.log(i);
        i++;
    }


Conditionals
^^^^^^^^^^^^

Conditional statements can be implemented in JavaScript with the following syntax:

.. code-block:: javascript
    
    var x = 8;

    if (x == 3) {
        console.log("x is 3");
    } else if (x == 5) {
        console.log("x is 5");
    } else {
        console.log("x is neither 3 nor 5");
    }

Note that we use :code:`==` to test equality between values in the conditions above. There are also a range of other `comparison and logical operations <https://www.w3schools.com/js/js_comparisons.asp>`_ that we can use to build more complex conditions.

Datastructures and tools
------------------------

Quite often we will need to work with conventional data-structures like arrays and strings to aid our interactions with QCEngine

Arrays
^^^^^^

In JavaScript an array can be declared with a literal using square braces and commas. For example:

.. code-block:: javascript

    var my_array = [1, 2, 3, 4];

Elements of an array can be selected by index:

.. code-block:: javascript

    var my_array = [1, 2, 3, 4];

    console.log(my_array[0]); // Selects the first array element - 1 in this instance

The length of an array can be obtained using the :code:`length` method of an array:

.. code-block:: javascript

    var my_array = [1, 2, 3, 4];

    console.log(my_array.length); // Returns 4

Looping over array elements is possible by incrementing a counter through the length of an array:

.. code-block:: javascript

    var my_array = [10, 20, 30, 40];
    var i;

    for (i=0; i < my_array.length; i++) {
        console.log(my_array[i]);
    }

New elements can be appended to an array using the :code:`array.push` method as follows:

.. code-block:: javascript

    var my_array = [10, 20, 30, 40];

    my_array.push(50); // my_array now contains [10, 20, 30, 40, 50]

Strings
^^^^^^^

Strings can be defined in JavaScript using double quotes to produce string literals. For example:

.. code-block:: javascript

    var my_string = "This is a string";

Similar to arrays, the length of a string can be found using the :code:`String.length` property.

Strings can be combined using the addition operation. This allows us to perform rudimentary string interpolation:

.. code-block:: javascript

    var a = 5;
    my_string = "This value of x is " + a + ", so now you know!";
    console.log(my_string);

Strings in JavaScript also `implement many methods <https://www.w3schools.com/jsref/jsref_obj_string.asp>`_ that can be useful for manipulating them.

Binary operations
^^^^^^^^^^^^^^^^^

JavaScript provides a number of tools for manipulating binary values. These 'bitwise operators' can be especially useful to us as we work with references to qubits.

:code:`&` - *Bitwise AND*. Binary operator. Performs the logical and between each bit in the two arguments
**Example:** :code:`a & b`

:code:`|` - *Bitwise OR*. Binary operator. Performs the logical or between each bit in the two arguments
**Example:** :code:`a | b`

:code:`^` - *Bitwise XOR*. Binary operator. Performs the logical exclusive or between each bit in the two arguments
**Example:** :code:`a ^ b`

:code:`~` - *Bitwise NOT*. Unary operator. Performs the logical not on bit in its arguments
**Example:** :code:`a ^ b`

:code:`<<` - *Left shift*. Binary operator. Shifts the bits in a binary representation of a number to the left by a specified number of bits. :code:`x<<n` shifts the bits representing a number :code:`x` a number :code:`n` bits to the left, adding :code:`0` bits on the right as bits are removed from the left. Note that this is equivalent to multiplying the number :code:`x` by :code:`2^n`.
**Example:** :code:`5<<2`

:code:`>>` - *Right shift*. Binary operator. Shifts the bits in a binary representation of a number to the right by a specified number of bits. :code:`x>>n` shifts the bits representing a number :code:`x` a number :code:`n` bits to the right, adding either :code:`0` or :code:`1` as bits to the left as bits are removed from the right. The choice of whether :code:`0` or :code:`1` values are added on the left depends on the sign of the number :code:`x`, and is chosen to maintain its sign in a twos-complement representation. Note that this is equivalent to dividing the number :code:`x` by :code:`2^n`.
**Example:** :code:`5>>2`

Mathematical functions
^^^^^^^^^^^^^^^^^^^^^^

Many useful mathematical functions and constants are provided through the JavaScript Math object. Below are some useful examples:

.. code-block:: javascript

    Math.PI // Value of pi
    Math.pow(x,y) // Calculates x^y
    Math.sqrt(x) // Takes the square root of value x
    Math.random() // Generates a random number between 0 and 1
    Math.min(x,y,z) // Returns the minimum of arguments x, y, z
    Math.max(x,y,z) // Returns the maximum of arguments x, y, z
    Math.cos(x) // Returns the cosine of an angle x (assumed to be specified in radians)
    Math.sin(x) // Returns the sine of an angle x (assumed to be specified in radians)
    Math.log(x) // Returns natural logarithm of x
    Math.log2(x) // Returns logarithm base 2 of x
    Math.log10(x) // Returns logarithm base 10 of x
    Math.round(x) // Rounds the value x
    Math.floor(x) // Takes the floor of value x
    Math.ceil(x) // Takes the ceiling of value x
