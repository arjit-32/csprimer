---
title: Table Design & Constraints
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

# Table Operations

## Create Table

```sql
CREATE TABLE users (
  id BIGINT AUTO_INCREMENTPRIMARYKEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  age INT CHECK (age>=0AND age<=150),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULTCURRENT_TIMESTAMPONUPDATECURRENT_TIMESTAMP
);
```

---

## Alter Table

```
ALTER TABLE users RENAME TO customers;
ALTER TABLE customers ADD COLUMN phoneVARCHAR(20);
ALTER TABLE customers MODIFY ageSMALLINT;
ALTER TABLE customers DROP COLUMN phone;
```

---

