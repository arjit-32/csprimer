---
title: Code Optimization
author: Arjit Sharma
meta_title: Code Optimization in Compilers | CS Primer
description: Master code optimization in compilers. Learn techniques to improve program efficiency and performance in computer science.
series: compiler
categories: ["Core-CS"]
draft: false
year: 2025
---

## What Is Code Optimization?

After generating intermediate code, the compiler tries to improve it, without changing what the program does. The goal is to make the code run faster and use less memory. 

![goal-of-compiler-optimization](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779976486/goal-of-compiler-optimization_i7tzid.webp)

In simple terms the goal of optimization is to make code more efficient overall.

---

## Types of Optimizations

### Local Optimization

![local-optimization](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779976495/local-optimization_nfo2av.webp)

- Improves small code chunks (basic blocks).
- Constant Folding: Changes *x = 2 + 3* to *x = 5*.
- Dead Code Elimination: Removes unused code, like *y = 7* if y isn’t used.


### Global Optimization

![global-optimization](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779976501/global-optimization_lnhpjq.webp)

- Improves code across multiple chunks or functions.
- Common Subexpression Elimination: Reuses repeated calculations (e.g., compute a + b once).
- Loop Invariant Code Motion: Moves unchanging calculations outside loops.

### Machine-Level Optimization

![machine-level-optimization](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779976495/machine-level-optimization_ka9nex.webp)

- Tweaks code for the computer’s hardware, like using faster instructions or better memory access.
    
---

## Example: Before & After

**Before** (Three-address code):

```bash
t1 = a + b
t2 = a + b
t3 = t1 + c
```

**After** (Common subexpression elimination):

```bash
t1 = a + b
t3 = t1 + c
```

---

## Is Optimization Always Worth It?

Not always. Some optimizations:

- Can increase compile time
- May make debugging harder
- Might not help much if the code is already efficient

Compilers offer optimization levels *(e.g., -O1, -O2, -O3 in GCC)* to balance speed and effort.
