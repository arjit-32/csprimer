---
title: Foreign Keys & Relationships in SQL Databases
meta_title: MySQL Foreign Keys & Relationships | CS Primer
description: Understand one-to-one, one-to-many, and many-to-many relationships using foreign keys in MySQL.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

Relational databases organize data into related tables.

For example:
- a user can place many orders,
- a blog post can have many comments,
- a product can belong to a category.

Relationships allow tables to connect with each other while keeping data organized and consistent.

---


## What is a Foreign Key?

A foreign key is a column that references the primary key of another table.

It creates a relationship between two tables and helps enforce **referential integrity**.

Referential integrity means:
- referenced data must exist,
- and relationships remain valid.


### Example 

**Users Table**

| id | name |
|---|---|
| 1 | Alice |


**Orders Table**

| id | user_id | total |
|---|---|---|
| 101 | 1 | 499 |

Here:
- `orders.user_id`
- references `users.id`

This means every order belongs to a valid user.

---

## Creating a Foreign Key

```sql
ALTER TABLE orders
ADD COLUMN user_id BIGINT,

ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id)

ON DELETE CASCADE;
```

Breaking Down the Query - 

- FOREIGN KEY (user_id) - Defines the foreign key column in the current table.
- REFERENCES users(id) - Specifies the referenced table and the referenced primary key column.
- ON DELETE CASCADE - Automatically deletes related rows when the parent row is deleted.

---

## Why Foreign Keys Matter

Foreign keys help prevent invalid data.

Without foreign keys:

- orders could reference non-existent users,
- relationships could break,
- and data consistency problems become common.

Foreign keys enforce rules directly at the database level.

---

## Relationship Types

- One-to-Many

Example: one user → many orders
Implemented using: a foreign key in the child table.

- One-to-One

Example: one user → one profile
Usually implemented using: a foreign key with a UNIQUE constraint.

- Many-to-Many

Example: students ↔ courses
Implemented using: a junction table.

```sql
CREATE TABLE student_courses (
  student_id BIGINT,
  course_id BIGINT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);
```

---

## Common Foreign Key Actions

| Action      | Behavior                                 |
| ----------- | ---------------------------------------- |
| `CASCADE`   | Automatically update/delete related rows |
| `SET NULL`  | Set foreign key to `NULL`                |
| `RESTRICT`  | Prevent deletion if related rows exist   |
| `NO ACTION` | Similar to `RESTRICT` in MySQL           |


**Example: SET NULL**

```sql
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE SET NULL
```

If a user is deleted - related orders remain, but user_id becomes NULL.
