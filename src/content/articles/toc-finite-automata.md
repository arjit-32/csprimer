---
title: Finite Automata
author: Arjit Sharma
meta_title: Finite Automata Explained- Learn CS Basics | CS Primer
description: Dive into finite automata, the foundation of computation. Understand deterministic and non-deterministic automata to build skills for compilers and algorithms
series: ["toc"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is a Finite Automata?

A finite automaton is an abstract machine which reads an input string *(e.g., 0s and 1s)* one symbol at a time, in response to which moves from one state to another.

---

## DFA: Strict and Simple

The Deterministic Finite Automata (DFA) is the strictest version. For every input symbol and state, there's exactly one path to follow. No guesses, no ambiguity.

DFA is perfect for simple rule-based pattern checking, like recognizing whether a string is a valid identifier or starts with certain characters.

### Example:

A DFA that accepts strings starting in abb over the alphabet {a, b}

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747371667/dfa_fqadse.png)

- It starts at a base state*(q0)*
- Moves to a second state*(q1)* when it reads *a*
- Moves to a third state*(q2)* when it reads a *b*
- Moves to a final accepting state*(q3)* when it sees a *b* right after.
- If any other sequence appears, it ends in a non-accepting state*(q4) (loop to stay in reject state)*

---

## NFA: Same Power, More Freedom

A Non-deterministic Finite Automaton (NFA) allows multiple paths for the same input or even moves without reading input *(ε-NFA)*. While NFAs seem more powerful, they’re equivalent to DFAs in what they can do but are easier to design, especially from regular expressions.

An NFA accepts a string if **at least one path** through its states leads to an **accepting state**.

### Example:

A NFA that accepts strings starting in abb over the alphabet {a, b}

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1747371667/nfa_zccn4n.png)

- It starts at a base state*(q0)*
- Moves to a second state*(q1)* when it reads *a*
- Moves to a third state*(q2)* when it reads a *b*
- Moves to a final accepting state*(q3)* when it sees a *b* right after. *(loop to stay in accepting state)*
- We don’t need to check intermediatory inputs, because we know that NFA accepts a input even if 1 path leads to accepting state.

---

## Mealy and Moore Machines

Mealy and Moore machine are a special case of DFA that produce output rather than acting as language acceptors. 

So far DFA and NFA only say *“yes”* or *“no”,* but what if you want a machine that produces output as it runs? That’s where these two models come in.

- **Moore Machine**: The output depends **only on the current state**
- **Mealy Machine**: The output depends on **both the current state and input symbol**