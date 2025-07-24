---
title: Inheritance, this and super in Java
meta_title: Java Inheritance- this & super | CS Primer
description: Master Java inheritance. Learn this, super, and code reuse for advanced OOP programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Inheritance

Mechanism in which new objects take on the properties of existing objects. Ex - _"Dog, you are a animal so do everything a animal does like eat food, but but but you also bark"_

```java
class Animal {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat();  // Inherited method from Animal
        myDog.bark(); // Method from Dog class
    }
}
```

*Note - Java doesnt support multiple inheritance, though they can implement from multiple interfaces which is not truly a multiple inheritance because there is no shared mutable state.*

---
## This and Super

### This Keyword

`this`is a **reference variable** that refers to the current object. It can be used to refer to current class instance variables or invoke constructor and methods.

```java
class Student {
	String name;
	int age;
	boolean single;
	
	public Student(boolean single){
		this.single = single;
	}
	
	public Student(String name, int age, boolean single){
		this(single);
		this.name = name;
		this.age = age;
	}
}

Student s1 = new Student("arjit", 25, false);
```

### Super Keyword

Reference variable that refers to the immediate parent class (superclass) object. It's primarily used to access members (fields, methods, and constructors) of the superclass from within a subclass, we can invoke parent’s methods and also we can invoke parent’s constructor using `super()`.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        super.sound();  // Calls the sound method of Animal class
        System.out.println("Dog barks");
    }
}

public class SuperExample {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.sound();
    }
}
```