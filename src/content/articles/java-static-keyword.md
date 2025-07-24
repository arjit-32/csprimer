---
title: Static keyword in Java
meta_title: Java Static Keyword Explained | CS Primer
description: Learn Java static keyword. Understand static methods and variables for efficient programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Static Keyword

A variable or function that is associated to a class i.e., is common to all objects

```java
class Student {
	String name;
	int age;
	static String school = "Doon Blossoms";
}

Student s1 = new Student();
System.out.println(Student.school);
```

---
## Static Initialization Block

It can be used to initialize static fields of a class

```java
public class Person {

    static String name;
	  // Static Initialization Block
    static {
        name = "Arjit";
    }
}
```