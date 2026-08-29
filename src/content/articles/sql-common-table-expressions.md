---
title: Common Table Expressions
meta_title: MySQL Common Table Expressions (CTEs) | CS Primer
description: Learn Common Table Expressions in MySQL for writing readable, reusable, and recursive SQL queries.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

A Common Table Expression (CTE) is a temporary named result set that exists only for the duration of a query.

CTEs help:
- simplify complex queries,
- improve readability,
- and break large SQL statements into logical steps.

They are defined using the `WITH` keyword.

---

## Why Use CTEs?

CTEs make SQL more modular and easier to understand. Think of them like temporary query variables or reusable query blocks.

---

## Basic CTE Example

```sql
WITH active_users AS (

  SELECT *
  FROM users
  WHERE is_active = TRUE

)

-- Can use CTE now
SELECT * FROM active_users;
```

**Understanding the Query**

- WITH active_users is The CTE., it stores all active users temporarily.
- Within parenthesis (), contains the query whose result set, we want our CTE to hold.
- Using the CTE: Instead of repeating, you can define it once and reuse it.

---

## Recursive CTEs

Recursive CTEs allow queries to reference themselves. They are commonly used for:
- hierarchical data
- organization charts
- tree structures
- categories
- graph traversal

**Example: Organization Hierarchy**

Suppose employees have managers:

| id | name    | manager_id |
| -- | ------- | ---------- |
| 1  | Alice   | NULL       |
| 2  | Bob     | 1          |
| 3  | Charlie | 2          |

This forms a hierarchy:

```bash
Alice
 └── Bob
      └── Charlie
```


### Recursive CTE Example

```sql
WITH RECURSIVE org_chart AS (

  -- Base query
  SELECT
    id,
    name,
    manager_id
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive query
  SELECT
    e.id,
    e.name,
    e.manager_id
  FROM employees e

  JOIN org_chart oc
    ON e.manager_id = oc.id

)

SELECT * FROM org_chart;
```
