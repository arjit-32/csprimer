---
title: Transactions in Distributed Systems
meta_title: Transactions in Distributed Systems | CS Primer
description: Explore how transactions are handled in distributed systems. Understand ACID properties, distributed transactions, and the challenges of ensuring consistency across systems.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

A distributed transaction involves operations across multiple nodes or databases, requiring coordination to maintain ACID properties.

Variations of Distributed Transactions:
- The same piece of data needs to be updated in multiple replicas.
- Different data in different nodes need to be updated atomically.  
  *Example: Sending money from a user stored in Node A to a user stored in Node B.*

## ACID Properties

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1742841305/image_1_tnhlrt.png)

ACID is a set of properties traditionally used in databases. It ensures correctness within a single database but does not address distributed system-wide guarantees.

- **Atomicity** – A transaction is fully completed or not at all. If one step fails, everything rolls back.
- **Consistency** – Transactions must maintain database integrity constraints. *(Not the consistency we talk about in distributed systems.)*
- **Isolation** – Transactions execute independently without affecting each other.
- **Durability** – Once committed, data must persist even after failures.

---

## Mechanisms to Achieve ACID

### Isolation Mechanisms

If we make the system serializable (isolation level to deal with concurrency), then we have made the system isolated.

#### Mechanisms to achieve isolation:

1. **Two-Phase Locking (2PL)**  
   A pessimistic concurrency control protocol that uses locks to prevent concurrent transactions from interfering.  

   Types of Locks:
   - Write Locks (Exclusive) – Blocks both reads and writes.
   - Read Locks (Shared) – Blocks writes but allows other read operations.

   *Example: If two users book the last movie ticket at the same time, 2PL ensures that only one succeeds while the other waits or fails.*

2. **Optimistic Concurrency Control (OCC)**  
   Instead of locking data, transactions execute independently and validate before committing.

   Phases of OCC:
   - Begin – Assigns a unique timestamp to the transaction.
   - Read and Modify – Transaction reads/writes tentatively without locks.
   - Validate and Commit/Rollback 
     - If another transaction modified the accessed data **after** this transaction started → *Abort & Retry with a new timestamp.*  
     - If no conflict → *Commit changes.*

   *Example: If two users edit a shared document, OCC allows both to proceed without locking.*

3. **Multi-Version Concurrency Control (MVCC)**  
   Multiple physical versions are maintained for a single logical data item, so updates do not overwrite existing records but create new versions.

   *Example: A bank statement generation shouldn't be blocked by live transactions.*

### Atomicity Mechanisms

Since a distributed transaction spans multiple nodes, atomicity requires coordination to ensure either **all or none** of the operations are executed.

#### Mechanisms to achieve atomicity:

1. **Two-Phase Commit (2PC)**  
   This protocol involves:
   - Coordinator – Responsible for coordinating different phases.
   - Participants – Nodes that participate in the transaction.

   Phases of 2PC:
   - Prepare phase – The coordinator sends a *"prepare"* message, and each node performs the transaction locally and acknowledges with *"yes."*
   - Commit phase – If all nodes respond with *"yes,"* the coordinator sends a *"commit"* message. If any node responds with *"no,"* the coordinator sends a *"rollback"* message.

   *Note: If the coordinator crashes after sending “Prepare” but before “Commit,” participants wait indefinitely (Blocking Problem).*

2. **Three-Phase Commit (3PC)**  
   To overcome the blocking problem in 2PC, 3PC ensures that the coordinator is not a single point of failure.

   Phases of 3PC:
   - Prepare phase – Nodes vote to commit or abort.
   - Pre-commit phase – The coordinator sends a *"prepare to commit"* message before finalizing.
   - Commit phase – If no failures occur, all nodes commit.

   *If the coordinator crashes after sending "pre-commit," participants already know they must commit. However, if it fails before "pre-commit," it still faces the same issue as 2PC.*

3. **Quorum-Based Commit Protocol**  
   Instead of relying on a single coordinator (like in 2PC/3PC), some systems use **quorum-based writes**.

   - Majority Agreement – A transaction commits if a majority (quorum) of nodes confirm.

### Consistency Mechanisms

Consistency ensures that the database follows **integrity constraints** before and after a transaction.

#### Mechanisms to achieve consistency:

- Schema Enforcement – Ensures data follows the defined structure.
- Business Logic Rules – Constraints like *"Balance ≥ 0"* must always hold.
- Serializability – Ensured through concurrency control (*2PL, OCC, MVCC, etc.*).
- Consensus Protocols (Paxos, Raft) – Ensure all replicas agree on the correct state.

### Durability Mechanisms

Durability ensures that once a transaction is committed, its changes persist permanently, even after failures.

#### Mechanisms to achieve durability:

- Write-Ahead Logging (WAL) – Logs changes before applying them to prevent data loss.
- Replication (Leader-Follower, Quorum-based, etc.) – Copies data across multiple nodes for fault tolerance.
- Checkpointing – Periodically saves consistent database states to speed up recovery.
