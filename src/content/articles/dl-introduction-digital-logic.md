---
title: Introduction to Digital Electronics
author: Arjit Sharma
meta_title: Introduction to Digital Logic- CS Basics | CS Primer
description: Explore digital logic in this beginner guide. Learn core concepts of digital systems for computer science and engineering.
series: ["dl"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Computers started as bulky machines with vacuum tubes and punch cards. They used to "compute" things using wires and switches.

## Early Computation: A World of Switches and Cards

![digital-electronics-history](https://res.cloudinary.com/dwa6rcttw/image/upload/v1753391560/digital-electronics_gzemgy.webp)

In the 1930s and 40s, machines like the *ENIAC* (Electronic Numerical Integrator and Computer) performed basic arithmetic using **vacuum tubes**, which acted like **electrical switches**. A switch is a electrical component where *1=ON* and *0=OFF.* These ON/OFF states became the earliest form of binary data.

At the same time, **punch cards** were used to input data and even programs. Each card had rows and columns where holes could be punched, each hole representing a 1(ON).

**Example -** 

An early program to compute `A = B + C` would involve:

1. Punching B and C onto cards.
2. Feeding the cards into a reader.
3. Using vacuum tube circuits to add the numbers.
4. Printing or punching the result onto a new card.

It was brilliant for its time but incredibly rigid. Without a formal system, engineers guessed how to wire switches to achieve desired logic *(e.g., “if A and B are ON, output C”)*. They tested combinations manually, often rebuilding circuits if logic failed.

---

## Claude Shannon’s Breakthrough: Turning Logic into Math

![claude-shannon](https://res.cloudinary.com/dwa6rcttw/image/upload/v1753391561/claude-shannon_wsazz8.webp)

In 1937, a 21-year-old graduate student at MIT named **Claude Shannon** changed everything. In his master’s thesis, he made a simple yet revolutionary claim

*“ You can design and simplify electrical circuits using Boolean algebra. ”*

Now engineers could design complex circuits on paper with equations first and then build confidently. This is what made modern computing possible.

### From Switches to Chips

Thanks to Shannon’s foundational work, engineers could now build **logic gates** (AND, OR, NOT) from vacuum tubes. 

In 1947, a transistor was developed which was a small semiconductor device that could also represent 1 or 0. Later Integrated circuits were built which housed many transistors and then microprocessors, but the concept they followed remained same that was binary logic.

---

## Analog vs. Digital: Why Binary Won

![analog-and-digital](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747728161/analog-digital_l73qpz.png)

Before digital electronics, many systems were analog working with smooth, continuous values but analog systems were sensitive to noise.

Digital electronics, using just two states (0 and 1), were:

- Reliable: Clear, noise-resistant signals.
- Scalable: Easy to build complex circuits.
- Perfect for logic: Ideal for computation, storage, and data processing.

Shannon’s math-based design approach perfectly matched the binary nature of switches (relays, vaccum tubes and later transistors), enabling precise, mathematical circuit design.

