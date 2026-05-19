---
title: Prototypes
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Almost everything in JavaScript is built on top of the prototype system.

## Prototypal Inheritance

JavaScript is not class-based (like Java). ES6 introduced class syntax, but under the hood it uses *prototypes*.
Prototypes are a mechanism by which **objects can inherit properties and methods from other objects**.

### The Prototype Chain

Every object has an internal hidden property:

```
[[Prototype]]
```

You can access it using __proto__ (legacy and deprecated), but the recommended way is:

```jsx
Object.getPrototypeOf(obj) 
```

Example:

```jsx
const obj = {name: "Arjit"};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
// This means obj → Object.prototype → null
```

---

## How Inheritance Works

If you try to access a property:

```
obj.toString();
```

JavaScript looks:

1. Inside `obj`
2. Not found → goes to `Object.prototype`
3. Found → the method is returned and executed

This lookup process is called the **prototype chain**. 

This process continues up the chain until null is reached. If not found, JavaScript returns undefined.

---

## Why is this powerful ?

Methods defined on the prototype are shared across all instances, saving memory.

Example:

```jsx
function Product(name, price) {
  this.name = name;
  this.price = price;
}

// Shared method
Product.prototype.getDetails = function() {
  return `${this.name} costs $${this.price}`;
};
```

Here, all products inherit *getDetails()* from *Product*.prototype.

```jsx
// Both objects share the same function in memory
const p1 = new Product("Phone", 500);
const p2 = new Product("Laptop", 1000);
```

Both p1 and p2 share the same getDetails function instead of creating a new copy for each object.