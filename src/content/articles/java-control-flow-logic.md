---
title: Control Flow and Logic in Java
meta_title: Control Flow in Java- Learn Logic | CS Primer
description: Understand Java control flow. Master if-else, loops, and logic for efficient programming and CS skills.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Conditional Statements
Used to perform different actions based on different conditions.

### If-Else 

```java
int age = 25;

if(age > 18){
    // Code for adults
} else if(age < 30) {
    // Code for young adults
} else {
    // Code for others
}
```

### Switch Case
An alternative to many if-else statements, great for handling multiple specific values.

```java
String test = "a";

switch(test) {
    case "a":
        // code for case "a"
        break;
    case "b": 
        // code for case "b"
        break;
    default: 
        // default code
}
```
---

## Loops in Java
Loops let you repeat blocks of code until a condition is met.

🔹 For Loop
Used when the number of iterations is known.

```java
for(int i = 0; i < 5; ++i){
    // Code executes 5 times
}
```
🔹 While Loop
Executes as long as a condition is true.


```java
int i = 0;
while(i < 5){
    // Code
    i++;
}
```
🔹 Do-While Loop
Executes the code block at least once, then repeats while condition is true.


```java
int i = 3;
do {
    // Code
    i -= 1;
} while(i != 0);
```

🔹 For-Each Loop
Perfect for iterating through arrays or collections.


```java
String[] humans = {"arjit", "raman", "albert"};

for(String human : humans){
    System.out.println(human);
}
```
