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

In this lesson, we learn about the core engine of JavaScript that makes asynchronous operations possible. The event loop ensures JavaScript remains non-blocking despite being single-threaded.

## The Event Loop: JavaScript’s Asynchronous Engine

Javascript is single threaded *(executes one task at a time on its main thread)*. However it achieves non-blocking behavior through the event loop, allowing it to handle asynchronous tasks like API calls or timers without freezing the application.

The event loop does not execute asynchronous operations itself. Instead, it coordinates between the call stack and the task queues, while the runtime environment (browser or Node.js) handles async operations.

### How it works →

![image.png](attachment:59cc8a56-e414-4f34-bf58-4b2d95e1d8ab:image.png)

- Synchronous code runs on the **call stack**.
- Async tasks (e.g., setTimeout, fetch) are sent to **Web APIs**.
- When the Web API completes, callbacks from timers/events go to the task queue **(macrotask queue)**, while promise callbacks go to the **microtask queue**.
- The **event loop** checks if the call stack is empty, then moves tasks from the queues to the stack for execution, prioritizing microtasks.

_Note - Web APIs (or Node.js APIs) are provided by the runtime environment, not JavaScript itself_

### Example →

```jsx
console.log("Start");
setTimeout(() => console.log("Timeout"), 0); // Goes to task queue
Promise.resolve().then(() => console.log("Promise")); // Goes to microtask queue ( more priority )
console.log("End");
// Output: Start, End, Promise, Timeout
```

*Note - In JavaScript, “asynchronous” means deferred execution managed by the event loop, not parallel threads.*

---

## Microtask Queue vs Macrotask Queue

Let’s zoom in on two important queues that control when your code runs:

1. **Microtask Queue** (Higher Priority)

These tasks are executed immediately after the current synchronous code, before any macrotasks.

*Examples- Promise resolution (then() / catch() / finally()) , queueMicrotask() , MutationObserver callbacks, async/await*

2. **Macrotask Queue** (Lower Priority)

These tasks are scheduled to run after the current call stack and all microtasks are done.

*Examples: setTimeout, setInterval, setImmediate (Node.js), DOM events (like click, scroll), IO callbacks*

### Execution Order

The event loop follows this cycle:

1. Run all synchronous code
2. Run all microtasks until the queue is empty (including newly added microtasks)
3. Run one macrotask, then process all microtasks again
4. Repeat from step 2

Example - 

```jsx
setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("Start");

/* --- Output ---
Start
Promise
Timeout
*/
```

setTimeout(fn, 0) does not execute immediately—it schedules the callback to run after the current call stack and microtasks are complete.

_Note - If microtasks keep adding more microtasks, macrotasks can be delayed (called microtask starvation)._

_Note 2 - In browsers, rendering (UI updates) typically happens between macrotasks._
