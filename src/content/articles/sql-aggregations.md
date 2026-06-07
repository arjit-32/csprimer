---
title: SQL Aggregations
meta_title: MySQL Aggregation Functions | CS Primer
description: Learn MySQL aggregation functions such as COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING clauses.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

Aggregations combine multiple rows into summarized results.

Instead of returning individual records, aggregation queries answer questions like:

- How many users exist?
- What is the average order value?
- Which country has the most users?
- What is the total revenue?

Aggregation is heavily used in *analytics, dashboards, reporting, and business intelligence systems*.

---

##  Common Aggregate Functions

| Function | Purpose |
|---|---|
| `COUNT()` | Count rows |
| `SUM()` | Add numeric values |
| `AVG()` | Calculate averages |
| `MIN()` | Smallest value |
| `MAX()` | Largest value |


### Example - Counting Rows

```sql
SELECT COUNT(*) FROM users;
```

This returns the total number of rows in the users table.

---

## Grouping Data with GROUP BY

GROUP BY combines rows that share the same value.

Example: grouping users by country.


```sql
SELECT
  country,
  COUNT(*)
FROM users
GROUP BY country;
```

Results -

| country | COUNT(*) |
| ------- | -------- |
| India   | 120      |
| USA     | 80       |
| Canada  | 45       |


Instead of returning every user row: SQL groups rows by country, then calculates counts for each group.

---

## Understanding Group By

Without GROUP BY:

```sql
SELECT COUNT(*) FROM users;
```

returns: one total count.


With GROUP BY country:
SQL creates separate groups for each country, then runs the aggregation function per group.

This is one of the most important concepts in SQL.

---

## Filtering Groups with Having

HAVING filters aggregated groups.

```sql
SELECT
  country,
  COUNT(*)
FROM users
GROUP BY country
HAVING COUNT(*) > 100;
```

Returns only countries with more than 100 users.


### Where vs Having

| Clause   | Filters           |
| -------- | ----------------- |
| `WHERE`  | Individual rows   |
| `HAVING` | Aggregated groups |


---

## Aggregation Execution Flow

A simplified execution order: 

```bash
FROM
WHERE
GROUP BY
HAVING
SELECT
ORDER BY
LIMIT
```

Understanding this helps explain why HAVING exists, and why aggregate functions behave differently from normal queries.

