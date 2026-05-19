---
title: Introduction to Node.js
meta_title: js
description: js
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

Node.js takes a completely different approach with **Non-Blocking, Event-Driven Design**.

Node.js is built on:
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
| V8 Engine | Executes JavaScript code at high speed |
| libuv | Provides non-blocking I/O, thread pool, networking |
| Event Loop | Coordinates asynchronous tasks |
| Bindings | Bridges JS code with system-level APIs |


### The V8 JavaScript Engine

V8 is the same engine used by Google Chrome.

Its job is to:

- Compile JavaScript into machine code
- Execute it extremely fast
- Optimize performance at runtime

This is one of the reasons Node.js performs so well compared to older JavaScript runtimes.


### libuv: The Backbone of Asynchronous I/O

**libuv** is a C library that powers Node’s asynchronous behavior.

It provides:

- Non-blocking file system access
- Networking
- Timers
- A small internal thread pool

When Node.js needs to perform a task that could block execution, like reading a file (libuv handles it behind the scenes).

### The Event Loop

Node.js does not create a new thread for every request. Instead, it follows this flow:

1. A request enters Node.js
2. If the task is non-blocking (network, timer, etc.), it is delegated to the OS or libuv thread pool.
3. Node.js continues processing other requests.
4. When the task completes, its callback or promise is placed in the callback queue (or task queue).
5. The event loop executes it when ready.

This single-threaded model allows Node.js to handle **thousands of concurrent connections** efficiently.

---

## Comparison with Browser JS

Node.js does not have DOM APIs like document or window, instead it provides system-level APIs (file system, networking).
Node.js is great for I/O-heavy apps (APIs, real-time apps).

⚠️ Not ideal for CPU-heavy tasks (like image processing or large computations), as they block the event loop.
