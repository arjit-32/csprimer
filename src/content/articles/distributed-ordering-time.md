---
title: Ordering and Time in Distributed Systems
meta_title: Ordering and Time in Distributed Systems | CS Primer
description: Explore how ordering and time are managed in distributed systems. Learn about vector clocks, logical clocks, and synchronization challenges in 2025’s distributed environments.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

To determine Order of event, time becomes of importance. The problem with distributed systems is each node has its own clock (are’nt perfectly synchronized) and we do not have a global shared memory.

## Why it matters

- Determining the sequence of events
- Ensuring Consistency - Avoid conflicts when multiple nodes update the same data.
- Causal Relationships - Understanding how one event influences another.

## Logical Clocks

Instead of relying on physical time (which is unsynchronized across nodes), logical clocks assign timestamps based on message exchanges to establish a logical order of events.

Example - If Node A updates a database at 10:01 AM and Node B reads it at 10:00 AM (its local time), the system may incorrectly think B’s read happened before A’s update. Logical clocks prevent this confusion by defining order based on even dependencies.

## Types of Ordering

1. Total Ordering - Every event in system is comparable and has well-defined order. It is hard to achieve in distributed systems due to concurrency.
Example - A centralized message queue ( Kafka ) maintains a strict order. 
2. Partial Ordering - Not all events are ordered and nodes may see different event sequences based on message delays. This is often the case in a distributed system.
Example - Two people comment on a post, each one sees their own comment immediately, but others may see them in different order.

## Causality

When one attribute contributes to the production of another event it is called causality.

Distributed systems are inherently asynchronous. By introducing coordination and synchronization between them, we essentially reduce the level of concurrency and consequently their performance. Causality enables to let these systems being async while also supporting causal consistency model.

**Causality Ordering using Logical Clocks**

We can use Logical clock ( ex- Lamport clock) to order events that arent real time but logical order establishing a partial causal ordering.

Each node maintains a **counter**.

- When a local event occurs → Increment counter by 1.
- When sending a message → Attach the counter value.
- When receiving a message → Update the counter as Max(local, received) +1.

## Distributed Snapshot Problem

Consistent snapshots are hard to capture in distributed systems, because of no global shared memory, lack of synchronized clocks and messages between processes can take unpredictable time to arrive.

Solution for this is - Lamport Distributed Snapshot Algorithm

- A **marker (snapshot request)** is sent to all nodes.
- Each node records its **state and messages received before the marker**.
- Ensures a **consistent snapshot** is collected across all nodes **without stopping execution**.