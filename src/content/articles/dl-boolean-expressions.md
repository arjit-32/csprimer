---
title: Boolean Expressions
author: Arjit Sharma
meta_title: Boolean Expressions- Digital Logic | CS Primer
description: Understand Boolean expressions in digital logic. Learn to create and simplify expressions for efficient circuit design.
series: ["dl"]
categories: ["Core-CS"]
draft: false
year: 2025
---

A boolean expression is a logical statement that evaluates to exactly one of two values: *True (or 1)* or *False (or 0)*. They are the foundation of computer science, digital electronics, and algorithmic logic, used to control program flow and build circuit logic

![boolean-expression](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779713794/boolean-expression_j3xqth.webp)

---

## Building Blocks of Boolean Expressions

A Boolean expression is built of Variable, Operator and Constants. 

![building-block-of-boolean-expression](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779713782/bulding-blocks-of-boolean-expression_gcqzfq.webp)

- Variables: A, B, C, etc. (binary inputs)
- Operators: AND (·) , OR (+) , NOT (¬)
- Constants: 0 (false), 1 (true)

---

## Example Expression

Let's look at a simple example:

**F = A·¬B + C**

Its read as *Output F is 1* -> if (A AND NOT B) is True OR C is True.

![boolean-expression-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779713782/boolean-expression-example_nefihb.webp)

---

## Standard Forms

| Form | Structure | Output Format | Example | 
| ---- | --------- | ------------- | ------- |
| Sum of Products (SOP) | OR of multiple AND terms | Each AND term = 1 combination of inputs | A·B + A'·B | 
| Product of Sums (POS) | AND of multiple OR terms | Each OR term = 1 combination of inputs | (A + B)·(A' + B) | 
    
These forms are useful for translating expressions directly into gate level circuits.

---

## Canonical Forms

Canonical forms are standardized, exhaustive representations using all input variables.

| Canonical Form | Components | Output value | Example | 
| ---- | --------- | ------------- | ------- |
| Minterms (Canonical SOP) | AND of all vars (true/false) | Equals 1 | A·B·C or A'·B·C | 
| Maxterms (Canonical POS) | OR of all vars (true/false) | Equals 0 | (A + B + C') or (A + B' + C) | 

In SOP Canonical, each minterm corresponds to one row in the truth table where output is 1. You can express entire functions by listing all minterms.

**Example**
![canonical-sop](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753898515/canonical-sop_s6cvgh.webp)

If output is 1 for rows: <br/>
Row 1 (A=0, B=0), Row 3 (A=1, B=0) <br/>
→ Canonical SOP: A'·B' + A·B'


---

## Simplifying Expressions

Simplification helps reduce the number of gates in a circuit. This can be done using -

### 1.  Boolean Algebra

Use boolean algebra rules to simplify expression.

**Example** -  *F = A·B + A·¬B*

On applying Boolean identity: *F = A(B + ¬B)*

Since *B + ¬B = 1*, we get *F = A·1 = A*

This tells us the logic only depends on A and B is irrelevant.

### 2.  Karnaugh Maps (K-maps)

A K-map is a grid-based tool to simplify Boolean expressions (best for 2-4 variables).

Steps:

1. Fill in 1s for where the output is true.
2. Group adjacent 1s in pairs, quads or octets
3. Derive a simplified term for each group (combine variables that stay constant)


![k-map](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779714608/karnough-map_wgq4id.webp)

