---
title: Storage Engines in MySQL (InnoDB vs MyISAM)
meta_title: MySQL Storage Engines Explained | CS Primer
description: Learn MySQL storage engines including InnoDB and MyISAM, and understand their features and use cases.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

A storage engine is the underlying component responsible for:
- storing table data,
- managing indexes,
- handling locks,
- and controlling transaction behavior.

In MySQL, different storage engines provide different features and performance characteristics.

Historically, MySQL supported multiple storage engines for different workloads.

Today, most modern applications primarily use:

---

## InnoDB (Default and Recommended)

It is designed for reliability, concurrency, transactions and production workloads.

### Key Features of InnoDB
- ACID Compliance
- Row-level locking - InnoDB locks individual rows instead of entire tables.
- Foreign keys Support
- MVCC (Multi-Version Concurrency Control) - Allows readers and writers to operate concurrently while reducing locking conflicts.


---

## MyISAM (Legacy Storage Engine)

It was historically popular because was simpler, lightweight and fast for certain read-heavy workloads. However, it lacks many modern database features.

### Limitation of MyISAM
- Table-level locking - MyISAM locks entire tables during writes. This reduces concurrency significantly under heavy workloads.
- No foreign key support - Referential integrity must be handled manually by the application.
- No Transactions - MyISAM does not support transactions, rollbacks or ACID gurantees.

---

## Creating a Table with a Specific Engine

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255)
)
ENGINE = InnoDB;
```
