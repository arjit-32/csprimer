---
title: Introduction to DBMS
author: Arjit Sharma
meta_title: Introduction to DBMS | Core CS Series
description: Discover what a Database Management System (DBMS) is, how it evolved from flat files, its core architecture, and the different types of databases.
series: dbms
categories: ["Core-CS"]
draft: false
year: 2026
---

Databases are the silent engines behind nearly every digital interaction. When you book a flight, place an order or send a message, some system is storing, retrieving, and updating information on your behalf.

But storing data is only part of the problem. As applications grow, we need to answer harder questions:
- How should data be organized?
- How can multiple users access the same data safely?
- How do we find data efficiently?
- What happens if a system crashes in the middle of an operation?
- and many more.. 

A Database Management System (DBMS) exists to solve these problems.

---

## A Brief History

- 1960s: Charles W. Bachman pioneered the Integrated Data Store (IDS), widely recognized as the first true DBMS.
- 1970: **Edgar F. Codd** at IBM proposed the *Relational Model*, a groundbreaking concept that organized data into tables (relations) with rows and columns.
- 1970s–80s: IBM’s *System R* project and UC Berkeley’s *Ingres* research initiative transformed theory into practice. Their innovations directly influenced the creation of commercial systems such as *Oracle*, *PostgreSQL*, and other relational database platforms.
- Modern Era: NoSQL, cloud-native, and distributed databases emerged to handle big data and unstructured formats.

---

## DBMS

### What is a DBMS ?

A Database Management System (DBMS) is software that allows applications and users to define, store, retrieve, update, and manage data in a database.

For example, an application might ask:

```sql
SELECT name FROM Students WHERE id = 101;
```

The application describes **what** data it wants.
The DBMS is responsible for deciding **how** to find that data efficiently, while handling the underlying storage, concurrency, security, and other concerns.

This separation is one of the fundamental ideas behind database systems.


### What does a DBMS provide?

A DBMS typically provides mechanisms for:

- Data definition - defining the structure of data
- Data manipulation - inserting, updating, deleting, and retrieving data
- Query processing - interpreting and executing queries efficiently
- Transaction management - coordinating operations that should be treated as a unit
- Concurrency control - managing simultaneous access by multiple users
- Recovery - restoring the database to a consistent state after failures
- Security and authorization - controlling access to data
- Data abstraction and independence - separating applications from storage details


### Why Do We Need a DBMS? The Real-World Cost of File Systems

Before Database Management Systems (DBMS) became widespread, early enterprise applications - such as banking systems and pioneer airline booking platforms like **American Airlines' SABRE** [(Checkout)](https://www.ibm.com/history/sabre) in the 1960s managed data directly through custom file-processing systems (usually written in COBOL or Assembly) stored on magnetic tapes and early hard disks.

Imagine a company or airline storing operational data in separate, isolated files:

```text
customers.txt
orders.txt or passengers.txt
payments.txt
support.txt
```

As the system grows, the same customer information may appear in several files. This creates a number of problems.

- **Data Redundancy** - The same information may be stored in multiple places. For example, a customer's address might exist in both customers.txt and orders.txt.
- **Data Inconsistency** - If the customer's address changes in one file but not another, the system now contains conflicting information.
- **Difficult Concurrent Access** - When multiple users or processes access and modify files simultaneously, coordinating those changes becomes difficult.
- **Weak Access Control** - File-based applications often have limited mechanisms for expressing fine-grained rules about who can read or modify particular data.
- **Poor Failure Handling** - If a process crashes while modifying a file, recovering the data to a consistent state can be difficult.

---

## DBMS Provides Abstraction

One of the most important ideas in database systems is abstraction. Consider a simple query:

```sql
SELECT name FROM Students WHERE id = 101;
```

The application doesn't normally need to know: Which disk block contains the record or How the record is physically laid out. The DBMS handles these details.

> Applications describe data and operations at a logical level; the DBMS manages the underlying physical details.

### Three Level Architecture

The traditional DBMS architecture describes the database using three levels of abstraction:

1. **External Level** 

The external level describes how individual users or applications view the database. Different users may need different views of the same underlying data. 

For example:
- Sales Application → Customer + Order information
- Support Application → Customer + Support information

Each application does not necessarily need access to the entire database.

2. **Conceptual Level**

The conceptual level describes the logical structure of the entire database. It includes things such as: Entities and tables, Attributes , Relationships and Constraints.

For example:
Student has a id, name and grade. 


3. **Internal Level** 

The internal level describes how the database is physically represented. It deals with concepts such as: Storage structures, Page and Blocks, Physical Layout.


### Data Independence

The separation between these levels leads to an important property called data independence. Data independence means that changes at one level of the database should require minimal or no changes at higher levels.

- *Physical Independence:* Storage methods can change (e.g., moving from magnetic disks to SSDs) without altering the logical design.
- *Logical Independence:* The database structure (tables, fields, relationships) can evolve without breaking applications that rely on it.

---

## Schema vs. Instance

Another fundamental distinction in database systems is between a schema and an instance.

- **Schema**: The blueprint, defines tables, fields, relationships (e.g., a table called `Students` with columns `ID`, `Name`, `Grade`)
- **Instance**: The actual data at a given moment (e.g., a row: `101, Alice, A+`)

Think of schema as the mold, and instance as the clay poured into it.

---

## Types of Databases

### OLTP vs OLAP

Databases are also used for very different kinds of workloads.

Two common categories are OLTP and OLAP.

| Feature | OLTP (Online Transaction Processing) | OLAP (Online Analytical Processing) |
| --- | --- | --- |
| Purpose | Real-time transactions | Complex queries and analysis |
| Users | End-users (e.g., ATM, e-commerce) | Analysts, decision-makers |
| Data | Current, operational | Historical, aggregated |
| Examples | Banking systems, POS | Sales forecasting, dashboards |


For example, an e-commerce application might use an OLTP system to process: Create order and Process payment. An analytics system might instead answer: What were our top-selling products in each region over the last three years?

The underlying database technology and architecture can therefore differ depending on the workload.


### Major Database Models and Systems

There are several ways to classify database systems. One useful way is by their data model.

| Type | Basic Idea | Examples |
| --- | --- | --- |
| Relational | Data organized into relations (tables) | PostgreSQL, MySQL, Oracle |
| Document | Data represented as documents | MongoDB |
| Key-Value | Data stored as key-value pairs | Redis |
| Wide-Column | Data organized around flexible columns/column families | Cassandra |
| Graph | Data represented as nodes and relationships | Neo4j |
| Hierarchical | Data organized as a tree | IBM IMS |
| Network | Records connected through a network of relationships | Integrated Data Store (IDS) |
| Object-Oriented | Data represented using objects | ObjectDB |

These models make different trade-offs and are useful for different workloads. The relational model remains particularly important because it provides a formal mathematical foundation for organizing data into relations and querying it using languages such as SQL.


---

## Conclusion

A DBMS is the foundation for working with databases, before diving into PostgreSQL, MySQL, or others, grasping its core concepts ensures you can choose and use the right system effectively.
