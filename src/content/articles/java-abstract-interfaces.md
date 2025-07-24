---
title: Abstract Classes and Interfaces
meta_title: Java Abstract Classes & Interfaces | CS Primer
description: Explore Java abstract classes and interfaces. Learn abstraction for flexible programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Abstraction is all about hiding the **how** and only showing the **what**. In Java, you can achieve this using abstract classes and interfaces.


## Abstract Class
A class that cannot be instantiated on its own and is meant to be inherited. It can contain abstract and non-abstract methods that subclasses are forced to provide an implementation for.

```java
abstract class Animal {
    // Abstract method (no implementation)
    abstract void sound();

    void sleep() {
        System.out.println("Animal is sleeping");
    }
}

class Dog extends Animal {
    // Implementing the abstract method
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}
```

---
## Interfaces
An interface in Java is a blueprint of a class. It defines a set of methods that a class must implement. It is used to *achieve 100% abstraction and multiple inheritance*.

```java
interface Animal {
    void sound();  // Abstract method (no implementation)
}

class Dog implements Animal {
    // Implementing the sound() method
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}
```

---
## Difference between Abstract class and Interfaces
An abstract class can have final, static, or class member variables whereas an interface can only have variables that are final and static by default. 

An interface can only have static, abstract or default methods.