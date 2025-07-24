---
title: Iterable and Iterator Interface
meta_title: Java Iterable & Iterator- CS Guide | CS Primer
description: Understand Java Iterable and Iterator. Learn to traverse collections for programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745530784/image_yipjxr.png)

Iterable interface is used to represent a collection of elements that can be iterated over, while the Iterator interface provides a way to iterate over the elements of the collection.

1.  `Iterable<T>` Interface
    
    Implementing a iterable interface means that now objects of this class can be iterated over using a loop.
    
    *Note - Iterable interface uses interator interface under the hood.*
    
    ```java
    public interface Iterable<T> {
        Iterator<T> iterator();
    }
    ```
    
2. `Iterator<T>` Interface
    
    ```java
    public interface Iterator<T> {
        boolean hasNext(); // checks if elements are left
        T next(); // gives next element
        default void remove(); // optional
    }
    ```
    
---
## Implementing `Iterable`

```java
import java.util.Iterator;

public class CollectionTesting implements Iterable<Integer> {
    private Integer arr[];

    public CollectionTesting(Integer[] arr) {
        this.arr = arr;
    }

    @Override
    public Iterator<Integer> iterator() {
        class ArrayIterator implements Iterator<Integer> {
            private int indx = 0;

            @Override
            public boolean hasNext() {
                return indx < arr.length;
            }

            @Override
            public Integer next() {
                return arr[indx++];
            }
        }
        return new ArrayIterator();
    }

    public static void main(String[] args) {
        Integer[] numbers = {1, 2, 3, 4, 5};
        CollectionTesting collectionTesting = new CollectionTesting(numbers);

        for (Integer number : collectionTesting){ // call iterator() which return ArrayIterator object 
            System.out.println(number);
            
        // Andar ye hora hai while upr foreach loop me magic tha 
        Iterator<Integer> iterator = collectionTesting.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }

    }
    }
}
```