---
title: Prototypes
meta_title: JavaScript Prototypes & Inheritance | CS Primer
description: Understand JavaScript prototypes, prototype chaining, inheritance, and how objects share methods and properties.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Unlike classical class-based languages (like Java or C++), JavaScript uses a prototypal inheritance model. Lets dive deep into it in this article.

## Prototypal Inheritance

JavaScript uses a prototypal inheritance model, which means **objects can inherit properties and methods from other objects**.

*Note - ES6 class syntax is simply syntactic sugar over this underlying prototype system.*

### The Prototype Chain

Every object has an internal hidden property:

```
[[Prototype]]
```

Every JavaScript object contains a hidden internal link called **[[Prototype]]**, which points to either another object or null.

```jsx
obj.__proto__ // Legacy way of accessing
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

```js
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

// Verification
console.log(p1.getDetails === p2.getDetails); // true (same reference in memory)
```

Both p1 and p2 share the same getDetails function instead of creating a new copy for each object.