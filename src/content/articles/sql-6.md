---
title: CRUD Operations
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

## Insert

```
INSERT INTO users (full_name, age)
VALUES ('Arjit',25);

INSERT INTO users (full_name, age)
VALUES ('Bob',30), ('Charlie',22);
```

Get last inserted ID:

```
SELECT LAST_INSERT_ID();
```

---

## Upsert

```sql
INSERT INTO users (email, full_name, age)
VALUES ('alice@example.com','Alice',31)
ON DUPLICATE KEY UPDATE
  full_name=VALUES(full_name),
  age=VALUES(age);
```

---

## Update

```
UPDATE users
SET age=26
WHERE full_name='Alice';
```

---

## Delete

```
DELETE FROM users
WHERE email='spam@example.com';
```

MySQL supports:

```
DELETE FROM logs
WHERE created_at<'2023-01-01'
LIMIT10000;
```