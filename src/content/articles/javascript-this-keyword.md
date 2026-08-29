---
title: this keyword 
meta_title: JavaScript this Keyword Explained | CS Primer
description: Learn how the JavaScript this keyword works in functions, objects, classes, arrow functions, and event handlers.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

this is one of the most confusing parts of JavaScript because its value is determined dynamically at runtime.

## Objects and this

An object is a collection of **key-value pairs**.

```jsx
const user = {
  name: "Arjit",
  age: 22,
  greet() {
    console.log(this.name);  
  }
};

user.greet(); // user.greet() → caller is user So this = user

```

---

## this keyword

The *this* keyword refers to the object that is calling the function. It's value is determined at call time, not at definition time (except for arrow functions, which do not have their own this they use lexical this).

- Global Context: *this* is window (browser) or global(Node.js).
- Object Method: *this* is the object calling the method.
- Arrow functions: *this* is inherited from the lexical scope (i.e., surrounding context where they were defined)

_Note - In strict mode, if a function is called without an object, this is undefined instead of the global object._

```jsx
const person = {
    name: "Arjit",
    greet() {
        console.log(this.name); // this refers to person
    },
    greet2: ()=>{ console.log(this.name) } // this refers to outer scope (window or global)
};
person.greet(); // "Arjit" 
person.greet.call({ name: "Sara" }); // "Sara" -> this is manually set to a new object
person.greet2(); // undefined 
// in person.greet2()
// this inside greet2 refers to the outer scope, not the object.
// In browsers, this usually points to window, so this.name is undefined.
```

---

## Losing `this`

When a function is called without an object reference, this defaults to the global object (or undefined in strict mode). Extracting methods from objects often causes this loss of context.

```jsx
const user = {
  name: "Arjit",
  greet() {
    console.log(this.name);
  }
};

const fn = user.greet;
fn(); // ❌ undefined (or window/global) 
```

Here, fn is just a plain function reference, so it no longer knows about user. Check how to fix this in next section.


---

## Fixing `this` (call, apply, bind)

Both call and apply immediately invoke the function with a specified this. bind returns a new function with permanently bound this, without executing it immediately.

### call()

```jsx
fn.call(user);// Arjit
```

### apply()

Same as call, but arguments are passed as array.

```jsx
fn.apply(user);// Arjit
```


### bind()

```jsx
const boundFn=fn.bind(user);
boundFn();// Arjit
```
