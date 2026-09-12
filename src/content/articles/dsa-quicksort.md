---
title: Quicksort
meta_title: Quicksort Explained with Divide & Conquer  Recursion in DSA
description: Master the Quicksort algorithm using Divide and Conquer strategy. Learn through examples, code, and recursion-based logic—ideal for beginners in Data Structures and Algorithms.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

## Divide & Conquer

Divide and Conquer is a fundamental algorithmic technique that breaks a problem into smaller subproblems, solves them independently, and then combines the results to obtain the final solution.

### Problem: Sum of Array using Divide and Conquer

```javascript

function arraySum(arr) {
    if (arr.length === 0) {
       return 0; 
    }
    return arr[0] + arraySum(arr.slice(1)); 
}

console.log(arraySum([1, 2, 3, 4])); // 10
```


![Quiksort](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/divide-and-conquer-array-sum_e7joez.webp)

---

## Quicksort ( Algorithm )

1. **Base Case**: Empty array, array with 1 element, or array with 2 element (swap if first is bigger)
2. **Choose a Pivot**: Select a pivot element from the array.
3. **Partitioning**: Split the array into two sub-arrays:
    - Elements smaller than the pivot.
    - Elements greater than or equal to the pivot.
4. **Recursion**: Recursively apply Quicksort on both sub-arrays and then combine them.


![quick-sort-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210123/quick-sort_bvt6cd.webp)

```javascript
function quickSort(arr) {
  // Base case: arrays of length 0 or 1 are already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // 1. Recurrence (Divide): Pick the first element as pivot
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 2. Backtracking (Combine): left + pivot + right
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Test with the diagram's exact array:
const input = [7, 2, 9, 4, 3, 8, 1];
console.log(quickSort(input)); 
// Output: [1, 2, 3, 4, 7, 8, 9]
```

