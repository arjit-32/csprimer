---
title: Regular Expressions & Regular Languages
author: Arjit Sharma
meta_title: Regex & Regular Languages- CS Essentials | CS Primer
description: Master regular expressions and regular languages. Learn how they power pattern matching and lexical analysis in programming and compiler design.
series: ["toc"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Are Regular Expressions?

Regular expressions (regex) are a way to describe patterns in strings, like emails, numbers, or binary sequences. They are simple but powerful tools and directly relate to finite automata.

For example:

- `a*` means zero or more *a’s*
- `ab+` means `a` followed by one or more *b’s*
- `(0|1)*01` means any binary string ending in 01

Regular expressions aren’t just for search tools, they **define regular languages**, which are the class of languages that can be recognized by finite automata.

---

## Regular Languages

A regular language is a set of strings that can be described using a regular expression or recognized by a finite automaton (DFA or NFA). e.g - All strings of even length, Identifiers *(like int, x2, etc)*

---

## Pumping Lemma

The Pumping Lemma helps prove that a language is not regular by showing it can’t be recognized by a finite automaton.

**Why ?**

Sometimes, we want to show that a pattern is **too complex** for a finite automata like. e.g - *Balanced parentheses*, *Palindromes* or a *Equal number of 0s and 1s.* 

Pumping Lemma says:

> If a language is regular, then long enough strings in the language can be "pumped" i.e., parts of the string can be repeated and the result will still be in the language.
> 

**Formal definition -**

If a language L is regular, there exists a pumping length k such that for any string z in L with length |z| >= k, we can split **z = uvw** where:

1. |uv| <= k *(the first part is within **k** symbols)*.
2. |v| > 0 *(the pumped part is not empty)*.
3. For all i >= 0, uv^iw is in L *(repeating **v** zero or more times keeps the string in **L**)*.

If we find a string where pumping fails, the language is not regular.