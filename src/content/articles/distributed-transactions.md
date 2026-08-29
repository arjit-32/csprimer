---
title: Understanding Distributed Transactions Beyond ACID
meta_title: Transactions in Distributed Systems | CS Primer
description: Explore how transactions are handled in distributed systems. Understand ACID properties, distributed transactions, and the challenges of ensuring consistency across systems.
author: Arjit Sharma
series: distributed
categories: ["System-Design"]
draft: false
year: 2025
---

A transaction is a sequence of operations that should behave as a single unit of work.

Consider a money transfer:
```bash
Debit Alice Account 
Credit Bob Account
```

Both operations must succeed together or fail together.

- If Alice is debited but Bob is never credited, the system enters an invalid state.
- Transactions help preserve correctness in the presence of failures and concurrent access.

In a traditional database, transactions are relatively straightforward because all data resides on a single machine. As systems scale across multiple machines, replicas, and services, maintaining transactional guarantees becomes significantly more difficult.

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

*Example - MySQL, PostgreSQL, Oracle Database.*


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

If one machine succeeds while the other fails, correctness is violated.

Multiple machines must coordinate before a transaction can complete.

This introduces the concept of a distributed transaction.

---

## ACID Properties

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1742841305/image_1_tnhlrt.png)

ACID is a set of properties traditionally used in databases. It ensures correctness within a single database but does not address distributed system-wide guarantees.

- **Atomicity** - A transaction is fully completed or not at all. If one step fails, everything rolls back.
- **Consistency** - Transactions must maintain database integrity constraints. *(Not the consistency we talk about in distributed systems.)*
- **Isolation** - Transactions execute independently without affecting each other.
- **Durability** - Once committed, data must persist even after failures.

---


## Who Provides ACID Guarantees?

- In a traditional database, ACID guarantees are largely implemented by the database engine itself through mechanisms such as locking, MVCC, logging, and recovery.

- In a distributed database, the database additionally coordinates multiple nodes using distributed transaction and replication protocols. Ex - Google Spanner, Cockroach DB

- Suppose you arent using a distributed database like Spanner, but data may be partitioned (sharded) or replicated across multiple machines.

```bash
Account A → Node A
Account B → Node B
```

A transaction may now span multiple nodes. To preserve ACID guarantees, the database must coordinate those nodes using additional mechanisms: MVCC / Locking → Isolation , 2PC (or similar protocols) → Atomic Commit Across Shards, Replication → Fault Tolerance, Consensus Protocols → Replica Agreement, WAL and Recovery → Durability.

---

## A Layered view of Transactions 

Distributed transaction systems solve several independent problems.

- Application Layer: This is where the business logic resides. Applications initiate transactions, such as transferring money, booking tickets, or updating inventory.
- Transaction Management Layer: This layer coordinates the execution of transactions across multiple nodes, ensuring correctness and consistency.
- Replication and Consensus Layer: This layer ensures that data is replicated across multiple nodes and that all replicas agree on the state of the system.


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
     - During validation, the system checks whether concurrent transactions modified data that conflicts with the current transaction's read or write set.
     - If a conflict is detected → Abort and Retry.
     - Otherwise → Commit.

   *Example: If two users edit a shared document, OCC allows both to proceed without locking.*

3. **Multi-Version Concurrency Control (MVCC)**  
   MVCC allows transactions to read a consistent snapshot of data while newer versions are being written. A major advantage is that readers generally do not block writers and writers generally do not block readers.

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

   *Note: If the coordinator crashes after sending “Prepare” but before “Commit,” participants wait indefinitely (Blocking Problem). Modern systems often mitigate this issue by using timeout mechanisms or leader election protocols to recover from coordinator failures*

2. **Three-Phase Commit (3PC)**  
   3PC attempts to reduce the blocking behavior of 2PC by introducing an additional pre-commit phase. Participants can make progress after certain failures using timeout-based decisions. However, 3PC assumes bounded network delays and is rarely used in modern distributed systems.

   Phases of 3PC:
   - Prepare phase – Nodes vote to commit or abort.
   - Pre-commit phase – The coordinator sends a *"prepare to commit"* message before finalizing.
   - Commit phase – If no failures occur, all nodes commit.

   *While 3PC reduces blocking behavior compared to 2PC, it assumes bounded network delays and reliable communication. In real-world systems, where network partitions and unbounded delays can occur, 3PC is rarely used due to its impracticality*

---

## Layer 3: Consistency Mechanisms

A transaction must move the database from one valid state to another valid state.

**ACID Consistency vs Distributed Consistency**

In ACID, consistency means preserving invariants. Consistency ensures that the database follows **integrity constraints** before and after a transaction. Example - Account balance cannot become negative.

Distributed Consistency - Distributed Consistency describes the guarantees provided about the visibility and ordering of updates across replicas. Different systems provide different consistency models ranging from eventual consistency to stronger guarantees such as linearizability.

### Mechanisms to achieve consistency:

- Schema Enforcement – Ensures data follows the defined structure. 
- Business Logic Rules – Constraints like *"Balance ≥ 0"* must always hold.
- Serializability – Ensured through concurrency control (*2PL, OCC, MVCC, etc.*).
- Consensus Protocols (Paxos, Raft) – Ensure Replicas agree on the same sequence of state transitions despite failures.

---

## Layer 4: Durability Mechanisms

Durability ensures that once a transaction is committed, its changes persist permanently, even after failures.

### Mechanisms to achieve durability:

- Write-Ahead Logging (WAL) – Logs changes before applying them to prevent data loss.
- Replication (Leader-Follower, Quorum-based, etc.) – Copies data across multiple nodes for fault tolerance. However, replication alone does not guarantee durability unless combined with consensus protocols like Paxos or Raft to ensure that committed data is agreed upon by all replicas.
- Checkpointing – Periodically saves consistent database states to speed up recovery.

---

## ACID in Microservice Architectures

Microservices introduce a different challenge.

Example:
```bash
Order Service
Payment Service
Inventory Service
```

Each service owns its own database.

There is no single database engine coordinating the entire workflow.

As a result, global ACID guarantees across multiple services become difficult to achieve.

Each service can maintain ACID within its own database, but coordination across services is typically handled at the application level using patterns such as:
```bash
Saga
Outbox Pattern
Event-Driven Workflows
```

Rather than enforcing a single global transaction, these systems often rely on eventual consistency and compensating actions. This trade-off allows microservices to scale independently and avoid the performance bottlenecks associated with global ACID guarantees.

---

## SAGA Pattern

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

While the Saga pattern simplifies distributed workflows, it introduces additional complexity in managing compensating actions and ensuring eventual consistency.

---

## Connclusion 

Maintaining ACID becomes progressively more challenging as data is distributed across multiple machines.

For a single-node database, the database engine itself provides ACID guarantees through mechanisms such as locking, MVCC, logging, and recovery.

When a database is distributed or sharded, the same guarantees require additional coordination across nodes. Isolation may still be provided through MVCC or locking, but atomicity, durability, and fault tolerance now depend on distributed transaction protocols, replication, and recovery mechanisms.

In microservice architectures, there is often no single database responsible for an entire business workflow. In such cases, ACID guarantees are typically limited to individual services, while cross-service coordination is achieved through patterns such as Saga and eventual consistency.
