---
title: Group Theory
author: Arjit Sharma
meta_title: Algebraic Structures in CS Math | CS Primer
description: Explore algebraic structures like groups and rings in discrete math. Learn their role in cryptography and CS theory.
series: ["dm"]
categories: ["Core-CS"]
draft: false
---

A branch of mathematics that studies *elements* present in a *group*. A group is a algebraic structure, and a algebraic structure is a set of elements with a particular operation and some rules. I know you didnt quite get it, so lets dive deeper.

## Important Properties

- Closure Property - For all a, b in set S, a * b is in S.
- Associative Property -  (a * b) * c = a * (b * c)
- Identity Property - There exists an element e where a * e = e * a = a
- Inverse Property - For each element a, there exists -a where a * (-a) = (-a) * a = e
- Commutative Property - a * b = b * a.

*Note that here * means any operator !!*

---

## What are Algebraic Structures ?

Algebraic structures defines a *set of values* and *rules for combining them*. There are many types, some common ones are -

### 1. Semigroup

If a set with respect to a binary operation * satisfies Closure and Associative property. 

example →  (E,x) : Multiplication on Even numbers. 

### 2. Monoid

Properties of a **Semigroup** + Identity property.

example → (N,x) : Multiplication on Natural numbers.

### 3. Group

Properties of a **Monoid** + Inverse property.

example → (Z,+) : Addition on Integral numbers.

### 4. Abelian Group

Properties of a **Group** + Commutative property.

example → (Z,+): Addition on Integers.

---

## Practical Application

Algebraic structures are a theoretical concept but they provide practical pattern for solving real-world problems. The properties being followed by a algebraic structure allows use to shape programming model. 

For example → Concatenation of Strings often follow properties of a Monoid

```jsx
// Closure
"hello" + "world" = "helloworld" // Always results in a String

// Associative
("hello" + "world") + "!" = "hello" + ("world" + "!")

// Identity
"" + "hello" = "hello"
```

---

## Conclusion

Group theory provides a robust mathematical framework for understanding and organizing computational structures. The properties (closure, associativity, identity, inverse) serve as guarantees for system behavior and are seen all around us.