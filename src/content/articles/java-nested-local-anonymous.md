---
title: Nested, Local and Anonymous Classes
meta_title: Java Nested & Anonymous Classes | CS Primer
description: Master Java nested and anonymous classes. Learn their use for advanced programming in CS.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Nested Class

In Java, defining a class within another class is allowed. Nested classes can be either static or non-static. Primary purpose of nested classes is logically grouping related classes in one place and improving encapsulation.

```java
public class OuterClass {

    String myName = "outerClass";

    private class InnerClass {

        String myName = "innerClass";

        void printName() {
            System.out.println("I am " + myName);
        }
    }

    void sayName() {
        InnerClass ic = new InnerClass();
        ic.printName();
        System.out.println("I am " + myName);
    }
}
```

Note - Top level class cannot be declared static and also can only be marked public or package private

---
## Local Classes

Class that is defined in a block ( statements between balanced curly braces ) 

```java
class Test {
	public void method(){
			// local class
			class local{
				String name="arjit";
				
				public void print(){
					System.out.println("my name is " + name);
				}
			}
			
	}
}
```

---
## Anonymous Class

An anonymous class is like a local class except they don't have a name. Intended for one time use.

*Ex - Anonymous class implementing comparator interface*

```java
Comparator myCustomComparator = new Comparator<Integer>() {
    public int compare(Integer i1, Integer i2) {
        return (int)Math.pow(-1, i1) * (i1 - i2);
    }
};

PriorityQueue<Integer> q = new PriorityQueue<Integer>(myCustomComparator);
```