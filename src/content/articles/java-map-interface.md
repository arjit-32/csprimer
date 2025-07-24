---
title: Map Interface
meta_title: Java Map Interface- Programming | CS Primer
description: Understand Java Map interface. Master HashMap and TreeMap for key-value data in programming.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Map does NOT extend the Collection interface. It stores value in key-value pairs and both key and value must be objects ( not primitives ).

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745532255/image_1_dks0ol.png)

Basic Map Methods

```java
put(K key, V value);
get(Object key);
remove(Object key);
containsKey(Object key);
containsValue(Object value);
size();
isEmpty();

putAll(Map<? extends K, ? extends V> map);
clear();
Set<K> keySet();                   // All keys
Collection<V> values();           // All values
Set<Map.Entry<K,V>> entrySet();   // All entries
```

## Map.Entry Interface and Iterating a Map

Each key-value pair is represented by an inner interface object. It is used when traversing via `entrySet()` since **Map is not iterable**.

```java
interface Entry<K,V> {
    K getKey();
    V getValue();
    V setValue(V value);
}
```

**Iterating through a map**

```java
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " " + entry.getValue());
}
```
---
## Hashmap Class

- Unordered map (no insertion or sorted order)
- It allows 1 null key and multiple null values
- It is not thread safe.

```java
Map<Integer,String> map=new HashMap<Integer,String>();  
  // Size
  map.size();

  // Add elements to map
  map.put(1,"arjit");  
  map.put(2,"farhan");  

  // Checking if Key present
  map.containsKey(1);

  // Traversing
  for(Map.Entry m : map.entrySet()){  
   System.out.println(m.getKey()+" "+m.getValue());  
  }  
  
  // removing elements
  map.remove(100);
  
  // replacing 
  map.replace(101,"Vijay","Ravi");
```
---
## LinkedHashMap Class

- Maintains **insertion order.**

```java
LinkedHashMap<Integer, String> map = new LinkedHashMap<>();
map.put(1, "One");
map.put(2, "Two");
System.out.println(map); // Preserves insertion order
```
---
## TreeMap Class

- **Sorted map** (by keys, ascending order by default)
- Based on **Red-Black Tree**
- **Does not allow null keys**

```java
TreeMap<Integer,String> map=new TreeMap<Integer,String>();    
map.put(100,"Amit");    
map.put(102,"Ravi");    

map.remove(100); // remove element

map.descendingMap(); // descending order
map.headMap(102); 
map.containsValue("Amit");
map.containsKey(100);

//Traversal
for (Map.Entry<Integer, String> e : map.entrySet())
      System.out.println(e.getKey() + " " + e.getValue());
```