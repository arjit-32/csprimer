---
title: Indexing in MySQL
meta_title: MySQL Indexing Explained | CS Primer
description: Learn MySQL indexing strategies, index types, and how indexes improve query performance and scalability.
author: Arjit Sharma
series: sql
categories: ["Development"]
draft: false
year: 2025
---

Indexes help databases find rows faster. 

Without indexes, MySQL may need to scan every row in a table to locate matching data. This is called a **Full Table Scan**

*Analogy to understand Indexing*
Indexes act like a book index instead of reading every page, the database can jump directly to relevant rows.


## Basic Index

```sql
CREATE INDEX idx_users_email
ON users(email);
```

This creates an index on the email column.

Queries like following can execute much faster now. 

```sql
SELECT * FROM users WHERE email = 'alice@example.com';
```

---

## Composite Index

A composite index includes multiple columns.

```sql
CREATE INDEX idx_users_country_ageON users(country, age);
```

**Left-Most Prefix Rule**

MySQL can efficiently use the index for:
- country
- country + age

But not efficiently for:
- age alone.

This is called the left-most prefix rule.

---

## Unique Index

A unique index improves lookup performance and prevents duplicate values.

```sql
CREATE UNIQUE INDEX idx_users_email_unique
ON users(email);
```

---


## Full-Text Index

Full-text indexes are designed for text searching.

```sql
CREATE FULLTEXT INDEX idx_articles_body
ON articles(body);
```

*Search Using Full-Text Index*

```sql
SELECT *
FROM articles
WHERE MATCH(body)
AGAINST ('mysql performance');
```

This searches article content efficiently. Full-text indexes are useful for search systems, blogs, documentation and content platforms.

