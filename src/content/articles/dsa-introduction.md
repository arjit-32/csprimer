---
title: Introduction to Algorithms
meta_title: Introduction to Algorithms- Binary Search & Big-O Explained  DSA Guide
description: Explore the foundations of Data Structures and Algorithms with clear explanations of Binary Search and Big-O Notation. Perfect for beginners diving into DSA concepts.
author: Arjit Sharma
series: ["dsa-for-interviews"]
categories: ["DSA"]
featured: false
draft: false
---

Data Structures (how we store data) and Algorithms (Series of steps to accomplish a task) form the backbone of computer science and programming. 

## Binary Search

Imagine you are searching for a word in a **dictionary**. Instead of checking every word one by one, you would flip to roughly middle of dictionary and see if word is before or after, and keep doing that until reach the word.
That’s it, that is what Binary Search is.

```java
public static int binarySearch(int[] arr, int value){
    int low = 0, high = arr.length - 1, mid;
    while (low <= high) {
        mid = (low + high) / 2;
        if (arr[mid] == value) return mid;
        else if (arr[mid] > value) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}
```

---

## Running Time and Big-O Notation

Algorithms grow at different rates. It’s not enough to know how long an algorithm takes to run, but we need to know **how running time increases as input size increases**.

That’s where Big-O notation comes handy. It tells how does a Algorithm perform in worst case.
Ex- Binary Search’s time complexity can be written as O(log n)

Why Big-O Matters

- Helps compare algorithm efficiency.
- Defines worst-case complexity.
- Guides optimal solution selection.
