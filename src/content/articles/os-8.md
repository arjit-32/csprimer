---
title: Deadlock
author: Arjit Sharma
meta_title: os
description: os
series: ["os"]
categories: ["Core-CS"]
---

Deadlock occurs when multiple processes *get stuck indefinitely*, waiting for resources held by each other, preventing further execution. Understanding deadlocks is essential for designing efficient systems and avoiding resource conflicts.

## What is a Deadlock?

A deadlock happens when processes:

- Hold resources that another process needs.
- Wait for resources held by other waiting processes.

**Real-World Example**

Imagine two trains approaching an intersection:

- Each train blocks the track for the other.
- Neither train can proceed until the other moves, leading to a standstill - this is deadlock in action.

---

## Conditions for Deadlock

Deadlock occurs when *all four conditions* are present:

1️⃣ **Mutual Exclusion** – Resources cannot be shared; only one process holds them at a time.

2️⃣ **Hold and Wait** – A process holding resources requests new ones without releasing the current ones.

3️⃣ **No Preemption** – Resources cannot be forcibly taken; a process must release them voluntarily.

4️⃣ **Circular Wait** – A set of processes are waiting for resources held by the next process in the chain, forming a loop.

---

## Deadlock Detection & Prevention

Operating systems use several strategies to **detect, prevent, and resolve** deadlocks.

**1. Deadlock Prevention**

Modifies system design so that at least one deadlock condition never occurs:

- *Eliminating Hold and Wait:* Ensure processes request all resources upfront before executing.
- *Allowing Preemption:* If a resource is locked too long, forcefully remove it from the process and assign it elsewhere.

**2. Deadlock Avoidance**

Dynamically analyzes resource allocation using algorithms like Banker’s Algorithm, which ensures enough resources remain available for smooth execution.

**3. Deadlock Detection & Recovery**

Detects deadlocks using resource allocation graphs and resolves them via:

- *Terminating processes* involved in the deadlock.
- *Rolling back* processes to a safe state before the deadlock occurred.

---

## Conclusion

Deadlock is a critical issue in operating systems, databases, and distributed systems, leading to stalled executions and performance bottlenecks. By applying techniques like *prevention, avoidance, and detection*, developers and system architects can *minimize resource conflicts and enhance system efficiency*.
