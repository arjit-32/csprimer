---
title: Introduction to Algorithms
meta_title: Introduction to Algorithms- Binary Search & Big-O Explained  DSA Guide
description: Explore the foundations of Data Structures and Algorithms with clear explanations of Binary Search and Big-O Notation. Perfect for beginners diving into DSA concepts.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

Data Structures (how we store data) and Algorithms (Series of steps to accomplish a task) form the backbone of computer science and programming. 

## Binary Search

Imagine you are searching for a word in a dictionary. Instead of checking every word one by one, you would flip to roughly middle of dictionary and see if word is before or after, and keep doing that until reach the word.
That’s it, that is what Binary Search is.

![binary-search](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/binary-search_jfbium.webp)

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Target found
    }

    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}

// Example
const numbers = [3, 7, 11, 16, 23, 27, 31, 42, 56];
console.log(binarySearch(numbers, 23)); // 4
```

---

## Running Time and Big-O Notation

Algorithms grow at different rates. It’s not enough to know how long an algorithm takes to run, but we need to know **how running time increases as input size increases**.

That’s where Big-O notation comes handy. It tells how does a Algorithm perform in worst case.

*For example: Linear Search may check n elements → O(n) while Binary Search repeatedly halves the search space → O(log n)*


### Why Big-O Matters ?
- Helps compare algorithm efficiency.
- Defines worst-case complexity.
- Guides optimal solution selection.


### Common complexities

Lets take a look at common algorithmic complexities. 

![asymptotic-notations-all-in-one-graph](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/asynmptotic-notation_yanq81.webp)


| **Big O Notation** | **Name**     | **Example**                 | **Growth**     |
| ------------------ | ------------ | --------------------------- | -------------- |
| **O(1)**           | Constant     | Accessing an array element  | Doesnt grow with n |
| **O(log n)**       | Logarithmic  | Binary Search               | Very slow growth |
| **O(n)**           | Linear       | Linear Search               | Grows proportionally |
| **O(n log n)**     | Linearithmic | Merge/Quick Sort            | Fast           |
| **O(n²)**          | Quadratic    | Bubble/Selection Sort       | Grows Quickly  |
| **O(2ⁿ)**          | Exponential  | Generating all subsets      | Very fast      |
| **O(n!)**          | Factorial    | Generating all permutations | Extremely fast |
