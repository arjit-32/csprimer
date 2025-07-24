---
title: Semantic Analysis
author: Arjit Sharma
meta_title: Semantic Analysis in Compilers | CS Primer
description: Dive into semantic analysis in compilers. Understand type checking and error detection for robust programming systems.
series: ["compiler"]
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Semantic Analysis?

After syntax analysis confirms that the structure of your code is valid, semantic analysis checks that the code also has meaning.

Example:

```c
int x = "hello";  // Syntax is fine, but semantically invalid
```

Here, the parser is okay with the structure, but the semantic analyzer will raise an error because you're assigning a string to an integer.

## What Does It Check?

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

## Using the AST

Semantic analysis works with the AST, adding details like variable types or scopes. The AST is a simplified tree from syntax analysis, acting as an intermediate representation (IR) for this phase.

---

## Symbol Table

Semantic analysis heavily uses a symbol table, which keeps track of:

- Variable names
- Types
- Scopes
- Function definitions

It’s like the compiler’s **cheatsheet** for the code.

---

## Conclusion

- Semantic analysis ensures code is meaningful, using the AST.
- It uses a **symbol table** to track declarations, scopes, and types
- Errors at this stage are not structural but **meaning-related**