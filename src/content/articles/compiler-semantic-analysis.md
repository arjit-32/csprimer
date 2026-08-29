---
title: Semantic Analysis
author: Arjit Sharma
meta_title: Semantic Analysis in Compilers | CS Primer
description: Dive into semantic analysis in compilers. Understand type checking and error detection for robust programming systems.
series: compiler
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Semantic Analysis ?

![semantic-analyzer-intro](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779973893/semantic-analysis-intro_uy3axy.webp)

After syntax analysis confirms that the structure of your code is valid, semantic analysis checks that the code also has meaning.

Example:

```c
int x = "hello";  // Syntax is fine, but semantically invalid
```

Here, the parser is okay with the structure, but the semantic analyzer will raise an error because you're assigning a string to an integer.

---

## What Does Semantic Analyzer Check ?

![what-semantic-analyzer-checks](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779973894/things-semantic-analyzer-checks_z5ex6s.webp)

1. **Type Checking**
    - Are values used with the correct data types?
    - Example: `int x = 5 + true;` → invalid in most languages
2. **Scope Resolution**
    - Are variables declared before use?
    - Is a variable accessed within its valid scope?
3. **Function Signatures and Calls**
    - Are functions called with the right number and type of arguments?
4. **Variable Declarations and Usage**
    - Prevents using undeclared variables
    - Checks for duplicate declarations

---

## Internal Working of Semantic Analysis

Semantic analysis takes the Abstract Syntax Tree (AST) generated during syntax analysis and verifies whether the program is logically meaningful.

![working-of-semantic-analyzer](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779973898/working-of-semantic-analyzer_oyrqzc.webp)

Semantic analysis walks through this AST and attaches additional information such as variable types, scopes, function signatures, expression types. 
To perform these checks efficiently, the compiler maintains a symbol table alongside the AST.

### AST with Semantic Information

![ast-with-semantic-info](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779973896/ast-with-semantic-info_ba1spc.webp)

During semantic analysis, the AST becomes enriched with semantic details.

For example:
- variables get associated with their data types
- expressions are checked for type compatibility
- function calls are validated against parameter definitions

In the diagram above:
- `x : int` means variable `x` has integer type
- `sum(x : int, y : int)` verifies argument types
- `BinaryExpr (a + b : int)` confirms the expression result type

This annotated AST helps later compiler phases like optimization and code generation.

### Symbol Table

![symbol-tree-with-semantic-info](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779973894/symbol-table-with-semantic-info_skmknq.webp)

The symbol table is a compiler data structure that stores information about identifiers used in the program.

It typically keeps track of:
- variable names
- data types
- scopes
- function definitions
- parameters
- memory-related metadata

For example:
- `x` belongs to the `main` scope
- `a` and `b` are parameters of `sum`
- `sum` is a function returning `int`

Semantic analysis continuously consults the symbol table while traversing the AST to validate declarations and resolve identifiers correctly.

---

## Conclusion

- Semantic analysis ensures code is meaningful, using the AST.
- It uses a **symbol table** to track declarations, scopes, and types
- Errors at this stage are not structural but **meaning-related**
