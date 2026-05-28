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

![lexiacl-analysis-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779966435/lexical-analysis-example_ko4fza.webp)

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

1. **Scanning:** Break input string into tokens *(lexemes).*
    
```text
[x] [=] [a] [+] [b] [;]
```
    
2. **Evaluating:** Convert lexemes into processed values.

```text
[   
    (identifies,x), 
    (operator,=), 
    (identifier,a), 
    (operator,+), 
    (identifier,b)
]
```

---

Now that we know about the two phases., lets take a look at complete picture of how lexical anlysis works.

![lexical-analysis](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779966434/lexical-analysis_a0rz0x.webp)


---

## Lexical Errors

A lexical analyzer may also detect invalid character sequences that do not match any defined token pattern. These are called lexical errors.

![lexical-errors](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779966434/lexical-errors_fw8tpq.webp)

For example:

```c
if(total $ 50)
```

In above code, the symbol $ may be considered invalid if it is not part of the language grammar, causing the lexer to throw a lexical error.


---

## Tools & Techniques

Lexical analyzers are built using two important concepts:

1. **Regular Expressions (Regex)**  
   Used to describe token patterns such as identifiers, numbers, operators, and keywords.

2. **Finite Automata**  
   Used internally to efficiently recognize and match those patterns while scanning source code.

![lexical-analysis-foundations](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779966435/lexical-analysis-foundations_ffhxo8.webp)

For example:

- `[a-zA-Z_][a-zA-Z0-9_]*` → identifier
- `[0-9]+` → integer
- `==|!=|<=|>=` → operators

In practice, tools like **Lex** allow developers to write regex-based rules and automatically generate a lexical analyzer from them.

---

## Conclusion

Lexing simplifies the parser’s job by structuring raw text and also provides early error detection *(invalid characters, unclosed strings)*
