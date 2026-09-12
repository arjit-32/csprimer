---
title: HashTables
meta_title: Hash Tables & Hash Functions Explained | DSA
description: Understand hash functions, hash tables, collisions, and their performance with simple examples in JavaScript.
author: Arjit Sharma
series: dsa-for-interviews
categories: ["DSA"]
featured: false
draft: false
---

## What is a Hash Function?

A hash function takes an input of arbitrary size (such as a string or number) and converts it into a fixed-size integer called a hash code or hash value.

**For example:**

![hashfunction](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210098/hash-function_phmegy.webp)

"apple" -> Hash Function -> 530

In this case apple is being passed through our simple hash function. This hash function takes each character's ascii value and adds them. Simple enough. 

A valid hash function must be deterministic: giving it the exact same input must always produce the exact same output.

---

## What is a Hash Table ?

A hash table is a data structure that stores key-value pairs. It uses a hash function to convert a key into a hash value, which is then mapped to an index in an underlying array.

![hashtable](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210123/hash-table_oz9p0o.webp)

This allows us to find values quickly without searching through every element.

In JavaScript, Map provides a convenient key-value data structure:

```javascript
const prices = new Map();

prices.set("apple", 67); 
prices.set("banana", 45);
prices.set("hello", 12);

console.log(prices.get("apple")); // 67
```

Hash tables excel whenever you need rapid key-based access:
- DNS resolution: Mapping domain names to IP addresses (example.com -> 93.184.216.34)
- Caching: Storing expensive computation or database query results by request key
- Duplicate detection: Tracking whether a voter ID or username has already been processed

---

## Handling Collisions

![collision](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210098/hash-collision_u2fqtz.webp)


Because the universe of possible inputs is infinite while a hash table's array size is finite, two completely different keys will eventually hash to the same slot. This event is called a collision.

A good hash function distributes keys evenly to minimize collisions, but every hash table must have a strategy to resolve them when they occur. The two most common methods are:

### Chaining

![chaining](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/hash-collision-chaining_odsiju.webp)

Each slot in the table points to a linked list (or dynamic array). When keys collide at index $i$, the new key-value pair is simply appended to the list at that slot.

### Open Addressing (Linear/Quadratic Probing)

![open-addressing](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789210097/hash-collision-open-addressing_tljm15.webp)

All elements live directly in the table. When a collision occurs, the table probes subsequent slots according to a fixed sequence until an empty slot is found.

---

## Hash Table Performance

When the hash function distributes keys uniformly and the table retains enough empty space, basic operations are extremely fast:

- Lookup: O(1) average
- Insert: O(1) average
- Delete: O(1) average

In the worst-case scenario, such as when a poor hash function sends every single key to the exact same bucket performance degrades to O(n), reducing the structure to an ordinary linked list.

---

## Load Factor and Resizing

To prevent degradation and keep operations running in O(1) time, hash tables monitor their load factor.

`Load Factor = (Number of Items in Table) / (Total Number of Slots)`

As the load factor climbs, empty slots become scarce and collision probability surges. Most implementations set a threshold commonly 0.70 to 0.75:

Once Load Factor exceeds the threshold, 
- the table allocates a new underlying array (typically 2x the previous size).
- Because the array size has changed, old indices are no longer valid.
- Every existing entry is rehashed into its new location—a process known as rehashing.