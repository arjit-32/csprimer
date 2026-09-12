---
title: Breadth-First Search
meta_title: Breadth-First Search (BFS) Made Simple - Graphs, Queues & JavaScript Examples
description: Understand Breadth-First Search with intuitive examples, graphs, queues, and JavaScript. Learn how BFS explores nodes level by level and finds shortest paths in unweighted graphs.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

Before we do BFS, we have to learn 2 more data structures - Graphs and Queues. 

## Graphs

![graphs](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/graphs_ftfrfp.webp)

A graph is a data structure made up of **nodes** (also called vertices) and **edges**. Graphs are useful for representing relationships and connections.

**Graph Representation in Javascript**

A graph can be represented using a *JavaScript object*, where each node maps to an array of its neighboring nodes.

```javascript

const graph = {
  you: ["amit", "neha"],

  amit: ["pooja", "ravi"],

  neha: ["karan", "zara"],

  pooja: [],
  ravi: [],

  karan: ["john", "rohan"],

  zara: ["maya"],

  john: ["tom"],
  rohan: [],

  maya: [],
  tom: []
};
```

This representation is called an adjacency list.

---


## Queues

![queues](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789214175/queues_glk1lv.webp)

A queue is like a line of people waiting to buy movie tickets.New people join at the back of the line, and the person at the front gets served and leaves first. It follows the FIFO rule: First In, First Out.

- **Advantage:** Predictable and fair order O(1) add and remove. Elements are processed strictly in the exact order they arrive.
- **Disadvantage:** Slow search O(n). You cannot jump directly to a person in the middle without serving everyone ahead of them first.

---

## Breadth-First Search (BFS)

Breadth-First Search (BFS) is a graph traversal algorithm that explores nodes *level by level*.

![bfs-representation](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1750163256/bfs-algo_uf1mox.png)

My favourite way to understand is just like how gossip spreads. You tell your immediate friend group a secret. Naturally, each of them immediately tells all of their friends, and those friends tell everyone they know. Anyways that's a dumb way to think of it. 

It fundamentally answers 2 things ? 

1. *Is there a path from Node A to Node B?*
    
    Imagine you are looking for a Mango Seller in your social network. BFS starts with your immediate friends and checks if any of them are mango sellers. If not, it adds their friends to the search list and continues.

2.  *What is the shortest path from Node A to Node B?*
    
    BFS finds the shortest path in an *unweighted graph*, meaning it finds the closest Mango Seller in your network with minimal steps.
    

---

## BFS Algorithm Implementation in Javascript

The basic BFS algorithm is:

- Add the starting node to a queue.
- Remove a node from the front of the queue.
- Check whether it is the node we are looking for.
- Add its unvisited neighbors to the queue.
- Repeat until the queue is empty.

A visited set prevents us from processing the same node repeatedly.

![bfs-representation](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/bfs-algorithm_agqpbt.webp)

```javascript
// Graph representation from the image
const network = {
  You: ["Amit", "Neha"],
  Amit: ["Pooja", "Ravi"],
  Neha: ["Karan", "Zara"],
  Pooja: [],
  Ravi: [],
  Karan: ["John", "Rohan"],
  Zara: ["Maya"],
  John: ["Tom"],
  Rohan: [],
  Maya: [],
  Tom: []
};

// In the image, Maya ("mayamango") and Tom ("tommango") sell mangoes
function isMangoSeller(name) {
  return name === "Maya" || name === "Tom";
}

function findClosestMangoSeller(graph, startPerson) {
  const queue = [startPerson];
  const visited = new Set([startPerson]);

  let index = 0;

  while (index < queue.length) {
    const person = queue[index++];

    // If this person sells mangoes, return them immediately
    if (isMangoSeller(person)) {
      return person;
    }

    for (const friend of graph[person] || []) {
      if (!visited.has(friend)) {
        visited.add(friend);
        queue.push(friend);
      }
    }
  }

  return null;
}

console.log(findClosestMangoSeller(network, "You"));
// Output: "Maya"
```

With an adjacency-list representation, BFS visits each vertex and examines each edge at most once.

Time Complexity: **O(V + E)** , Space Complexity: **O(V)**

BFS is efficient for finding shortest paths and ensuring all nodes are visited in the least number of steps.

