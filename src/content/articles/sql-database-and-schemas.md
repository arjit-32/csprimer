---
title: Databases and Schemas in MySQL
meta_title: MySQL Databases & Schemas | CS Primer
description: Learn how databases and schemas work in MySQL, and organize data structures for scalable applications.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

A database is a logical container used to organize related tables, views, indexes, and other database objects.

For example:
- an e-commerce application may use a `shop` database,
- a blogging platform may use a `blog` database.

Inside a database, you typically store tables related to that application.

---

## Database vs Schema in MySQL

In MySQL:

> Database = Schema
> 

Both terms are effectively interchangeable.

---

## Creating a Database

```sql
CREATE DATABASE shop;
```

This creates a new database named shop.

---

## Listing Databases

```sql
SHOW DATABASES;
```

Displays all databases available on the MySQL server.

---

## Switch database:

```sql
USE shop;
```

This selects the shop database as the active database. All future queries will run against this database until another database is selected.

---

## Deleting a Database

```sql
DROP DATABASE shop;
```

This permanently deletes: the database, all tables, and all stored data inside it.

---

## Real-World Production Practices

When working in production environments, you’ll often see:

```sql
CREATE DATABASE IF NOT EXISTS shop;

CREATE DATABASE shop
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```
- IF NOT EXISTS prevents errors if the database already exists.
- CHARACTER SET utf8mb4 ensures proper support for modern Unicode (including emojis).
- COLLATE utf8mb4_unicode_ci defines how string comparisons and sorting are handled.

---

## Important Note About Other Databases

In some database systems like PostgreSQL: databases and schemas are different concepts. A database can contain multiple schemas, and schemas help organize tables into namespaces. 
- Example: You might have a sales schema and a hr schema inside one database, keeping their tables logically separated.
