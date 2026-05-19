---
title: Functional Programming Concepts
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Functional programming is a programming style where functions are treated as first-class citizens and emphasis is placed on pure functions, immutability, and composition. It focuses on writing predictable, reusable, and testable code.

In JavaScript, functions are first-class citizens, meaning they can be passed, returned, and stored like any other value.

## Currying

Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, each taking one argument.

```jsx
function multiply(a) {
    return function(b) {
        return a * b;
    };
}

const double = multiply(2); // returns a new function: b => 2 * b
console.log(double(5)); // Outputs: 10

const triple = multiply(3); // returns a new function: b => 3 * b
console.log(triple(5)); // Outputs: 15
```

---

## Higher Order Function

A higher-order function is a function that takes another function as an argument or returns a function as a result.

```jsx
function greet(name) {
    return "Hello, " + name;
}

function processUserInput(callback) {
    let name = "Arjit";
    console.log(callback(name));
}

processUserInput(greet); // Outputs: Hello, Arjit
```

---

## Pure Functions

A pure function:
- Always returns the same output for the same input
- Has no side effects (does not modify external state)

```javascript
function add(a, b) {
  return a + b;
}
```

---

## Immutability

Functional programming avoids modifying existing data. Instead, it creates new data structures.

```javascript
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // original array unchanged
```

---

## Array Methods

These methods are commonly used in functional programming because they do not mutate the original array and return new values.

1. *map()* - Creates a **new array** by applying a function to each element of an existing array

```jsx
const numbers = [1, 2, 3, 4];
const squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16]
```

2. *filter()* - Creates a **new array** with only the elements that satisfy a given condition.

```jsx
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]
```

3. *reduce()* - reduces an array to a **single value** by applying a function to each element.

```jsx
const values = [10, 20, 30];
const total = values.reduce((acc, num) => acc + num, 0);
console.log(total); // 60
```

---

## Composition

Function composition means combining multiple functions to build more complex logic.

```javascript
const add = x => x + 2;
const multiply = x => x * 3;

const result = multiply(add(5)); // 21
```