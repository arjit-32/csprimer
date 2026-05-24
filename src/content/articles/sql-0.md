---
title: Introduction to SQL
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

SQL (Structured Query Language) is the standard language used to interact with relational databases.

Relational databases store data in structured tables made up of:
- rows,
- columns,
- and relationships between tables.

One of the most popular relational database systems is MySQL.

*Other examples include Oracle DB, PostgreSQL, Microsoft SQL Server*

---

## What is an RDBMS?

RDBMS stands for **Relational Database Management System**.

An RDBMS organizes data into tables and allows relationships between them using keys and constraints.

Example:

*Users Table*

| id | name | email |
|---|---|---|
| 1 | Alice | alice@example.com |

*Orders Table*

| id | user_id | product |
|---|---|---|
| 101 | 1 | Laptop |

Here:
- `user_id` references a user,
- creating a relationship between both tables.

This relational structure helps maintain:
- consistency,
- integrity,
- and efficient querying.

---


## The Story of MySQL

- 1995: Created by MySQL AB in Sweden, co-founded by David Axmark, Allan Larsson, and Michael “Monty” Widenius.
- Quickly became popular as part of the LAMP stack (Linux, Apache, MySQL, PHP/Perl/Python), powering dynamic websites.
- 2008: Acquired by Sun Microsystems.
- 2010: Oracle Corporation acquired Sun, raising concerns about open-source stewardship.
- MariaDB forked by Widenius to preserve open-source principles.

---

## The Story of PostgreSQL

- 1986: Originated as the POSTGRES project at the University of California, Berkeley, led by Professor Michael Stonebraker. It was designed as the successor to the Ingres database system.
- 1994: SQL support was added, and the project was renamed Postgres95.
- 1996: Officially became PostgreSQL, combining “Postgres” with “SQL” to highlight its standards compliance.
- 2010s: Widely adopted for enterprise applications, analytics, and geospatial workloads, thanks to extensions like PostGIS.
- 2020s: PostgreSQL surged in popularity, overtaking MySQL as the most widely used open-source database among developers.

---

## Conclusion

- **MySQL**: A proven workhorse that shaped the web era, still powering e-commerce, finance, and legacy applications.
- **PostgreSQL**: The modern favorite, designed for growth. With advanced features, extensibility, and thriving adoption, it has become the go-to database for analytics, AI/ML, geospatial, and enterprise-grade applications.

MySQL teaches the foundations, PostgreSQL unlocks the future. In this particular series we focus on fundamentals of SQL (using MySQL) that can be applied to any RDBMS of the future.
