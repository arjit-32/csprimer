---
title: Joins
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

## INNER JOIN

```
SELECT u.full_name, o.id, o.total
FROM users u
JOIN orders oON o.user_id= u.id;
```

## LEFT JOIN

```
SELECT u.full_name, o.id
FROM users u
LEFTJOIN orders oON o.user_id= u.id;
```