---
title: Junit & Mockito 
subtitle: Learn about testing in java
meta_title: Learn about testing in java
description: Learn about testing in java
author: Arjit Sharma
series: ["springboot"]
categories: ["Development"]

featured: false
year: 2021
draft: true
---

## JUnit 

- JUnit is a unit testing framework for Java and  can be used for automation testing in CI/CD pipeline.
- Junit methods - _assertTrue(condn),assertFalse(condn),assertEquals(expected,actual),assertNull(),assertArrayEquals(expected,actual)_
- Junit annotations - @Test,@Before(runs before every test),@After,@BeforeClass,@AfterClass.

## Example of JUnit

_sampleTest.java_
```java
class sampleTest {
    @Test
	void test_for_both_positive() {
		sample s = new sample(); // we wanna test sample class's add method
		assertEquals(2,s.add(1,1));
	}
}
```
---
## Mockito 

- How to test a piece of code without implementing and testing its dependencies.
- Without mockito we will have to create a stub, but problem is for different cases we have to create different stubs hence Mockito is used.
- Annotations provided are @RunWith(MockitoJUnitRunner.class), @Mock, @InjectMocks 
- Before looking at example, lets take a look at mocking a class's function without annotations. Suppose class A's AFunc is dependant on B(It has a function BFunc).
Now instead of creating a stub(fake function within B) we can mock it using Mockito.

```java
@Test
void Test(){
	B bmock = mock(B.class);
	when(bmock.BFunc()).thenReturn(new String("Hello")); //when this function is called return this value
	A a = new A(bmock); // injecting using constructor injection
	String result = a.AFunc();
	assertEquals(-2,res);
}
```

## Example of Mockito - 
We have Data which is dependent on DataService, so we mock DataService.

_Data.java_

```java
public class Data {
	public DataService dataService;
	
	public Data(DataService dataService){
		this.dataService=dataService;
	}
	
	public int findGreatest() {
		int[] data = dataService.retrieveAllData();
		int greatest = Integer.MIN_VALUE;
		
		for(int i: data) 
			greatest = Math.max(greatest, i);
		
		return greatest;
	}
}
```

_DataService.java_

```java
public interface DataService {
	int[] retrieveAllData();
}
```

_testData.java_

```java
@RunWith(MockitoJUnitRunner.class)
class test_Data {
	@Mock
	DataService dataservicemock;

	@InjectMocks
	Data ob;

	@Test
	void test1() {
		when(dataservicemock.retrieveAllData()).thenReturn(new int[] {20,40,2,19});
		int res = ob.findGreatest();
		assertEquals(40,res);
	}
}
```
---

Code Link - [Code link](https://github.com/arjit-32/Training/tree/main/archive/spring-in28min%26rest%26mvc/SpringBasics/DIExample/src/main/java)

References - [Spring Master Class](https://github.com/in28minutes/spring-master-class) 

Article by  [Arjit Sharma](https://www.linkedin.com/in/arjit32/) 
