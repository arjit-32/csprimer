---
title: Working with Databases
subtitle: Learn about Spring JDBC, JPA and Spring Data JPA
meta_title: Learn about Spring JDBC, JPA and Spring Data JPA
description: Learn about Spring JDBC, JPA and Spring Data JPA
author: Arjit Sharma
series: ["springboot"]
categories: ["Development"]
image: /images/thumbnails/group-of-devs.jpg
featured: false
year: 2021
draft: true
---

In this post, we will be working on an in-memory database(H2). Alternatively any other database can be used, with only few changes to _application[dot]properties_ and _pom[dot]xml_ file.

## Setup
In order to use H2, add following properties.

- Add these properties in _application.properties_
```java
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true
```

- Create _schema.sql_ in resources.We can add bunch of queries like table creation(not required when using JPA). This will run as soon as application loads.

- Complete code - [Github Repo](https://github.com/arjitsharma32/MiniProjects/tree/main/course-work/spring-in28min/database-demo/src/main/java/com/arjit/database/databasedemo). 

## Spring JDBC
- _JdbcTemplate_ class is provided by spring to make working with JDBC easier
- _BeanPropertyRowMapper_ is used when our Entity class has same structure as table


- _query_ function is used for Reading data

```java
JdbcTemplate ob;

// Person is a class 
ob.query("Select * from person",new BeanPropertyRowMapper<Person>(Person.class)) 

// If single Object is being returned
ob.queryForObject("Select * from person where id=?", new BeanPropertyRowMapper<Person>(Person.class), new Object[] {id}); // 3rd parameter(new Object) is used to put values in PreparedStatement
```

- _update_ function is used for Insert,Update & Delete

```java
ob.update("DELETE FROM person WHERE id=?", new Object[] {id});
```

- Custom RowMapper
Custom Rowmapper is used when data coming from table does'nt match with our bean

```java
// Custom RowMapper can be used in place of BeanProperyRowMapper
class PersonRowMapper implements RowMapper<Person>{
	@Override
	public Person mapRow(ResultSet rs, int rowNum) throws SQLException {
		Person p = new Person();
		p.setId(rs.getInt("id"));
		p.setName(rs.getString("name"));
		return p;
	}
}
```

## JPA(Java Persistence API)

- Writing queries becomes complex in JDBC. So instead of mapping queries, why not map Entity to row in the table.
- JPA is a interface, hibernate(ORM framework) is a framework that implements JPA
- We do not need to use schema.sql to create table while using JPA, Table is automatically created on defining Entity.

- _Entity class_

```java
@Entity
public class Person {
	@Id
	@GeneratedValue
	int id;
	String name;
	// Constructor,Getters,Setters
}
```

- _PersonJpaRepository_

```java
@Repository
@Transactional
public class PersonJpaRepository{
	@PersistenceContext // All operations in session are stored in it
	EntityManager em; // Manages entities, it is interface to persistenceContext
	//Read
	public Person findById(int id) {
		return em.find(Person.class, id);
	}
	
	//Insert and update, both are done by merge
	public Person insertOrUpdate(Person p) {
		return entityManager.merge(p);
	}
}
```

## Spring Data JPA

- Makes working with JPA even easier. Just define a interface extending JpaRepository class.

```java
//1st arg class, 2nd arg type of Primary key
public interface PersonSpringDataRepository extends JpaRepository<Person,Integer>{ 
}
```

Now we can @Autowired it in Main application and use methods like _save, findById, findAll_

---
Code Link - [Code link](https://github.com/arjit-32/Training/tree/main/archive/spring-in28min%26rest%26mvc/SpringBasics/DIExample/src/main/java)

References - [Spring Master Class](https://github.com/in28minutes/spring-master-class) 

Article by  [Arjit Sharma](https://www.linkedin.com/in/arjit32/) 
