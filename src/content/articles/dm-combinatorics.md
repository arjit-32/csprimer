---
title: Combinatorics- The Art of Counting and Arranging
author: Arjit Sharma
meta_title: Combinatorics in Discrete Math | CS Primer
description: Explore combinatorics in discrete math. Master counting, permutations, and combinations for algorithms and problem-solving
series: ["dm"]
categories: ["Core-CS"]
draft: false
---

Combinatorics is the branch of discrete mathematics focused on counting, arranging, and choosing objects.

If you’ve ever asked - *“How many ways can I…?”* or *“What are all the combinations of…?” ,*you’re already thinking like a combinatorist (is that even a word)

## Core Counting Principles

**Rule of Sum** - If a task can be done in *A* ways OR *B* ways (not both), total = `A + B`. Example: A menu offers 3 drinks or 5 snacks. Total choices = *3+5= 8* possibilities.

**Rule of Product** - If a task involves *A* steps AND *B* steps, total = `A × B`. Example: Generate a short ID of 3 letters and 2 digits = *26³ × 10² = 17,576,000* possibilities

---

## Permutations vs Combinations

|  | Order Matters? | Formula | Example Use |
| --- | --- | --- | --- |
| Permutation | Yes | `P(n, r) = n! / (n - r)!` | Arrange tasks, usernames |
| Combination | No | `C(n, r) = n! / [r! × (n - r)!]` | Choose features, test cases |

*Here n = total items and r = items chosen*

**Permutation Example -** 

Arranging 3 out of 5 distinct tasks (A, B, C, D, E) 

P(5, 3) = 5! / (5-3)! = 120 / 2 = 60 ways.

**Combination Example -** 

Choosing 2 out of 5 buttons for A/B testing:
C(5, 2) = 5! / [2! × (5-2)!] = 120 / (2 × 6) = 10 combinations.

---

## The Pigeonhole Principle

If you have more items than containers, at least one container has more than one item.

**Use case:**

- Detecting duplicates in a set
- Proving collisions in hash functions are inevitable if input > output space

---

## Conclusion

Combinatorics is a simple yet hard to master concept used everywhere around us, counting and arranging is one of the most common tasks and a mastery over it will give us superpower over our software engineering problems as well.