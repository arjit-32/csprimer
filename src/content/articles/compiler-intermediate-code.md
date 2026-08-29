---
title: Intermediate Code Generation
author: Arjit Sharma
meta_title: Intermediate Code in Compilers | CS Primer
description: Learn intermediate code generation in compilers. Discover how it bridges high-level code to machine code in CS.
series: compiler
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Intermediate Code?

![intermediate-code-generation-overview](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779975806/intermediate-code-generation_l2aead.webp)

Once the compiler has understood your code (via syntax and semantics), it converts it into an intermediate representation (IR), a form that is **not machine code** yet, but close enough to be easily translated into it later.

Think of it as a *machine-neutral* version of your program.

--

## Example of Intermediate Code 

Lets try to build Intermediate code from following expression **a = b + c * d;**:

![intermediate-code-gen-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779975807/IR-example_y023eg.webp)

Intermediate Code:
    
```bash
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

Different compilers use different forms of Intermediate Representation (IR) depending on the type of analysis or optimization being performed.
Some IRs are linear and instruction-based, while others focus on control flow or data dependencies.


![common-IR-forms](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779975807/types-of-IR-forms_hifaxt.webp)

### Three-address code (TAC)

Three-address code breaks complex expressions into smaller instructions using temporary variables.

```bash
t1 = c * d
t2 = b + t1
t3 = t2 - e
a  = t3
```

Each instruction usually contains: *one operator two operands and one result*

This makes TAC:
- simple to generate
- easy to optimize
- convenient for machine-independent transformations

Many compilers internally convert high-level code into TAC-like representations before optimization.


### Control Flow Graphs (CFGs)

A Control Flow Graph represents how execution moves between different blocks of code. Each node represents a basic block, and edges represent possible control flow paths.

CFGs are especially important for:
- branch analysis
- loop detection
- dead code elimination
- data-flow analysis
- compiler optimizations

They help the compiler understand the overall structure of a program beyond individual instructions.


### Static Single Assignment (SSA)

Static Single Assignment (SSA) is a special IR form where every variable is assigned exactly once.

Instead of reusing variable names:
```bash
x = x + 1
```

SSA creates new versions:
```bash
x1 = 5
x2 = x1 + 1
```

This makes data dependencies explicit and greatly simplifies compiler analysis.


*Note - Many production compilers like LLVM and GCC internally rely on SSA-based IRs.*

---

## Conclusion

- Intermediate Code bridges semantic understanding and machine execution
- Makes code portable, optimizable, and easier to analyze
- Forms like three-address code are widely used
