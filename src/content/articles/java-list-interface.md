---
title: List Interface
meta_title: Java List Interface- CS Guide | CS Primer
description: Master Java List interface. Learn ArrayList and LinkedList for dynamic data handling in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

`List<E>` represents an ordered collection

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745530784/image_yipjxr.png)

## ArrayList Class

Uses dynamic array for storing the elements.

```java
//Declaring ArrayList
ArrayList<String> list = new ArrayList<String>();

//Adding element 
list.add("Arjit");
list.add(1,"Midoriya");

//Adding another collection to Arraylist
list.addAll(temp);

//Removing elements
list.remove("Narruto");
list.remove(0);
list.removeAll(temp); //Remove all new elements from Arraylist
list.removeIf(str -> str.contains("Arjit")); //Remove if Arjit is present

//Traversing Arraylist using Iterator
Iterator i = list.iterator();
while(i.hasNext()){ // Check if iterator has next element
System.out.println(i.next()); // Printing element and move to next
}

//Traversing ArrayList using For-each loop
for(String i: list){
System.out.println(i);
}

//Traversing Arraylist using for loop
for(int i=0;i<list.size();++i){
System.out.println(list.get(i));
}

//Accessing elements
String s = list.get(1);

//Changing elments
list.set(1,"Kaneki");

//Sorting
Collections.sort(list); //String Arraylist is sorted alphabetically

//ArrayList to Array conversion
String[] ar = new String[list.size()];
list.toArray(ar);

//Important Methods
List<String> tempList = list.subList(2,4);
list.contains(Object o);// returns true if element is present
list.lastIndexOf(Object o);// returns last occurence of element or -1 if not present
list.isEmpty(); // Returns True or False
Object[] ob = list.toArray();
```

---
## LinkedList Class

A doubly-linked list implementation of the `List` and `Deque` interfaces. Can be used as stack or queue.

```java
LinkedList<String> list = new LinkedList<String>();

//Adding element
list.add("A");
list.add(1,"B");
list.addLast("C");
list.addFirst("AA");

//Removing element
list.remove("B");
list.remove(2);
list.removeFirst();
list.removeLast();
```

We can use `ListIterator` which extends `Iterator` interface, as it provides methods to go bidrectional.

```java
interface ListIterator<E> extends Iterator<E>{
	 boolean hasNext();
	 boolean hasPrevious();
	 E next(); // Element after the cursor
	 E previous(); // Element before the cursor
}
```

```java
// Traversing a linkedlist in reverse using ListIterator
LinkedList<String> linkedList = new LinkedList<String>();

ListIterator<String> listIt = linkedList.listIterator(linkedList.size());
while (listIt.hasPrevious()) {
    System.out.println(listIt.previous());
}
```