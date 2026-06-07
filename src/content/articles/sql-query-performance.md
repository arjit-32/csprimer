---
title: Query Performance and EXPLAIN
meta_title: MySQL Query Performance Optimization | CS Primer
description: Understand query optimization techniques, execution plans, and performance tuning strategies in MySQL.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

As databases grow:
- slow queries become expensive,
- APIs become slower,
- dashboards lag,
- and servers consume more resources.

Good query performance is essential for scalable applications, backend systems and production databases.

---

## What Does `EXPLAIN` Do?

It shows how MySQL plans to execute a query.

Instead of running the query directly, MySQL displays:
- which indexes are used,
- how tables are scanned,
- estimated row counts,
- and execution strategies.

It is one of the most important tools for debugging slow SQL queries.

**Important EXPLAIN Columns**
- type: Shows how rows are accessed. 

| Value   | Meaning                   |
| ------- | ------------------------- |
| `ALL`   | Full table scan           |
| `ref`   | Indexed lookup            |
| `range` | Range scan using an index |

- key: Shows which index MySQL selected for the query.
*Example - idx_users_email*
If key is NULL, no index was used.

- rows: Estimated number of rows MySQL expects to scan.

---

## Example Interpretation

```sql
EXPLAIN
SELECT *
FROM users
WHERE email = 'alice@example.com';
```

Result -

| type | key             | rows |
| ---- | --------------- | ---- |
| ref  | idx_users_email | 1    |

This means:

- MySQL used the idx_users_email index,
- only a small number of rows were scanned,
- and the query is likely efficient.


**Warning Sign: Full Table Scan**

| type | key  | rows    |
| ---- | ---- | ------- |
| ALL  | NULL | 5000000 |

This means:

- no index was used,
- every row is scanned,
- and performance may degrade badly on large tables.

---

## Common Reasons Indexes are Ignored

Indexes are not always used automatically. Common reasons include querying unindexed columns (obvio), low-selectivity filters, inefficient query patterns.

**Example**
```sql
WHERE email LIKE '%gmail.com'
```

This usually cannot use a normal index efficiently because the query starts with a wildcard.

Better Query Pattern

```sql
WHERE email LIKE 'alice%'
```

---

## Important Perofrmance Tips

- Select Only Required Columns. ( Avoid unnecessary SELECT *)
- Add Indexes Carefully. Indexes improve read performance but: increase storage usage and slow down inserts, updates, and deletes.