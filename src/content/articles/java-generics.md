---
title: Generics in Java
meta_title: Java Generics- Programming Guide | CS Primer
description: Learn Java generics. Master type-safe collections for efficient and flexible programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Almost every part of the Java Collections Framework uses Generics internally - so first lets dive into Generics

## Generics

It means parameterized types. Using Generics it is possible to create classes that work with different data types.

Why use Generics ?

- Enforcing stronger type checking at compile time
- Elimination of casts
- Reusable, type-safe algorithms and data structures

```java
public class Printer<T> {

    T item;

    public Printer(T item) {
        this.item = item;
    }

    public void consolePrinter() {
        System.out.println(item.toString());
    }

    public void changeItem(T item) {
        this.item = item;
    }
}

// Usage
Printer<Integer> integerPrinter = new Printer<>(5);

Printer<String> strPrinter = new Printer<>("Hello");
```