---
title: Table Design and Constraints
meta_title: MySQL Table Design & Constraints | CS Primer
description: Learn table design principles, primary keys, unique constraints, defaults, and data integrity in MySQL.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

Most of the time you spend on your table, getting data from a table, inserting or deleting from it. In this article lets learn about tables.

## What is a Table ?

Tables are the core building blocks of relational databases.

A table stores data in:
- rows,
- columns,
- and constraints.

Example:
- a `users` table stores user records,
- an `orders` table stores purchase records.

Each column has: a name, a data type, and optional rules called constraints.

---

## Why Constraints Matter

Constraints enforce rules on your data.

They help ensure:
- consistency,
- correctness,
- and integrity.

*For example - preventing duplicate emails, disallowing negative ages or ensuring required fields are never empty.*

Without constraints, invalid data can easily enter the database.

---

## Table Operations

### Creating a Table

```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  email VARCHAR(255) UNIQUE NOT NULL,

  full_name VARCHAR(255) NOT NULL,

  age INT CHECK (age >= 0 AND age <= 150),

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  updated_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
```

**Understanding the Constraints**

- PRIMARY_KEY - uniquely identifies each row, cannot contain NULL, automatically creates an index.
- AUTO_INCREMENT - Automatically generates increasing numeric IDs.
- NOT NULL - Prevents empty values.
- UNIQUE - Prevents duplicate values.
- CHECK - Restricts values based on conditions.
- DEFAULT - Provides a default value if none is specified during insertion.
- DEFAULT CURRENT_TIMESTAMP - Automatic Timestamps when the row was created.
- ON UPDATE CURRENT_TIMESTAMP - Automatically updates Timestamp whenever the row changes.


### Altering Tables

Databases evolve over time. ALTER TABLE allows you to: rename tables, add columns, modify columns and remove columns.

```sql
ALTER TABLE users RENAME TO customers;

ALTER TABLE customers ADD COLUMN phone VARCHAR(20);

ALTER TABLE customers MODIFY age SMALLINT;

ALTER TABLE customers DROP COLUMN phone;
```

**Important Note About Schema Changes**

Schema changes on large production tables can be expensive. These operations may lock tables or take significant time depending on database size. In real systems, schema migrations are usually managed carefully using migration tools.


