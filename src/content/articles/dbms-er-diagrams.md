---
title: ER Diagrams in DBMS
author: Arjit Sharma
meta_title: ss
description: ss
series: ["dbms"]
categories: ["Core-CS"]
---

The ER model was formally introduced in **1976** by **Peter Chen**, providing a clean way to separate *conceptual design* from physical storage. This idea still forms the foundation of modern database design.

## What is an ER Diagram?

An Entity–Relationship (ER) Diagram is a conceptual way to model real-world data before it is stored in a database.

It helps us answer a simple question early on:

> What data exists, and how is it related?
> 

ER diagrams focus on meaning and relationships, not tables or SQL syntax.

---

## Why ER Diagrams Matter

Using ER diagram ensures -

- Understanding the domain clearly
- Identify missing or redundant data
- Communicate design with non-technical stakeholders
- Create a solid base for relational schemas

Once the ER model is correct, the database design becomes much easier.

---

## Core Building Blocks

1. **Entity -** An entity represents a real-world object. *Examples: Student, Product*

2. **Attribute -** Attributes are properties of an entity. *Examples: Student(roll_no, name, email) , Product(product_id, price, category)*
    
    Attributes can be:
    - Simple (name)
    - Composite (address → street, city)
    - Derived (age from date_of_birth)

3. **Relationship -** A relationship defines how entities are connected. *Examples: Student enrolls in Course, User places Order*
    
    Relationships can also have attributes *(e.g., enrollment_date).*

---

## Cardinality & Participation

Cardinality specifies how many entities participate in a relationship.

| Type | Meaning | Example |
| --- | --- | --- |
| 1 : 1 | One-to-one | Person → Passport |
| 1 : N | One-to-many | User → Orders |
| M : N | Many-to-many | Student → Courses |

Participation can be:

- **Total** (mandatory)
- **Partial** (optional)

These constraints heavily influence table design later.

---

## Keys in ER Diagrams

To ensure that each entity can be uniquely identified, ER diagrams use keys:

- **Primary Key**: The main unique identifier for an entity *(e.g., student_id).*
- **Candidate Key**: Attributes that could serve as a primary key; one is chosen as the primary.
- **Composite Key**: A key formed by combining two or more attributes when a single attribute isn’t sufficient.

Keys guarantee that entities remain *distinct, searchable, and unambiguous* within the database design.

---

## Weak Entities

Some entities cannot exist independently. *Example - Dependent depends on Employee*

Such entities

- Don’t have a full primary key
- Use a partial key
- Depend on a strong entity for identification

---

## Conclusion

ER diagrams act as the blueprint of a database system. They ensure clarity, correctness, and completeness *before* a single table is created.
