---
title: Javascript Syntax Guide
meta_title: JavaScript Syntax Guide | CS Primer
description: Master JavaScript syntax including variables, operators, loops, functions, and basic programming concepts with examples.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---


## Variables

var, let, and const are used to declare variables in JavaScript.

- var → function-scoped (older, avoid in modern code)
- let → block-scoped, reassignable
- const → block-scoped, not reassignable

_Note - Scope defines where a variable is accessible (block, function, or global)._

```jsx
let a = 0; // Reassignable, block-scoped
a = 5; // Works

const b = 2; // Non-reassignable, block-scoped
b = 6; // Error: Cannot reassign const
```

---

## Data Types

JavaScript has 7 primitive types and 1 non-primitive type (object). JavaScript is dynamically typed.`typeof` keyword is used to know data type of variable.


- Primitive: *string, number, boolean, null, undefined, symbol, bigint.*
    
    ```jsx
    const name = "Arjit Sharma"; // String
    const age = 18; // Number
    const isValid = true; // Boolean
    const a = null; // Null
    //typeof null gives object,a bug in language
    
    let test; // undefined
    const sym = Symbol();  // Symbols  
    ```
    
- Non-primitive: These are objects. This includes arrays, functions, and built-in objects.
    
    ```jsx
    // Common Objects
    const names = ['Arjit','Adam'] // "0": "Arjit", "1":"Adam"
    const person = { name:"Arjit", age:19} // Object Literals
    function myFunc(){} // Functions
    
    // Special built-in objects
    const today = new Date(); // Dates
    const regex = /hello/gi,
    const map = new Map([["name", "Arjit"], ["age", 19]]); // key value pairs, key can be of any type
    const set = new Set([1, 2, 3]);
    const weakmap = new WeakMap(); // Similar to Map, but keys must be objects and are weakly held
    const weakset = new WeakSet();
    const intArray = new Int32Array([10, 20, 30]); // array-like views for binary data
    const promise = new Promise((resolve, reject) => resolve("done")); // represents asynchronous operations
    const err = new Error("Something went wrong"); // built-in error objects
    
    // Object type -  base for all complex data structures. Papa of all above
    const obj = new Object();
    // Has several methods as well like
    Object.keys(obj);   
    Object.values(obj); 
    Object.entries(obj);
    ```
    
---

## Console Output

Log messages to the console for debugging

```jsx
console.log("Hello, " + name); // Concatenation
console.log(`Hello, ${name}!`); // Template literal (ES6)
console.table({ name, age }); // Tabular output
```

---

## Conditional Statements

```jsx
if (loggedIn) {
    console.log("User is logged in");
} else {
    console.log("User is not logged in");
}

// Ternary
const status = loggedIn ? "Active" : "Inactive";
```

---

## Loops

```jsx
// For loop
for (let i = 0; i < 3; i++) {
    console.log(i); // 0, 1, 2
}

// For...of : Iterate over iterable objects like arrays, strings etc
const arr = [1, 2, 3];
for (let val of arr) {
    console.log(val); // 1, 2, 3
}

// For...in : Iterate over properties of an object
const person = {name: "Arjit", age: 23, city: "Bengaluru"}
for (let key in person){
	console.log(key, ":", person[key]);
}
```

---

## Functions

A function is a block of code designed to perform a specific task.

Functions in JavaScript are first-class citizens, meaning they can be:
- Assigned to variables
- Passed as arguments
- Returned from other functions

```jsx
function name(p1, p2, p3) {
    //Code
}

// Function Expression - We can deal with function as a value. Assign it to variables
let yo = function(){
    //Code
};

// IIFE - Immediately Invoked Function Expression
let abc = (function(){
		let x="Hello!";
		console.log(x);
		return x;
	})();

// Closure -> 
// A closure is when a function retains access to variables from its outer scope even after the outer function has finished executing.
// Simple Example of Closure =>
function outer() {
  let count = 0; // variable in outer scope
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// Closure Example 2 = Here, x is a function that still has access to y even after the IIFE ended
let x = (function(){
		let y=9;
		return function(){
				y+=1;
				console.log(y);
			}
	}
)();

// Callback Functions - We can pass function as argument and can call back later if needed.
function yes(){ alert("Yes"); }
function no(){ alert("No"); }
function ask(question,yes,no){
    //func yes() and no() will be passed in parameter
    if(confirm(question))
        yes();
    else
        no();
}
ask("Do you agree Sire?",yes,no);

// Arrow function
const multiply = (a, b) => a * b;
multiply(10,10);

```

