---
title: Transaction & Concurrency Control 
author: Arjit Sharma
meta_title: ss
description: ss
series: ["dbms"]
categories: ["Core-CS"]
---

Transactions and concurrency in DBMS ensure data consistency and integrity when multiple operations run simultaneously.

## What is a Transaction?

A transaction is a sequence of database operations treated as one logical unit of work. Either all operations succeed, or none of them take effect.

**Example:**

- Debit money from one account
- Credit money to another account

If either step fails, the database must rollback to the original state.

---

## Why Transactions Are Necessary

Databases are shared systems with many users, queries, and possible failures.

Without transactions:

- Data could be corrupted by partial updates
- Crashes could leave the database inconsistent
- Concurrent users could overwrite each other’s work

Transactions ensure operations remain **safe, consistent, and predictable**.

---

## ACID Properties

Transactions are governed by ACID, the core correctness guarantees of a DBMS.

**Atomicity -** A transaction is all or nothing. If one operation fails, all changes are undone.

**Consistency -**  A transaction takes the database from one valid state to another valid state. All constraints, rules, and invariants must hold after commit.

**Isolation -**  Concurrent transactions must not interfere with each other. Each transaction should behave as if it were running alone, even when many run in parallel.

**Durability -**  Once a transaction commits, its changes persist even after crashes or restarts This is usually achieved using logs and persistent storage.

---

## Transaction States

A transaction typically moves through these states:

- **Active** - executing operations
- **Partially Committed** - last statement executed
- **Committed** - changes made permanent
- **Failed** - error occurred
- **Aborted** - rolled back to original state

Understanding states helps reason about failures and recovery.

---

## Concurrency Problems

When transactions run simultaneously, several anomalies can occur.

**Dirty Read -** One transaction reads data written by another **uncommitted** transaction. If the writer rolls back, the reader has seen invalid data.

**Non-Repeatable Read -** A transaction reads the same row twice and gets different values because another transaction modified it in between.

**Phantom Read -** A transaction re-runs a query and sees new rows inserted by another transaction. These problems arise purely due to concurrency, not bad queries.

**Lost Update -** Two transactions update the same data. One update overwrites the other. Result: one change silently disappears.

---

## Concurrency Control Techniques

DBMS uses concurrency control to prevent these anomalies.

**Lock-Based Protocols** 

Transactions acquire locks before accessing data.

- Shared lock (S) - for reading
- Exclusive lock (X) - for writing

Rules ensure that No conflicting operations occur and Consistency is preserved.

Downside: locks can cause deadlocks. *Deadlocks - A deadlock occurs when T1 waits for T2 while T2 waits for T1. DBMS detects deadlocks and resolves them by aborting one transaction.*


**Timestamp-Based Protocols**

Each transaction gets a timestamp. Operations are ordered based on timestamps to ensure correctness without locks. Useful in systems where conflicts are rare.

**MVCC (Multi-Version Concurrency Control)**

Instead of overwriting data:

- DBMS keeps multiple versions
- Readers see older committed versions
- Writers create new versions

Used by modern databases like PostgreSQL. MVCC improves read performance and reduces lock contention.

---

## Isolation Levels

SQL defines isolation levels that control how much isolation a transaction gets.

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Lost Update |
| --- | --- | --- | --- | --- |
| Read Uncommitted | ✅ | ✅ | ✅ | ✅ |
| Read Committed | ❌ | ✅ | ✅ | ✅ |
| Repeatable Read | ❌ | ❌ | ✅ | ✅ |
| Serializable | ❌ | ❌ | ❌ | ❌ |

Higher isolation = fewer anomalies, but lower concurrency. So only choose Serializable if system needs strict correctness and not concurrency. 

---

## Transaction Querying in SQL

Transactions are controlled using:

```sql
BEGIN;
-- SQL operations
COMMIT;
```

Or, on failure:

```sql
ROLLBACK;
```

Savepoints allow partial rollbacks inside a transaction.

```sql
BEGIN;
INSERT INTO orders VALUES (...);

SAVEPOINT sp1;

INSERT INTO payments VALUES (...);

ROLLBACK TO sp1;   -- undo only the payment insert
COMMIT;            -- commit the rest
```

---

## Recovery & Logging

To guarantee durability and atomicity, a DBMS relies on logging mechanisms:

- Write-ahead logging (WAL) - All changes are recorded in a log before being applied to the database.
- Redo logs - Used to reapply committed changes that might not have been fully written to disk before a failure.
- Undo logs - Used to roll back incomplete or uncommitted transactions.

How Recovery Works?

On restart after a crash, the DBMS scans the logs. **Redo** is applied to all committed transactions that weren’t fully persisted. **Undo** is applied to any transactions that were incomplete or rolled back.

---

## Conclusion

So to sum up the chapter

- Transactions → Correctness
- Concurrency Control → Safe parallelism
- Recovery → Crash tolerance

Together, these mechanisms form the backbone of modern database systems. They ensure that thousands of users can read and write data simultaneously *without corruption or inconsistency*.