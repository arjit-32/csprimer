---
title: Views
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


```
CREATE VIEW active_usersAS
SELECT id, email
FROM users
WHERE is_active=TRUE;

SELECT*FROM active_users;
```