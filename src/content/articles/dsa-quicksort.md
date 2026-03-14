---
title: Quicksort
meta_title: Quicksort Explained with Divide & Conquer  Recursion in DSA
description: Master the Quicksort algorithm using Divide and Conquer strategy. Learn through examples, code, and recursion-based logic—ideal for beginners in Data Structures and Algorithms.
author: Arjit Sharma
series: ["dsa-complete-picture"]
categories: ["DSA"]
featured: false
draft: false
---

## Divide & Conquer

Divide and Conquer is a fundamental algorithmic technique that breaks a problem into smaller subproblems, solves them independently, and then combines the results to obtain the final solution.

### Example: Sum of Array using Divide and Conquer

![Quiksort](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1750162834/quiksort_raf4mq.png)

```java
public static int arrsum(int[] arr){
    if(arr.length == 0 )
        return 0; // Base case
    return arr[0] + arrsum(Arrays.copyOfRange(arr, 1, arr.length));
}
```

---

## Quicksort ( Algorithm )

1. **Base Case**: Empty array, array with 1 element, or array with 2 element (swap if first is bigger)
2. **Choose a Pivot**: Select a pivot element from the array.
3. **Partitioning**: Split the array into two sub-arrays:
    - Elements smaller than the pivot.
    - Elements greater than or equal to the pivot.
4. **Recursion**: Recursively apply Quicksort on both sub-arrays and then combine them.

```java
public static ArrayList<Integer> quickSort(ArrayList<Integer> list){
    if(list.size() < 2) return list; // Base case
    int pivot = list.get(0);
    ArrayList<Integer> less = new ArrayList<Integer>();
    ArrayList<Integer> high = new ArrayList<Integer>();
    for(int i = 1; i < list.size(); ++i){
        if(list.get(i) < pivot) less.add(list.get(i));
        else high.add(list.get(i));
    }
    ArrayList<Integer> sortedList = quickSort(less);
    sortedList.add(pivot);
    sortedList.addAll(quickSort(high));
    return sortedList;
}
```

