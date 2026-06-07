---
title: Distributed Transactions and ACID - A Practical Guide
meta_title: Transactions in Distributed Systems | CS Primer
description: Explore how transactions are handled in distributed systems. Understand ACID properties, distributed transactions, and the challenges of ensuring consistency across systems.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

A transaction is a sequence of operations that should behave as a single unit of work. Example - Transfering money between bank accounts. A transaction should either complete successfully or leave the system unchanged.

As systems grow, data may be stored across multiple machines, introducing new challenges beyond those faced by a traditional single-node database.

---

## Single-Node vs Distributed Databases

Before discussing distributed transactions, it is important to understand where the data resides.

### Single-Node Database

All data lives on a single database server.

Example:
```sql
BEGIN;

UPDATE accounts
SET balance = balance - 100
WHERE id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE id = 2;

COMMIT;
```

Even though multiple tables or rows may be involved, everything is managed by a single database engine. The database itself is responsible for ensuring ACID guarantees.

No distributed coordination is required.


### Distributed Database

Data is partitioned or replicated across multiple machines.

Example:
```bash
Alice account -> Node A
Bob account   -> Node B
```
Money transfer:
```bash
Debit Alice on Node A
Credit Bob on Node B
```
Now multiple machines must coordinate to ensure correctness.

This is a distributed transaction.

---

## ACID Properties

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1742841305/image_1_tnhlrt.png)

ACID is a set of properties traditionally used in databases. It ensures correctness within a single database but does not address distributed system-wide guarantees.

- **Atomicity** - A transaction is fully completed or not at all. If one step fails, everything rolls back.
- **Consistency** - Transactions must maintain database integrity constraints. *(Not the consistency we talk about in distributed systems.)*
- **Isolation** - Transactions execute independently without affecting each other.
- **Durability** - Once committed, data must persist even after failures.

---

## Layer 1: Concurrency Control (Isolation)

The first problem is concurrency.

>Multiple transactions
>running at the same time

This problem exists in both single-node and distributed databases.

Several mechanisms provide isolation.

### Mechanisms to achieve Isolation:

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

---

## Layer 2: Atomic Commit Across Multiple Machines

Since a distributed transaction spans multiple nodes, atomicity requires coordination to ensure either **all or none** of the operations are executed.


Consider:
```bash
Node A: Debit Alice
Node B: Credit Bob
```
What if:
```bash
Debit succeeds
Credit fails
```
Money disappears.

This is an atomic commit problem.


### Mechanisms to achieve atomicity:

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

---

## Layer 3: Consistency Mechanisms

A transaction must move the database from one valid state to another valid state.

**ACID Consistency vs Distributed Consistency**

In ACID, consistency means preserving invariants. Consistency ensures that the database follows **integrity constraints** before and after a transaction. Example - Account balance cannot become negative.

Distributed Consistency - All replicas eventually agree on the same value. Replica agreement problem. 

These are related but different concepts.


### Mechanisms to achieve consistency:

- Schema Enforcement – Ensures data follows the defined structure. 
- Business Logic Rules – Constraints like *"Balance ≥ 0"* must always hold.
- Serializability – Ensured through concurrency control (*2PL, OCC, MVCC, etc.*).
- Consensus Protocols (Paxos, Raft) – Ensure all replicas agree on the correct state.

---

## Layer 4: Durability Mechanisms

Durability ensures that once a transaction is committed, its changes persist permanently, even after failures.

### Mechanisms to achieve durability:

- Write-Ahead Logging (WAL) – Logs changes before applying them to prevent data loss.
- Replication (Leader-Follower, Quorum-based, etc.) – Copies data across multiple nodes for fault tolerance.
- Checkpointing – Periodically saves consistent database states to speed up recovery.

---

## SAGA Pattern

Traditional distributed transactions are common inside distributed databases. Microservices introduce a different challenge.

*Microservice Architecture*
- Order Service
- Inventory Service
- Payment Service
- Shipping Service

Each service owns its own database. A global distributed transaction across all services is often impractical.

**How Saga Pattern Solves it ?**

A Saga consists of a sequence of local transactions.

Example:

- Create Order
- Reserve Inventory
- Charge Payment
- Arrange Shipping

Each step commits independently.


*Compensation*

If shipping fails:

- Refund Payment
- Release Inventory
- Cancel Order

These compensating actions undo previous work.

Unlike 2PC - No global lock, No distributed commit coordinator and No atomic commit across services

Consistency is achieved eventually.

---

## Connclusion 

- 2PL, OCC, MVCC → Concurrency Control (Isolation)

- 2PC, 3PC → Atomic Commit Across Machines

- Raft, Paxos → Replica Agreement (Consensus)

- WAL, Replication, Checkpointing → Durability

- Saga → Long-Running Business Workflows

They are not alternatives to one another. A modern distributed system often combines several of these mechanisms together to achieve reliability, correctness, and scalability.