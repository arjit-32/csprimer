---
title: Creating RESTful web service in SpringBoot 
subtitle: Lets create RESTful API in springboot
meta_title: Lets create RESTful API in springboot
description: Lets create RESTful API in springboot
author: Arjit Sharma
series: ["springboot"]
categories: ["Development"]

featured: false
year: 2021
draft: true
---

## REST api
- REST stands for REpresentational State Transfer. REST is web standards based architecture and uses HTTP Protocol.

- A RESTful web service usually defines a URI, Uniform Resource Identifier a service, provides resource representation such as JSON and set of HTTP Methods.

- _@GetMapping_,_@PostMapping,@PutMapping,DeleteMapping or @RequestMapping(path="courses",RequestMethod.Get)_ : HTTP methods

-  _@PathVariable_: We can use it to dynamically get content from URI.
ex - 
```java
@GetMapping("/courses/{courseId}") 
public Course getCourse(@PathVariable String courseId){
	// Do stuff with courseId
}
```
- _@RequestBody_: When doing post methods, in order to use JSON data in body, we make use of RequestBody.
ex - 
```java
@PostMapping(path="/courses",consumes="application/json")
	public Course addCourse(@RequestBody Course c) {
		// Do stuff with c
	}
```

### REST api example - 

REST endpoints:

- GET    /students     (Get all students)  
- GET    /students/{studentsId}     (Get specific student) 
- POST   /students     (Add a student)
- PUT    /students     (Edit a student)
- DELETE /students/{studentId}     (Delete specific student)

_Student.java_
```java
@Entity
public class Course {
	@Id
	private Long id;
	private String name;
	//Getters,Setters & constructors
```

_StudentDao.java_
```java
public interface StudentDao extends JpaRepository<Student,Long>{}
```

_StudentService.java : interface_
```java
public interface CourseService {
	public List<Student> getAllStudents();
	public Optional<Student> getStudent(long id);
	public Student addStudent(Student s);
	public Student updateStudent(Student s);
	public void deleteStudent(long id);
}
```

_StudentServiceImpl.java_
```java
@Service
public class StudentServiceImpl implements StudentService {
	@Autowired
	private StudentDao studentdao;
	
	public StudentServiceImpl() {}

	@Override
	public List<Student> getAllStudents() {	return studentdao.findAll();	}

	@Override
	public Optional<Student> getStudent(long id) {	return studentdao.findById(id);		}
	
	@Override
	public Student addStudent(Student s) {	return studentdao.save(s);	}
	
	@Override
	public Student updateStudent(Student s) {	return studentdao.save(s);	}
	
	@Override
	public void deleteStudent(long id) {	studentdao.deleteById(id);	}
}
```

_StudentController.java_
```java
@RestController
public class StudentController {
	@Autowired
	private StudentService studentservice;
	
	@GetMapping("/students")
	public List<Course> getAllStudents(){	return this.studentservice.getAllStudents();	}
	
	@GetMapping("/students/{studentId}")
	public Optional<Course> getStudent(@PathVariable String studentId){ 
		//@PathVariable is used to dynamically get courseId given in URL
		return this.studentservice.getStudent(Long.parseLong(studentId));
	}
	
	@PostMapping(path="/students",consumes="application/json")
	public Course addStudent(@RequestBody Student s) {	return this.studentservice.addStudent(s);	}
	
	@PutMapping("/students")
	public Course updateStudent(@RequestBody Student c) {	return this.studentservice.updateStudent(s);	}
	
	// In this particular function, it is shown how to send HTTP status codes back
	@DeleteMapping("/students/{studentId}")
	public ResponseEntity<HttpStatus> deleteStudent(@PathVariable String studentId) {
		try {
			this.studentservice.deleteStudent(Long.parseLong(studentId));
			return new ResponseEntity<>(HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	
}
```

_application.properties_
```java
# can change server port
server.port=8080

# database configs - mysql
spring.datasource.url=jdbc:mysql://localhost:3306/springrest
spring.datasource.username=root
spring.datasource.password=1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# hibernate cofigs
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
```
---
Code Link - [Code link](https://github.com/arjit-32/Training/tree/main/archive/spring-in28min%26rest%26mvc/SpringBasics/DIExample/src/main/java)

References - [Spring Master Class](https://github.com/in28minutes/spring-master-class) 

Article by  [Arjit Sharma](https://www.linkedin.com/in/arjit32/) 
