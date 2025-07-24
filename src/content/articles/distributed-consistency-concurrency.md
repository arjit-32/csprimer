---
title: Consistency & Concurrency Control
meta_title: Consistency and Concurrency Control in Distributed Systems | CS Primer
description: Dive into the principles of consistency and concurrency control in distributed systems. Learn how to manage data integrity and synchronization in 2025’s distributed environment.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

A distributed system must ensure that the following key properties hold even in the presence of failures.

- Atomicity - Either all operations of a transaction are executed or none. *Difficult due to partial failures.*
- Isolation - Concurrent transactions should not interfere with each other. *Difficult due to concurrency issues.*
- Consistency - The system must remain in a valid state after operations. *Difficult due to network asynchrony.*

## Consistency Model

A theoretical model which determines how "in sync" everyone's view of the data is.

![Untitled-2024-11-01-1228.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1742840765/Untitled-2024-11-01-1228_qdvr2q.png)

| **Consistency Model** | **Behavior** | **Example** |
| --- | --- | --- |
| Strict Consistency (Linearizability) | Every read sees the latest write. | Password changes – logging in with an old password should immediately fail. |
| Sequential Consistency | All processes see operations in some consistent, global order, even if that order differs from real-time. | All users see the same order of edits in a shared document, even if that order isn't the *exact* moment each edit was made.
 |
| Causal Consistency | If A happened before B, all nodes see A before B. | If a person replies to comment, then another person replies., its order should be maintained.  |
| Eventual Consistency | All replicas eventually converge to the same value but may temporarily return stale data. | Amazon DynamoDB, Cassandra – writes propagate eventually. |

## Isolation Levels and Concurrency Anomalies

Concurrency can lead to **anomalies.** 

Anomalies  - 

- Dirty Read : A transaction reads **uncommitted** changes from another transaction.
- Fuzzy Read : A value changes between two reads in the same transaction.
- Phantom Read : A transaction does a read and another transaction writes or removes a data item, so first transaction may be working on stale data.
- Lost Update : Two transactions update the same value without knowing about each other.
- Read Skew : A transaction sees inconsistent data across queries.
- Write Skew : Two transactions read shared data and update based on old values.

**Isolation levels** (ANSI SQL-92 standard) help prevent anomalies created by concurrency issues. 

| **Isolation Level** | **Guarantee** |
| ------------------- | ------------- |
| Serializability | 2 transactions, when executed concurrently, should give the same result as though executed sequentially. |
| Repeatable Read | Data read once in a transaction will not change. |
| Snapshot Isolation | All reads in a transaction see a consistent snapshot of the database. |
| Read Committed | Only committed data is visible to transactions. |
| Read Uncommitted | Transactions can read uncommitted data. |

Serializability prevents all these anomalies.  Higher isolation levels reduce concurrency but improve correctness.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1742840764/image_fyruad.png)

