---
title: Polymorphism in Java
meta_title: Java Polymorphism- CS Guide | CS Primer
description: Understand Java polymorphism. Master dynamic binding for adaptable and scalable programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Polymorphism is same thing behaving differently depending on the context. 

In Java, this shows up in two main ways: Compile-time and Run-time.

## Compile time Polymorphism ( Static Binding )
Can be achieved using method overloading. The compiler determines which method to invoke based on the method signature.

```java
class Example{

    int sum(int a, int b) {
	    return a+b;
    }
		
	  int sum(int a, int b, int c) {
	    return a+b+c;
    }

	  public static void main(String[] args) {
        Example obj = new Example();
				obj.sum(2,5);
				obj.sum(1,2,3);
    }
}
```

---
## Run time  (Dynamic Binding ) 
Can be achieved using method overriding. This occurs when a subclass provides a specific implementation of a method that is already defined in its superclass. The method that gets called is determined at runtime, based on the object's type.

```java
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    // Overriding the sound() method
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}


public class Example{
    public static void main(String[] args) {
        Animal obj;
        // obj reference points to a Dog object
        obj = new Dog();
        obj.sound();  // Outputs: Dog barks
    }
}
```