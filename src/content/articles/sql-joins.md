---
title: SQL Joins
meta_title: MySQL Joins Explained | CS Primer
description: Understand INNER JOIN, LEFT JOIN, RIGHT JOIN, and other join operations for combining data across tables.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

Joins combine data from multiple tables using related columns. You do remember we learned about Foreign Key in previous article right ? 

---

## What are Joins ?

Joins help us combine information from many tables while fetching data., this is a very powerful feature. 

**Example:**

- users table stores user information

| id | full_name |
|---|---|
| 1 | Alice |
| 2 | Bob |

- orders table stores order information.

| id | user_id | total |
|---|---|---|
| 101 | 1 | 499 |
| 102 | 1 | 299 |


Here `orders.user_id` references `users.id`. This creates a relationship between both tables.
A join allows you to fetch users along with their related orders, in a single query.

---

## INNER JOIN

INNER JOIN returns only rows where matching data exists in both tables.

```sql
SELECT
  u.full_name,
  o.id,
  o.total
FROM users u -- Using alias., so that we can use u instead of users
JOIN orders o
  ON o.user_id = u.id; -- This is Join condition, This tells MySQL how rows should be matched between tables.
```

Result - 

| full_name | id  | total |
| --------- | --- | ----- |
| Alice     | 101 | 499   |
| Alice     | 102 | 299   |

Bob is not included because he has no matching orders.

---

## LEFT JOIN

A LEFT JOIN returns:
- all rows from the left table,
- and matching rows from the right table.

If no match exists, the right-side columns become NULL.

```sql
SELECT
  u.full_name,
  o.id
FROM users u
LEFT JOIN orders o
  ON o.user_id = u.id;
```

Result -

| full_name | id   |
| --------- | ---- |
| Alice     | 101  |
| Alice     | 102  |
| Bob       | NULL |

Bob appears even though he has no orders.

---

## Right Join

A RIGHT JOIN is the opposite of a LEFT JOIN.
- It returns all rows from the right table, 
- and the matching rows from the left table. 
If no match exists, the left-side columns become NULL.

```sql
SELECT
  u.full_name,
  o.id AS order_id,
  o.total
FROM users u
RIGHT JOIN orders o
  ON u.id = o.user_id;
```

Result - 

| full_name | order_id   | total |
| --------- | ---------  | ----- |
| Alice     | 101        | 499   |
| Alice     | 102        | 299   |

If there were orders without a matching user, they would still appear, with full_name = NULL


---

## Cross Join 

A CROSS JOIN returns the Cartesian product of both tables, every row from the first table combined with every row from the second.

```sql
SELECT u.full_name, o.id AS order_id
FROM users u
CROSS JOIN orders o;
```

If you have 2 users and 2 orders, this produces 4 rows (2 × 2).

---

## SELF JOIN

A SELF JOIN is when a table is joined with itself. This is useful for hierarchical data, like employees and managers

```sql
SELECT
  e.full_name AS employee,
  m.full_name AS manager
FROM employees e
JOIN employees m
  ON e.manager_id = m.id;
```