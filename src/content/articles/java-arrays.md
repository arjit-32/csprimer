---
title: Working with Arrays in Java
meta_title: Java Arrays- Programming Basics | CS Primer
description: Learn Java arrays. Explore creation, manipulation, and use in programming for efficient data handling.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Arrays in Java allow you to store a list of items in a single variable.

## Creating and Initializing Arrays

```java
// Declare an array with a fixed size
int[] list = new int[10];

// Initialize an array with specific values
int[] list = {1, 2, 3}; // Use curly braces to define the array values
```

**Accessing and Modifying Array Elements**
Arrays are zero-indexed, meaning the first element is at index 0, which is quite obvious I dont know why I wrote this.

```java
list[0] = 19;  // Assign 19 to the first element (index 0)

int length = list.length;  // Get the total size of the array

// Convert array to a string for easy printing
System.out.println(Arrays.toString(list));  // Output: [19, 0, 0, 0, ...]
```
---

## Multi-Dimensional Arrays
```java
int[][] mat = new int[2][5];  // A 2x5 matrix
mat[0][0] = 10;                // Assign value to the first element of the first row
```

---

## Array Cheatsheet
Here's a handy cheatsheet to refer whenever working with Arrays

```java
// Declare arrays
int[] arr = new int[100];      // Array with 100 elements
int[][] matrix = new int[10][10];  // 2D array (matrix)
int[] arr = {1, 2, 3, 4};     // Array with initialization values

// Enhanced for-each loop
for(int i : arr) { 
    System.out.println(i);    // Print each element
}

// Loop through 2D array
for(int i = 0; i < arr.length; ++i) {
    for(int j = 0; j < arr[i].length; ++j) {
        // Do something with arr[i][j]
    }
}

// Useful Array Methods
Arrays.toString(arr);          // Convert array to String representation
List l = Arrays.asList(arr);   // Convert array to ArrayList
arrList.toArray(arr);          // Convert ArrayList back to array
Arrays.binarySearch(arr, Key); // Binary search in sorted array
Arrays.equals(arr1, arr2);     // Compare two arrays (deep comparison with deepEquals)
int[] copy = Arrays.copyOf(arr, arr.length);    // Copy the entire array
int[] copy = Arrays.copyOfRange(arr, from, to); // Copy a specific range of the array
System.arraycopy(src, srcPosition, dest, destPosition, length); // Copy array elements from one array to another
Arrays.fill(arr, key);         // Fill array with a specific value
Arrays.fill(arr, from, to, key);  // Fill specific range of array
Arrays.sort(arr);              // Sort the array
Arrays.parallelSort(arr);      // Sort array faster in parallel (useful for large arrays)
Arrays.sort(arr, from, to);    // Sort a specific range of the array
Arrays.sort(arr, Comparator<super T>);  // Sort with a custom comparator
Arrays.mismatch(arr1, arr2);   // Find first mismatched element index
```