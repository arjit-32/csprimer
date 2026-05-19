---
title: Events & Error Handling in Nodejs
meta_title: js
description: js
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

Node.js is built around an **event-driven architecture**. Instead of waiting for tasks to finish, Node.js emits events and executes handlers when those events occur.

## Event-Driven Programming in Node.js

In Node.js, many actions trigger *events*. For example:

- A request arrives at a server
- A file finishes loading
- A timer expires
- A connection closes

Rather than blocking execution, Node.js emits events and invokes registered listeners. This allows developers to write non-blocking code that can handle thousands of concurrent operations.

---

## The Events Module

Node provides the built-in `events` module fto work with custom events. At its core is the EventEmitter class, which allows you to define, emit, and listen for events.

**Example: EventEmitter in Action**

```jsx
const EventEmitter = require("events");
const emitter = new EventEmitter(); // Creating an event emitter

// Listening for a event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}`);
});

// Emitting events
emitter.emit("greet", "Arjit");
```

This pattern is widely used in Node.js internals (e.g., streams, HTTP servers) and in user-defined modules.

---

## Error Handling in Node.js

Errors in Node.js can occur synchronously or asynchronously. Handling them properly is crucial to prevent crashes and ensure reliability

Common Error Handling Patterns are:

###  Callbacks → error-first pattern

In traditional Node.js callbacks, the first argument is reserved for errors.

```javascript
fs.readFile("missing.txt", (err, data) => {
  if (err) {
    console.error("File not found");
    return;
  }
  console.log(data);
});
```

### Promises → .catch()

Promises allow chaining and error handling via .catch().

```javascript
fs.promises.readFile("missing.txt", "utf8")
  .then(data => console.log(data))
  .catch(err => console.error(err.message));
```

### Async/Await → try/catch

With async/await, errors are handled using try/catch

```javascript
const fs = require("fs/promises");

async function loadFile() {
  try {
    const data = await fs.readFile("missing.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}
```

---

## Error Events

Some objects in Node.js emit error events. If an error event is emitted without a listener, Node.js will throw the error and crash the process

```javascript
emitter.on("error", (err) => {
  console.error("Emitter error:", err.message);
});
```

This makes it essential to always register error listeners when working with event emitters or other asynchronous objects

---

## Conclusion

Node.js applications thrive on events and asynchronous operations. By mastering the events module and understanding different error handling strategies, you can build applications that are both robust and scalable.
