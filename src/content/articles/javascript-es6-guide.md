---
title: Javascript ES6 Essentials
meta_title: JavaScript ES6 Guide | CS Primer
description: Learn modern JavaScript ES6 features including let, const, arrow functions, promises, modules, and destructuring.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

ES6 (ECMAScript 2015) introduced major improvements to JavaScript, making code more readable, concise, and maintainable.

## Block-Scoped Declarations

let and const were introduced in ES6 to provide block-level scoping, unlike var which is function-scoped.

const prevents reassignment, but objects and arrays declared with const can still be modified.

```jsx
let x = 10;
const y = 20;
// y = 30; ❌ Error: Assignment to constant variable
```

---

## Spread & Rest operator

The same ... syntax is used in two different contexts:

Spread → expands values
Rest → collects values

```jsx
// Spread: Expanding an array
const nums = [1, 2, 3];
const newNums = [...nums, 4, 5]; 
console.log(newNums); // [1, 2, 3, 4, 5]

// Rest: Gathering parameters
function sum(...values) {
  return values.reduce((acc, num) => acc + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

---

## Destructuring

Destructuring allows you to extract values from arrays or objects into variables

```jsx
// Array destructuring
const arr = [1, 2];
const [a, b] = arr;

// Object destructuring
const user = { name: "Arjit", age: 25 };
const { name, age } = user; 
console.log(name, age); // Arjit 25

// Can also rename variables while destructuring
const { name: userName } = user;
```

---

## Arrow Function

Arrow functions do not have their own this. They inherit this from the surrounding scope, unlike regular functions. We will discuss more about it in later articles.

```jsx
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
```

---

## Template & Default Literals

```jsx
// Template Literals
const name = "Arjit";
console.log(`Hello, ${name}!`); // Hello, Arjit!

// Default Parameters
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}
greet(); // Hello, Guest
```

---

## Optional Chaining

Safely access deep nested properties without throwing errors if a property is null or undefined.

```jsx
user?.address?.city
```

---

## Nullish Coalescing

Nullish coalescing operator *(??)* provides a default value when the left-hand side is *null* or *undefined* (but not other falsy values like 0 or "").

```jsx
let count = null ?? 0; // 0

0 || 10   // 10 (because 0 is falsy)
0 ?? 10   // 0  (because it's not null/undefined)
```

---

## JavaScript Modules (import/export)

Modules let you split code into separate files and reuse them, keeping projects clean and organized. ES Modules work natively in browsers using `<script type="module">` and are the default module system in modern JavaScript.

- Named Exports - You can export multiple values from a file
    
    ```jsx
    // math.js
    export const pi = 3.14;
    export function add(a,b) { return a+b; }
    ```
    
    Import them by name:
    
    ```jsx
    import { pi, add } from "./math.js";
    ```
    
- Default Export - Each file can have one default export
    
    ```jsx
    // file.js
    export default function greet() {
      console.log("Hello!");
    }
    ```
    
    Import it without curly braces
    
    ```jsx
    import greet from "./file.js";
    ```

---
