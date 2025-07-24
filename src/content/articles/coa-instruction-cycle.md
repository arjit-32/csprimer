---
title: The Instruction Cycle
author: Arjit Sharma
meta_title: Instruction Cycle in COA Explained | CS Primer
description: Dive into the instruction cycle in COA. Master fetch-decode-execute steps to understand CPU operations and system design
series: ["coa"]
categories: ["Core-CS"]
draft: false
year: 2025
---

The processor doesn’t see loops, if-statements, or functions it just sees binary instructions, one at a time.  The instruction cycle is the fundamental loop the CPU follows to process those instructions.

---

## The 3 Main Steps

1. **Fetch**
    - The *Program Counter (PC)* holds the address of the next instruction.
    - The CPU sends that address to memory via the *address bus* and fetches the instruction into the *Instruction Register (IR)* via the *data bus*.
2. **Decode**
    - The *Control Unit* decodes the binary instruction (e.g.,  ADD? JUMP?).
    - It figures out what needs to happen, like which registers to use or whether memory should be read or written.
3. **Execute**
    - The appropriate parts of the CPU are activated:
        - The *ALU* may perform a calculation.
        - A value may be loaded from memory or stored.
        - The *Program Counter* is updated to point to the next instruction.

**Note - This cycle repeats billions of times per second on a modern CPU.**

### Example -

Lets say CPU has to execute the following assembly instruction

```
ADD R1, R2, R3;
```

- Fetch: Get the binary version of *ADD R1, R2, R3* from memory
- Decode: Recognize it’s an *ADD* operation; identify source and destination registers
- Execute: ALU adds values of R2 and R3; result is stored in R1

---

## Program Counter and Flow Control

The Program Counter usually increases by one instruction each cycle. But some instructions (like JUMP or CALL) modify it directly, allowing for loops, conditions, and function calls *(the foundation of structured programming)*

---

## Timing and Clock Cycles

Each stage of the instruction cycle is tied to clock cycles. Simple instructions may take 1–2 cycles, while complex ones (like memory access or multiplication) may take more. Modern CPUs pipeline these stages, overlapping them to improve throughput.