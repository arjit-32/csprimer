---
title: Consensus in Distributed Systems
meta_title: Consensus Algorithms in Distributed Systems | CS Primer
description: Learn about consensus algorithms in distributed systems, including popular methods like Paxos and Raft. Understand how they ensure reliability and fault tolerance in 2025.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

Consensus is the process of **getting multiple nodes in a distributed system to agree on a single value**, despite failures and unreliable communication.

**Use Cases of Consensus**

- Leader Election : Selecting a node to coordinate tasks.
- Distributed Locking : Concurrency control mechanisms that use locking.
- Atomic Transactions: Sending multiple messages in an agreed-upon order.
- Fault tolerance – Handling node failures while maintaining a consistent system state.

### FLP impossibility theory

The **Fischer-Lynch-Paterson (FLP) theorem** states that:

"In an asynchronous distributed system, it is impossible to guarantee consensus if even one node can fail.”

We can use probabilistic guarantees(eg- Paxos, Raft) instead of absolute certainty.

## Consensus Algorithms

### Paxos Algorithm

This algorithm guarantees that the system will come to an agreement on a single value and tolerate the failure of any number of nodes (potentially all of them) as long as more than half the nodes work properly at any time.
Paxos tolerates message delays and failures. Eventually, all nodes will learn the same value (consensus) through message propagation.

The Phases of Paxos Algorithm - 

1. Prepare Phase 
    - A proposer (leader) sends a "prepare" request to all nodes.
    - This request includes a proposal number (n) (higher numbers take priority).
2. Promise Phase 
    - Nodes (acceptors) reply with a "promise" to ignore lower-numbered proposals.
    - They also return the highest proposal value they have accepted (if any).
3. Accept Phase 
    - If the proposer gets a majority of promises, it sends an "accept" request with the final value.
    - Nodes accept the value unless they have seen a higher proposal in the meantime.
4. Learn Phase 
    - Nodes that accepted the value broadcast it to all others.
    - Eventually, all nodes agree on the same value.

### Raft Algorithm

It is a leader-based consensus algorithm used in systems like CockroachDB and Etdc(Kubernetes).

How it Works ? 

1. Leader Election - If a node gets majority votes, it becomes leader and sends heartbeat messages to keep followers in sync.
2. Log Replication - Leader receives updates from clients and sends the update to all followers. Once a majority of them confirm, leader commits the change.
3. Commit Confirmation - Once committed, leader informs all the nodes that change is final.

*Note - If leader crashes, new leader is elected.*