---
title: How the Program Counter Controls Execution Flow
author: Arjit Sharma
meta_title: Program Counter and Flow Control Explained | COA
description: Learn how the Program Counter (PC) controls execution flow using jumps, branches, loops, and function calls in Computer Organization and Architecture.
series: ["coa"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Most programs do not execute strictly line by line forever.

They repeat code, skip instructions, call functions, and make decisions.  
At the hardware level, all of this is controlled by a tiny CPU register called the Program Counter (PC).

The Program Counter determines *which instruction executes next*, making it one of the most important components

![program-counter-sequential-flow](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779816051/program-counter-sequential-flow_xog2ar.webp)

---

## What is the Program Counter?

The Program Counter (PC) is a special-purpose register inside the CPU that stores the memory address of the next instruction to be fetched.

For example: *PC = 200*

This means the CPU will fetch the instruction stored at memory address 200.

During the instruction cycle:

1. The CPU reads the instruction from memory.
2. The instruction is decoded and executed.
3. The Program Counter is updated.

The PC continuously changes while a program runs.

---

## Default Sequential Execution (PC + 1)

Normally, programs execute sequentially. This means after executing one instruction, the CPU automatically moves to the next instruction in memory.

This automatic movement is often represented as: PC=PC+1

*Note - Actual increment size depends on instruction length and architecture.*



### How the CPU Executes Instructions Sequentially

![program-counter-seuqntial-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779816096/program-counter-flow-example_v8yt9c.webp)

Consider the following instructions stored in memory:

```bash
100: LOAD R1, [200]
101: ADD R1, R2
102: SUB R3, R4
103: MUL R5, R6
```

Execution will proceed like - 

| Step | Current PC | Executed Instruction | Next PC |
| ---- | ---------- | -------------------- | ------- |
| 1    | 100        | LOAD R1, [200]       | 101     |
| 2    | 101        | ADD R1, R2           | 102     |
| 3    | 102        | SUB R3, R4           | 103     |
| 4    | 103        | MUL R5, R6           | 104     |

---

## Non Sequential

![program-counter-non-sequential](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779816081/program-counter-non-sequential_wgypgj.webp)

### JUMP Instructions

A JUMP instruction changes the Program Counter to a completely new address. This allows programs to skip instructions or move to different parts of memory instantly.


### Conditional Branching

Conditional branches allow the CPU to make decisions. These instructions modify the Program Counter only if a condition is true.

### CALL Instruction

Functions require the CPU to temporarily jump to another part of memory and later return back. This is handled using the CALL instruction.

When executed:

- The CPU saves the return address.
- The PC jumps to the function address.
- The function executes.
- A RET instruction restores the previous PC value.

---

## Conclusion

Modern CPUs contain advanced optimizations, for example jumps and branches can disrupt instruction pipelines, so processors use techniques such as: *branch prediction, pipeline flushing etc*

![program-counter-use-case](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779816094/program-counter-use-case_gvudan.webp)

The Program Counter is far more than a simple register. By controlling the next instruction address, it enables every major programming construct - loops, conditions, branches, functions, and recursion. 