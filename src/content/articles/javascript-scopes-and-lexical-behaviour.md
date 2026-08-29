---
title: Scoping and Lexical Behavior
meta_title: JavaScript Scope & Lexical Environment | CS Primer
description: Learn JavaScript scope, lexical environments, scope chaining, and variable accessibility with practical examples.
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


## Lexical Scope

JavaScript uses lexical scoping (also known as static scoping). This means a function’s access to variables is determined by where the function is physically declared in the source code, not where or when it is invoked.


```javascript
const role = "Admin (Global)";

function manageUser() {
  const role = "Manager (Local)";

  function displayRole() {
    console.log(role);
  }

  return displayRole;
}

const showRole = manageUser();
showRole(); // Logs: "Manager (Local)"
```

- displayRole is physically written inside manageUser().
- Therefore, displayRole's scope is statically bound to manageUser(), regardless of the fact that showRole() is called from the global level.

---

## Lexical Environment & Scope Chain

A lexical environment is an internal structure that stores variables and references to outer scopes, allowing JavaScript to resolve variable access. 

It contains:
- local variables
- reference to the outer lexical environment

### Why is this important?

JavaScript searches for variables in the current scope, then moves outward through parent scopes until it finds the variable or reaches the global scope. This creates the *scope chain*.

### Example:

```jsx
function outer() {
  let x = 10;

  function inner() {
    // x is not in inner's Environment Record;
    // the engine traverses the scope chain to outer's environment to find it.
    console.log(x);
  }

  inner();
}

outer(); // Logs: 10
```

*inner()* does not have x. So it looks at *outer()* scope.

This behavior forms the basis of closures, where a function retains access to variables from its outer scope even after the outer function has finished executing.


> Lexical Scope is the static rulebook decided when you write the code, while the Lexical Environment & Scope Chain is the actual in-memory linked structure the engine creates to follow those rules when the code runs.

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