---
title: Arrays, Linked Lists & Selection Sort
meta_title: Arrays, Linked Lists & Selection Sort Explained | DSA
description: A quick introduction to arrays, linked lists, and Selection Sort with simple examples in JavaScript.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

## Arrays

An array is like going to a movie theater where everyone must sit together in consecutive seats.

![array-representation](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789212620/array_hmucxm.webp)

If three friends find three seats in a row and a fourth friend shows up, all four have to pack up, move, and find a completely new row with four empty seats side-by-side.

- **Advantage:** Fast random access O(1). If you know seat #1, you instantly know where seat #3 is.
- **Disadvantage:** Costly insertions and resizing. Adding items often requires moving the entire group to a larger contiguous memory block.


---

## Linked Lists

A linked list is like a scavenger hunt.

![linklist-representation](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789212620/linklist_ktiuid.webp)

The clues do not need to be kept in the same drawer; they are scattered in different locations. Each clue gives you two things: the item/message and a slip of paper with the address of the next clue:

- You check Clue 1 in the kitchen. The note says: "Go to the garage."
- You walk to the garage. Clue 2 says: "Go to the attic."
- You walk to the attic. Clue 3 says: "End of hunt (null)."

Because items don't have to sit side-by-side, adding a new clue into the middle is painless: you place the new clue anywhere you want, and simply rewrite the address slip on the clue right before it.

- **Advantage:** Fast insertions and deletions O(1) ,once you are at the location. No contiguous memory block or shifting required.
- **Disadvantage:** Slow access O(n). You cannot jump straight to Clue 5 without walking through Clues 1, 2, 3, and 4 first.


---

## Selection Sort

Imagine that you have list of songs along with how many time you have played. How would you want to sort this list from most to least played, how would you do it ? 

![selection-sort-songs-list](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210096/selection-sort-song-example_hdhfbj.webp)

One way is to go through the list, find the most played and keep it in a new list. Then do again for second most played and so on. Thats what selection sort is.

![selection-sort-song-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210096/selection-sort-song-exmple-solution_lfh1op.webp)

**Selection Sort Implementation in Javascript :**

```javascript
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is the minimum
    let minIndex = i;

    // Check the rest of the array for a smaller value
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j; // Update index of the minimum element
      }
    }

    // If a smaller element was found, swap it with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

// Example usage:
const numbers = [37, 31, 28, 42, 23];
console.log("Sorted Array:", selectionSort(numbers)); 
// Output: [11, 12, 22, 25, 64]
```

