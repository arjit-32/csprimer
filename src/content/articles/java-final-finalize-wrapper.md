---
title: Final, Finalize and Wrapper Classes
meta_title: Java Final & Wrapper Classes | CS Primer
description: Explore Java final, finalize, and wrapper classes. Learn their role in robust programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Final Keyword

Used to restrict the modification of classes, methods, and variables

- **Final Variables**: A `final` variable's value cannot be changed once it has been assigned. This makes it similar to a constant.
- **Final Methods**: A `final` method cannot be overridden by subclasses. This prevents any further modification of the method's behavior in derived classes.
- **Final Classes**: A `final` class cannot be subclassed. This means no other class can inherit from a `final` class.

---

## Finalize

It is a protected and non-static method of Object class. It is invoked by JVM when an object is garbage collected.

With the release of JDK 9 `finalize()` has been deprecated. 

---

## Wrapper Classes

Class that wraps primitive data types.

Ex - Character, Byte, Integer, Boolean

Autoboxing - Conversion of primitive to object of their corresponding class. int to Integer.

```java
int a = 5;
Integer b = a;
```