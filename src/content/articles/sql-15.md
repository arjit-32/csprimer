---
title: Transactions & Isolation Levels
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---
# Transactions

```
STARTTRANSACTION;

UPDATE accountsSET balance= balance-100WHERE user_id=1;
UPDATE accountsSET balance= balance+100WHERE user_id=2;

COMMIT;
-- or
ROLLBACK;
```

---

## Row Locking

```
SELECT*FROM accounts
WHERE user_id=1
FORUPDATE;
```

---

# Isolation Levels

```
SETTRANSACTIONISOLATIONLEVELREAD COMMITTED;
```

Levels supported:

- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ (default)
- SERIALIZABLE