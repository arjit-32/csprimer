---
title: Recursion
meta_title: dsa
description: dsa
author: Arjit Sharma
series: ["dsa"]
categories: ["DSA"]
featured: false
draft: false
---

Recursion is a technique where a function calls itself to solve a smaller instance of the same problem. Every recursive function consists of two main parts:

1. **Base Case**: The condition where the recursion stops.
2. **Recursive Case**: The function calls itself with a smaller problem.

## Example: Finding a Key in Nested Boxes

Imagine you have a large box filled with smaller nested boxes, one of which contains a key. How do you find the key?

Iterative Approach - 

```java
def look_for_key(main_box):
 pile = main_box.make_a_pile_to_look_through()
 while pile is not empty:
 box = pile.grab_a_box()
 for item in box:
	 if item.is_a_box():
		 pile.append(item)
	 elif item.is_a_key():
		 print “found the key!

```

Recursive Approach - 

```java
def look_for_key(box):
 for item in box:
	 if item.is_a_box():
		 look_for_key(item) // Recursion
	 elif item.is_a_key():
		 print “found the key!”
```

In the recursive approach, the function keeps calling itself for each nested box until it finds the key (base case) or there are no more boxes left.

---

## Stack (Data Structure)

A stack is like a stack of plates in a cafeteria. You can only add or remove plates from the top.

Advantage: Simple, fast addition/removal (LIFO).
Disadvantage: Limited access, can't easily reach items in the middle.


## Understanding Call Stack

Recursion uses call stack. When a function calls itself, the current function call is paused and stored in memory until the recursive call completes.

```java
def greet(name):
 print “hello, “ + name + “!”
 greet2(name)
 print “getting ready to say bye...”
 bye()

def greet2(name):
 print “how are you, “ + name + “?”
def bye():
 print “ok bye!”
```

## Execution Flow:

1. `greet("Arjit")` is called and prints **hello Arjit**.
2. `greet2("Arjit")` is added to the call stack and prints **how are you Arjit?**.
3. `greet2` completes and is popped off the stack.
4. Execution returns to `greet()`, which prints **getting ready to say bye...**.
5. `bye()` is called, added to the stack, prints **ok bye!**, and is popped.

*Idea is simple - When you call a function from another function, the calling function is paused in a partially completed state. All its values of variables are still stored in memory.*

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1750162682/recursion_dp3bkv.png)

---

## Call Stack with Recursion

```java
def fact(x):
if x == 1:
return 1  # Base case
else:
return x * fact(x - 1)  # Recursive case
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1750162682/call-stack_jqsgye.png)

Notice that each call to fact has its own copy of x. You can’t access a different function’s copy of x