---
title: Count of Digits
meta_title: Count of Digits in Java - A DSA Essentials Tutorial
description: Master digit counting with Java! Understand how to calculate the number of digits in a number - a foundational skill for coding interviews and data structures & algorithms practice.
author: Arjit Sharma
series: ["dsa"]
categories: ["DSA"]
featured: false
draft: false
---

Digit counting refers to finding the number of digits in a given integer. For example:
- 345 has 3 digits
- 0 has 1 digit
- -728 has 3 digits (ignoring the negative sign)

## Solution 

```java
class CountOfDigits {
    public static void main(String[] args) {
        int num = 7284;
        int count = 0;

        while (num != 0) {
            num = num / 10;
            count++;
        }

        System.out.println("Digit count: " + count);
    }
}
```