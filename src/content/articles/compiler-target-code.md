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

![target-code-generation-intro](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156003/target-code-generation-intro_zlauxk.webp)

Target code generation is the compiler phase where intermediate representation (IR) is converted into instructions that a real processor can execute.

Different CPUs support different instruction sets, so the generated code depends on the target architecture, such as: *x86, ARM, RISC-V*.

This is the final major phase of the compiler before the program becomes executable.

---

## What Happens in This Phase?

![responsibilities-of-taget-code-generation](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156008/responsibilities-of-target-code-gen_ztbicl.webp)

The compiler performs several important tasks during target code generation:

- Maps IR operations to actual instructions supported by the CPU
    
    Example: `t1 = a + b` may become `ADD R1, R2, R3`
    
- Allocates variables to CPU registers or memory
- Generates instructions for arithmetic, memory access, jumps, etc.

The result may be *Assembly code* (human-readable) or *Binary/executable code* (for the machine)

---

## Assembly vs Machine Code

![assembly-or-binary](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156013/assembly-and-binary_nmfvdp.webp)

- Assembly Code : Human-readable low-level instructions.
Example:
```bash
MOV R1, a
ADD R1, b
```

Assembly is easier for humans to inspect and debug.

- Machine Code: Binary instructions directly understood by the CPU.
Example:
```bash
10110000 01100001
```

This is the actual executable form loaded into memory and executed by the processor.

---

## Example: Three-Address Code to Assembly

### Intermediate Representation (IR)

```bash
t1 = a + b
t2 = t1 * c
```

## Generated Target Code (x86-like)

```bash
MOV R1, a
ADD R1, b

MOV R2, c
MUL R2, R1
```

Here:

- values are loaded into registers
- arithmetic operations are mapped to CPU instructions
- temporary variables are handled using registers

This translation allows high-level program logic to execute directly on hardware.

---

## Conclusion

Target code generation is the bridge between compiler logic and real hardware execution.

It transforms intermediate representations into processor-specific instructions, allocates registers and memory, and produces the final code that the CPU can execute.