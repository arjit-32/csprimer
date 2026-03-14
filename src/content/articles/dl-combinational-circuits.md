---
title: Combinational Circuits
author: Arjit Sharma
meta_title: Combinational Circuits in CS | CS Primer
description: Dive into combinational circuits in digital logic. Learn how to design logic gates and circuits for computer systems.
series: ["dl"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Combinational circuits are *circuits without memory*. Their output depends only on the current input values and not on any previous state.

**Key Characteristics -**

- No feedback or storage elements
- Outputs change instantly with input changes
- Defined by Boolean expressions or truth tables

These circuits are the foundation of everything from calculators to CPUs. Let’s explore the most common types:

## Types of Combinational Circuits

### 1. Adders

Adders perform binary addition, crucial for arithmetic operations in processors

- **Half Adder**: Adds two 1-bit inputs (A, B)
    - Outputs: ***Sum = A ⊕ B, Carry = A·B***
    ![half-adder](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1747728162/half-adder_fix6vo.png)
- **Full Adder**: Adds three 1-bit inputs (A, B, Carry-in)
    - Outputs: ***Sum and Carry-out***
    - Built using two half adders and an OR gate

---

### 2. Subtractor

Subtractors handle binary subtraction, often used in control logic and arithmetic units.

- **Half Subtractor**: Subtracts B from A (A-B)
    - Outputs: ***Diff = A ⊕ B, Borrow = ¬A · B***
    ![half-subtractor](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1747728162/half-subtractor_vkgxo5.png)
- **Full Subtractor**: Subtracts with a borrow (A – B – Borrow-in)
    - Outputs: ***Difference and Borrow-out***

---

### 3. Multiplexer (MUX)

A multiplexer selects one input from many and forwards it to the output - like a digital switch. Used in data routing, decision-making, and signal control.

- **2-to-1 MUX**:
    - Inputs: A, B; Select line: S
    - Output: ***Y = A·¬S + B·S***
 ![Multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1747985754/multiplexer_e57yjd.png)

---

### 4. Demultiplexer (DEMUX)

Routes one input to one of many outputs based on selector bits. Its like a reverse MUX, directing data to a chosen path. Ideal for distributing data to multiple destinations

 ![De-Multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1747985754/demultiplexer_z5ku8b.png)

---

### 5. Decoder

Translates n input bits into one of 2ⁿ output lines. They convert binary input into a one-hot output—only one output line is active at a time.

- **2-to-4 decoder**: Inputs: 2 bits → Outputs: 4 lines, with only one active at a time

---

### 6. Encoder

Converts one of 2ⁿ active inputs into an n-bit binary code. They take multiple inputs and compress them into a binary code. Opposite of a decoder; only one input should be active at a time. 

---

## Conclusion

Mastering combinational circuits is the first step toward understanding how modern hardware. These components are the building blocks of more advanced hardware systems like ALUs, control units, and memory addressing circuits. 

