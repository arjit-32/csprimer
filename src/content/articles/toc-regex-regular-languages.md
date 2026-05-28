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

![regular-expressions](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945396/regular-expression_ozgnse.webp)

Regular expressions (regex) are a way to describe patterns in strings, like emails, numbers, or binary sequences. They are simple but powerful tools and directly relate to finite automata.

![regular-lang-with-finite-automata](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945396/when-is-regular-lang-accepted_tgk7l8.webp)

### Example of Regular Expressions

![example-of-regular-expressions](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945396/regex-to-dfa-example_idvpzx.webp)

- `a*` means zero or more *a’s*
- `ab+` means `a` followed by one or more *b’s*
- `(0|1)*01` means any binary string ending in 01

---

## Regular Languages

A regular language is a set of strings that can be described using a regular expression or recognized by a finite automaton (DFA or NFA). e.g - All strings of even length, Identifiers *(like int, x2, etc)*


**What makes a language Regular?**

![regular-language](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945396/regular-language_yqfpyy.webp)

Lets, concretify what we brushed past in definition. If any of the following is true, the language is regular.
- Described by Regular Expression: The language can be expressed using symbols like |, *, +, ?, () and concatenation.
- Recognized by Finite Automata: There exists a DFA or NFA that accepts exactly the strings in the language.


### Examples of Regular Languages 

![examples-of-regular-languages](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945396/examples-of-regular-languages_tcmqfd.webp)

- `((0|1)(0|1))*` is a regex represnting the regular language - *All strings of even length*
- `[a-zA-Z_][a-zA-Z0-9_]*` is a regex representing identifiers like *int, x2, num1 etc.*

---

## Connection between Regex, Regular Language and Finite Automata

![regex-regular-lang-finite-automata](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779945397/big-picture-of-regex-regular-lang_bjzs6t.webp)

Regular expressions are more than just powerful search patterns, they **formally describe regular languages**. A regular language is a set of strings that can be recognized by a finite automaton. In other words, every regular expression corresponds to a regular language, and every regular language can be represented by some finite automaton.

---

## Pumping Lemma

![pumping-lemma-intro](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779951090/pumping-lemma-intro_lqpigx.webp)

The Pumping Lemma helps prove that a language is not regular by showing it can’t be recognized by a finite automata.

**Why would we need pumping lemma ?**

![example-of-non-regular-languages](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779951090/non-regular-language-examples_oe908v.webp)

Sometimes, we want to show that a pattern is **too complex** for a finite automata like. e.g - *Balanced parentheses*, *Palindromes* or a *Equal number of 0s and 1s.* 

Pumping Lemma says:

> If a language is regular, then long enough strings in the language can be "pumped" i.e., parts of the string can be repeated and the result will still be in the language.
> 

### Formal definition of Pumping Lemma

![pumping-lemma-formal-definition](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779951090/pumping-lemma-formal-definition_zbspv8.webp)

If a language L is regular, there exists a pumping length k such that for any string z in L with length |z| >= k, we can split *z = uvw* where:

1. **|uv| <= k** *(the first part is within k symbols)*.
2. **|v| > 0** *(the pumped part is not empty)*.
3. **For all i >= 0, uv^iw is in L** *(repeating v zero or more times keeps the string in **L**)*.

![steps-in-pumping-lemma](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779951090/pupming-lemma-in-short_bznggk.webp)

If we find a string where pumping fails, the language is not regular.

### Example of Pumping Lemma

Lets take a language L=\{ a^nb^n\} ., and try to prove if its non-regular *(Spoiler alert - It is)*

![example-of-pumping-lemma](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779951090/example-of-pumping-lemma_j2wcwd.webp)