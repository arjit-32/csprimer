---
title: Window Functions in MySQL
meta_title: MySQL Window Functions Guide | CS Primer
description: Master MySQL window functions including RANK, ROW_NUMBER, LEAD, LAG, and analytical query techniques.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


Window functions perform calculations across a set of related rows without collapsing them into a single row. Thankfully MySQL 8.0 did introduce them so we can continue practicing our SQL skills without changing the database.

Unlike `GROUP BY`:
- window functions preserve individual rows,
- while still allowing analytical calculations.

There are commonly used for - ranking, leaderboards, running totals etc.

---

## Why Window Functions Matter

Suppose you want each employee’s salary along with their rank inside their department.

With normal aggregation rows would collapse into grouped results.

While Window functions, allow detailed rows and analytical calculations at same time.

---

## Ranking Rows

```sql
SELECT
  name,
  department,
  salary,

  RANK() OVER (
    PARTITION BY department
    ORDER BY salary DESC
  ) AS rank

FROM employees;
```

**Understanding the Query**

- PARTITION BY department : Splits rows into groups based on department.
Example partitions Engineering, Sales, HR. T

- ORDER BY salary DESC : Sorts employees within each department by salary. Highest salary receives the best rank.

- RANK() : Assigns rankings to rows.

*Example -*

| name    | department  | salary | rank |
| ------- | ----------- | ------ | ---- |
| Alice   | Engineering | 120000 | 1    |
| Bob     | Engineering | 100000 | 2    |
| Charlie | Engineering | 100000 | 2    |

*tied salaries receive the same rank.*

---


## Running Totals

Window functions are commonly used for cumulative calculations.

```sql
SELECT
  id,
  amount,

  SUM(amount) OVER (
    ORDER BY created_at
  ) AS running_total

FROM payments;
```

Result - 

| id | amount | running_total |
| -- | ------ | ------------- |
| 1  | 100    | 100           |
| 2  | 200    | 300           |
| 3  | 150    | 450           |


Each row shows the payment amount plus the cumulative total up to that row.

---

## Common Window Functions

| Function       | Purpose              |
| -------------- | -------------------- |
| `RANK()`       | Ranking with gaps    |
| `DENSE_RANK()` | Ranking without gaps |
| `ROW_NUMBER()` | Unique row numbering |
| `SUM()`        | Running totals       |
| `AVG()`        | Moving averages      |
| `LAG()`        | Access previous row  |
| `LEAD()`       | Access next row      |
