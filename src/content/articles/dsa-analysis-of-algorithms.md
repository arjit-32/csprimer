---
title: Analysis of Algorithm
meta_title: dsa
description: dsa
author: Arjit Sharma
series: dsa-math
categories: ["DSA"]
featured: false
draft: false
---

Analysis of Algorithms helps us compare solutions and predict performance before writing full programs. Instead of focusing on hardware speed, it focuses on how an algorithm scales with input size.

## What is Algorithm Analysis?

Algorithm analysis studies:

- **How fast** an algorithm runs → *Time Complexity*
- **How much memory** it uses → *Space Complexity*
- **How performance changes** as input size (`n`) grows

It answers questions like:

- Will this work for large inputs?
- Which solution is better in practice?

## Time Complexity

### What It Means

Time Complexity describes **how the number of operations grows** with input size `n`.

Example:

```java
public class TimeExample {
    public static void print(int n) {
        for (int i = 0; i < n; i++) {
            System.out.println(i);
        }
    }
}

```

- Loop runs `n` times
- Time Complexity → **O(n)**

### Common Patterns

| Code Pattern | Time Complexity |
| --- | --- |
| Single loop | O(n) |
| Nested loops | O(n²) |
| Loop halving `n` | O(log n) |
| No loop | O(1) |

---

## Space Complexity

### What It Means

Space Complexity measures **extra memory used** (excluding input).

Example:

```java
public class SpaceExample {
    public static int sum(int[] arr) {
        int total = 0; // constant space
        for (int x : arr) {
            total += x;
        }
        return total;
    }
}

```

- Uses one variable
- Space Complexity → **O(1)**

### Recursive Example

```java
public class Factorial {
    public static int fact(int n) {
        if (n == 0) return 1;
        return n * fact(n - 1);
    }
}

```

- Recursive calls use stack memory
- Space Complexity → **O(n)**

---

## Asymptotic Notations (Only What You Need)

### Big-O (O) – Upper Bound (Worst Case)

Maximum time an algorithm can take.

```java
// Always runs n*n times
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + j);
    }
}

```

→ **O(n²)**

---

### Big-Theta (Θ) – Exact Bound

Used when **best, average, and worst** are the same.

- Example: Always `n²` operations
- Complexity → **Θ(n²)**

---

### Big-Omega (Ω) – Lower Bound (Best Case)

Minimum time required.

Example: Linear Search

- Best case: element found at index `0`
- Complexity → **Ω(1)**

---

## Best, Average, Worst Case

### Why It Matters

The same algorithm behaves differently for different inputs.

### Example: Linear Search

```java
public class LinearSearch {
    static int search(int[] arr, int key) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == key) return i;
        }
        return -1;
    }
}

```

| Case | Time |
| --- | --- |
| Best | O(1) |
| Average | O(n) |
| Worst | O(n) |

👉 In practice, **worst case** is used for guarantees.

---

## Amortized Analysis

### What It Means

Average time per operation over **many operations**, not just one.

### Example: Dynamic Array (ArrayList)

```java
import java.util.ArrayList;

public class AmortizedDemo {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            list.add(i);
        }
    }
}

```

- Most inserts → O(1)
- Occasionally resize → O(n)
- **Amortized insert time → O(1)**

👉 Occasional slow operations are acceptable if overall performance is fast.

---

## Trade-Off Thinking (Very Important)

### Time vs Space Trade-Off

You often choose between:

- **Faster execution** (more memory)
- **Less memory** (slower execution)

### Example: Checking Duplicates

```java
import java.util.HashSet;

public class DuplicateCheck {
    static boolean hasDuplicate(int[] arr) {
        HashSet<Integer> set = new HashSet<>();
        for (int x : arr) {
            if (set.contains(x)) return true;
            set.add(x);
        }
        return false;
    }
}

```

- Time → **O(n)**
- Space → **O(n)**

Without extra space:

- Time → **O(n²)**
