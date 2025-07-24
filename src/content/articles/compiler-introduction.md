---
title: Introduction to Compilers
author: Arjit Sharma
meta_title: Introduction to Compilers- CS Basics | CS Primer
description: Explore compilers in this beginner guide. Learn how they translate code and their role in programming and computer science.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is a Compiler?

A compiler is a program that translates code written in a high-level programming language (like C, Java, or Rust) into machine code that a computer's processor can execute. 

---

## A Bit of History

- **1940s** Early Computers: The first computers, like the ENIAC (1945), were programmed manually using switches or punch cards. Programmers had to write machine code (0s and 1s), which was slow and error-prone, like writing a book in binary.
- **Late 1940s** Assembly Language: Computers like the EDSAC (1949) introduced assembly language, using words (e.g., “ADD”) instead of 0s and 1s. Assemblers, early compiler-like tools, translated these into machine code, saving time.
- **1950s** Birth of Compilers: **Grace Hopper** created A-0 (1952), a tool to automate translating math instructions into machine code for the UNIVAC I computer. This was a precursor to compilers, making programming easier.
- **1957** Fortran and True Compilers: The Fortran language, developed for the IBM 704 computer, came with the first full compiler. It let programmers write complex math in human-friendly code, while the compiler handled the machine translation. This was a game-changer, as computers were becoming faster and more common (e.g., IBM’s 700 series).

Early computers were hard to program directly. Compilers emerged to bridge the gap, letting people focus on solving problems (like science or business) while computers like the UNIVAC and IBM machines grew powerful enough to run compiled code efficiently.

---

## The Building Blocks of a Compiler

A modern compiler is built in phases, each responsible for a part of the translation process:

1. Lexical Analysis: Breaks code into small pieces (tokens), like words in a sentence.
2. Syntax Analysis: Checks if tokens form valid code, building a tree structure.
3. Semantic Analysis: Ensures the code makes sense (e.g., correct variable types).
4. Intermediate Code: Turns code into a simpler, abstract form.
5. Optimization: Makes the code faster or smaller.
6. Code Generation: Creates machine code for the computer.
7. Linking: Combines code with libraries to make a runnable program.