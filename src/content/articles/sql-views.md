---
title: Views in MySQL
meta_title: MySQL Views Explained | CS Primer
description: Understand MySQL views, virtual tables, query abstraction, and simplifying complex database operations.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

A view is a virtual table created from the result of a SQL query.

Instead of storing data itself, a view stores:
- a query definition,
- and dynamically returns data when queried.

Views help simplify complex queries, improve readability, and restrict access to sensitive data.

---

## Creating a View

```sql
CREATE VIEW active_users AS
SELECT
  id,
  email
FROM users
WHERE is_active = TRUE;
```

This creates a view named *active_users* ., the view behaves similarly to a table even though it is backend of a query.

---

## Querying a View

```sql
SELECT * FROM active_users;
```

MySQL executes the underlying query automatically.

---

## How Views work

Think of a view as a saved SQL query, exposed as a virtual table.

**Example**

```bash
users table
   ↓
filter active users
   ↓
active_users view
```

Applications can query the view directly without knowing the underlying query details.

*Performance Consideration -*
A view simply wraps a query, MySQL still executes the underlying SQL.

---




