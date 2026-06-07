---
title: SELECT Queries in MySQL
meta_title: MySQL SELECT Queries Explained | CS Primer
description: Master MySQL SELECT statements, filtering, sorting, limiting, and retrieving data efficiently from tables.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

`SELECT` is the most commonly used SQL statement.

It is used to:
- retrieve data,
- filter records,
- sort results,
- and paginate datasets.

Most real-world database operations involve reading data efficiently.

---


## Basic SELECT Queries

```sql
-- Get all users
SELECT * FROM users;

-- Get id and email from users
SELECT id, email FROM users;
```

Selecting only required columns is usually better for performance.

---


## Filtering with WHERE Clause

The WHERE clause filters rows based on conditions.

```sql
-- Basic Filtering
SELECT * FROM users WHERE age>25;

-- Pattern Matching with LIKE
SELECT * FROM users WHERE email LIKE '%gmail.com';

-- Range Queries with BETWEEN
SELECT * FROM users WHERE age BETWEEN 20 AND 30;

-- Checking for NULL Values
SELECT * FROM users WHERE age IS NULL;
```

---

## Sorting Results with ORDER BY

```sql
-- Sort by 1 column
SELECT * FROM users ORDERBY created_at DESC;

-- Sort by multiple columns
SELECT * FROM users ORDERBY country ASC, age DESC;
```

---

## Pagination

Pagination is used to fetch data in smaller chunks instead of loading everything at once. Very important for APIs, dashboards and large datasets.


### Offset Pagination

```sql
SELECT * FROM users
ORDER BY id
LIMIT 10 OFFSET 20;
```

This skips the first 20 rows, then returns the next 10 rows.

**Problems with Offset Pagination -**
Offset pagination becomes slower on very large datasets because the database still needs to scan skipped rows internally.


### Keyset Pagination

A more efficient approach is keyset pagination.

```sql
SELECT * FROM users
WHERE id>100
ORDER BY id
LIMIT 10;
```

**Why Kyset Pagination is Faster ?**
Keyset pagination works efficiently with indexes because:
- the database can jump directly to matching rows,
- instead of scanning and discarding previous rows.

This makes it significantly faster for large tables.
This pagination is commonly used in infinite scrolling, large APIs and production backend systems.