---

## Strings

```jsx
let a = "10";//double quotes 
let b = '10';//single quotes
let c = `Hello, ${a}`;
let name = new String("Arjit Sharma");//Strings can be objects 

//Concatenation
let c= 'Arjit' + 'Sharma';
let c= `My name is ${name} and I am ${age}`;//template string concatenation

//Finding Length
let len = name.length;

//Comparing Strings
let a="Arjit"
console.log(a == "Arjit"); // true 
console.log(a.localeCompare("Arjit"));//returns 0 if both are equal

// Check if Substring exists
"hello".includes("ll")
"hello".startsWith("h")
"hello".endsWith("lo")

// Finding position of substring in a String 
let pos1 = name.indexOf("Sharma");//1st occurence
let posLast = name.lastIndexOf("a");//last occurence of 'a' 

// Slicing
let str = "Arjit Sharma is my name.";
let name = str.slice(0,5);//1st parameter inclusive,2nd exclusive

// Replacing
let name = str.replace("Arjit","Astitva");

//To uppercase 
let text1 = "Hello World!";     
let text2 = text1.toUpperCase();

//Accessing characthers in a string
str.charAt(0);
str.charCodeAt(0);//returns unicode charachter at specified position
str[0];

//Converting String to Arrays
str.split(" ");//Splits string on basis of whitespace
let text = "HELLO";
text.split("");// Splits in Charachters
```

---

## Arrays

Some array methods mutate the original array (push, pop, splice), while others return a new array (map, filter, slice).


```jsx
let names = [
  "Arjit",
  "Ananay",
  "Samay"
];

let names = new Array("Arjit", "Ananay", "Samay");

// Length of Array            
let x = names.length; 

// Sorting Array
let y = names.sort();

// Loop through arrays
for(let i=0;i<names.length;++i){
	console.log(names[i]);
}

for(let name of names){
	console.log(name);
}

// forEach method
names.forEach(function (val,index){
    console.log(val);
});

// map-> creates a new array
const LengthOfNames = names.map(name => name.length);

// filter->filter & create a new array based on a condn
const NamesStartingWith_A = names.filter(name => name.startsWith("A"));

// reduce->Traverses and accumulate a single output value.
const concatenatedNames = names.reduce((acc, name) => acc + name, ""); // "" represent the initial value

// Adding and Removing Element
names.push("Monty");//Adds to last position
names.pop();//Removes last element

names.shift();//Removes 1st element
names.unshift("NewItem");//Adds to 1st position and shifts rest

//Arrays to Strings
names.toString(); //Arjit,Ananay,Samay,Monty
names.join(" # "); //Arjit#Ananay#Samay#Monty

// Slicing Array (Extracts a portion of the array)
const slicedNames = names.slice(1, 3); // Extracts elements from index 1 to 2 (not including 3)

// Splicing Array (Adds/Removes elements in place)
names.splice(1, 1, "ReplacedName"); // Removes 1 element at index 1 and adds "ReplacedName"

// Concatenating Arrays
const moreNames = ["John", "Doe"];
const allNames = names.concat(moreNames); // Combines `names` and `moreNames`

// Finding Elements
const indexOfSamay = names.indexOf("Samay"); // Finds the index of "Samay"
const includesSamay = names.includes("Samay"); // Checks if "Samay" exists in the array

// Reversing Array
const reversedNames = names.reverse(); // Reverses the array order

// Copying Array
const copiedNames = names.slice(); // Creates a shallow copy of the array

// Flattening Nested Arrays
const nestedArray = [["Arjit", "Ananay"], ["Samay", "Monty"]];
const flatArray = nestedArray.flat(); // Flattens one level: ["Arjit", "Ananay", "Samay", "Monty"]

```

---

## Objects

