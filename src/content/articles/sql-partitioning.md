---
title: Partitioning in MySQL
meta_title: MySQL Table Partitioning Guide | CS Primer
description: Learn MySQL partitioning techniques to improve scalability, manage large datasets, and optimize performance.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

Partitioning splits a large table into smaller physical sections called partitions.

Even though the table appears as a single table to applications, MySQL internally stores the data across multiple partitions.

Partitioning is mainly used for very large datasets. time-series data, logs and archival workload.

---

## Why Partitioning Matters ?

As tables grow into millions or billions of rows, operations become slower:
- scans take longer,
- maintenance becomes harder,
- and deleting old data becomes expensive.

Partitioning helps by allowing MySQL to work with smaller subsets of data instead of the entire table.

---

## How Partitioning Works ?

Suppose you store measurements by year. Instead of one massive table **measurements** , you split it into **p2024** and **p2025**.

Each partition stores only rows belonging to that range. Applications still query the table normally.

### Range Partitioning Example

```sql
CREATE TABLE measurements (
  id BIGINT,
  recorded_at DATE
)

PARTITION BY RANGE (YEAR(recorded_at)) (

  PARTITION p2024
    VALUES LESS THAN (2025),

  PARTITION p2025
    VALUES LESS THAN (2026)

);
```

**Example Data Distribution**

| id | recorded_at | Partition |
| -- | ----------- | --------- |
| 1  | 2024-05-10  | p2024     |
| 2  | 2025-03-12  | p2025     |

MySQL automatically places rows into the correct partition.

---

## Partition Pruning

Suppose you run:

```sql
SELECT *
FROM measurements
WHERE recorded_at >= '2025-01-01';
```

MySQL can skip unrelated partitions and scan only **p2025** instead of the entire table.

---

## Common Partitioning Strategies

- RANGE: Splits rows by value ranges. Good for dates, timestamps and numeric rnages.
- LIST: Partitions based on explicit values. Example are countries, regions and categories.
- HASH: Distributed rows evenly using a hash function., useful for balancing large datasets.
- KEY: Similar to HASH but uses MySQL’s internal hashing.
