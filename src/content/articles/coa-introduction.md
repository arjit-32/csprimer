---
title: Introduction to Computer Architecture
author: Arjit Sharma
meta_title: Introduction to COA- Learn CS Basics | CS Primer
description: Explore computer organization and architecture (COA). Learn core concepts of hardware and system design for CS and engineering.
series: ["coa"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Computer Architecture is the study of how computers are structured internally, how they store, process, and execute data and instructions. 

But before we get into that, lets go back in time to the 19th century where it all began.

---

## A brief history of Computers

### Charles Babbage: Idea of a Computer

In the **1830s**, *Charles Babbage* envisioned the **Analytical Engine**, a fully mechanical, general-purpose computer. It used rotating gears to represent and manipulate numbers, had memory unit using punch cards and could perform programmatical operations.

Though never completed, it introduced the fundamental structure of a computer.

### Ada Lovelace: The First Programmer

*Ada Lovelace*, working alongside Babbage, wrote what is now considered the *first computer program,* an algorithm to compute **Bernoulli numbers** on the Analytical Engine. She saw that such a machine could go beyond numbers, even proposed that one might compose music.

### Herman Hollerith: Data Processing

In **1880s,** Herman Hollerith developed a tabulating machine that used punch cards to process data efficiently and was used for **1890** U.S census, reducing data processing time from years to months.

### Alan Turing: Formalized Computation

In **1936**, Alan Turing introduced the turing machine, a theoritical model consisting of a infinite tape, a read/write head and set of rules to manipulate symbols. This laid the concept of a universal machine and a foundation for stored-program computers. 

### Electromechanical Computers

As mechanical systems were reaching their limits, engineers started incorporating electrical components. In **1941**, **Konrad Zuse’s Z3** used electromechanical relays. While IBM also developed Harvard Mark 1 in **1944**, which used relays and punch cards.

### Claude Shannon: Simplified Circuit Design

In **1937**, *Claude Shannon* revolutionized circuit design by proving that Boolean algebra could model logic circuits. Now engineers could now design logic circuits mathematically instead of guess work.

### Electronic Computers with Vacuum Tubes

In the **1940s**, computers moved from mechanical to electronic with vacuum tubes. ENIAC (**1945**): One of the first electronic general-purpose computers. It used ~18,000 vacuum tubes and was programmed manually with cables *(no concept of stored program)*, primarily used in military calculations. 

### Evolution of Hardware

 A transistor was developed in **1947**, it replaced vacuum tubes and was later used in **IBM 7090** *(1959).* Soon after Transistors, followed Integrated Circuits in **1958,** and a microprocessor in **1970s** which later gave us personal computers.

---

## Von Neumann Architecture: The Modern Blueprint

![von-nueman-architecture](https://res.cloudinary.com/dwa6rcttw/image/upload/v1748157123/von-nueman_w7a7at.png)

One of the limitations of ENIAC was for each program you had to manually change wiring. In **1945**, John von Neumann proposed the stored-program concept.

- Program instructions and data stored in the same memory
- Machine reads instructions, decodes, executes, repeats
- Components:
    - ALU for computation
    - Control unit to direct execution
    - Memory for storage
    - Input/Output units
    - Bus system for data movement

This design became known as the von Neumann architecture, and it's still the foundation for most computers today.

---

## Conclusion

Now you see, Babbage’s dream of a general-purpose computer to the computers you use today, everything was done in incremental steps.