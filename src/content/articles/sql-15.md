---
title: Transactions and Isolation Levels
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


## What Are Transactions? 

A transaction is a group of SQL operations that execute as a single unit of work.

Either:
- all operations succeed,
- or none of them are applied.

Transactions are critical for maintaining data consistency, especially in systems involving payments, banking, inventory and bookings.

---

## Why Transactions Matter ?

Imagine transferring money between two accounts:

1. Deduct money from Account A
2. Add money to Account B

If the database crashes after step 1 but before step 2:
- money disappears,
- and the database becomes inconsistent.

Transactions prevent this problem.

---

## Basic Transaction Example

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 100
WHERE user_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE user_id = 2;

COMMIT;
```

This transaction:
- deducts 100 from one account,
- adds 100 to another,
- and commits both changes together.

---

## COMMIT vs ROLLBACK

**COMMIT** - Permanently saves all changes made inside the transaction.

```sql
COMMIT;
```

**ROLLBACK** - Cancels all uncommitted changes and restores the previous state. Useful when errors occur, validations fail or business rules are violated.

```sql
ROLLBACK;
```

---

## ACID Properties

Transactions are built around the ACID principles.

| Property    | Meaning                                             |
| ----------- | --------------------------------------------------- |
| Atomicity   | All operations succeed or fail together             |
| Consistency | Data remains valid after transactions               |
| Isolation   | Concurrent transactions do not interfere improperly |
| Durability  | Committed data survives crashes                     |

These guarantees are one of the biggest reasons relational databases are trusted for critical systems.

---

## Row Locking

When multiple users access the same rows simultaneously, conflicts can occur. MySQL uses locks to coordinate concurrent access safely.

### Locking Rows with FOR UPDATE

```sql
SELECT *
FROM accounts
WHERE user_id = 1
FOR UPDATE;
```

This:
- locks the selected rows,
- prevents conflicting updates,
- and ensures consistency until the transaction finishes.

Other transactions attempting to modify the same rows may wait or fail depending on lock behavior.


### Why Row Locking Matters ?

Suppose two users simultaneously try to withdraw money from the same account. Without locking both transactions may read the same balance causing incorrect results.

Row Locking helps prevent these race conditions.

---

## Isolation Levels

Isolation levels control how transactions interact with each other.

They define:
- what changes transactions can see,
- and how concurrent reads/writes behave.

Higher isolation improves consistency but may reduce concurrency and performance.

Setting Isolation Level -

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
```

### Isolation Levels in MySQL: 

- **READ UNCOMMITTED** - The weakest isolation level. Transactions can see uncommitted changes from other transactions. Rarely used in production systems.
- **READ COMMITTED** - Transactions only see committed changes. Common in many database systems.
- **REPEATABLE READ (default)** - Ensures repeated reads inside the same transaction return consistent results. This is the default isolation level in MySQL.
- **SERIALIZABLE** - The strictest isolation level. Transactions behave as if executed one at a time. Provides strongest consistency guarantees but reduces concurrency, increases locking and can hurt performance.


### Common Concurrency Problems
- Dirty Read - A transaction reads uncommitted data from another transaction.
- Non-Repeatable Read - A transaction reads the same row twice and gets different values because another transaction modified the row in between.
- Phantom Read - A transaction reruns a query and sees new rows added by another transaction.
