---
title: Addressing Modes
author: Arjit Sharma
meta_title: Addressing Modes in COA Guide | CS Primer
description: Master addressing modes in COA. Learn how CPUs access memory and optimize programs for better system performance.
series: ["coa"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Addressing modes define how a CPU locates operands (data) for instructions, enabling efficient access to registers, memory, or immediate values. It is important specially for operations like loops and array access.

## Common Addressing Modes

| **Addressing Mode** | **Description** | **Example** |
| --- | --- | --- |
| Immediate | Operand is embedded in the instruction, fast but fixed. | MOV R1, #5 *(Loads 5 into R1)* |
| Register | Operand is in a CPU register, quick access. | ADD R1, R2 *(Adds R2 to R1)* |
| Direct | Instruction specifies a memory address. | MOV R1, [5000] *(Loads value at address 5000 into R1)* |
| Indirect | Register holds the memory address. | MOV R1, [R2] *(Loads value at address in R2 into R1)* |
| Indexed | Combines a base register with an offset, ideal for arrays. | MOV R1, [R2 + 4] *(Loads value at address R2+4 into R1)* |
| Relative | Address is relative to the Program Counter, used for jumps. | JMP PC + 3 *(Jumps to PC + 3 bytes)* |