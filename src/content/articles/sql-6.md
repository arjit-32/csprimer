---
title: CRUD Operations in MySQL
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

CRUD stands for Create, Read, Update and Delete. These are the four basic operations performed on database records.

In SQL to do this is - 

- `INSERT` → Create data
- `SELECT` → Read data
- `UPDATE` → Modify data
- `DELETE` → Remove data

---

## Insert Data

```sql

-- Insert single row
INSERT INTO users (full_name, age)
VALUES ('Arjit',25);

-- Insert multiple rows
INSERT INTO users (full_name, age)
VALUES ('Bob',30), ('Charlie',22);
```

**Get last inserted ID:**

```sql
SELECT LAST_INSERT_ID();
```

This returns the last auto-generated AUTO_INCREMENT value for the current connection.

---

## Read Data

```sql
-- Select all users
SELECT full_name, age
FROM users;

-- Select with condition
SELECT full_name, age
FROM users
WHERE is_deleted = false;
```

---

## Upsert (Insert or Update)

An upsert means insert the row if it does not exist, otherwise update the existing row.

MySQL supports this using:

```sql
INSERT INTO users (
  email,
  full_name,
  age
)
VALUES (
  'alice@example.com',
  'Alice',
  31
)

ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  age = VALUES(age);
```

This works when a *PRIMARY KEY* or *UNIQUE constraint* would otherwise cause a duplicate key error.

---

## Update Data

```sql
UPDATE users
SET age = 26
WHERE full_name = 'Alice';
```

This updates Alice’s age to 26.


---

## Delete Data

```sql
DELETE FROM users
WHERE email = 'spam@example.com';
```

**Batch Deletes with LIMIT**

Deleting millions of rows at once can lock tables, create heavy disk activity and other issues so batch deletes are safer for large production database.

```sql
DELETE FROM logs
WHERE created_at<'2023-01-01'
LIMIT 10000;
```

This deletes old rows in smaller batches instead of removing everything at once.

---


## Important Warning About UPDATE & DELETE

Always be careful with UPDATE and DELETE queries, without a WHERE clause:

```sql
UPDATE users SET age = 26;
```

every row in the table would be updated.


**Soft Deletes**

In production systems it is very common to use soft delete instead of deleting the data. Instead of deleting rows, mark them as:

```sql
is_deleted = true
```

