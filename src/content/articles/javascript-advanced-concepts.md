---
title: Advanced JS Concepts
meta_title: Advanced JavaScript Concepts | CS Primer
description: Master advanced JavaScript concepts including hoisting, currying, memoization, deep cloning, and design patterns.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

This chapter covers deeper JavaScript features that power many built-in behaviors, from iteration to memory management.

## Symbols

A Symbol is a unique primitive value, often used as an object property key to avoid name collisions. Every *Symbol()* call creates a completely unique identifier. Even if two symbols have the same description, they are always different.

```jsx
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b); // false (unique!)
```

Symbol properties are not included in common enumeration methods like `for...in` or `Object.keys()`, but they can still be accessed using:

```javascript
Object.getOwnPropertySymbols(obj);
```

```jsx
const id = Symbol("id");

const user = {
  name: "Arjit",
  [id]: 123
};

console.log(Object.keys(user)); // ["name"]
```

---

**Built-in Symbols**

JavaScript defines built-in symbols (like `Symbol.iterator`), which customize how objects behave. This powers iteration (next section)

---

## Custom Iterators

Iterators define how an object produces values one at a time. By implementing the *Symbol.iterator* method, you can make any object iterable with *for...of.*

`for...of` calls `Symbol.iterator` to get an iterator, then repeatedly calls .next() until { done: true } is returned.

```javascript
const iterObj = {
  nums: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
          if (i < this.nums.length) {
            return { value: this.nums[i++], done: false };
          } else {
            return { done: true };
          }
        })
      };
    }
};

for (const n of iterObj) console.log(n);
```

---

## Generators (Advanced Iterators)

Generators are special functions that can pause and resume execution, producing values one at a time. They’re useful for asynchronous flows, infinite sequences, or data pipelines.

```jsx
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

for (let n of counter()) {
  console.log(n);
}
```

Each `yield` pauses execution and returns a value, resuming from the same point on the next call.

---

## Maps and WeakMaps

- Map: Stores key-value pairs where keys can be any type.
- WeakMap: Similar, but keys must be objects and are held weakly (eligible for garbage collection if no other references exist).

```javascript
const map = new Map();
map.set("name", "Arjit");
console.log(map.get("name")); // Arjit

const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "data");
obj = null; // key becomes unreachable → GC can reclaim
```

_Note - WeakMaps are often used for private data storage tied to object lifetimes._

---

## Sets and WeakSets

- Set: Stores unique values of any type.
- WeakSet: Stores objects weakly, allowing garbage collection when no other references exist.

```javascript
const set = new Set([1, 2, 2, 3]);
console.log(set); // Set {1, 2, 3}

const weakSet = new WeakSet();
let obj = {};
weakSet.add(obj);
obj = null; // object eligible for GC
```

---

## Garbage Collection (Memory)

JavaScript uses automatic garbage collection. JavaScript engine (e.g., V8 in Chrome/Node.js) decides when memory is no longer needed and reclaims it.

Key Idea:

If a value is no longer reachable from the root (global scope or active execution contexts), it becomes eligible for garbage collection.

```jsx
let obj = {a:1};
obj = null; // eligible for GC
```

- Maps/Sets hold strong references → values stay in memory until explicitly removed.
- WeakMaps/WeakSets hold weak references → values are automatically cleared when objects are unreachable.

This makes WeakMaps/WeakSets useful for memory-sensitive scenarios like caching or tracking metadata without preventing garbage collection.
