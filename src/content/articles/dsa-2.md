---
title: Selection Sort
meta_title: dsa
description: dsa
author: Arjit Sharma
series: ["dsa"]
categories: ["DSA"]
featured: false
draft: false
---

## Arrays

An array is like a bunch of friends sitting in a movie theater. Three friends find a spot, but if a fourth friend joins, they need to find a new place where all four can sit next to each other.

Advantage: Fast random access.
Disadvantage: Fixed size and costly insertions/deletions.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1750162605/arrays_szknxm.png)

---

## Linked Lists

A linked list is like a bunch of chill friends. Even if new friend comes they don’t change the place, he just sits in new spot and enjoys the movie and their friend keeps passing popcorn in form of a chain. Each node stores data along with the address of the next node, allowing data to be scattered anywhere in memory. **Linked Lists are better if you need to insert elements in the middle.**

Advantage: Efficient insertions and deletions.
Disadvantage: Requires traversal to access elements.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1750162605/linklist_wlgohx.png)

---

## Selection Sort

Imagine that you have list of songs along with how many time you have played. How would you want to sort this list from most to least played, how would you do it ? 

One way is to go through the list, find the most played and keep it in a new list. Then do again for second most played and so on.

```java
public static int[] SelectionSort(int[] arr){
        int smallest = arr[0];
        int temp;
        int indexof_smallest =0;
        for(int i=0;i<arr.length;++i){
            smallest=arr[i];
            indexof_smallest=i;
            for(int j=i+1;j<arr.length;++j){
                if(arr[j]<smallest){
                    indexof_smallest=j;
                    temp=arr[indexof_smallest];
                    arr[indexof_smallest]=arr[i];
                    arr[i]=temp;
                }
            }
        }
        return arr;
    }
```