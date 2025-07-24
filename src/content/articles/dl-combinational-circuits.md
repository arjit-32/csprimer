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

## Types of Combinational Circuits

### 1. Adder

Add binary numbers.

- **Half Adder**: Adds two 1-bit inputs (A, B)
    - Outputs: ***Sum = A ⊕ B, Carry = A·B***
    ![half-adder](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747728162/half-adder_fix6vo.png)
- **Full Adder**: Adds three 1-bit inputs (A, B, Carry-in)
    - Outputs: ***Sum and Carry-out***
    - Built using two half adders and an OR gate

---

### 2. Subtractor

Subtract binary numbers.

- **Half Subtractor**: Subtracts B from A (A-B)
    - Outputs: ***Diff = A ⊕ B, Borrow = ¬A · B***
    ![half-subtractor](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747728162/half-subtractor_vkgxo5.png)
- **Full Subtractor**: Subtracts with a borrow (A – B – Borrow-in)
    - Outputs: ***Difference and Borrow-out***

---

### 3. Multiplexer (MUX)

Acts like a switch to pick one input to send to the output.

- **2-to-1 MUX**:
    - Inputs: A, B; Select: S
    - Output: ***Y = A·¬S + B·S***
 ![Multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747985754/multiplexer_e57yjd.png)

---

### 4. Demultiplexer (DEMUX)

Routes one input to one of many outputs based on selector bits. Its like a reverse MUX, directing data to a chosen path.

 ![De-Multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747985754/demultiplexer_z5ku8b.png)

---

### 5. Decoder

Translates n input bits into one of 2ⁿ output lines.

- **2-to-4 decoder**: Inputs: 2 bits → Outputs: 4 lines, with only one active at a time

---

### 6. Encoder

Converts one of 2ⁿ active inputs into an n-bit binary code. Opposite of a decoder; only one input should be active at a time.

---

## Conclusion

These components are the building blocks of more advanced hardware systems like ALUs, control units, and memory addressing circuits.