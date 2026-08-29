---
title: Event Loop & Task Queues in Javascript
meta_title: JavaScript Event Loop & Task Queues | CS Primer
description: Understand the JavaScript event loop, microtasks, macrotasks, callback queue, and asynchronous execution flow.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

In this lesson, we explore how JavaScript handles asynchronous operations. Despite running on a single main thread, JavaScript achieves non-blocking concurrency through its event loop and host environment APIs.

## The Event Loop: JavaScript's Concurrency Engine

The JavaScript engine (e.g., V8) is single-threaded, it executes one operation at a time on its **Call Stack**. It has no built-in timers or networking capabilities.

Asynchronous behavior is powered by the **host runtime environment** (the Browser or Node.js). The engine executes JavaScript code, while the runtime offloads long-running tasks and queues their callbacks. The **Event Loop** acts as the coordinator, monitoring the Call Stack and moving queued callbacks onto it when the stack is clear.

### How it works →

![image.png](attachment:59cc8a56-e414-4f34-bf58-4b2d95e1d8ab:image.png)

- Code executes line by line on the *call stack*.
- Handoff to Host APIs: Asynchronous calls (`setTimeout`, `fetch`, DOM listeners) are handed off to *Web APIs* (in browsers) or *C++/libuv APIs* (in Node.js).
- Queueing Callbacks: When an asynchronous operation completes, its callback is placed into the appropriate queue:
   - Promise handlers go to the *Microtask Queue*.
   - Timers and I/O callbacks go to the *Task Queue (Macrotask Queue)*.
- The *event loop* checks if the call stack is empty, then moves tasks from the queues to the stack for execution, prioritizing microtasks.

> *Key Rule:* In JavaScript, asynchronous does not mean parallel multi-threaded execution; it means deferred callback execution managed by the runtime and event loop.

### Practical Example →

```javascript
console.log("Start");

// Delegated to Web API timer; callback queued in Macrotask Queue
setTimeout(() => {
  console.log("Timeout");
}, 0);

// Resolves immediately; callback queued in Microtask Queue
Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Output: Start, End, Promise, Timeout
```

*Note - In JavaScript, “asynchronous” means deferred execution managed by the event loop, not parallel threads.*

---

## Microtask Queue vs Macrotask Queue

The runtime divides asynchronous callbacks into two distinct queues with strict priority rules:

### Microtask Queue (Higher Priority)

Microtasks execute immediately after the current synchronous script finishes and before control yields to rendering or macrotasks.

*Examples- Promise resolution (then() / catch() / finally()) , queueMicrotask() , MutationObserver callbacks, async/await*

### Macrotask Queue (Lower Priority)

Macrotasks (often simply called the Task Queue) represent discrete units of work scheduled by host APIs.

*Examples: setTimeout, setInterval, setImmediate (Node.js), DOM events (like click, scroll), IO callbacks*

---

## Summary of Execution Order

The event loop processes tasks in a deterministic, repeating cycle called a tick.

1. Run all synchronous code
2. Run all microtasks until the queue is empty (including newly added microtasks)
3. Run one macrotask, then process all microtasks again
4. Repeat from step 2

Example - 

```jsx
console.log("1: Synchronous");

setTimeout(() => {
  console.log("4: Macrotask (Timer)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Microtask (Promise)");
});

console.log("2: Synchronous");

/* --- Output ---
1: Synchronous
2: Synchronous
3: Microtask (Promise)
4: Macrotask (Timer)
*/
```

setTimeout(fn, 0) does not execute immediately—it schedules the callback to run after the current call stack and microtasks are complete.

_Note - If microtasks keep adding more microtasks, macrotasks can be delayed (called microtask starvation)._

_Note 2 - In browsers, rendering (UI updates) typically happens between macrotasks._
