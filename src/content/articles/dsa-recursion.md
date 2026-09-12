---
title: Recursion
meta_title: Understanding Recursion & Call Stack in DSA  Simple Analogies + Code
description: Discover recursion through intuitive analogies and real-world examples. Learn how call stacks work in programming with Java code samples, perfect for grasping DSA fundamentals
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

Recursion is a technique where a function calls itself to solve a smaller version of the same problem. 

Every recursive function consists of two main parts:

1. **Base Case**: The condition where the recursion stops.
2. **Recursive Case**: The function calls itself with a smaller problem.

## Example: Finding a Key in Nested Boxes

Imagine you have a large box filled with smaller nested boxes, one of which contains a key. 

![recursion-box-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210123/recursion-box-example_tugvdt.webp)

How do you find the key?

There's not much to it, you just -
- Open a box (hoping you find a key).
- You dont find the key, so open the box within. (same hope).
- Somewhere along the way you should find the key.
- If last box is empty, curses., didnt find the key and my time got wasted. 

```javascript
function findKey(box){
	for (const item of box) {
		if (item === "key") {
			return true; 
		}

	if (Array.isArray(item)) {
		if (findKey(item)) { // Calls same function on the smaller box.
			return true; 
		}
	}
}

// Usage 
const box = [ "book", [ "toy", [ "pen", "key" ] ] ];
console.log(findKey(box)); // true

```

---

## Understanding the Call Stack

Recursion uses call stack. When a function calls itself, the current function call is paused and stored in memory until the recursive call completes.

```javascript

function greet2(name) {
  console.log("How are you, " + name + "?");
}

function greet(name) {
  console.log("Hello, " + name + "!");
  greet2(name);
  console.log("Getting ready to say bye...");
}

greet("Arjit");
```

### Execution Flow 

When greet("Arjit") calls greet2("Arjit"), the original greet() call is paused until greet2() finishes executing:

![call-stack-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210096/call-stack_il9tvs.webp)

- Call Stack State: greet2 is pushed to the top of the stack as the current function call.
- Memory Preservation: greet remains below it in a partially completed state, with all its local variables (such as name = "Arjit") retained in memory.
- Return: Once greet2 runs to completion and is popped off the stack, execution resumes right where greet left off.

*Idea is simple - When you call a function from another function, the calling function is paused in a partially completed state. All its values of variables are still stored in memory.*

---

## Call Stack with Recursion

```javascript

function factorial(n) {
	if (n === 1) {
		return 1; // Base case
	}

	return n * factorial(n - 1); // Recursive case
}


console.log(factorial(4)); // 24
```

### Execution Flow 

![recusrion-factorial-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210096/recursion-factorial_it5mnn.webp)

**Step 1: Pushing Calls (Winding Phase)**

Each function call pauses and adds a new frame to the call stack until it hits the base case:
- fact(4) has x = 4 and calls fact(3)
- fact(3) has x = 3 and calls fact(2)
- fact(2) has x = 2 and calls fact(1)
- fact(1) hits the base case (x = 1) and returns 1

**Step 2: Resolving Returns (Unwinding Phase)**

Once the base case is reached, the stack pops off each call by returning values backward to complete the paused multiplications:
- fact(1) returns 1 -> fact(2) calculates 2 * 1 = 2
- fact(2) returns 2 -> fact(3) calculates 3 * 2 = 6
- fact(3) returns 6 -> fact(4) calculates 4 * 6 = 24

Final Result: 24