---
title: SELECT Queries
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


## Basic

```
SELECT * FROM users;
SELECT id, email FROM users;
```

---

## WHERE

```
SELECT * FROM users WHERE age>25;
SELECT * FROM users WHERE email LIKE '%gmail.com';
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE age IS NULL;
```

---

## ORDER BY

```
SELECT * FROM users ORDERBY created_at DESC;
SELECT * FROM users ORDERBY country ASC, age DESC;
```

---

## Pagination

```
SELECT * FROM users ORDERBY id LIMIT 10 OFFSET 20;
```

Keyset pagination:

```
SELECT * FROM users
WHERE id>100
ORDERBY id
LIMIT 10;
```