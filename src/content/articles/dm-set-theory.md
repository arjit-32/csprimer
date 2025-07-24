---
title: Set Theory
author: Arjit Sharma
meta_title: Set Theory- Learn Discrete Math Basics | CS Primer
description: Master set theory, the foundation of discrete math. Learn sets, operations, and Venn diagrams to build skills for CS and algorithms.
series: ["dm"]
categories: ["Core-CS"]
draft: false
---


Set Theory might sound academic, but it’s everywhere in development - from deduplicating data to writing cleaner algorithms or SQL queries.

## What is a Set?

A set is a **well-defined**, **unordered** collection of **distinct** elements. Think of it as a way to group things without duplicates.

### Notation

- Tabular form:
    
    ```python
    A = {apple, banana, orange}
    ```
    
- Set-builder form:
    
    ```markdown
    B = {x | x is a prime number < 10} → {2, 3, 5, 7}
    ```

---

## Types of Set

### Finite Set

```python
const permissions = new Set(['read', 'write', 'delete'])
```

### Infinite Set

```jsx
function naturalNumbers() {
    let n = 1;
    while (true) n++;
}
```

### Empty Set

```jsx
const emptySet = new Set()
```

---

## Common Set Operations

![set operations](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747727434/Screenshot_2025-05-19_161827_cni0fb.png)

### 1. Union (∪) - Combine all unique elements

```jsx
A = {1, 2, 3}
B = {3, 4}
A U B = {1, 2, 3, 4, 5}
```

### 2. Intersection (∩) - Common elements

```jsx
A = {1, 2, 3}
B = {3, 4}
A ∩ B = {3}
```

### 3. Difference (−) - Elements in A but not in B

```jsx
A = {1, 2, 3}
B = {3, 4}
A-B = {1, 2}
```

---

## How Developers Use Sets

### De-duplication

Sets help remove duplicates from lists like tags, cache, or user inputs.

```jsx
const cache = new Set();
cache.add('user123');
cache.add('user123'); // Duplicate ignored
```

### Databases

Set theory powers common SQL operations like `UNION`, `INTERSECT`, and `EXCEPT`.

```jsx
SELECT id FROM active_users
UNION
SELECT id FROM premium_users;
```

### Role-Based Access

```jsx
const adminPermissions = new Set(['read', 'write', 'delete']);

function hasPermission(roleSet, action) {
    return roleSet.has(action);
}

hasPermission(adminPermissions, 'delete'); // true
```

---

## Conclusion

Set Theory helps developers write cleaner, more efficient code. Whether it’s handling unique values, writing SQL queries sets are a fundamental tool worth mastering.