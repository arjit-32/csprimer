---
title: Normalization in Databases
author: Arjit Sharma
meta_title: ss
description: ss
series: ["dbms"]
categories: ["Core-CS"]
---

Normalization is the process of organizing data in a database to reduce redundancy and avoid anomalies. It uses **functional dependencies** to decide how tables should be structured.

The goal is simple:

> Store each fact once, in the right place, with clear dependencies.
> 

Normalization is about logical correctness of design, not performance tuning.

---

## Why Do We Need Normalization?

Poorly designed tables may work initially, but they fail as data grows.

Common problems include:

❌ **Insertion Anomaly** - You can’t insert some data without inserting unrelated data

❌ **Update Anomaly** - Same data must be updated in multiple rows

❌ **Deletion Anomaly** - Deleting one fact accidentally removes another

Normalization provides a systematic way to eliminate these problems.

---

## First Normal Form (1NF)

A relation is in 1NF if:

- Each attribute contains atomic (indivisible) values
- No repeating groups or arrays inside a column

**Example (Not in 1NF)**

| student_id | courses |
| --- | --- |
| 1 | Math, Physics |


**After 1NF**

| student_id | course |
| --- | --- |
| 1 | Math |
| 1 | Physics |

1NF forces databases to behave like proper relations, not nested structures.

---

## Second Normal Form (2NF)

A relation is in 2NF if:

- It is already in 1NF
- No partial dependency exists on a composite key

**Partial Dependency -** When a non-key attribute depends on part of a composite key, not the whole key.

**Example**

| student_id | course_id | student_name |
| --- | --- | --- |
| 1 | 101 | Alice |
| 1 | 102 | Alice |
- Here the *primary key* is the composite *(student_id, course_id).*
- But *student_name* depends only on *student_id*, not on the full key.
- That’s a partial dependency, which violates 2NF.

**After 2NF**

Split into separate tables:

- Student
    
    
    | student_id  | student_name  |
    | --- | --- |
    | 1 | Alice |


- Enrollment
    
    
    | student_id  | course_id  |
    | --- | --- |
    | 1 | 102 |

---

## Third Normal Form (3NF)

A relation is in 3NF if:

- It is in 2NF
- No transitive dependency exists

**Transitive Dependency**

```cpp

A → B
B → C
-----
So  A → C
```

**Example**

Key: *(student_id, course_id)*

| student_id | course_id | course_name | department |
| --- | --- | --- | --- |
| 1 | 101 | Calculus | Math dept |
| 1 | 102 | Physics | Science dept |
- Here the *primary key* is the composite *(student_id, course_id).*
- department depends on course_id (through course_name), not directly on (student_id, course_id).

**After 3NF**

Split into separate tables:

- Student
    
    
    | student_id  | student_name  |
    | --- | --- |
    | 1 | Alice |
- Course
    
    
    | course_id | course_name  | department |
    | --- | --- | --- |
    | 101 | Calculus | Math dept |
    | 102 | Physics | Science dept |
- Enrollment
    
    
    | student_id  | course_id  |
    | --- | --- |
    | 1 | 101 |
    | 1 | 102 |

3NF ensures non-key attributes depend only on the key.

---

## Boyce–Codd Normal Form (BCNF)

BCNF is a stronger version of 3NF.

A relation is in BCNF if:

> For every functional dependency X → Y, X must be a super key
> 

BCNF removes edge cases where 3NF still allows anomalies.

**Example**

Suppose we have a table:

| student_id | course_id | instructor |
| --- | --- | --- |
| 1 | 101 | Prof. Arjit |
| 2 | 101 | Prof. Arjit |
| 3 | 102 | Prof. Nini |
- Here the *primary key* is the composite *(student_id, course_id).*
- *Dependencies:*
    - (student_id, course_id) → instructor  is fine.
    - But also: course_id → instructor.
    
    Even though course_id is not a super key, yet it determines instructor, this violates BCNF even though it satisfies 3NF
    

**After BCNF** 

Split into separate tables:

- Enrollment
    
    
    | student_id  | course_id |
    | --- | --- |
    | 1 | 101 |
    | 2 | 101 |
    | 3 | 102 |
- CourseInstructor
    
    
    | course_id | instructor |
    | --- | --- |
    | 101 | Prof. Arjit |
    | 102 | Prof. Nini |

---

## Conclusion

The journey from 1NF to BCNF shows how each step removes a deeper class of redundancy or dependency. In practice, most databases stop at 3NF or BCNF, striking a balance between correctness and usability.