---
title: "Math for DSA"
meta_title: "Learn about the Math required for DSA"
description: "ss"
author: Arjit Sharma
series: ["dsa-foundations"]
categories: ["DSA"]
featured: false
draft: false
---

Mathematical concepts are essential for analyzing algorithms, optimizing code, and solving problems efficiently. These concepts appear frequently in **time complexity**, **recursion**, **searching**, **sorting**, and **number-based problems**.

---

## Numbers and Growth

### Why It Matters

Algorithm performance depends on **how values grow** as input increases.

Common growth types:

- Constant
- Linear
- Logarithmic
- Exponential

```java
// Linear growth
for (int i = 0; i < n; i++) {
    System.out.println(i);
}

```

→ Growth: **n**

---

## Logarithms

### What You Need to Know

- Logarithms appear when input size **reduces by a factor**
- Common in **binary search**, **divide and conquer**

Key rules:

- log₂(n) < log₁₀(n) < logₑ(n) (difference ignored in Big-O)
- log(n²) = 2 log(n)
- log(a/b) = log(a) − log(b)

### Example: Binary Search

```java
public class BinarySearch {
    static int search(int[] arr, int key) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] == key) return mid;
            else if (arr[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}

```

- Each step halves input
- Time Complexity → **O(log n)**

---

## Arithmetic Series

### Why It Matters

Used to analyze loops that grow gradually.

### Formula

```
1 + 2 + 3 + ... + n = n(n + 1) / 2

```

### Example

```java
for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= i; j++) {
        System.out.println(j);
    }
}

```

Total operations:

- `1 + 2 + ... + n`
- Complexity → **O(n²)**

---

## Geometric Series

### Why It Matters

Used in **divide and conquer** and **recursive algorithms**.

### Formula

```
n + n/2 + n/4 + ... + 1 = 2n

```

### Example

```java
for (int i = n; i > 0; i /= 2) {
    System.out.println(i);
}

```

- Loop halves each time
- Complexity → **O(log n)**

---

## Modulo Arithmetic

### Why It Matters

Used to:

- Prevent integer overflow
- Handle cyclic problems
- Competitive programming

### Example

```java
public class ModExample {
    static int add(int a, int b) {
        int MOD = 1_000_000_007;
        return (a % MOD + b % MOD) % MOD;
    }
}

```

Key properties:

- `(a + b) % m = ((a % m) + (b % m)) % m`
- `(a * b) % m = ((a % m) * (b % m)) % m`

---

## Floor and Ceiling

### Why It Matters

Used in:

- Binary search
- Index calculation
- Division handling

```java
int mid = (low + high) / 2;          // floor division
int midSafe = low + (high - low) / 2; // avoids overflow

```

- Integer division in Java → **floor**

---

## Recursion Math Basics

### Stack Depth

Recursive calls consume stack space.

```java
static void fun(int n) {
    if (n == 0) return;
    fun(n - 1);
}

```

- Calls → n
- Time → O(n)
- Space → O(n)

---

## Bitwise Basics

### Why It Matters

Used for:

- Optimization
- Low-level operations
- Competitive programming

```java
int x = 5;   // 0101
int y = 3;   // 0011

System.out.println(x & y); // AND → 1
System.out.println(x | y); // OR  → 7
System.out.println(x ^ y); // XOR → 6

```

Common tricks:

- `x & 1` → check odd/even
- `x << 1` → multiply by 2
- `x >> 1` → divide by 2

---

## Power and Exponentiation

### Fast Power (Important)

```java
static int power(int a, int n) {
    int result = 1;
    while (n > 0) {
        if ((n & 1) == 1) result *= a;
        a *= a;
        n >>= 1;
    }
    return result;
}

```

- Time Complexity → **O(log n)**