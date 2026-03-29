---
title: Scope & Lifecycle of Beans 
subtitle: Learn what is a bean and its lifecycle
meta_title: Learn what is a bean and its lifecycle
description: Learn what is a bean and its lifecycle
author: Arjit Sharma
series: ["springboot"]
categories: ["Development"]

featured: false
year: 2021
draft: true
---

## What is a Bean ?
A bean is nothing but an object that is instantiated and managed by a Spring IoC(Inversion of Control) container.

## Scope of a Bean
Scope refers to the instance creation of that bean. i.e., number of object creation, duration.

1. _Singleton:_ One instance per Spring Context. This is default scope of every bean.

2. _Prototype:_ New bean whenever requested.
```java
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
```

3. _request:_ One bean per HTTP request

4. _session:_ One bean per HTTP session

5. _global_

## Example of Scopes
In this example we create one bean with singleton scope while other with prototype. Then we request 2 beans from each class, and we can see that singleton doesn't create a new instance while prototype one does.

_singletonclass.java_
```java
@Component
public class singletonclass {
	public void method() {
		System.out.println(this);
	}
}
``` 

_prototypeclass.java_
```java
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class prototypeclass {
	public void method() {
		System.out.println(this);
	}
}
```

_ScopeExampleApplication.java_
```java
@SpringBootApplication
public class ScopeExampleApplication {

	public static void main(String[] args) {
	ApplicationContext apx=SpringApplication.run(ScopeExampleApplication.class, args);
	singletonclass s1 = apx.getBean(singletonclass.class);
	singletonclass s2 = apx.getBean(singletonclass.class);
	s1.method();
	s2.method();
	
	prototypeclass p1 = apx.getBean(prototypeclass.class);
	prototypeclass p2 = apx.getBean(prototypeclass.class);
	p1.method();
	p2.method();
	
	}
}
``` 

_OUTPUT_
```java
Scope_Example.singletonclass@2fb69ff6 // returns same hashcode
Scope_Example.singletonclass@2fb69ff6
Scope_Example.prototypeclass@6a078481 // returns different hashcode
Scope_Example.prototypeclass@79c5636f
```

---

## Lifecycle of a Bean
First thing what happens when we run the program is, that spring container gets started. Then container creates the instance of a bean as per the request and after that dependencies are injected. Beans are destroyed when the spring container is closed.

We are provided with @PostConstruct and @PreDestroy annotations to run just after bean creation or just before bean deletion. 

## Example 

_random.java_

```java
@Component
public class random {
	public void method() {
		System.out.println("Method of random class");
	}
	
	@PostConstruct
	public void before() {
		System.out.println("PostConstruct - This runs just after bean is created");
	}
	
	@PreDestroy
	public void after() {
		System.out.println("PreDestroy - Runs just before being destroyed");
	}
}
```

_LifecycleExampleApplication.java_

```java
@SpringBootApplication
public class LifecycleExampleApplication {

	public static void main(String[] args) {
	ApplicationContext apx=SpringApplication.run(LifecycleExampleApplication.class, args);
	random r = apx.getBean(random.class);
	r.method();
	}
}
```

_OUTPUT_
```java
PostConstruct - This runs just after bean is created
Method of random class
PreDestroy - Runs just before being destroyed
```
---
Code Link - [Code link](https://github.com/arjit-32/Training/tree/main/archive/spring-in28min%26rest%26mvc/SpringBasics/DIExample/src/main/java)

References - [Spring Master Class](https://github.com/in28minutes/spring-master-class) 

Article by  [Arjit Sharma](https://www.linkedin.com/in/arjit32/) 
