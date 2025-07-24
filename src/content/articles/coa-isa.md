---
title: Instruction Set Architecture (ISA)
author: Arjit Sharma
meta_title: ISA- Instruction Set Architecture | CS Primer
description: Explore ISA in COA. Understand instruction set architecture and its role in bridging hardware and software in CS.
series: ["coa"]
categories: ["Core-CS"]
draft: false
year: 2025
---

The Instruction Set Architecture (ISA) is the interface between CPU’s hardware and software it runs. In this article we will try to understand about ISA using x86 *(ISA used in many CPUs)*

## What Is an ISA?

An ISA is the bridge between software and hardware, defining the instructions a CPU can execute. Think of x86 as the specific dialect spoken by Intel and AMD processors. It specifies -

- **Instructions**: Commands like “add two numbers” or “move data.”
- **Format**: How instructions are written in binary.
- **Resources**: Which registers and memory the CPU uses.

---

## How x86 Instructions Work

Let’s take a simple x86 instruction -

```nasm
MOV EAX, 42
```

This tells the CPU to move the number 42 into a register called EAX.  MOV is a data movement *instruction.* EAX is one of x86’s *registers.* Immediate *addressing mode* is used.

---

## Compatibility

When you write a program (say, in C), the compiler translates it into x86 machine code. This code runs only on x86 CPUs and not on ARM or RISC-V, because each ISA has a unique language. ARM might have a different instruction or register names.

---

## Real-World Example

Suppose in your code somewhere you do *score = score + 10*. The compiler might generate x86 code like -

```asm
MOV EAX, [score] // Load score from memory to EAX
ADD EAX, 10 // Add 10 to EAX
MOV [score], EAX // Store result back to memory
```

---

## Conclusion

ISA defines the instructions a CPU can execute and how they’re structured. It forms the interface between software and processor hardware.