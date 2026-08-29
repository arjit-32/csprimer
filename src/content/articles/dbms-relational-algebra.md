---
title: Relational Algebra
author: Arjit Sharma
meta_title: ss
description: ss
series: dbms
categories: ["Core-CS"]
---

Relational Algebra is a formal, mathematical language used to describe operations on relations (tables). It defines *what operations are allowed* on data and *how results are derived*, independent of any database software.

**Why Relational Algebra Matters**

Relational algebra is important because it:

- Forms the theoretical foundation of SQL
- Helps DBMS optimize queries
- Provides a precise way to reason about correctness

Think of SQL as the user language and relational algebra as the engine language.

---

## Operands and Results

A key property of relational algebra is closure.

- Input → Relations (tables)
- Output → Relations (tables)

Because every operation produces another relation, the results can be fed back as inputs to further operations. This chaining makes it possible to build complex queries step by step, while always staying within the relational model.

---

## Fundamental Operations

| **Operation** | **Symbol** | **Description** | **Works on** | **Key Notes** |
| --- | --- | --- | --- | --- |
| Selection | σ | Filters rows based on a condition | Rows (tuples) | Like SQL WHERE |
| Projection | π | Selects specific columns; removes duplicate rows | Columns (attributes) | Eliminates duplicates automatically |
| Union | ∪ | Combines rows from two compatible relations | Rows | Requires same schema |
| Set Difference | − | Rows in first relation but not in second | Rows | Requires same schema |
| Cartesian Product | × | Combines every row of one relation with every row of another | Rows | Basis for joins; can be very large |

---

## Derived Operations

| **Operation** | **Symbol** | **Description** | **Key Notes** |
| --- | --- | --- | --- |
| Theta Join | ⨝_θ | Cartesian product followed by selection on a condition θ | General join with any condition |
| Equi-Join | ⨝_θ (θ uses =) | Theta join using equality conditions | Keeps both joining columns |
| Natural Join | ⨝ | Equi-join on all attributes with the same name, then removes duplicate columns | Convenient but can be dangerous if names clash unintentionally |

---

## Example

**Students**

| **sid** | **name** | **age** | **dept_id** |
| --- | --- | --- | --- |
| 101 | Alice | 21 | 1 |
| 102 | Bob | 19 | 2 |
| 103 | Carol | 22 | 1 |
| 104 | David | 20 | 3 |

**Department**

| **dept_id** | **dept_name** |
| --- | --- |
| 1 | Computer Science |
| 2 | Mathematics |
| 3 | Physics |

Ques: Find students older than 20

```
σ_{age > 20}(Students)
```

Ques: Get names of all students

```
π_{name}(Students)
```

Ques: Get names of students older than 20

```
π_{name}(σ_{age > 20}(Students))
```

---

## How This Fits in the DBMS Stack

- ER Model → Conceptual design
- Relational Model → Tables & constraints
- Normalization → Clean structure
- Relational Algebra → Query logic
- SQL → User interface

Relational algebra is the bridge between theory and execution.

---

## Conclusion

Relational algebra defines how databases reason about data. It gives DBMS the freedom to optimize queries while guaranteeing correctness. You may never write it directly, but every efficient query depends on it.
