---
title: Intermediate Code Generation
author: Arjit Sharma
meta_title: Intermediate Code in Compilers | CS Primer
description: Learn intermediate code generation in compilers. Discover how it bridges high-level code to machine code in CS.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Intermediate Code?

Once the compiler has understood your code (via syntax and semantics), it converts it into an intermediate representation (IR), a form that is **not machine code** yet, but close enough to be easily translated into it later.

Think of it as a *machine-neutral* version of your program.

Example (from `a = b + c * d;`):

- Intermediate Code:
    
    ```
    t1 = c * d
    t2 = b + t1
    a = t2
    ```

--- 

## Why Do We Need IR?

1. **Portability** - The same frontend (parser, analyzer) can target multiple machines via different backends.
2. **Optimization** - Easier to perform code improvements on IR before generating final machine code.
3. **Simplicity** - Abstracts away hardware-level details for now.

---

## Common IR Forms

- **Three-address code (TAC)** - Each instruction has at most three operands. Widely used.
- **Control Flow Graphs (CFGs)** - Show how control moves between code blocks.
- **Static Single Assignment (SSA)** - Every variable is assigned exactly once;

---

## Conclusion

- Intermediate Code bridges semantic understanding and machine execution
- Makes code portable, optimizable, and easier to analyze
- Forms like three-address code are widely used