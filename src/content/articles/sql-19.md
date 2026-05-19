---
title: Storage Engines (InnoDB vs MyISAM)
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


## InnoDB (Default)

- ACID compliant
- Row-level locking
- Foreign keys
- MVCC

## MyISAM (Legacy)

- Table-level locking
- No foreign keys
- Mostly deprecated

---

# Performance Tips

1. Always use InnoDB
2. Index foreign keys
3. Avoid SELECT *
4. Use composite indexes correctly
5. Prefer keyset pagination
6. Analyze slow queries with EXPLAIN
7. Tune:

```
SHOW VARIABLESLIKE'innodb_buffer_pool_size';
```