---
title: Lexical Analysis
author: Arjit Sharma
meta_title: Lexical Analysis in Compilers | CS Primer
description: Understand lexical analysis in compilers. Learn how tokenization works and its role in building efficient programming tools.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Lexical Analysis?

Lexical analysis is the first phase of a compiler. It scans the source code and breaks it into a sequence of tokens, which are the basic building blocks of a program:

- Keywords (`if`, `while`)
- Identifiers (`x`, `sum`)
- Operators (`+`, `==`)
- Literals (`123`, `'a'`)
- Symbols (`(`, `)`, `{`, `}`)

This process is handled by the *lexer* or *scanner*.

---

## What Happens During Lexing?

Lets say you have a input like *x = a+b;*

1. **Scanning:** Break input string into tokens*(lexemes).*
    
    ```
    [x] [=] [a] [+] [b] [;]
    ```
    
2. **Evaluating:** Convert lexemes into processed values.

```bash
[(identifies,x), (operator,=), (identifier,a), (operator,+), (identifier,b)]
```

---

## Tools & Techniques

Lexers are built using *regular expressions* to describe patterns and *Finite automata* to implement those patterns efficiently. **Lex** is one such tool that is used to generate lexical analyzers from regex-like rules.

A lexical analyzer may throw an error when it sees an invalid pattern *(not defined by us).* These are called lexical errors.

---

## Why Is Lexing Important?

It simplifies the parser’s job by structuring raw text and also provides early error detection *(invalid characters, unclosed strings)*