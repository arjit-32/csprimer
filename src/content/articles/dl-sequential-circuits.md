---
title: Sequential Circuits
author: Arjit Sharma
meta_title: Sequential Circuits- Digital Logic | CS Primer
description: Master sequential circuits in digital logic. Learn flip-flops and state machines for designing memory-based systems.
series: ["dl"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Sequential circuits are *logic circuits with memory* . Their output depends not only on current inputs but also on the history of inputs.

**Key Characteristics -**

- Use feedback loops to store state
- Require a clock signal for timing (in synchronous systems)
- Built using flip-flops and latches

## Types of Sequential Circuits

### 1. **Latches**

Simplest memory elements, storing 1 bit and built using NOR or NAND gates.

- **SR Latch**: Stores 1 bit using Set (S) and Reset (R) inputs

![SR-Latch](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747985754/s-r-latch_kiqdb0.png)
---

### 2. **Flip-Flops**

Clocked version of latches where data changes only on clock edge (e.g., rising or falling).

- Types:
    - **SR Flip-Flop:** Like an SR latch but clock-controlled.
    - **D Flip-Flop**: Stores the input bit on clock edge
    - **JK Flip-Flop**: Versatile, no invalid state
    - **T Flip-Flop**: Toggles output on each clock pulse

---

### 3. **Registers**

Group of flip-flops used to store multi-bit values. They are synchronized by clock, used in processors for temporary data storage

---

### 4. **Counters**

Circuits that count clock pulses in sequence. There are multiple types like Up Counter, Down counter etc

---

### 5. **Finite State Machines (FSMs)**

Models that manage sequences by transitioning between states. These are defined by -

- States: Defined conditions (e.g., “idle,” “active”).
- Inputs/Outputs: Determine transitions and results.
- Transition Logic: Rules for moving between states.

Example - A traffic light controller cycling through “red”, “green” and “yellow”.

---

## Conclusion

These circuits are essential for building CPUs, timers, memory controllers, and any logic that must respond to sequences over time.