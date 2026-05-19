---
title: Aggregations
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

```
SELECTCOUNT(*)FROM users;

SELECT country,COUNT(*)
FROM users
GROUPBY country
HAVINGCOUNT(*)>100;
```