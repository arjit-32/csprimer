---
title: Process Management
author: Arjit Sharma
meta_title: Process Management in Operating Systems  Scheduling, IPC & States Explained
description: Understand how operating systems manage processes—from lifecycle stages and scheduling to inter-process communication. Discover real-world examples and developer insights for mastering OS fundamentals.
series: ["os"]
categories: ["Core-CS"]
---

A program in execution is a process. The OS manages these processes to ensure efficient execution, resource allocation, and smooth multitasking.

## Understanding Processes

A process consists of →

- Text Segment (Code)
- Data Segment - Contains global and static variables.
- Heap - Used for dynamic memory allocation.
- Stack - Holds function call frames, local variables, and return addresses.

*Example:* When you open a web browser, it runs as a process, allocating memory for tabs, extensions, and loaded pages.

---

## Process Control Block (PCB)

The OS maintains a *Process Control Block (PCB)*, a data structure containing vital details such as process state, program counter, memory management, and scheduling information.

---

## Process States

A process transitions through several states:

1. **New** – Process is created.
2. **Ready** – Waiting for CPU allocation.
3. **Running** – Actively executing.
4. **Waiting** – Paused for I/O or external events.
5. **Terminated** – Execution is complete.

---

## Process Scheduling

Since multiple processes run simultaneously, the OS schedules them efficiently using:

- Short-Term Scheduler → Allocates CPU time.
- Long-Term Scheduler → Manages the number of active processes.
- Medium-Term Scheduler → Swaps processes in/out of memory to optimize performance.

Common scheduling algorithms are FCFS, Round Robin and many more we will look at later.

---

## Inter-Process Communication (IPC)

Processes exchange data via pipes, shared memory, message queues, and signals, enabling efficient multitasking

*Example* - In Linux, IPC mechanisms like pipes allow processes to communicate. 

```bash
cat logfile.txt | grep "error" | sort > filtered_errors.txt
```

Each command runs as a separate process, and pipes enable them to exchange data efficiently, cat program read the logfile, grep filters the lines containing “error” and then sort program is used to sort and store them in a file called filtered_errors.txt 

---

## Conclusion

Process management ensures efficient execution of programs while optimizing CPU, memory, and scheduling to prevent bottlenecks. As a developer, you may not often think about OS processes, but understanding that when you start a Node.js server or launch a React development environment, these frameworks run as processes managed by the OS can be valuable.
