---
title: Scoping and Lexical Behavior
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

In JavaScript, scope defines where variables live and how they’re accessed, while lexical behavior explains why functions remember the environment they were written in. Together, they form the foundation for closures and variable visibility.

## Scope and Variable Behavior

Scope determines where a variable can be accessed during program execution. It defines the visibility and lifetime of variables. Scope is determined at write-time (lexical), while execution context is created at runtime.

The three types are:
1. Global Scope - Variables declared outside functions are accessible everywhere.
2. Function Scope - Variables declared inside a function are accessible only within that function. *var* is function-scoped, while *let* and *const* are block-scoped.
3. Block Scope - Variables declared using *let* or *const* inside *{}* are accessible only within that block. *var* does not respect block scope.

```jsx
// Global Scope: Accessible everywhere
let globalVar = "I am global";

function testFunction() {
    // Function Scope: Only accessible within this function
    var functionVar = "I am inside a function";
    
    if (true) {
        // Block Scope: Only accessible inside this block
        let blockVar = "I am inside a block";
        console.log(blockVar); // ✅ Works
    }

    console.log(functionVar); // ✅ Works
    // console.log(blockVar); // ❌ Error: blockVar is not accessible here
}

console.log(globalVar); // ✅ Works
// console.log(functionVar); // ❌ Error: functionVar is not accessible outside the function

testFunction();
```

---

## Lexical Environment & Scope Chain

A lexical environment is an internal structure that stores variables and references to outer scopes, allowing JavaScript to resolve variable access. 

It contains:
- local variables
- reference to the outer lexical environment

### Why is this important?

JavaScript searches for variables in the current scope, then moves outward through parent scopes until it finds the variable or reaches the global scope. This creates the **scope chain**.

### Example:

```jsx
function outer() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  inner();
}
outer();
```

*inner()* does not have x. So it looks at *outer()* scope.

This behavior forms the basis of closures, where a function retains access to variables from its outer scope even after the outer function has finished executing.

---

## Lexical Scope

We've seen how JavaScript builds lexical environments and uses the scope chain to resolve variables. Reiterating this: JavaScript uses lexical scoping, meaning a function's scope is determined by *where it is written, not where it is called*.


```javascript
function outer() {
  let x = 10;

  return function inner() {
    console.log(x);
  };
}

const fn = outer();
fn(); // still prints 10
```

Even after outer() finishes execution, inner() still remembers x.

---

## Shadowing

Inner variables can shadow outer variables with the same name. Shadowing doesn't overwrite the outer variable; it just hides it within the inner scope.

```javascript
let x = 10;

function test() {
  let x = 20;
  console.log(x); // 20
}
```