---
title: Relations 
author: Arjit Sharma
meta_title: Relations in Discrete Math Explained | CS Primer
description: Explore relations in discrete math. Understand reflexive, symmetric, and transitive properties for applications in databases and CS.
series: ["dm"]
categories: ["Core-CS"]
draft: false
---

A *relation* connects elements of one set to another. As a dev, you see this every time you map users to roles, products to categories, or tasks to dependencies.

## Cartesian Product

It is denoted by AXB and forms foundation for relations. A set of all ordered pairs *(a,b)* where a is from Set A and b is from Set B. 

![cartesian-product](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727755/cartesian_dula4c.png)


```json
A = {a,b}
B = {1,2,3}
A X B = {(a,1), (a,2), (a,3), (b,1), (b,2), (b,3)}
```
---

## What Is a Relation?

A relation is a subset of a Cartesian product.

*Example:*

```json
Set A = {arjit, shanaya}
Set B = {admin, editor}
R = {(arjit, admin), (shanaya, editor)}
```

This simply means "arjit has the role admin", etc.

---

## Inverse Relation

Just flipping the direction of Relation.

If R = {(arjit, admin)}, then R⁻¹ = {(admin, arjit)}

Useful when you want to go “backwards” in your mapping.

---

## Types of Relations

### Reflexive

Everything maps to itself. *e.g - every service has permission to view its own logs*
![reflexive](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727755/relation_kcrozf.png)

### Symmetric

If A follows B, then B follows A . *e.g - maybe in mutual friendships*
![symmetric](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727754/symmetric_ilhcu7.png)

### Transitive

If A depends on B, and B depends on C, then A depends on C. *e.g - used in build systems*
![transitive](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727754/transitive_f4i2sk.png)

### Antisymmetric

If A ≤ B and B ≤ A → then A = B. *e.g. - important in orderings like file structures or task flows*
![antisymmetric](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727755/antisymmetric_u2qzlm.png)


### Equivalence

Reflexive + Symmetric + Transitive. In simple words grouping where items are grouped into distinct categories, like grouping files by type.

Example - Lets take example of programming languages(compiled vs interpreted)

- Every language belongs to its own category. java is in same category as java
- If A is in same category as B, then B is in same category as A. java is compiled like C++ then C++ is compiled like java.
- If java is compiled like C++ and C++ is compiled like C, then java is compiled like C.

Hence a group of compiled languages is formed containing java, c++ and c.

### Partial Order Relation

Reflexive + Antisymmetric + Transitive. It a relationship where some items may not be comparable.

Example - Lets take a office hierarchy

- Everyone reports to themselves *(reflexive)*
- If A reports to B and B reports to A, they must be the same person. Sometimes people take 2 roles, Developer and tester. *(antisymmetric)*
- If A reports to B and B reports to C, then A reports to C (transitive)

Not everyone has a reporting relationship with each other as different departments. All of this creates a hierarchy without any circular reporting relationships.

---

## Real-World Examples

### Database Relationships

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### Task Management System

```sql
task_dependencies = {
    'deploy': ['test', 'build'], 
    'test': ['build'],
    'build': ['compile']
}
```

---

## Conclusion

Relations are the glue between things. They help model real-world connections in a way that’s structured. It is exactly what you need when dealing with data modeling.