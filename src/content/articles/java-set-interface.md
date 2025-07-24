---
title: Set Interface
meta_title: Java Set Interface- CS Guide | CS Primer
description: Explore Java Set interface. Learn HashSet and TreeSet for unique data management in programming.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---
The Set<E> interface represents a collection that cannot contain duplicate elements.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745530784/image_yipjxr.png)

## Hashset

- Uses a hash table for storage
- Contains unique elements
- Doesnt maintain insertion order

```java
HashSet<Integer> set=new HashSet();
set.add(1);    
set.add(2);    
set.add(3);

set.remove(1);
set.addAll(set1); // set1 is another HashSet
set.removeAll(set1);
set.clear();

// Another collection to Hashset
ArrayList<Integer> list=new ArrayList<Integer>();
HashSet<Integer> set=new HashSet(list);

//Printing
Iterator<Integer> itr=set.iterator();  
while(itr.hasNext()){  
   System.out.println(itr.next());  
}
```
---

## LinkedHashSet

- Maintains Insertion Order
- Extends `HashSet`  but is slightly slower due to ordering overhead.

```java
LinkedHashSet<String> linkedSet = new LinkedHashSet<>();
linkedSet.add("A");
linkedSet.add("B");
linkedSet.add("C");

System.out.println(linkedSet); // Output: [A, B, C]
```
---
## TreeSet

- It implements `NavigableSet` and extends `SortedSet`
- Basically an implementation of self-balancing tree
- Doesnt allow null elements
- Maintains Ascending order

```java
TreeSet<String> t = new TreeSet<>();
t.add(4);
t.add(1);

Iterator i = t.descendingIterator(); // to traverse in desceding order
while(i.hasNext())  System.out.println(i.next());

t.pollFirst(); // returns & removes first(lowest) in TreeSet
t.pollLast(); 
t.descendingSet(); // Reverse Treeset
t.first(); //returns first value
t.last();
t.contains(1);
t.headSet(3); // element less than 3 will be returned
t.tailSet(3); // elements>3 returned 
t.remove(1); 
t.subset(1,5); // elements between 1(inclusive) and 5(exclusive) returned
t.size();
t.lower(3); // returns greatest element in set which is less than 3
t.higher(3); // returns smallest element in set which is greater than 3
```