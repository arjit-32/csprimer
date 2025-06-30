---
title: Threads and Fork
author: Arjit Sharma
meta_title: os
description: os
series: ["os"]
categories: ["Core-CS"]
---

Processes in an OS can be lightweight (threads) or independent (forked processes). Understanding these concepts helps in designing efficient multitasking applications.

## What Are Threads?

Threads are *subtasks within a process* that share resources but execute independently. Each thread:

- Has its own stack and registers.
- Shares the heap, global variables, and file descriptors with other threads in the same process.
- Enables faster execution compared to creating separate processes.

**Example: Web Server Handling Requests**

A web server like Apache creates multiple threads to serve incoming requests efficiently.

- Thread 1: Handles User A’s request.
- Thread 2: Handles User B’s request.
- Both share the same memory space but execute independently.

---

## What is Fork()?

`fork()` is a system call that creates a new process by duplicating an existing one.

- The child process gets a copy of the parent’s memory space.
- Independent execution: Unlike threads, forked processes do not share memory.

**Example: Running Multiple Instances**

When you open multiple terminal windows, each runs as an independent process created using `fork()`.

```bash
pid_t pid = fork();
if (pid == 0) {
    printf("Child Process\n");
} else {
    printf("Parent Process\n");
}
```

## Threads vs. Fork

| **Feature** | **Threads** | **Forked Processes** |
| --- | --- | --- |
| Memory Sharing | Yes | No |
| Speed | Faster | Slower (due to duplication) |
| Execution | Within the same process | Separate process |
| Used In | Multithreading apps (web servers, game engines) | Independent tasks (terminal sessions, process isolation) |

---

## Conclusion

Threads improve performance by sharing memory, while `fork()` helps in process isolation. Choosing between them depends on application needs - whether you prioritize *speed (threads)* or *separation (fork)*.