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

![combinational-circuits](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722325/combinational-circuits_xegr5u.webp)

## Key Characteristics of Combinational Circuits

![characteristics-of-combinational-circuits](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722413/charachteristics-of-combinational-circuits_rctfgf.webp)

- No feedback or storage elements
- Outputs change instantly with input changes
- Defined by Boolean expressions or truth tables

These circuits are the foundation of everything from calculators to CPUs. Let’s explore the most common types:

---

## Types of Combinational Circuits

### 1. Adders

![adders](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722413/adders_nfnuhr.webp)

Adders perform binary addition, crucial for arithmetic operations in processors

- **Half Adder**: Adds two 1-bit inputs (A, B)
    - Outputs: ***Sum = A ⊕ B, Carry = A·B***
    ![half-adder](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722412/half-adder_wtq88x.webp)
- **Full Adder**: Adds three 1-bit inputs (A, B, Carry-in)
    ![full-adder](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722326/full-adder_rloong.webp)
    - Outputs: ***Sum and Carry-out***
    - Built using two half adders and an OR gate

---

### 2. Subtractor

![subtractor](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722413/substractor_xuhsuy.webp)

Subtractors handle binary subtraction, often used in control logic and arithmetic units.

- **Half Subtractor**: Subtracts B from A (A-B)
    - Outputs: ***Diff = A ⊕ B, Borrow = ¬A · B***
    ![half-subtractor](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779723046/half-subtractor_neigil.webp)
- **Full Subtractor**: Subtracts with a borrow (A – B – Borrow-in)
    - Outputs: ***Difference and Borrow-out***

---

### 3. Multiplexer (MUX)

![multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722412/multiplexer_pzzmhc.webp)

A multiplexer selects one input from many and forwards it to the output - like a digital switch. Used in data routing, decision-making, and signal control.

- **2-to-1 MUX**:
    - Inputs: A, B; Select line: S
    - Output: ***Y = A·¬S + B·S***
 ![2-to-1-multiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779723045/2-to-1-mux_ucauto.webp)

---

### 4. Demultiplexer (DEMUX)

![demultiplexer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722325/de-multiplexer_tef3v7.webp)

Routes one input to one of many outputs based on selector bits. Its like a reverse MUX, directing data to a chosen path. Ideal for distributing data to multiple destinations

 ![1-to-2-demux](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779723045/1-to-2-demux_rt0z6o.webp)

---

### 5. Decoder

![decoder](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722326/decoder_aqv9to.webp)

Translates n input bits into one of 2ⁿ output lines. They convert binary input into a one-hot output—only one output line is active at a time.

- **2-to-4 decoder**: Inputs: 2 bits → Outputs: 4 lines, with only one active at a time


---

### 6. Encoder

![encoder](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779722325/encoder_dii2mx.webp)

Converts one of 2ⁿ active inputs into an n-bit binary code. They take multiple inputs and compress them into a binary code. Opposite of a decoder; only one input should be active at a time. 

---

## Conclusion

Mastering combinational circuits is the first step toward understanding how modern hardware. These components are the building blocks of more advanced hardware systems like ALUs, control units, and memory addressing circuits. 

