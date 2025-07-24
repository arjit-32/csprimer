---
title: Queue Interface
meta_title: Java Queue Interface Explained | CS Primer
description: Learn Java Queue interface. Understand FIFO and priority queues for programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

It's based on FIFO (First-In-First-Out), though some implementations like PriorityQueue alter the order.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745530784/image_yipjxr.png)

**Common Methods in Queue Interface**

```java
queue.add("A");        // Throws exception if fails
queue.offer("B");      // Returns false if fails

queue.remove();        // Removes head, throws exception if empty
queue.poll();          // Removes head, returns null if empty

queue.element();       // Returns head, throws exception if empty
queue.peek();          // Returns head, returns null if empty
```

## Deque Interface

Provides support for **insertion and removal at both ends.** No null elements

```java
// Adding methods
boolean offerFirst(E element)
boolean offerLast(E element)
boolean push(E element)

// Removing
pollFirst()
pollLast()

// Checking
peekFirst()
peekLast()
```
---

## LinkedList as Queue

Even though LinkedList is a class under the List interface, it **also implements the `Queue` and `Deque` interfaces**, making it very flexible. Generally used to implement a Queue.

```java
Queue<String> queue = new LinkedList<>();

queue.offer("A");
queue.offer("B");
queue.offer("C");

System.out.println(queue.peek());  // A
System.out.println(queue.poll());  // A
System.out.println(queue.poll());  // B
```

---
## ArrayDeque as Stack

A resizable array implementation of the `Deque` interface. It is faster than LinkedList for queue/deque operations and does not allow null elements. It is generally used to implement a Stack.

```java
Deque<Integer> stack = new ArrayDeque<>();
stack.offerFirst(1); // stack.push(1)
stack.offerFirst(2); // stack.push(2)

while(!stack.isEmpty()){
	System.out.println(stack.peekFirst()); // stack.peek()
	stack.pollFirst(); //stack.pop()
}
```

---
## Priority Queue

Implements a **min-heap** by default. If we use PriorityQueue on custom class then we need to specify the comparison strategy thats where `Comparable` comes in picture.

```java
Queue<Integer> pQueue = new PriorityQueue<Integer>(); // Min Heap
Queue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder()); // Max Heap

// Adding element
pQueue.add(10); 
pQueue.add(20); 
pQueue.add(15); 
System.out.println(pQueue); // [10,15,20], Prints queue

// Other operations
pQueue.peek(); //10, Lookup top element
pQueue.poll(); //10 returned, Remove top element
pQueue.contains(5); // Return true or false
pQueue.clear(); // Deletes all element from queue
pQueue.remove(10); // Removes 10 from queue

//Converting to Array
Object[] arr = pQueue.toArray();

//Iterating PQ
Iterator iterator = pq.iterator(); 
while (iterator.hasNext()) { 
    System.out.print(iterator.next() + " "); 
}
```