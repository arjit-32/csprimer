---
title: Node.js Clustering - Scaling across multiple cores
meta_title: js
description: js
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

Node.js is great at handling many I/O tasks on one thread, but it only uses one CPU core. On modern servers with 8, 16, or more cores, this leaves a lot of performance on the table.
This is where `cluster` module comes in. It lets you run multiple Node.js processes across all cores, boosting performance for heavy workloads.

## Why Clustering ?

Clustering provides several advantages:

- Fully utilize multi-core systems.
- Improve throughput and responsiveness under load.
- Isolate crashes (if one worker dies, others continue).
- Enable zero-downtime restarts (with proper process management).

Unlike worker threads, clustering is process-based. Each worker is a separate Node.js process with its own event loop, V8 instance, and memory space.

---

## How it works ?

The cluster module has two roles:

- **Primary process (formerly called master)** → Responsible for spawning and managing workers.
- **Worker processes** → Handle incoming requests. Each runs on its own CPU core.

On most platforms (Linux, macOS), Node.js uses a round-robin load balancing strategy to distribute connections. Workers communicate with the primary process via IPC (Inter-Process Communication).

---

## Clustering vs Worker Threads

Worker threads run multiple threads inside one Node.js process sharing memory, while clustering runs multiple separate Node.js processes each with its own memory. Clustering and worker threads solve different problems.


| **Scenario** | **Recommended Approach** |
| --- | --- |
| High I/O throughput (web server) | Clustering |
| CPU-intensive tasks in JS | Worker Threads (per process) |
| Both high I/O + CPU work | Clustering + Worker Threads |
| Simple scaling with restarts | Clustering + PM2/Nest |

---

## Basic Clustering Example

```jsx
const cluster = require("node:cluster");
const http = require("http");
const os = require("os");

if (cluster.isPrimary) {
  // Master process: forks workers
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart worker if it dies
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

} else {
  // Worker process: handles requests
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from worker ${process.pid}`);
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

All workers share port 3000, and the cluster module distributes requests among them

---

## IPC, Memory, and Sticky Sessions

When working with clusters, three important aspects come into play: communication between processes (IPC), memory management, and session consistency

### Inter-Process Communication (IPC)

- Workers can communicate with the primary process using message passing.
- You can send JSON-serializable messages with worker.send() and listen with process.on("message").
- IPC is useful for coordinating tasks, reporting status, or distributing workloads.

Example: a worker can notify the primary process when it finishes a job, and the primary can assign new work

```javascript
// In primary
worker.send({ task: "processData" });

// In worker
process.on("message", msg => {
  console.log("Worker received:", msg);
});
```

### Memory Isolation

Each worker is a separate process with its own memory space (unlike worker threads, memory is not shared directly). Shared state must be managed externally using:
  - Databases (e.g., PostgreSQL, MongoDB)
  - Caches (e.g., Redis, Memcached)
  - Message queues (e.g., RabbitMQ, Kafka)
This isolation improves stability (a memory leak in one worker won’t affect others) but requires careful design for shared data.


### Sticky Session

In clustered environments, requests are distributed across workers. For stateful connections (like WebSockets or session-based authentication), requests from the same client must consistently go to the same worker. Without sticky sessions, a client may connect to different workers, losing session continuity

Solution for this might be - sticky sessions at load balancer(Nginx, HAProxy) or session stores(Redies).

---

## Conclusion

Clustering allows Node.js to scale vertically across CPU cores, but to build robust production systems you must also consider IPC for coordination, external memory stores for shared state, and sticky sessions for client consistency. Tools like PM2, Docker, and Kubernetes simplify these concerns, providing monitoring, automatic restarts, and load balancing
