---
title: Introduction to Node.js
meta_title: Introduction to Node.js | CS Primer
description: Learn Node.js fundamentals, architecture, use cases, and how JavaScript powers scalable backend applications.
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

JavaScript was originally designed to run inside browsers, primarily for client-side scripting. For years, this limitation meant JavaScript could handle user interfaces but not servers, databases, or backend logic.

*Node.js changed that.*

## What is Node.js ?

Node.js is a powerful, open-source runtime built on Chrome’s V8 JavaScript engine. It allows JavaScript to run outside the browser.

Node’s design is based on non-blocking I/O and an event-driven architecture, enabling high concurrency and scalability. This makes it particularly suited for:

- APIs and backend services
- Real-time applications (chat, live dashboards, multiplayer games)
- Streaming services
- Edge computing and serverless functions

---

## Why is Node.js different ?

Traditional backend servers (like PHP, Java, or Python servers) often use a *multi-threaded models* (such as thread-per-request or thread pools), which can consume more memory under high load.

Node.js takes a completely different approach, its built on:
   - **Non-blocking I/O**
   - **An event-driven architecture**

Instead of waiting for tasks like database queries or network requests to finish, Node.js delegates these tasks to the operating system or libuv and continues handling other requests.

This makes Node extremely efficient under heavy load.

It is suitable for applications that require high concurrency, low latency and real-time communication.

---

## Nodejs Architecture Overview

Node.js is composed of several key components working together:

| **Component** | **Purpose** |
| --- | --- |
| V8 Engine | Compiles and executes JavaScript into native machine code; manages call stack and memory allocation. |
| libuv | Implements the Event Loop, asynchronous I/O, and the internal Thread Pool |
| C++ Bindings | The translation bridge marshaling data between V8 types and native system-level libraries. |
| Node Standard Library | Provides high-level, user-facing APIs (fs, http, path) and input validation. |


### The V8 JavaScript Engine

Originally built by Google for Chrome, V8 is responsible for executing JS code directly on the CPU

Its job is to:

- Just-In-Time (JIT) Compilation: Compiles JavaScript source code straight into native machine code at runtime, bypassing bytecode interpreters for hot code paths.
- Single Main Thread: Allocates the Memory Heap (object storage) and manages the Call Stack (synchronous execution context).

This is one of the reasons Node.js performs so well compared to older JavaScript runtimes.


### libuv: The Backbone of Asynchronous I/O

libuv is a multi-platform C library that enables Node's non-blocking I/O model:

- Kernel-Level Asynchronous I/O (Non-Blocking): Used for network sockets, HTTP requests, TCP/UDP streams, and timers. Zero extra threads required: The OS kernel notifies Node when data is ready on a socket.
- Internal Thread Pool: Used for blocking operations where OS kernels lack universal async support(fs, dns lookup,cpu bound crypto, compression). Default size is 4 worker threads.


### Standard Library vs. C++ Bindings

These are two distinct layers that make system calls possible from JavaScript:

- Node.js Standard Library (lib/*.js): The JavaScript module you import (e.g., const fs = require('fs')). It performs parameter validation, sets defaults, and delegates down to internal bindings.
- C++ Bindings (src/*.cc): Internal C++ classes that convert JavaScript arguments (V8 types like v8::String) into native C types, then trigger the corresponding libuv or system calls.

### The Event Loop

Node.js does not create a new thread for every request. Instead, it follows this flow:

1. Request Intake: A request arrives and synchronous JavaScript executes on the V8 Call Stack.
2. If the task is non-blocking, it is delegated to the OS(Network I/O) or libuv thread pool(File I/O & heavy crypto tasks).
3. Non-Blocking Continuity: The single main thread immediately returns to handle other requests.
4. Queueing Callbacks: When background work completes, its callback is placed into the appropriate queue (Microtask or Phase Task Queue).
5. Execution: When the Call Stack is clear, the Event Loop picks up queued callbacks and pushes them onto the stack.

This single-threaded model allows Node.js to handle **thousands of concurrent connections** efficiently.

---

## Comparison with Browser JS

Node.js does not have DOM APIs like document or window, instead it provides system-level APIs (file system, networking).
Node.js is great for I/O-heavy apps (APIs, real-time apps).

⚠️ Not ideal for CPU-heavy tasks (like image processing or large computations), as they block the event loop.
