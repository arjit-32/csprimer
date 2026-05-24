---
title: Data Types in MySQL
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

Choosing the correct data type is important for:
- storage efficiency,
- query performance,
- validation,
- and data integrity.

MySQL provides several categories of data types for handling different kinds of data.

---

## Numeric Types

Numeric types are used for storing numbers.

| Type | Used For |
|---|---|
| `TINYINT` | Very small integers |
| `SMALLINT` | Small integers |
| `INT` | Standard integers |
| `BIGINT` | Large integers |
| `DECIMAL(p,s)` | Precise decimal values (money, financial data) |
| `FLOAT` | Approximate floating-point numbers |
| `DOUBLE` | Double-precision floating-point numbers |


*Example os using Numeric Type*

```sql
price DECIMAL(10,2)
```
This means up to 10 total digits, with 2 digits after the decimal point. Example values: 199.99 , 1200.50

*Note - Floating-point types can introduce rounding inaccuracies so use DECIMAL for financial calculations and FLOAT/DOUBLE for approximations*

---

## Text Types

Text types store strings and textual content.

| Type         | Used For                |
| ------------ | ----------------------- |
| `CHAR(n)`    | Fixed-length strings    |
| `VARCHAR(n)` | Variable-length strings |
| `TEXT`       | Large text content      |
| `MEDIUMTEXT` | Larger text content     |
| `LONGTEXT`   | Very large text content |

---

## Date & Time Types

| Type        | Description                              |
| ----------- | ---------------------------------------- |
| `DATE`      | Stores only the date                     |
| `TIME`      | Stores only time                         |
| `DATETIME`  | Stores date and time                     |
| `TIMESTAMP` | Timestamp with timezone-related behavior |
| `YEAR`      | Stores a year value                      |


*Example of using Dat & Time type -*

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updated_at TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP
  ON UPDATE CURRENT_TIMESTAMP
```

---

## Boolean

MySQL does not have a true boolean type internally.

BOOLEAN is treated as:

```sql
BOOLEAN -- actually TINYINT(1)
```

Values: 0 = false and 1 = true

---

## JSON Type

Modern MySQL versions support a native JSON type. This allows structured JSON data to be stored directly inside a column.

*Example of using JSON type*

```sql
CREATE TABLE products (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  details JSON
);
```

*Example JSON data:*
```json
{
  "color": "black",
  "size": "XL"
}
```

---

## UUID

MySQL supports UUIDs but does not provide a dedicated `UUID` column type.  
Instead, UUIDs are generated using the `UUID()` function and stored in either:

Common approaches:

| Type         | Notes                                   |
| ------------ | --------------------------------------- |
| `CHAR(36)`   | Easy to read, but larger storage size   |
| `BINARY(16)` | Better storage and indexing performance |


**Generate UUID**

```sql
SELECT UUID();
```
Example output: 550e8400-e29b-41d4-a716-446655440000

**Primary Keys in MySQL**
- Most schemas use *INT AUTO_INCREMENT* for primary keys (efficient and simple).
- UUIDs can be used as primary keys in distributed systems, but they come with trade-offs in performance and storage.

