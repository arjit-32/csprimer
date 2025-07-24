---
title: Pushdown Automata (PDA)
author: Arjit Sharma
meta_title: Pushdown Automata (PDA)- Learn CS Theory | CS Primer
description: Explore pushdown automata and their role in parsing context-free languages. Build skills for compiler design and advanced CS concepts.
series: ["toc"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Finite automata are great for flat, linear patterns like checking if a string ends with *01*. But they can't handle nested structures like -

- Matching parentheses: *( ( ) ( ) )*
- Balanced *aⁿbⁿ: aabb, aaabbb*
- Simple arithmetic like *a + (b * c)*

To recognize such patterns, the machine needs memory to keep track of context, and that’s where Pushdown Automata comes in.

---

## What Is a Pushdown Automaton?

![pda](https://res.cloudinary.com/dwa6rcttw/image/upload/v1748157123/pda_ym407y.png)

A Pushdown Automaton (PDA) is like a DFA but with an extra component: a **stack**.

This allows the PDA to Push symbols onto the stack , Pop symbols  and Peek at the top symbol. It makes decisions based on the **c**urrent state, input symbol, and top of the stack.

---

## How It Works

Imagine trying to match balanced parentheses:

```
( ( ) )
```

1. When it sees a *(* → it **pushes** it onto the stack
2. When it sees a *)* → it **pops** a *(*  from the stack
3. If the stack is empty at the end, and the input is consumed, the input is accepted

This memory (the stack) is what makes the PDA capable of recognizing context-free languages.

---

## Example 

![push-down-automata](https://res.cloudinary.com/dwa6rcttw/image/upload/v1748157124/push-down-automata_kpc5ci.png)