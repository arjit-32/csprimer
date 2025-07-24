---
title: Decidability and Computability
author: Arjit Sharma
meta_title: Decidability & Computability in CS | CS Primer
description: Master decidability and computability. Understand what computers can and cannot solve, with insights into algorithms and theoretical CS
series: ["toc"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Even the most powerful computers today **can’t solve all problems**. Some questions are impossible for any computer to answer reliably, no matter how fast or smart it is. This chapter explains why and what those limits are.

## What Is Decidability?

Decidability is about whether a computer can give a clear "yes" or "no" answer to a question in a finite amount of time.

- Decidable problems *(recursive languages)*: The computer can always answer yes/no. example - checking if an email address is valid
- Semi-decidable problems *(recursive enumerable languages)*: The computer can say "yes" if the answer is yes, but might run forever and never say "no" if the answer is no. example - checking if an app will stop running.
- Undecidable problems: No computer can answer yes/no for every case. example - checking if a program is bug free.

---
## The Halting Problem

The Halting Problem is a famous undecidable problem which asks: Will a given program (or Turing machine) stop or run forever on a specific input? 

Alan Turing proved in 1936 that no computer program can predict if any app will stop or loop for every possible input. 

---

## Computability: What Computers Can Do

Computable problems are ones a computer can solve with an algorithm

- All decidable problems are computable (e.g., sorting a list).
- Some semi-decidable problems are computable but only for "yes" cases (e.g., virus detection).
- Undecidable problems *(like the Halting Problem)* aren’t fully computable because no algorithm can handle all cases.

Note that even computable problems can be slow. Example: Finding the best route for 1,000 delivery stops is solvable but takes ages on today’s computers.