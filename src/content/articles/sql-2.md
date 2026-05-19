---
title: Data Types
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

## Numeric

| Type | Used For |
| --- | --- |
| TINYINT | Small numbers |
| SMALLINT | Small integers |
| INT | Standard integer |
| BIGINT | Large integer |
| DECIMAL(p,s) | Precise decimals (money) |
| FLOAT | Floating-point |
| DOUBLE | Double precision |

Example:

```
price DECIMAL(10,2)
```

---

## Text

| Type | Used For |
| --- | --- |
| CHAR(n) | Fixed length |
| VARCHAR(n) | Variable length |
| TEXT | Large text |
| MEDIUMTEXT | Larger text |
| LONGTEXT | Very large text |

---

## Date & Time

| Type | Description |
| --- | --- |
| DATE | Date only |
| TIME | Time only |
| DATETIME | Date + time |
| TIMESTAMP | UTC timestamp (auto update supported) |
| YEAR | Year value |

Example:

```
created_atTIMESTAMPDEFAULTCURRENT_TIMESTAMP,
updated_atTIMESTAMPDEFAULTCURRENT_TIMESTAMPONUPDATECURRENT_TIMESTAMP
```

---

## Boolean

MySQL stores BOOLEAN as:

```
BOOLEAN-- actually TINYINT(1)
```

0 = false

1 = true

---

## JSON

MySQL supports native JSON type.

```
CREATETABLE products (
  id BIGINT AUTO_INCREMENTPRIMARYKEY,
  details JSON
);
```

---

## UUID

MySQL has no native UUID type.

Use:

```
CHAR(36)
```

Or better for performance:

```
BINARY(16)
```

Generate UUID:

```
SELECT UUID();
```