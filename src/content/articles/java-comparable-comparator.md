---
title: Comparable and Comparators
meta_title: Java Comparable & Comparator | CS Primer
description: Master Java Comparable and Comparator. Learn sorting collections for efficient programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

Java provides two interfaces for sorting objects:

- `Comparable<T>`: For natural ordering, implemented inside the class.
- `Comparator<T>`: For custom ordering, implemented as external class or lambda.

### Comparable Interface

```java
public class Person implements Comparable<Person> {
    int age;
    String name;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public int compareTo(Person p) {
        if (this.age < p.age) return -1;   // Current object is "smaller"
        else if (this.age > p.age) return 1; // Current object is "larger"
        return 0; // Equal
    }
}
```

It is used in Tree based structures like TreeSet, TreeMap etc only if no external Comparator is provided.

### Comparator Interface

Used when you want **custom sorting logic** - especially useful when:

- You can’t modify the original class (e.g. library classes)
- You want multiple different sorting criteria

```java
public class Person {
    int age;
    String name;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

class AgeComparator implements Comparator<Person> {
    public int compare(Person p1, Person p2) {
        return p1.age - p2.age;
    }
}

// Usage with PriorityQueue
PriorityQueue<Person> pq = new PriorityQueue<>(new AgeComparator());
pq.offer(new Person("Arjit", 10));
pq.offer(new Person("DidWhat", 20));
```

`Note` - Since Comparator is a functional interface (has only one abstract method), we can use a lambda instead of creating a full class.

1. Comparator using Anonymous class ( not recommended )
    
    ```java
    PriorityQueue<Person> pq = new PriorityQueue<>(new Comparator<Person>() {
        @Override
        public int compare(Person p1, Person p2) {
            return p1.age - p2.age;
        }
    });
    ```
    
2. Comparator using Lambda Expression
    
    ```java
    PriorityQueue<Person> pq = new PriorityQueue<>((p1, p2) -> p1.age - p2.age);
    ```