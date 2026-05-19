---
title: Foreign Keys & Relationships
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---
## Foreign Keys (InnoDB Required)

```
ALTER TABLE orders
ADD COLUMN user_id BIGINT,
ADD CONSTRAINT fk_orders_user
FOREIGN KEY (user_id)
REFERENCES users(id)
ON DELETE CASCADE;
```