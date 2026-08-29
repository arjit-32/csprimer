---
title: Node.js Thread Pool, Worker Threads & CPU-Bound Tasks
meta_title: Node.js Thread Pool Explained | CS Primer
description: Learn how the Node.js thread pool works, handles background tasks, and improves asynchronous performance.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

Even though Node.js executes JavaScript on a single main thread, it is **not limited to one thread overall**. Node.js uses a single-threaded event loop for JavaScript execution, but leverages multiple threads internally (via libuv and worker threads).

Understanding how these mechanisms work is essential for handling both I/O-bound and CPU-bound tasks efficiently.

## Is Node.js Really Single-Threaded?

JavaScript execution in Node.js is single-threaded, but Node.js itself is multi-threaded internally. Work is divided into two broad categories:

### 1. I/O-Bound Tasks
- *Network Operations (`http`, `net`, `sockets`):* Handled asynchronously by the OS kernel without using worker threads.
- *File System (`fs`) & DNS Lookups (`dns.lookup`):* Offloaded to the libuv thread pool (default: 4 worker threads) to prevent blocking the main thread.

### 2. CPU-Bound Tasks
- *Built-in Operations (Crypto, Compression):* Methods like `crypto.pbkdf2()`, `crypto.scrypt()`, and `zlib` automatically run in the *libuv thread pool*.
- *Custom Heavy Calculations:* Complex loops, data parsing, or image processing will block the main event loop unless explicitly offloaded using Node.js `worker_threads` or child processes.

---

## libuv Thread Pool

Many built-in asynchronous operations that could block the main thread are automatically offloaded to libuv’s thread pool:

- File System operations (fs module)
- Cyptography (crypto module)
- Compression (zlib module)
- DNS lookup (dns.lookup)

These worker threads handle native C/C++ operations, not user JavaScript execution. By default, the thread pool size is 4, but it can be adjusted (up to 1024 or 128 depending on the OS/version) via the **UV_THREADPOOL_SIZE** environment variable before the process starts.

> Note: Network I/O (HTTP servers/clients, TCP/UDP sockets) does not use the thread pool. It is handled directly and non-blockingly by the operating system kernel via event notification mechanisms (epoll, kqueue, IOCP).


### Example: Offloading Crypto to the Thread Pool

```javascript
const crypto = require("node:crypto");

const start = Date.now();

crypto.pbkdf2("pass", "salt", 100000, 64, "sha512", () => {
  console.log(`Hash 1 complete: ${Date.now() - start}ms`);
});
```

This computation runs on a worker thread in the libuv thread pool rather than blocking the main event loop. If you launch more concurrent operations than available threads (e.g., 5 calls with the default pool size of 4), the fifth operation will wait in queue until one of the initial four threads finishes.

---

## Worker Threads

The thread pool only helps with specific built-in operations. Pure JavaScript CPU-bound tasks (e.g., sorting massive arrays, complex mathematical computations) run entirely on the main thread and block the event loop. This is where worker threads come in.


*Key Features of Worker Threads :-*

- Run JavaScript code in parallel on separate threads.
- Each worker has its own V8 instance and event loop.
- Threads share the same process memory space, enabling direct memory sharing via SharedArrayBuffer.
- Ideal for CPU-intensive tasks like image processing, cryptography, or large-scale data parsing

### Example: Using Worker Threads

```javascript
// FILE main.js
const { Worker } = require("worker_threads");

// Create a new worker running task.js
const worker = new Worker("./task.js");

worker.on("message", msg => {
  console.log("Message from worker:", msg);
});

worker.on("error", err => {
  console.error("Worker error:", err);
});

worker.on("exit", code => {
  console.log(`Worker stopped with exit code ${code}`);
});
```


```javascript
// FILE task.js
const { parentPort } = require("worker_threads");

// Perform heavy computation here
let result = 0;
for (let i = 0; i < 1e9; i++) result += i;

parentPort.postMessage(result);
```

This computation runs in a separate thread, keeping the main thread responsive.

---

## Conclusion

Node.js achieves scalability by combining its single-threaded JavaScript execution model with libuv’s thread pool and worker threads.
- The thread pool offloads built-in CPU-heavy operations like crypto and compression.
- Worker threads allow developers to run custom JavaScript computations in parallel
