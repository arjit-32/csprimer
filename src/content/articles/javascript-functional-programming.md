---
title: Functional Programming Concepts
meta_title: Functional Programming in JavaScript | CS Primer
description: Explore functional programming concepts in JavaScript including pure functions, immutability, higher-order functions, and composition.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Functional programming is a programming style where functions are treated as first-class citizens and emphasis is placed on pure functions, immutability, and composition. It focuses on writing predictable, reusable, and testable code.

In JavaScript, functions are first-class citizens, meaning they can be passed, returned, and stored like any other value.

## Currying

Currying is a functional programming technique where a function with multiple arguments is transformed into a chain of nesting functions, each taking a single argument.

Instead of evaluating *f(a, b, c)* all at once, currying breaks it down into *f(a)(b)(c)*

```jsx
// Curried function: Takes argument `a` and returns a new inner function
function multiply(a) {
    // Inner function: Closes over `a` via closure and accepts argument `b`
    return function(b) {
        return a * b;
    };
}

// Arrow function equivalent (shorthand):
// const multiply = (a) => (b) => a * b;

const double = multiply(2); // returns a new function: b => 2 * b
console.log(double(5)); // Outputs: 10

const triple = multiply(3); // returns a new function: b => 3 * b
console.log(triple(5)); // Outputs: 15

// Direct chaining invocation (when passing all arguments at once):
console.log(multiply(4)(5)); // Output: 20
```

### Real-world Usage

```jsx
// Curried base function
const applyDiscount = (rate) => (price) => price - price * rate;

// Step 1: Pre-configure specialized discount functions
const blackFridayDiscount = applyDiscount(0.30); // 30% off
const clearanceDiscount   = applyDiscount(0.50); // 50% off

const cartPrices = [100, 200, 400];

// ✅ Direct: No wrapper needed because `blackFridayDiscount` expects just (price)
const discountedCart = cartPrices.map(blackFridayDiscount);

console.log(discountedCart); // [70, 140, 280]
```

---

## Higher Order Function

A higher-order function is a function that takes another function as an argument or returns a function as a result.

```jsx
// 1. Regular function (the "Callback"):
// Takes a string and returns a greeting string.
function greet(name) {
    return "Hello, " + name;
}

// 2. Higher-Order Function (HOF):
// It qualifies as an HOF because it accepts another function as a parameter (`callback`).
function processUserInput(callback) {
    let name = "Arjit";

    // Invokes the callback function, passing `name` to it, and logs the result.
    console.log(callback(name));
}

// 3. Execution:
// Pass `greet` by reference (WITHOUT parentheses `()`) into `processUserInput`.
processUserInput(greet); // Outputs: Hello, Arjit
```

---

## Pure Functions

A function is called pure if it satisfies two core criteria:

- Deterministic: Given the same inputs, it will always return the exact same output.
- Zero Side Effects: It does not read from or mutate anything outside its own local scope (no modifying external variables, no API calls, no DOM updates, and no I/O operations).

```javascript
// Output depends strictly on parameters a and b
// No external state is read or changed.
function add(a, b) {
  return a + b;
}

add(2, 3); // Always 5
```

Pure functions are used for core business logic—like calculating prices, formatting API data, and validating forms - because they are 100% predictable, easy to test, and never accidentally break outside state.

---

## Immutability

Functional programming avoids modifying existing data. Instead, it creates new data structures.

```javascript
const list = [1, 2, 3];

// Modifies list directly
list.push(4);  

// list remains unchanged
const newList = [...list, 4];              
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

## Composition and Piping

Both Composition and Piping combine small, single-purpose functions into a step-by-step assembly line: the output of one function becomes the input of the next.

The only difference is the direction data flows.

### Composition (Right-to-Left)

Evaluates from the inside out (traditional math notation: $f(g(x))$).

```javascript
const add2 = (x) => x + 2;
const multiplyBy3 = (x) => x * 3;

// Execution order: add2 runs FIRST, multiplyBy3 runs SECOND
const result = multiplyBy3(add2(5));
```

`Note - The Problem: As you add more steps, reading inside-out gets messy: wrap(format(sanitize(trim(input))))`


### Piping (Modern Approach)

Piping solves the readability issue by running functions in natural reading order (left to right / top to bottom).

```javascript
// A simple pipe utility using Array.reduce
const pipe = (...fns) => (initialValue) =>
  fns.reduce((value, fn) => fn(value), initialValue);

// Single-purpose steps
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const toKebabCase = (str) => str.replaceAll(" ", "-");
const addPrefix = (str) => `post-${str}`;

// ✅ Clear, readable data pipeline
const createSlug = pipe(
  trim,
  toLowerCase,
  toKebabCase,
  addPrefix
);

createSlug("  Hello World from Functional JS  ");
// Output: "post-hello-world-from-functional-js"
```