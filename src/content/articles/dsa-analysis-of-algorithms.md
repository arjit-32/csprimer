---
title: Analysis of Algorithm
meta_title: dsa
description: dsa
author: Arjit Sharma
series: ["dsa"]
categories: ["DSA"]
featured: false
draft: false
---

When designing algorithms, the big question is: “How fast will this run as my data grows?” That’s where asymptotic analysis steps in. 

## What Is Asymptotic Analysis?
- Focuses on input size (n) as it grows towards infinity
- Ignores machine-specific constants and lower-order terms
- Gives an abstract, yet realistic idea of algorithm performance

---

## The Three Big Notations
| Notation | Meaning | Describes | 
|----------|--------|-----------|
| Big-O (O) | Upper bound – Worst case | Max time/resources used | 
| Omega (Ω) | Lower bound – Best case | Minimum guarantee | 
| Theta (Θ) | Tight bound – Average case | Typical performance | 


Think of it like this: Big-O is the “maximum damage”, Ω is “best hope”, and Θ is your “expected reality”.

---

## Common Time Complexities

| Complexity | Description | Example Algorithms | 
|------------|-------------|--------------------|
| O(1)       | Constant | Accessing array element | 
| O(log n)   | Logarithmic | Binary Search | 
| O(n)       | Linear | Traversing a list | 
| O(n log n) | Linearithmic | Merge Sort, Heap Sort | 
| O(n²)      | Quadratic | Bubble Sort, Insertion Sort | 
| O(2ⁿ), O(n!) | Exponential/Factorial | Recursive backtracking (TSP) | 

---

## 🔍 Examples: Finding Complexity
- Loop Example:
    ```java
        for i in range(n):
            print(i)
    ```
    Runs n times → O(n)

- Nested Loop:
    ```java
        for i in range(n):
            for j in range(n):
                print(i, j)
    ```
    Runs n * n times → O(n²)

- Divide and Conquer (e.g. Merge Sort):Splits into halves each time → O(n log n)