Objects store data as key-value pairs, where keys are strings (or symbols).

```jsx
const person={
		firstName: 'Arjit',
		lastName: 'Sharma',
		age: 30,
		skills: ['C','Java','Python'],
		address: {
			street: "Shanti Vihar",
			city: "Dehradun",
			state: "UK"
		}
	}

// Adding properties 
person.email = 'arjitsharma@gmail.com';

// Getting Keys and Values
Object.keys(person); // returns array of property names
Object.values(person); // return array of property values

// getting values corresponding to keys
console.log(person.firstName);
console.log(person.skills[1]); // Java

// looping through object
for (const property in person) {
	console.log(`${property}: ${person[property]}`);
}

// Destructuring -> pulling keys out of object & making them variables
const {firstName, lastName, address: {city}} = person;
console.log(firstName); // Arjit
console.log(city); // Dehradun
```

---

## Type Conversion

- Implicit(Type Coercion): Automatic conversion

```jsx
// String + Number = String
"3" + 2 //32

// Arithmetic with String = Number
"4"-2 // 2
"4"*2 // 8
"4"/2 // 2

// Equality Comparison
5 == "5" //true
null == undefined // true
```

*Note - Implicit type coercion can lead to unexpected results, so prefer strict equality (===) over loose equality (==).*


- Explicit: Manually convert one to another

```jsx
let a;
// Number to String:
a = String(89);
a = (90).toString();

// String to Number
a = Number('5');
a = Number("Hello");//NaN = Not a Number
a = parseInt('100.30');//100

// Date to String
a = String(new Date());

//toFixed specifies decimal places
console.log(a.toFixed(2));//100.30

```

---

## Dates

```jsx
const curDate = new Date(); // Current date
const anotherDate = new Date(2024, 1, 29); // 2024-02-29
curDate.getDate(); // Day of month
curDate.getMonth(); // Month (0-11)
curDate.getFullYear(); // Year
curDate.getTime(); // Milliseconds since 1970
```

---

## JSON

JSON is a string format, not a JavaScript object. One of the most common piece of code we write is to convert between objects and JSON.

```jsx
const obj = { name: "Arjit", age: 25 };
const jsonString = JSON.stringify(obj); // '{"name":"Arjit","age":25}'
const parsedObj = JSON.parse(jsonString); // { name: "Arjit", age: 25 }
```

---

## Error Handling in JS

Try / Catch

```jsx
try {
  throw new Error("Something broke!"); // can create and throw your own errors using the throw keyword.
} catch (e) {
  console.log(e.message);
} finally {
  console.log("Cleanup");
}

```

---

## Strict Mode

Turns sloppy JavaScript into safer code. It helps catch silent errors and prevents unsafe behaviors.

```jsx
"use strict";
```

Effects:

- No using undefined variables
- In regular functions, `this` becomes `undefined` (instead of the global object)
- No duplicate function parameters

---

## Deep vs Shallow Copy

Shallow: Copies only the **top-level properties**. Nested objects/arrays still reference the original.

Deep: Creates a **full independent clone**, including all nested objects/arrays.

```jsx
const obj = {
  name: "Arjit",
  address: { city: "Bengaluru" }
};

// Shallow copy
const shallow = { ...obj };

// Deep copy
const deep = structuredClone(obj);

// Change nested property
obj.address.city = "Delhi";

console.log(shallow.address.city); // 👉 "Delhi" (changed too!)
console.log(deep.address.city);    // 👉 "Bengaluru" (still original)
```

---


## Float Precision Issue

JavaScript stores numbers using **floating‑point (IEEE 754)** format. This representation cannot exactly store some decimals (like `0.1` or `0.2`), so small rounding errors appear. Why ? because Floating‑point math is approximate, not exact. Just like `1/3` cannot be represented exactly in decimal (it becomes `0.333…`), many decimal fractions (like `0.1`, `0.2`) cannot be represented exactly in binary.

This is not a bug in JavaScript, but a limitation of the IEEE 754 standard used by most programming languages.

```jsx
0.1 + 0.2 // 0.30000000000000004

// Simple Fix for this is
+(0.1 + 0.2).toFixed(2); // 0.3
```

---
