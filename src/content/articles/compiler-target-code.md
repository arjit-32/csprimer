---
title: Target Code Generation
author: Arjit Sharma
meta_title: Target Code Generation- Compilers | CS Primer
description: Explore target code generation in compilers. Learn how to produce machine code for hardware in programming and CS.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Target Code Generation?

This is the phase where the compiler translates intermediate code into machine code that can be executed on a specific processor (like x86, ARM, RISC-V).

It's the final transformation before the program becomes runnable.

---

## What Happens in This Phase?

The compiler:

- Maps operations to actual instructions supported by the CPU
    
    Example: `t1 = a + b` → `ADD R1, R2, R3`
    
- Assigns variables to registers or memory
- Generates instructions for arithmetic, memory access, jumps, etc.

The result may be *Assembly code* (human-readable) or *Binary/executable code* (for the machine)

---

## Example: Three-Address Code to Assembly

**IR:**

```
t1 = a + b
t2 = t1 * c
```

**Target Code (x86-like)**:

```
MOV R1, a
ADD R1, b
MOV R2, c
MUL R2, R1
```

