---
title: Node.js Thread Pool, Worker Threads & CPU-Bound Tasks
meta_title: js
description: js
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

Even though Node.js executes JavaScript on a *single main thread*, it is **not limited to one thread overall**. Node.js uses a single-threaded event loop for JavaScript execution, but leverages multiple threads internally (via libuv and worker threads).

Understanding how these mechanisms work is essential for handling both I/O-bound and CPU-bound tasks efficiently.

## Is Node.js Really Single-Threaded?

JavaScript execution in Node.js is single-threaded, but Node.js itself is multi-threaded internally. Work is divided into two broad categories:

- I/O Bound Tasks: Network requests, File system Access, DNS lookup
- CPU Bound Tasks: Encryption, Hashing, Compression, Heavy Computations

I/O tasks are handled asynchronously via libuv and the event loop. CPU-bound tasks, however, can block the main thread. To address this, Node.js uses the libuv thread pool for certain built-in operations and worker threads for custom JavaScript computations.

---

## libuv Thread Pool

Many built-in asynchronous operations that could block the main thread are automatically offloaded to libuv’s thread pool:

- File System operations (fs module)
- Cyptography (crypto module)
- Compression (zlib module)
- DNS lookup (dns.lookup)

These threads handle native operations, not JavaScript execution. By default, the thread pool size is 4, but it can be increased via the UV_THREADPOOL_SIZE environment variable.

_Note - Network I/O (HTTP servers/clients, TCP/UDP sockets) does not use the thread pool. it is handled non-blockingly by the operating system kernel._


### Example: Offloading Crypto to the Thread Pool

```javascript
const crypto = require("crypto");

crypto.pbkdf2("pass", "salt", 100000, 64, "sha512", () => {
  console.log("Done");
});
```

This computation runs in the thread pool, not the main thread. If multiple such operations exceed the pool size, excess tasks queue up and execute sequentially.

---

## Worker Threads

The thread pool only helps with specific built-in operations. Pure JavaScript CPU-bound tasks (e.g., sorting massive arrays, complex mathematical computations) run entirely on the main thread and block the event loop. This is where worker threads come in.


**Key Features of Worker Threads**

- Run JavaScript code in parallel on separate threads.
- Each worker has its own V8 instance and event loop.
- Threads share the same process memory space, enabling direct memory sharing via SharedArrayBuffer.
- Ideal for CPU-intensive tasks like image processing, cryptography, or large-scale data parsing

### Example: Using Wroker Threads

```javascript
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

And inside **task.js**

```javascript
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
