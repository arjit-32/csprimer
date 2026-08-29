---
title: IOC, DI and Autowiring 
subtitle: Learn how dependencies are managed in Springboot
meta_title: Learn how dependencies are managed in Springboot
description: Learn how dependencies are managed in Springboot
author: Arjit Sharma
series: springboot
categories: ["Development"]

featured: false
year: 2021
draft: true
---

Before discussing other things lets take a look at few important points - 

1. IOC & DI is done using Object Factory for construction & management of objects, so that it is easily configurable and loosely coupled.
2. Two ways to inject dependencies - Setter injection & constructor injection
3. Framework that provides IOC is called IOC Container. Spring has 2 implementation of IOC container - ApplicationContext(has more features like i18n, AOP), BeanFactory(Memory efficient)
---

## Inversion Of Control & Dependency Injection

_IOC_ : Creation and management of objects.  
_DI_ : Injecting object dependencies. 

We let take Spring control of creating objects and injecting as we require them.

### Why do we need DI ?
Suppose we want to implement Binary Search which requires a Sorting algorithm. So we will have to create object of a Sorting algortihm inside Binary Search.

```java
class BinarySearch{
          // Creating object of Sort Interface
          Sort obj = new BubbleSort();
} 
```
If in a few days we realize we need to use some other sorting algorithm to make our binary search fast, we will have to find this file and change implementation.

```java
class BinarySearch{
         // Changed the sorting implementation being used
         // Sort obj = new BubbleSort();
         Sort obj = new QuickSort();
}
```
This was just 1 file, now imagine doing it with hundreads of files, with thousands of lines of code. That's where IOC kicks in, and Spring takes care of creating objects at runtime. 

If we want to do same thing with Spring, all we need is make use __@Autowired__ annotation. Spring will automatically create object of a class implementing Sort interface and inject it.

```java
@Component
class BinarySearch{
         @Autowired
          Sort quickSort; 
          // Autowiring by name i.e, quickSort is a class and its object will be injected here
}
```

## Autowiring
Autowiring is a way to inject the object dependencies. It can be done in 2 popular ways.
1. _byType_ : Done using a constructor injection
2. _byName_ : Done using setter injection. Variable name is kept same as class name to specify particular class

### Autowiring Resolution

If we have 2 implementations for sort interface, we will get a error because Spring does'nt know which object to inject. In this case we case we have 3 options-
- @Primary annotation on the sorting class we want to use.
- @Qualifier annotation to tag classes with a particular qualifier and then using the same name on injecting class. _@Qualifier("bubble")_ on injecting and injected class.
- By Type : In Autowiring byType we keep variable name same as class name.
---

## Example-1 
In this example we make use of Autowiring byType. We have only 1 implemenation of sort interface.

_DiExampleAppln.java_
```java
@SpringBootApplication
public class DiExampleApplication {
	public static void main(String[] args) {
	ApplicationContext apx=SpringApplication.run(DiExampleApplication.class, args);
	binarySearch b = apx.getBean(binarySearch.class);
	b.binarySearchMethod();
	}
}
```

_binarySearch.java_
```java
@Component
public class binarySearch {
	@Autowired
	sort s;
	binarySearch(sort s){ //autowiring by type
		this.s=s;
	}
	public void binarySearchMethod() {
	s.sortmethod();
	System.out.println("Binary searched");
	}	
}
```

_sort.java_
```java
public interface sort {
	public void sortmethod();
}

```

_bubbleSort.java_
```java
@Component
public class bubbleSort{
	@Override
	public void sortmethod() {
		System.out.println("Bubble sorted");
	}
}
```

__OUTPUT__
```java
Bubble sorted
Binary searched
```
---

## Example-2 
In this example, we have 2 implementations of sort interface, and we make use of @Qualifier annotation to do autowiring resolution

_DIExampleAppln_ remains same.

_bubbleSort.java_
```java
@Component
@Qualifier("bubble")
public class bubbleSort implements sort{
	@Override
	public void sortmethod() {
		System.out.println("Bubble sorted");
	}
}
```

_quickSort.java_
```java
@Component
@Qualifier("quick")
public class quickSort implements sort{
	@Override
	public void sortmethod() {
		System.out.println("Quick sorted");
	}
}
```

_binarySearch.java_
```java
@Component
public class binarySearch {
	@Autowired
	@Qualifier("bubble")
	private sort s; 	
	public void binarySearchMethod() {
	s.sortmethod();
	System.out.println("Binary searched");
	}	
}
```

__OUTPUT__
```java
Bubble sorted
Binary searched
```

---
Code Link - [Code link](https://github.com/arjit-32/Training/tree/main/archive/spring-in28min%26rest%26mvc/SpringBasics/DIExample/src/main/java)

References - [Spring Master Class](https://github.com/in28minutes/spring-master-class) 

Article by  [Arjit Sharma](https://www.linkedin.com/in/arjit32/) 
