---
title: Partitioning
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


```
CREATETABLE measurements (
  id BIGINT,
  recorded_atDATE
)
PARTITIONBY RANGE (YEAR(recorded_at)) (
  PARTITION p2024VALUES LESS THAN (2025),
  PARTITION p2025VALUES LESS THAN (2026)
);
```