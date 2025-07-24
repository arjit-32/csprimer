---
title: Syntax Analysis (Parsing)
author: Arjit Sharma
meta_title: Syntax Analysis- Parsing in Compilers | CS Primer
description: Master syntax analysis in compilers. Learn parsing techniques to check code structure for programming and compiler design.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Syntax Analysis?

Once the lexer has broken source code into tokens, syntax analysis (or parsing) takes over. It arranges these tokens into a parse tree *(or syntax tree)* based on the grammar of the programming language.

We are just trying to ask - 

*“Do these tokens form a valid statement in our language?”*

---

## Grammar and Parsers

The syntax of a programming language is defined using a **context-free grammar (CFG)**:

- A set of rules (productions) that describe how statements are structured
- For example:
    
    ```
    stmt → if ( expr ) stmt
    expr → ID > NUM
    ```
    

Parsers are built to check input against these rules.

---

## Types of Parsers

Two major categories:

1. **Top-down Parsers** (predictive, recursive descent)
    - Try to build the parse tree from the root down
    - Simpler to understand and implement
2. **Bottom-up Parsers** (shift-reduce, LR parsers)
    - Build from the leaves up
    - Handle a wider range of grammars

---

## Syntax Errors

Parsers detect syntax errors like a missing parenthesis or a wrong operator order.

Example:

```c
if (x > 0   // missing closing )
```

The parser reports this before moving to the next phase.

---

## Conclusion

- Parsing arranges tokens into a parse tree using context-free grammar
- The parse tree is often simplified into an abstract syntax tree (AST) for later phases.
- It checks if the code is syntactically valid
- Tools like Yacc/Bison are used to generate parsers in real compilers