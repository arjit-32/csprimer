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

## What Is Linking?

Once each part of a program is compiled into machine code (object files), the linker combines these files with libraries (like pre-written code for printf) into a single executable file. It’s like assembling a puzzle, connecting all pieces to make a complete picture.

The linker:

- Merges multiple object files.
- Resolves references (e.g., connects printf to its code in the C library).
- Creates a program you can run.

---

## Types of Linking

- **Static Linking**: All code (including libraries) is packaged into one big executable
- **Dynamic Linking**: External libraries (like `.dll` or `.so` files) are linked at runtime, keeping the executable smaller

---

## What Is Execution?

1. The OS loads the executable into memory
2. OS creates memory regions (stack *(for variables)*, heap *(for dynamic data)*, code and data).
3. CPU registers are initialized to point to these regions.
4. CPU starts fetching and executing these instructions.
