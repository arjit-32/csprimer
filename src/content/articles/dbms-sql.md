---
title: SQL (Structured Query Language)
author: Arjit Sharma
meta_title: ss
description: ss
series: dbms
categories: ["Core-CS"]
---

Now that you conceptually understand querying with relational algebra, let’s move to its practical application.

## What is SQL?

SQL (Structured Query Language) is the standard way to interact with relational databases - defining, manipulating, and controlling data without worrying about internal storage details.
You specify *what result you want,* the DBMS figures out *how to get it.*.

**SQL Is Declarative, not procedural**

This means:

- You don’t specify loops or execution steps
- You describe the desired result
- The DBMS chooses the best execution plan

This separation is what allows databases to scale and optimize queries automatically.

---

## SQL Commands

**Data Definition Language (DDL)**

Used to define and modify database structure. DDL changes the *schema*, not the data.

Examples:

```sql

CREATE TABLE Student (...);
ALTER TABLE StudentADD email;
DROPTABLE Student;
```

**Data Manipulation Language (DML)**

Used to insert, update, delete, and retrieve data. This is the most commonly used part of SQL.

Examples:

```sql

INSERT INTO StudentVALUES (...);
UPDATE StudentSET grade='A';
DELETE FROM StudentWHERE id=10;
SELECT*FROM Student;
```

**Transaction Control Language (TCL)**

Used to manage transactions. These commands decide when changes become permanent.

Examples:

```sql

COMMIT;
ROLLBACK;
SAVEPOINT;
```

**Data Control Language (DCL)**

Used for access control and security. DCL ensures only authorized users access data.

Examples:

```sql
GRANT SELECTON Student TO user;
REVOKE INSERT FROM user;
```

---

## The SELECT Query

The `SELECT` statement retrieves data from one or more tables.

Basic structure:

```sql

SELECT columns FROM table
WHERE condition;
```

Execution order of a Query ->

- FROM
- WHERE
- GROUP BY
- HAVING
- SELECT
- ORDER BY

SQL is written top-down, but executed logically bottom-up.

---

## Filtering and Sorting Data

**WHERE -** Filters rows before grouping.

```sql
SELECT * FROM Student WHERE age>18;
```

**ORDER BY** - Sorts the result.

```sql
SELECT * FROM Student ORDER BY name ASC;
```

---

## Aggregation and Grouping

Aggregate functions summarize data.
Common functions are : *COUNT , SUM , AVG , MIN , MAX*

**GROUP BY -** Groups rows before aggregation.

```sql
SELECT dept,COUNT(*) FROM Employee GROUP BY dept;
```

**HAVING -** Filters groups, not rows.

```sql
SELECT dept,COUNT(*) FROM Employee GROUP BY dept HAVING COUNT(*)>5;
```

> WHERE filters rows, HAVING filters groups

---

## Joins in SQL

Joins combine rows from multiple tables.

**INNER JOIN -** Returns matching rows.

```sql

SELECT *
FROM Orders o
JOIN Users u ON o.user_id= u.id;
```

**LEFT JOIN -** Returns all rows from left table + matches from right. Used when related data may be missing.

**RIGHT & FULL JOIN -** Less common but useful in reporting scenarios. 

---

## Subqueries

A subquery is a query inside another query. They are expressive but sometimes less efficient than joins.

Example:

```sql

SELECT name FROM Student
WHERE id IN ( SELECT student_idFROM Enrollment );
```

*Subqueries can appear in: WHERE , FROM , SELECT*

---

## Constraints in SQL

SQL enforces relational rules through constraints.

Common ones:

- *PRIMARY KEY*
- *FOREIGN KEY*
- *UNIQUE*
- *NOT NULL*
- *CHECK*

Constraints ensure data correctness at the database level, not just in application code.

---

## NULLs in SQL

NULL means **unknown or missing**, not zero or empty.

Important rules:

- `NULL = NULL` is false
- Use `IS NULL`, not `= NULL`
- Aggregates ignore NULL values (except COUNT*)

NULL handling is a common source of bugs and interview questions.

---

## Conclusion

SQL stands as the practical bridge between database theory and real-world systems. Modern databases enrich SQL with advanced features such as: Index hints , Window functions, JSON support and Stored procedures

Yet despite these extensions, core ideas remain unchanged across systems.
