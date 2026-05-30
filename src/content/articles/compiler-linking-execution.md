---
title: Linking & Execution
author: Arjit Sharma
meta_title: Linking & Execution in Compilers | CS Primer
description: Understand linking and execution in compilers. Learn how programs are finalized and run on hardware in CS.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Linking in Compilers ?

![linkers-in-compilers](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156886/linking-intro_wrmuys.webp)

After compilation, source code is converted into object files containing machine code. However, these files are usually incomplete on their own.

Programs often depend on:

- multiple source files
- external libraries
- pre-written functions like printf

The linker combines all these pieces into a single executable program.

You can think of linking as assembling separate machine-code modules into one fully connected program.

---

## What Does the Linker Do?

![how-a-linker-works](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156886/linker-in-compilers_zfkkuv.webp)

The linker performs several important tasks:

- Combines multiple object files into one executable
- Resolves external references between files
- Connects library functions to their actual implementations
- Assigns final memory addresses to code and data

For example:
```c
printf("Hello");
```

The compiler recognizes printf, but the linker connects it to the actual implementation inside the C standard library.

Without linking, the program would contain unresolved references and could not execute correctly.

---

## Types of Linking

- **Static Linking**: All code (including libraries) is packaged into one big executable.
- **Dynamic Linking**: External libraries (like `.dll` *(Windows)* or `.so` *(Linux)* files) are linked at runtime, keeping the executable smaller. Most modern operating systems heavily use dynamic linking.

---

## How Code Execution Works ?

Once linking is complete, the executable can be run by the operating system.

![code-execution](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780156886/execution-of-code_iwl84d.webp)

The execution process happens in four major steps:

1. The OS loads the executable into memory
2. OS creates memory regions (stack *(for variables)*, heap *(for dynamic data)*, code and data).
3. CPU registers are initialized to point to these regions.
4. CPU starts fetching and executing these instructions.

This is where the compiled program finally becomes an active running process.

### Memory Regions During Execution

When a program runs, the operating system organizes memory into different regions:

- Code Segment - Stores executable instructions
- Stack - Stores function calls and local variables
- Heap - Stores dynamically allocated memory
- Data Segment - Stores global and static variables

These regions help the OS and CPU manage program execution efficiently.

---

## Conclusion

Linking combines compiled object files and libraries into a complete executable program. The operating system then loads this executable into memory, prepares the execution environment, initializes CPU state, and begins instruction execution.