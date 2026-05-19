---
title: Window Functions in MySQL
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

```
SELECT
  name,
  department,
  salary,
  RANK() OVER (PARTITIONBY departmentORDERBY salaryDESC)AS rank
FROM employees;
```

Running total:

```
SELECT
  id,
  amount,
  SUM(amount) OVER (ORDERBY created_at)AS running_total
FROM payments;
```