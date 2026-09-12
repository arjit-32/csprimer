---
title: Greedy Algorithms
meta_title: Greedy Algorithms in Action  Scheduling, Knapsack & Set Cover Problems
description: Learn how greedy algorithms solve real-world problems efficiently—like class scheduling, knapsack optimization, and set covering. Explore strengths, pitfalls, and Java implementation in this DSA guide.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

A greedy algorithm makes the best-looking choice at each step, hoping that these local choices lead to the best overall solution.

The key idea is simple:

> Make the best choice you can right now, without worrying too much about future choices.

Greedy algorithms are often simple and efficient, but there is an important catch: *A greedy choice does not always produce the optimal solution.*

Let's look at two examples.

---

## Problem: Scheduling Classes

Suppose we have one classroom and several classes.

![greedy-scheduling-classes](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/greedy-algorithm-class-scheduling_bfuowb.webp)

Each class has a start time and an end time, and we want to schedule as many classes as possible without overlapping them.

For example:

| Class | Start | End |
| --- | ---: | ---: |
| A | 1 | 4 |
| B | 3 | 5 |
| C | 0 | 6 |
| D | 5 | 7 |
| E | 3 | 9 |
| F | 5 | 9 |
| G | 6 | 10 |
| H | 8 | 11 |


*Which class should we choose first?*

A good greedy choice is: **Always choose the class that finishes earliest.**

Why?

Because finishing early leaves as much room as possible for the remaining classes.

The algorithm becomes:

1. Sort all classes by their end time.
2. Select the class that finishes earliest.
3. Select the next class whose start time is greater than or equal to the previous class's end time.
4. Repeat until no more classes can be selected.

For our example, the selection is:

*A → D → H*

So we can schedule *3 classes*.


**JavaScript Implementation**

```javascript
function scheduleClasses(classes) {
  // Sort by end time
  classes.sort((a, b) => a.end - b.end);

  const selected = [];
  let lastEndTime = -Infinity;

  for (const cls of classes) {
    if (cls.start >= lastEndTime) {
      selected.push(cls);
      lastEndTime = cls.end;
    }
  }

  return selected;
}

const classes = [
  { name: "A", start: 1, end: 4 },
  { name: "B", start: 3, end: 5 },
  { name: "C", start: 0, end: 6 },
  { name: "D", start: 5, end: 7 },
  { name: "E", start: 3, end: 9 },
  { name: "F", start: 5, end: 9 },
  { name: "G", start: 6, end: 10 },
  { name: "H", start: 8, end: 11 }
];

console.log(scheduleClasses(classes));
```

The important part is not the code itself, but the greedy choice: *Choose the class that finishes earliest*. For this problem, that choice is enough to produce an optimal solution.

**Time Complexity**

Sorting takes: O(n log n)

The single pass through the classes takes: O(n)

Therefore, the overall complexity is: O(n log n)

---

## Problem: Knapsack Problem

Now let's look at a problem where a greedy approach doesn't always work.

Suppose you have a knapsack that can hold 35 kg. Your goal is to maximize the total value of the items you put into the bag.

![greedy-knapsack](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/greedy-algorithm-knapsack_xkaksu.webp)

A shop has these items:

| Item   | Price ($) | Weight (kg) |
| ------ | --------: | ----------: |
| Stereo |      3000 |          30 |
| Laptop |      2000 |          20 |
| Guitar |      1500 |          15 |

Imagine we use the following greedy strategy: *Pick the most valuable item first.*

The Stereo is worth $3000, so we pick it. The bag now has only 5 kg of capacity left. Neither the Laptop nor the Guitar fits.

So the greedy solution gives us Value: $3000

Instead there did exist a better solution if we would have picked:
- Laptop  → 20 kg → $2000
- Guitar  → 15 kg → $1500
Making a total of 35 Kg and $3500