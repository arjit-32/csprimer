---
title: ER Diagrams in DBMS
author: Arjit Sharma
meta_title: ss
description: ss
series: dbms
categories: ["Core-CS"]
---

The ER model was formally introduced by **Peter Chen in 1976**, providing a clean way to separate *conceptual design* from physical storage. This idea still forms the foundation of modern database design.

## What is the ER Model?

An Entity–Relationship (ER) Model is a conceptual way to model real-world data before it is stored in a database.

It helps us answer a simple question early on:

> What data exists, and how is it related?

ER diagrams focus on meaning and relationships, not tables or SQL syntax.

---

## Why Use ER Diagrams?

Database design becomes difficult when we start writing tables before understanding the domain. ER modeling gives us a place to reason about the structure first.

It helps us :-
- Understanding the domain clearly
- Identify relationships
- Find missing requirements
- Reduce unnecessary duplicatio
- Communicate design with non-technical stakeholders
- Create a solid base for relational schemas

Once the conceptual model is clear, converting it into a relational schema becomes much easier.

---

## Core Building Blocks

The ER model is built around three fundamental concepts:

### Entity 

An entity represents a real-world object. 

*Examples: Student, Product*

### Attribute 

Attributes are properties of an entity. 

*Examples: Student(roll_no, name, email) , Product(product_id, price, category)*
    
Attributes can be of different types like -
- Simple (name)
- Composite (address → street, city)
- Derived (age from date_of_birth)
- Multi-Valued (phone_numbers)

### Relationship 

A relationship defines how entities are connected. *Examples: Student enrolls in Course, User places Order*
    
Relationships can also have attributes *(e.g., enrollment_date).*

Relationship Degree - The degree of a relationship refers to the number of entity types participating in it.
- Unary Relationship - Innvolves 1 entity type.
- Binary Relationship - Involves two entity types.
- Ternary Relationship - Involves three entity types.

---

## Cardinality & Participation

Cardinality specifies how many entities participate in a relationship.

| Type | Meaning | Example |
| --- | --- | --- |
| 1 : 1 | One-to-one | Person → Passport |
| 1 : N | One-to-many | User → Orders |
| M : N | Many-to-many | Student → Courses |

Participation can be:

- **Total** (mandatory) - Every entity in the entity set must participate in the relationship. *For example, suppose every Order must belong to a Customer.*
- **Partial** (optional) - Participation is optional. *For example, a customer may exist before placing any orders.*

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
