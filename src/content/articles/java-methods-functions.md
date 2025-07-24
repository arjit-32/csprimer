---
title: Methods and Functions in Java
meta_title: Java Methods- Learn Functions | CS Primer
description: Explore Java methods. Understand functions, parameters, and return types for modular programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

In Java or any language tbh, methods are the building blocks of functionality. You break down tasks into seperate functions and later re-use that logic.

## Creating a function

```java
class HelloWorld {
    public static void main(String[] args) {
        greet();                      // Calling the method
        int result = add(2, 3);       // Calling a method with return value
        System.out.println(result);   // Output: 5
    }

    public static void greet() {
        System.out.println("Hello from method!");
    }

    public static int add(int a, int b) {
        return a + b;
    }
}
```
- `public static` → method is accessible and doesn’t need an object to be called
- `void` → no return value (change to int, String, etc. to return something)
- `add(int a, int b)` → takes two integers as input

---
## How to pass variable arguments to methods 

```java
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        sum(2); // 2
        sum(2,2,2); // 6
    }
    
    public static void sum(int... numbers) {
	    int res=0;
        for (int i = 0; i < numbers.length; i++)
          res+=numbers[i];
        System.out.println(res);
    }
}
```
---
## Pass by Value vs Reference in Java

Java is always **pass-by-value**, but what gets passed depends on the type: primitives or references.

- **Pass by value (Primitives) -** The actual value is copied. Changes inside the method don’t affect the original.

```java
void test(){
	int a=1;
	change(a);
	System.out.println("a="+a); //1
}

void change(int a){
	a=4;
}
```

- **Pass by Value (Objects) -** Java objects are also passed by value, but only difference being in case of objects a copy of reference is copied *[note that it is not reference but copy of reference]*. Both the original and the method parameter point to the same object. Changes to the object inside the method are reflected in the original object. However, reassigning the parameter inside the method does not affect the original reference.

```java
class HelloWorld {
    public static void main(String[] args) {
        Test obj = new Test(1);
        changeValue(obj);
        System.out.println(obj.a); // Output: 2
    }

    static void changeValue(Test obj) {
        obj.a = 2; // Affects original object as both local copy is  pointing to same place as original object
        // obj = new Test(23); // Reassignment doesn't affect original reference because this local reference is now pointing to new place.
    }
}

class Test {
    int a;
    Test(int a) {
        this.a = a;
    }
}

```
---
## Method Overloading

Same function name but different arguments (change number of args, change data type of args).
Often called `compile-time polymorphism` because the method that is going to get called will be decided at compile time.

```java
int sum(int a, int b){
	return a+b;
}

int sum(int a, int b, int c){
	return a+b+c;
}
```