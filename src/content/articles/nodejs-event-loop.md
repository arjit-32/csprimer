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

Node.js uses a single-threaded JavaScript execution model combined with asynchronous, non-blocking I/O powered by libuv. The event loop manages how operations are scheduled and executed.



## Single-Threaded, Yet Highly Concurrent

Most programming languages (like Java, C#, or Python) rely on **multi-threading** to achieve concurrency. In those models, the operating system creates a separate thread for each task, which can run in parallel on multiple CPU cores.

Node.js takes a different path: 
- **Delegating I/O operations**: I/O operations _(ex- file access, network requests, or database queries)_ are delegated to the operating system or to *libuv* .
- **Using an event loop**: When an operation finishes, Node.js schedules its callback to run later, keeping the main thread free.
- **Avoiding explicit thread management**: Developers don’t need to worry about locks or race conditions for most tasks, because JavaScript execution remains single-threaded.

In traditional multi-threaded servers, handling many connections can involve a large number of threads or thread pool management, increasing overhead. In Node.js we handle same loads by single thread _( + a small of pool of background workers)_.

---

## The Role of libuv

At the heart of Node.js lies libuv, a C library that makes its concurrency model practical. While JavaScript itself has no built-in notion of threads or system-level asynchronous I/O, libuv provides -

- **The event loop**: schedules and dispatches callbacks once operations complete.
- **Asynchronous I/O bindings**: non-blocking access to files, sockets, and OS resources.
- **Cross-platform networking**: consistent APIs for TCP, UDP, DNS, and more.
- **A background thread pool**: used for tasks that cannot be handled asynchronously by the OS _(e.g., file system operations, DNS lookups, cryptography)_.

In short, libuv acts as the **concurrency engine** of Node.js. It allows a single JavaScript thread to juggle thousands of tasks by quietly delegating the heavy lifting to the operating system and its own worker threads, then funneling results back through the event loop.

---


## Microtasks vs Macrotasks

Node.js distinguishes between microtasks and macrotasks

- Microtasks : Executed immediately after the current operation, before the event loop moves to the next phase. Examples: Promise.then(), queueMicrotask(), process.nextTick() (which runs before other microtasks).

- Macrotasks: Scheduled into event loop phases. Examples: setTimeout, setInterval, setImmediate, I/O callbacks.


**Execution Order Example -**

```javascript
console.log("Start"); // Execute immediately

Promise.resolve().then(() => console.log("Promise")); // microtask queue

console.log("End"); // Execute immediately

/* ------ Output ----- */
// Start
// End
// Promise
```

Even with a 0ms delay, timers always wait for the next loop cycle. Microtasks run first

---

## Node.js Event Loop Phases

Libuv manages the event loop with six phases:

1. **Timers Phase** - Executes callbacks from expired setTimeout() and setInterval() timers.

2. **Pending Callbacks Phase** - Executes deferred system-level I/O callbacks

3. **Idle / Prepare Phase** - Used internally by libuv, not accessible to user code.

4. **Poll Phase (Core Engine)** - Retrieves new I/O events (file reads, network data) and executes their callbacks. It can block and wait for events if no other work is pending.

5. **Check Phase** - Executes callbacks scheduled via setImmediate(). Runs directly after the Poll phase.

6. **Close Callbacks Phase** - - Handles resource cleanup callbacks (e.g., socket.on('close', ...)).

Microtask Priority Rule: Microtasks do not wait for a specific phase. The engine drains the process.nextTick queue first, followed by the Promise Microtask queue, immediately after the current JavaScript operation finishes.

---

## Event Loop Code Example 


```javascript
const fs = require("node:fs");
const net = require("node:net");

console.log("1: Synchronous Start");

// Timers phase: setTimeout runs here
setTimeout(() => { console.log("6: Timers Phase (setTimeout)"); }, 0);

// Check phase: setImmediate runs here
setImmediate(() => { console.log("7: Check Phase (setImmediate - Top Level)"); });

// Microtasks: nextTick runs before Promise.then
Promise.resolve().then(() => { console.log("3: Microtask (Promise.then)"); });

process.nextTick(() => { console.log("2: Microtask (process.nextTick - Higher Priority)"); });

// Poll phase: I/O callbacks execute here
fs.readFile(__filename, () => {
  console.log("8: Poll Phase (fs.readFile Callback)");

  // Inside I/O: nextTick runs before the next phase
  process.nextTick(() => { console.log("9: Microtask (process.nextTick - Inside I/O)"); });

  // After Poll, Check runs before Timers
  setImmediate(() => { console.log("10: Check Phase (setImmediate - Inside I/O)"); });

  setTimeout(() => { console.log("11: Timers Phase (setTimeout - Inside I/O)"); }, 0);
});

// Close callbacks phase
const server = net.createServer().listen(0, () => { server.close(); });

server.on("close", () => { console.log("12: Close Callbacks Phase (server.on('close'))"); });

console.log("4: Synchronous End");


/* ---------- OUTPUT --------- */
/*
1: Synchronous Start
4: Synchronous End
2: Microtask (process.nextTick - Higher Priority)
3: Microtask (Promise.then)
6: Timers Phase (setTimeout)
7: Check Phase (setImmediate - Top Level)
8: Poll Phase (fs.readFile Callback)
9: Microtask (process.nextTick - Inside I/O)
10: Check Phase (setImmediate - Inside I/O)
11: Timers Phase (setTimeout - Inside I/O)
12: Close Callbacks Phase (server.on('close'))
*/
```

In above example - At top-level code, setTimeout(fn, 0) vs setImmediate(fn) does not have a guaranteed ordering. But when both are scheduled inside an I/O callback, setImmediate() normally runs first because the loop proceeds from Poll → Check.

---

## Conclusion

By combining a single-threaded JavaScript runtime with libuv’s event loop and background workers, Node.js can handle thousands of concurrent connections without the overhead of traditional multi-threaded architectures.