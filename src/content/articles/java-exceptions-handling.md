---
title: Exception Handling in Java
meta_title: Java Exception Handling Guide | CS Primer
description: Learn Java exception handling. Master try-catch and throw for robust, error-free programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions. Java uses _try, catch, throw and finally_ to handle exceptions.

## Throwing an Exception

You can manually throw an exception using `throw`, and declare it using `throws` in the method signature.

```java
double division(int divisor, int dividend) throws Exception {
    if (divisor == 0)
        throw new Exception("can't divide by zero");

    return (divisor * 1.0 / dividend);
}
```
---
## Try and Catch Blocks
When there’s a risk of an exception occurring, wrap the risky code in a try block and handle specific exceptions using catch.

```java
public class Example {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // This causes ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero");
        }

        System.out.println("Program continues...");
    }
}

```

✅ Output: 
```sh
Error: Cannot divide by zero
Program continues...
```
---
## Finally Block
finally is used to write code that must run regardless of whether an exception occurred or not (like closing a file or database connection).

```java
try {
    int[] arr = new int[2];
    arr[3] = 5; // This causes ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Index out of range!");
} finally {
    System.out.println("This will always run.");
}
```
---
## Common Exception Types

| Exception Type                 | Description                                  |
|--------------------------------|----------------------------------------------|
| ArithmeticException            | Division by zero or bad arithmetic           |
| NullPointerException           | Accessing a method or field of `null`        |
| ArrayIndexOutOfBoundsException | Accessing outside array boundaries           |
| IOException                    | Input/Output errors (e.g., file not found)   |
| FileNotFoundException          | File not found when trying to read           |
| IllegalArgumentException       | Invalid method argument                      |
