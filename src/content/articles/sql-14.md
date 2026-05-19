---
title: Query Performance
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---
## EXPLAIN

```
EXPLAINSELECT*FROM usersWHERE email='alice@example.com';
```

Look for:

- type: ALL → full scan (bad)
- type: ref / range → good
- key: index used