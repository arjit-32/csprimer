---
title: Context-Sensitive and Turing Machines
author: Arjit Sharma
meta_title: Context-Sensitive & Turing Machines | CS Primer
description: Learn context-sensitive languages and Turing Machines. Discover their power in modeling computation and solving complex CS problems
series: ["toc"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is a Context-Sensitive Grammar (CSG)?

Context-Sensitive Grammars are more powerful than context-free grammars (CFGs). Their rules allow multiple symbols on the left-hand side, restricted by context. 

For example: αAβ → αγβ *(A transforms to γ only when surrounded by α and β)*.

A Context-Sensitive Grammar can generate more complex patterns than CFGs, and these patterns are recognized by **Linear Bounded Automata (LBA)**. An LBA is like a Turing Machine but with limited memory *(it can only use memory proportional to the input length)*

### Example of a Context-Sensitive Language:

`L = { aⁿbⁿcⁿ | n ≥ 1 }`

In this language, the number of *a’s* must match the number of *b’s* and *c’s*. A CFG can’t handle this, but a context-sensitive grammar can.

---

## Turing Machines: The Ultimate Power

A Turing Machine (TM) is the most powerful model of computation. It can simulate any other machine *(including PDAs and LBAs)* and is the foundation of computation theory.

A **Turing Machine** consists of:

1. An *infinite tape* (like memory) divided into cells
2. A *head* that reads and writes on the tape
3. A *state register* to keep track of the machine's state
4. A t*ransition function* that determines the machine's next action (move left/right, write a symbol, change state)

---

## Turing Machine Example

![turing-machine](https://res.cloudinary.com/dwa6rcttw/image/upload/v1748157124/turin-machine_sjjdpd.png)