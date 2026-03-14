---
title: Relational Model in Databases
author: Arjit Sharma
meta_title: ss
description: ss
series: ["dbms"]
categories: ["Core-CS"]
---

The Relational Model is a way of representing data using tables (relations) made up of rows and columns. It was proposed to bring mathematical clarity and simplicity to data storage.
The power of the relational model lies in its simplicity + strong theoretical foundation.

## Core Terminology

Although we casually say rows and columns, the relational model uses precise terms:

- Relation → Table
- Tuple → Row
- Attribute → Column
- Domain → Allowed values for an attribute

Example: A *Student* relation with attributes *(student_id, name, email)* contains multiple tuples, each representing one student.

---

## Types of Keys

1. **Super Key -** A super key is any set of attributes that can uniquely identify a tuple.
    
    Example: *{student_id}  , {student_id, email}*
    

2. **Candidate Key -** A candidate key is a minimal super key,  no extra attributes. A table can have multiple candidate keys.
    
    Example: *student_id or email (if unique)*
    

3. **Primary Key -** One candidate key is chosen as the primary key.
    - Cannot be `NULL`
    - Must be unique
    - Used as the main identifier

4. **Alternate Key -** Candidate keys *not chosen* as the primary key.
    
    Example: *If student_id is primary, email becomes an alternate key.*
    

5. **Foreign Key -** A foreign key creates a relationship between tables. Foreign keys are how relationships are enforced in relational databases.
    
    Example: *Order.user_id references User.user_id*
    
---

## Integrity Constraints

Integrity constraints ensure the database never enters an invalid state. They act as rules the data must always obey.

### Domain Constraints

Each attribute must follow its defined domain.
*Examples: Age cannot be negative, Email must be a string, Price must be numeric. etc*

### Entity Integrity Constraint

A primary key:
 - *cannot be NULL* 
 - Every tuple must be identifiable. 
 This ensures each row represents a real, distinct entity.


### Referential Integrity Constrain

A foreign key must either:
 - Reference an existing primary key, or
 - Be NULL (if allowed)
This prevents situations like - Orders referring to non-existent users

---

## Functional Dependencies (FDs)

Functional Dependencies describe relationships between attributes.

Formally:

> X → Y
> means *X determines Y*

If two rows share the same value for X, they must also share the same value for Y. In other words, X uniquely determines Y.

### Example

| student_id | name     | email              | course    |
|------------|----------|--------------------|-----------|
| 101        | Arjit    | arjit@gmail.com    | COA       |
| 102        | Bob      | bob@yahoo.com      | Compiler  |
| 103        | Champlin | champlin@uni.edu   | COA       |


**Valid FD's**

```bash

student_id → name # Knowing student_id=101, you can uniquely determine name=Arjit
student_id → email # Knowing student_id=101, you can uniquely determine email=arjit@gmail.com
```
Here, knowing *student_id* uniquely determines both *name* and *email*. 

**Not Valid FD**

```bash

course → name 
# If you know course=COA, you cannot determine a single name as both Arjit & Champlin are in COA
```
So here, course does not functionally determine name.



Functional dependencies are essential for **normalization**, helping ensure data is consistent and free from redundancy.

---

## Rules of Functional Dependencies (Armstrong’s Axioms)

| Rule | Formal Definition | Explanation | Example |
| --- | --- | --- | --- |
| Reflexivity | If Y⊆ X then X→Y | Any set of attributes determines its own subset. | (student_id, name) → name |
| Augmentation | If X→Y, then XZ→YZ | Adding the same attribute(s) to both sides keeps the dependency valid. | If student_id → email, then (student_id, course) → (email, course) |
| Transitivity | If X→Y and Y→Z, then X→Z | Dependencies can be chained: if X determines Y and Y determines Z, then X determines Z. | If student_id → email and email → contact_method, then student_id → contact_method |

---

## Closure of Attribute Set (X⁺)

The *closure of an attribute set X*, written as *X⁺*, is - The set of all attributes that can be functionally determined by X.

**Why Closure Is Important ?**

Attribute closure helps answer key design questions:

- Is X a super key?
    Yes, If X⁺ includes all attributes of the relation
    
- Which attributes depend on X?
    X⁺ shows exactly which attributes can be derived from X using the given dependencies.
    
- Are all attributes covered?
    Closure helps check if candidate keys exist and ensures no attribute is left unaddressed.
    

**Example**

Given FDs:

```bash

A → B
B → C
```

Compute closure:

```bash

A⁺={A,B,C}
```

Since A determines all attributes, A is a candidate key.

---

## Conclusion

The relational model is more than tables - it is a rule-based system for representing data correctly.

- Relational model gives us tables and structure
- Keys give identity and relationships
- Integrity constraints enforce correctness
- Functional dependencies capture real-world rules
- Attribute closure helps reason mathematically about schemas

All of this prepares the ground for **Normalization**, where we formally fix bad designs.
