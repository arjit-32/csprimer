---
title: Common Table Expressions
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
WITH active_usersAS (
SELECT*FROM usersWHERE is_active=TRUE
)
SELECT*FROM active_users;
```

## Recursive

```
WITHRECURSIVE org_chartAS (
SELECT id, name, manager_id
FROM employees
WHERE manager_idISNULL

UNIONALL

SELECT e.id, e.name, e.manager_id
FROM employees e
JOIN org_chart ocON e.manager_id= oc.id
)
SELECT*FROM org_chart;
```