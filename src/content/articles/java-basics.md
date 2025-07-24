---
title: Basics of Java language
meta_title: Basics of Java- Programming Guide | CS Primer
description: Master Java basics. Learn variables, data types, and syntax to kickstart your programming journey in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Now lets lay the groundwork for coding in java and that is knowing the essentials like variables, loops, and what not !

## Variable and Constants

Variable- Name of reserved area allocated in memory.

```java
int age = 18; // initializing a variable
```

Constants- A variable whose value cannot be changed once assigned.

```java
final float PI = 3.14F;
```
---
## Data Types in Java

1. Primitive Types

    Java has 8 built-in primitives:
    - Integer types: byte(1), short(2), int(4), long(8)
    - Floating-point types: float(4), double(8)
    - Other: char(2), boolean(1)

```java
byte age = 12;
char letter = 'Z';
boolean isDone = true;
float price = 99.99F;
long visitors = 9_891_232_321L;
```

2. Reference Types

Any object instanced from a class is a reference variable. They store _addresses_ in memory.

```java
// java boilerplate
Person p1 = new Person("arjit",25);
Person p2 = p1; // p2 refers to the same object as p1

p2.name = "naruto"; // Changing p2 also updates p1 because both point to same memory
System.out.println(p1);
```
---
## Inputs and Outputs in Java

```java
// Ouput
System.out.println("Can be anything - "+ variableName); // Concatenation with + 
System.out.print();
System.out.printf("Formatted number: %.2f", 45.678);

// Input
import java.util.Scanner;
Scanner sc = new Scanner(System.in);
int n = sc.nextInt();         // Reads an int
String word = sc.next();      // Reads one word
String line = sc.nextLine();  // Reads the whole line
```

You also get nextFloat(), nextDouble(), nextByte(), nextShort(), nextLong() <br/>
📌 Note - After calling nextInt() or similar, you might need to consume the leftover newline

---
## Strings in Java

String is a sequence of characters.

```java
String greeting = "Hello, World!";
System.out.println(greeting);  // Output: Hello, World!
```

String Immutability: Strings are immutable, meaning once created, their value cannot be changed.
```java
String str = "Java";
str = str + " Programming";  // Creates a new string
```

---
## Arrays in Java

Arrays store multiple values of the same type.

```java
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Arjit", "Raman", "Albert"};

System.out.println(names[0]);  // Output: Arjit

```

---
## Type Casting

Changing a variable from one type to another.

- Implicit Casting - Automatic widening conversion, that happens without specifying. 
byte > short > int > long > float > double

```java
int x = 10;
double y = x; // int → double
```

- Explicit Casting - Manual narrowing conversion, we need to specify. 

```java
// Example of explicity casting
double x = 4.5;
int res = (int)x + 1;

// Example of explicitly casting non-compatible types - string and numbers
// Also works for converting types like String → int:
String x = "1";
int res = Integer.parseInt(x) + 2;
```

---
## Operators in Java
Operators let you perform calculations and comparisons.

```java
// Comparison Operators
1==1, 1!=0, 2>=1, 2<=2, 5>3, 1<3

// Equality
==, !=

// Assignment
=, +=, -=, *=, /=, %=

// Logical Operators
&&, ||

// Unary Operators
var++, var-- // Postfix
++var, --var // Prefix

// Bitwise
&, |, ^, >> , <<, >>>

// Ternary Operator (?:)
int max = (a > b) ? a : b;
```