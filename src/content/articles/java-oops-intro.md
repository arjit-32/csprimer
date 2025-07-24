---
title: Introduction to Object-Oriented Programming (OOP)
meta_title: Introduction to OOP in Java | CS Primer
description: Start with OOP in Java. Learn objects, classes, and principles for structured programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## What is OOP ?

Object-Oriented Programming is a paradigm centered around the concept of objects - real-world entities that have attributes (data) and behaviors (methods).

tbh a fancy way of saying _"Let's write code that feels more like the real world"_

In Java, everything revolves around classes and objects, making OOP a fundamental skill for every Java developer.

--
## Classes and Objects

Blueprint or a template are used to create objects. 
`java.lang.Object` is the superclass of all classes in java.

```java
class Person {
	String name;
	int age;
	
	// Constructor
	public Person(){
		name="";
		age=0;
	}
	
	void sleeps(int hours){
		System.out.println("This person sleeps " + hours + " hours");
	}
	
}

public class Main{
	public static void main(String s[]){
		Person p1 = new Person();
		p1.age=25;
		p1.name="arjit";
		p1.sleeps(6);
	}
}
```
Constructor - A constructor only exists in the context of creating a new instance or object of a class.

---
## Encapsulation

Practice of bundling the data (attributes) and methods (functions) that operate on the data into a single unit (class), and restricting access to some of the object's components.

**Package -** A **java package** is a group of similar types of classes, interfaces and sub-packages.

### **Access Modifiers**

- `public`: Accessible from anywhere.
- `private`: Accessible only within the class.
- `protected`: Accessible within package and subclasses.
- Default (no modifier): Accessible within package only.