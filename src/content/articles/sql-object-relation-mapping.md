---
title: Introduction to ORMs
meta_title: Introduction to ORMs | CS Primer
description: Learn what Object Relational Mappers are, their benefits, trade-offs, and how they simplify database development.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---


An Object-Relational Mapper (ORM) is a programming technique (or library) that lets developers interact with relational databases (like MySQL, PostgreSQL, Oracle, SQL Server) using objects in their programming language instead of writing raw SQL.


---

## Why ORMs exists

Applications are usually written using objects, classes, and programming language data structures.

Relational databases, however, store data in tables, rows and columns.

ORM bridges that gap between object-oriented code and relational databases.

---

## With and Without an ORM

- Without ORM: You write SQL queries directly 

```sql
SELECT * FROM users WHERE active = true;
```

- With ORM: You call methods on objects and ORM translates that into SQL.

```js
User.find({ active: true })
```

---

## ORM vs Raw SQL

| ORM                         | Raw SQL                       |
| --------------------------- | ----------------------------- |
| Faster development          | More control                  |
| Cleaner abstractions        | Better for complex queries    |
| Easier CRUD operations      | Easier low-level optimization |
| Generates SQL automatically | Manual query writing          |

---

## Examples of ORMs in Different Tech Stack

| Language                | ORM              |
| ----------------------- | ---------------- |
| Java                    | Hibernate        |
| Python                  | SQLAlchemy       |
| JavaScript / TypeScript | Prisma           |
| JavaScript / TypeScript | Sequelize        |
| Ruby                    | Active Record    |
| PHP                     | Laravel Eloquent |
| C#                      | Entity Framework |


Each ORM has its own philosophy:
- Hibernate (Java): Very feature-rich, supports lazy loading, caching, complex mappings.
- SQLAlchemy (Python): Flexible, lets you mix ORM with raw SQL.
- Prisma (JS/TS): Type-safe, modern, schema-first approach
