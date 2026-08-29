---
title: Javascript Execution Model
meta_title: JavaScript Execution Model Explained | CS Primer
description: Understand the JavaScript execution model including execution context, call stack, memory allocation, and runtime behavior.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---


## Hoisting

A loose definition of hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope during the compilation phase. 

```jsx
console.log(x); // undefined
var x = 5;
```

Above code is equivalent to - 

```jsx
var x; // Hoisted
console.log(x);
x = 5;
```
This is why accessing *x* before the assignment doesn’t throw an error - it's declared but initialized with undefined.
*Note* - let and const are also hoisted, but they remain in *“temporal dead zone”,* and accessing them before leads to *ReferenceError*


__A more technical definition -__ 
_"Hoisting is JavaScript's behavior where variable and function declarations are processed before code execution, allowing them to be accessed earlier in the code."_ JavaScript does not literally move code, it allocates memory for declarations during the creation phase. You would have understood this better had you done compiler series.

---

## Execution Context

Every piece of JavaScript code runs inside an Execution Context. An Execution Context is an environment where JavaScript code is evaluated and executed. Think of it as a workspace where code is executed.

- Variable and functions defined in that scope
- Scope chain (access to variables in outer scopes)
- Value of `this`



__Two types of Execution Context →__

1. Global Execution Context (GEC): created when the script starts.
2. Function Execution Context (FEC): created each time a function is invoked.


__Two Phases inside every context →__

1. Creation Phase: When a context is created (global or function), the engine sets things up like -

    - Memory allocated for variables and functions
    - *var :* hoisted and initialized to `undefined`
    - *let*/*const  :* hoisted but placed in the *Temporal Dead Zone (TDZ)* until assigned
    - *Functions* : the entire function definition is stored in memory (not just a reference)
    - *this :* value of this is determined based on how the function is called (global object in non-strict mode, `undefined` in strict mode, or bound explicitly).

2. Execution Phase: Once setup is done, the engine executes the code line by line:

    - Runs code top‑to‑bottom.
    - Assigns actual values to variables.
    - Invokes functions when called.


**Example**

```jsx
function demo(a) {
  console.log(x); // undefined (var is hoisted, but was initialized with undefined during the creation phase)
  var x = 10;
  let y = 20;
  console.log(a, x, y);
}

demo("Hi");
```

1. Creation Phase (before running):

    - a → parameter allocated
    - x → hoisted, set to undefined
    - y → hoisted, but in TDZ
    - demo function stored in memory

2. Execution Phase (running line by line):

    - console.log(x) → prints undefined
    - x = 10 → assigns value
    - y = 20 → assigns value
    - console.log(a, x, y) → prints "Hi", 10, 20

_Note: Execution contexts are temporary - created when a function runs, destroyed when it finishes_

Execution contexts are managed using the call stack.

---

## Call Stack

JavaScript is single-threaded, meaning it executes one function at a time. It uses a call stack to manage the order in which functions are called and completed.

Rules →

- When a function is called, a new execution context is pushed onto the stack.
- When function finishes, its context is popped off.
- JS engine always runs the context at top of the stack.

**Example:**

```jsx
function greet() {
  console.log("Hello");
}

function sayName(name) {
  greet();
  console.log(name);
}

sayName("Alice");
```

Call Stack flow:

1. Global Execution Context created.
2. *sayName("Alice")* → new FEC pushed.
3. Inside *sayName, greet()* → new FEC pushed.
4. *greet* finishes → popped.
5. *sayName* finishes → popped.
6. Only Global Execution Context remains.

*Note - If too many contexts are added without being removed, it leads to a stack overflow error.*

---

## Event Loop

JavaScript is single-threaded, but it can handle async behavior using the **Event Loop**. The event loop continuously checks if the call stack is empty, and if so, pushes tasks from the queue into the stack for execution.

In brief (we will study this in detail in asynchronous JavaScript):

- Call Stack  ← executes code
- Web APIs    ← handles async work (timers, fetch, etc.)
- Callback Queue (Task Queue) → for timers, events
- Microtask Queue → for promises (higher priority)
- Event Loop  ← decides what runs next
