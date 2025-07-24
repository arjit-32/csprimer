---
title: The Java Platform Explained
meta_title: Java Platform Explained- CS Guide | CS Primer
description: Explore the Java platform. Understand JVM, JRE, and JDK for building robust applications in programming.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Java is Platform Independent

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745314405/java-platform-independece_hcvxmt.png)

Java works on the principle of **WORA** *(Write Once, Run Anywhere)*. A Java program is **compiled into bytecode**, which can run on any system that has a Java Virtual Machine (JVM), regardless of the underlying operating system or hardware.

⚠️ **Performance trade-off?**

Since bytecode is converted to machine code at runtime, execution can be slightly slower compared to natively compiled languages like C or C++.

---
## Difference between JDK, JRE and JVM ?

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745314406/jdk-jre-jvm_usirg8.png)

**JVM (Java Virtual Machine):** The heart of the Java platform. It executes Java bytecode and provides platform independence. 

**JRE (Java Runtime Environment):** Contains the JVM and standard Java libraries. It’s enough to *run* Java applications but not to develop them. 

**JDK (Java Development Kit):**  A full development kit including the *JRE*, plus tools like the Java compiler (`javac`), debugger, and other utilities needed to *write and compile* Java programs.

---
## Inside the JVM - Architecture Breakdown

Its a virtual machine/abstract computer that simulates a real computer. It is used to execute java byte code file. 

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1745314406/jvm_ciocmj.png)

### Key components of JVM

- *Class Loader -* Takes .class file and check for valid byte code
- *Runtime Data Area -* Has stack ( stores methods) and Heaps ( stores objects and is expandable unlike stack )
- *Execution Engine -* Responsible for execution of byte code.

💡`Note` - Each Java program is run by a *single instance* of the JVM, which is created when the program starts and terminated when it ends.

### JVM implementations and languages
There are several implementations of the JVM available for different operating systems and architectures (32-bit and 64-bit). Examples - **Amazon Corretto**, **Oracle HotSpot**, and **OpenJ9**.
**JVM languages** are programming languages that compile down to Java bytecode, allowing them to run on any JVM. For example, a Python program compiled to bytecode using **Jython** can be executed on the Java platform.

---
## What are JAR files ?

**JAR** stands for *Java Archive*. It’s a file format used to bundle multiple Java class files, resources, and metadata into a single file. They can be executed directly(if have main class in manifest) or as a library.
Think of JAR as a ZIP tailored for java.

---
## **Is java compiled or interpreted ?**

Its hybrid. First compiled to byte code, then interpreted by JVM. 
- **Initial Phase**: The interpreter allows the program to start and run quickly without waiting for compilation.
- **Optimization Phase**: The JIT compiler identifies "hot" methods (methods that are used frequently) and compiles them to native code for faster execution. <br/>
✅ The interpreter helps your code run quickly at first, and the JIT compiler steps in later to optimize frequently executed code.

---
## Java flavours
- Java SE ( Standard Edition ) - Core libraries for general-purpose applications
- Java EE (Enterprise Edition, now called Jakarta EE)- For building largescale, distributed enterprise apps, includes apis like Servlets, JSPs, JMS, JPA, JAX-RS, Java Authentication and Authorization service. <br/>
*Note: It is different from Spring Framework in way that it is a specification with multiple vendors (WebSphere, GlassFish) while Spring is a open-source framework developed by VMware.*
- Java ME ( Micro Edition )  - Designed for embedded systems, mobile devices(feature phones) and IOT devices.
- Java FX - For building rich desktop GUI applications.