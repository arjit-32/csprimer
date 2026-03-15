---
title: HashTables
meta_title: Hash Tables & Hash Functions Demystified  DSA Essentials
description: Dive into the world of Hash Functions and Hash Tables with simple analogies and Java examples. Learn how collisions and load factors impact performance—perfect for DSA beginners.
author: Arjit Sharma
series: ["dsa-overview"]
categories: ["DSA"]
featured: false
draft: false
---

## What is a Hash Function?

A **hash function** maps a string (or any input) to a numerical value. It is important for hash functions to consistently return the same output for the same input.

![hashfunction](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1750162956/hash_jkzpzh.png)

## What is a Hash Table ?

When we combine a **hash function** with an **array**, we get a **hash table**—a data structure that efficiently stores key-value pairs.

Example Usage in Java - 

```java
Map<String,Integer> map = new HashMap<String,Integer>();

map.put("Apple",67);
map.put("Banana",45);
```

Use case where we want - 

- to create mapping from 1 thing to another
- look something up

Example- Phone book, DNS resolution, Voting booth check, caching

---

## Collisions

Sometimes, a **hash function** maps multiple keys to the same index this is called a **collision.** It can be handled in various ways, one common way is to use a Linkedlist to store multiple values at same index.

![collision](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1750162955/collision-in-hashmap_mknlfy.png)

A good hash function minimizes the number of collisions.

---

## Hash Table Performance

- **Worst case**: O(n) (if all elements end up in the same linked list)
- **Best case**: O(1) (constant time, where each key has a unique index)

For good performance we need - 

1. A good hash function
2. A low load factor

`Load Factor = (Number of Items in Table) / (Total Number of Slots)`

![load-factor](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1750162955/loadfactor_yglfx8.png)

If the **load factor reaches 1** (meaning the table is full), the hash table **resizes** by creating a larger array and rehashing existing elements.

