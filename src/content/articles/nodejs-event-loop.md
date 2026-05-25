---
title: Node.js Event Loop & Concurrency Model
meta_title: Node.js Event Loop Explained | CS Primer
description: Understand the Node.js event loop, asynchronous execution, callback queues, and non-blocking I/O architecture.
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

One of the most misunderstood aspects of Node.js is how it handles concurrency. When you hear *‘Node.js is single-threaded’* , it doesn’t mean it can only do one thing at a time.

Node.js uses a **single-threaded JavaScript execution model** combined with **asynchronous, non-blocking I/O** powered by *libuv*. The event loop manages how operations are scheduled and executed.



## Single-Threaded, Yet Highly Concurrent

Most programming languages (like Java, C#, or Python) rely on **multi-threading** to achieve concurrency. In those models, the operating system creates a separate thread for each task, which can run in parallel on multiple CPU cores.

Node.js takes a different path: 
- **Delegating I/O operations**: I/O operations _(ex- file access, network requests, or database queries)_ are delegated to the operating system or to *libuv* (a C library that manages an efficient thread pool under the hood).
- **Using an event loop**: When an operation finishes, Node.js schedules its callback to run later, keeping the main thread free.
- **Avoiding explicit thread management**: developers don’t need to worry about locks or race conditions for most tasks, because JavaScript execution remains single-threaded.

In traditional multi-threaded servers, handling many connections can involve a large number of threads or thread pool management, increasing overhead. In Node.js we handle same loads by single thread _( + a small of pool of background workers)_.

---

## The Role of libuv

At the heart of Node.js lies **libuv**, a C library that makes its concurrency model practical. While JavaScript itself has no built-in notion of threads or system-level asynchronous I/O, libuv provides -

- **The event loop**: schedules and dispatches callbacks once operations complete.
- **Asynchronous I/O bindings**: non-blocking access to files, sockets, and OS resources.
- **Cross-platform networking**: consistent APIs for TCP, UDP, DNS, and more.
- **A background thread pool**: used for tasks that cannot be handled asynchronously by the OS _(e.g., file system operations, DNS lookups, cryptography)_.

In short, libuv acts as the **concurrency engine** of Node.js. It allows a single JavaScript thread to juggle thousands of tasks by quietly delegating the heavy lifting to the operating system and its own worker threads, then funneling results back through the event loop.

---

## Event Loop Phases

Libuv manages the event loop with six phases:

1. **Timers Phase** - Executes callbacks scheduled by setTimeout() and setInterval() once their delay has elapsed.

2. **Pending Callbacks Phase** - Executes callbacks deferred from the previous loop iteration, often system-level I/O callbacks.

3. **Idle / Prepare Phase** - Used internally by libuv to prepare for the next cycle.

4. **Poll Phase (Most Important)** - Retrieves new I/O events and executes their callbacks. May block if no timers or immediate callbacks are .

5. **Check Phase** - Executes callbacks scheduled with setImmediate(). Runs after the poll phase.

6. **Close Callbacks Phase** - - Handles cleanup callbacks, such as closed sockets (socket.on("close")).

Additionally, microtasks (like promises and process.nextTick()) are processed after each callback execution, before the loop continues

---

## Microtasks vs Macrotasks

Node.js distinguishes between microtasks and macrotasks

### Microtasks

Executed immediately after the current operation, before the event loop moves to the next phase.

Examples: Promise.then(), queueMicrotask(), process.nextTick() (which runs before other microtasks).


### Macrotasks

Scheduled into event loop phases.

Examples: setTimeout, setInterval, setImmediate, I/O callbacks.


### Execution Order Example

```javascript
console.log("Start"); // Execute immediately

setTimeout(() => console.log("Timer"), 0); // timers phase
Promise.resolve().then(() => console.log("Promise")); // microtask queue

console.log("End"); // Execute immediately

// Output
// Start
// End
// Promise
// Timer
```

Even with a 0ms delay, timers always wait for the next loop cycle. Microtasks run first

---

## Key Notes

- Microtasks can starve the event loop if overused (especially process.nextTick()), so use them carefully.
- CPU-intensive tasks block the event loop and should be offloaded to worker threads or separate processes.
- Node.js achieves scalability by efficiently managing I/O, not by parallel execution of JavaScript.

---

## Conclusion

By combining a single-threaded JavaScript runtime with libuv’s event loop and background workers, Node.js can handle thousands of concurrent connections without the overhead of traditional multi-threaded architectures.