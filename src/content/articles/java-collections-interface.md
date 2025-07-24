---
title: Collections Interface
meta_title: Java Collections Interface | CS Primer
description: Explore Java Collections interface. Learn core methods for managing data structures in programming.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

The **Collections Framework** in Java provides a unified architecture to represent and manipulate collections like lists, sets, queues, and maps.

It’s the **base interface** for all types of **collections** (List, Set, Queue...).
Key Methods in `Collection<E>`

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745530784/image_yipjxr.png)


```java
public boolean add(E e)
public boolean addAll(Collection<?> c)
public boolean remove(Object element)
public boolean removeAll(Collection<?> c)

public boolean contains(Object element)
public boolean containsAll(Collection<?> c)

//Other utility methods
public int size() // list.size();
public void clear() // clears a collection
public boolean isEmpty() //Checks if collection is empty
public Iterator iterator() // returns a iterator
public Object[] toArray()
Collections.sort(al);  
Collections.sort(al,Collections.reverseOrder());  
Collections.reverse(al);
```