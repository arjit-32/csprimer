---
title: Databases 
meta_title: Database Design & Distributed Systems  Relational, NoSQL, Sharding & Replication
description: Explore database fundamentals and scaling strategies—from SQL vs NoSQL to indexing, denormalization, and sharding. Dive into distributed systems, replication types, migration techniques, and the CAP theorem.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

Databases are the backbone of any application, serving as the primary storage and retrieval system for data. Choosing the right database architecture and design is critical for building scalable, reliable, and efficient systems.

## Types of Database

### Relational Databases (RDBMS)

Relational databases store data in structured tables with predefined schemas. It uses SQL for querying and managing data. Majorly used in banking systems and e-commerce.

*Advantages -* 

- Strong ACID compliance
- Ideal for structured data

*Disadvantages -* 

- Limited scalability for high-velocity distributed system
- Schema rigidity makes it less flexible

### NoSQL databases

NoSQL databases are designed for unstructured or semi-structured data. They offer flexibility and scalability, making them ideal for modern, distributed systems. There are many types of NoSQL dbs like MongoDB *(document)*, Redis *(Key-Value Store),* Cassandra *(Column-Family)*

*Advantages -* 

- Built for scale - Automatic horizontal partitioning
- Schema is changeable

*Disadvantages -* 

- Lack of ACID compliance
- Complex querying compared to SQL
- Not built for Updates *(as ACID is not guranteed)* and is not Read optimized *(reads the whole blob together)*

---

## Database Design Principles

### Denormalization

Denormalization is the process of introducing redundancy into a database to optimize read performance, by reducing the need for complex joins and aggregations. It is common in analytics and reporting systems.

### Indexing in databases

Indexing on a particular column/columns is technique used to speed up retrieval of records by creating an axillary data structure like B+ tree (for range queries) or hash table (for key value pairs ) that allows quick look up.

There is write overhead and space overhead for the read performance gain.

```sql
CREATE INDEX idx_employee_lastname ON employees (lastname);
```

### Partitioning

Method of splitting/dividing a large database into smaller pieces distributed across several database servers.

- Horizontal Partitioning **(Sharding)**: Divides rows across multiple databases.
- Vertical partitioning: Divides column into seprate tables.

**Why do we need to Shard ?** 

- Scalability: Multiple servers can handle the load.
- Performance: Quick response times because less data to manage.
- Fault Tolerance: If one shard goes down, still rest of the shards are up.

**How does Sharding work ?** 

A sharding key determines how data is divided. Key is usually a specific column or set of columns. Each shard is placed on a new database instance. When a query is made, system uses sharding key to determine which shard contains the data and direct it towards it.

**How to Handle Multi-shard queries ?** 

Query Routing and Aggregation - query is split and sent into relevant shards. Each shard processes its part of query and result from all shards are then combined to give final result. 

We can make Global index to keep track which shard contains which data.

---

## Scaling Databases

As application grows, our database will too and there is obvious vertical scaling and horizontal scaling*(e.g., sharding, replication)* but we can also choose a particular strategy to optimize according to our usecase.

| Strategy | Purpose | Trade-offs | Best For |
| --- | --- | --- | --- |
| **Batching Writes** | Reduce I/O and transaction overhead | Memory for buffering, latency, data loss risk | High-throughput write systems *(e.g., loggers)* |
| **Linked List / Log-Based** | Fast sequential writes (O(1)) | Slow random reads (O(n)) | Append-only logs, time-series *(e.g., Kafka)* |
| **B-Tree Indexing** | Balanced read/write (O(log n)) | Moderate performance | General-purpose RDBMS *(e.g., PostgreSQL)* |
| **LSM Trees** | Fast writes, sorted reads | Compaction overhead | Write-heavy NoSQL *(e.g., Cassandra)* |
| **Caching (e.g., Redis)** | Speed up reads | Data freshness issues | Read-heavy workloads *(e.g., user sessions)* |
| **Sharding** | Distribute data across nodes | Complex joins, consistency | Horizontal scaling *(e.g., social media)* |
| **Replication** | Fault tolerance, read scaling | Write consistency challenges | High availability systems *(e.g., finance apps)* |

---

## Database Migrations

It’s the **transfer of data** from one database system to another. It could be between engines *(MySQL to PostgreSQL),* across environments *(onprem to cloud)* or version updates.

Different ways we can go on to do this are - 

- *Stop-and-Switch* -  Fail all incoming requests to DB, take a DB dump to new database and when complete then point the servers to this database.
- *Blue-green deployment -* Maintaining 2 identical prod environments *(Blue = live, Green = new)*, deploy changes to green and switch traffic from blue to green. Use dual writes to both old and new schema.
- *Database proxies -* Can route queries to different database instances

---

## Advanced Concepts in Distributed database

### Data Replication

Data replication is process of storing copies of data on multiple servers to ensure reliability, availability, and fault tolerance.

Types of Data replication -

- Master-Slave : Master handles all writes and changes are propagated to the slaves. Slaves handle all read requests. There is risk of stale data on slaves due to replication lag.
- Master-Master : Changes made on any server are propagated to all other servers. Risk of conflict when simultaneous writes occur on different masters.

### Distribute Consensus

Process of agreeing on single value or decision in a distributed environment. Consensus algorithms are - Paxos*(complex but highly reliable)*  and Raft*(simpler to understand and implement).*

### Data Consistency

It refers to how up-to-date a piece of data is across multiple nodes. It is a critical challenge in distributed systems.

Problem with single node was that it was  a single point of failure, had high cost of vertical scaling and had high latency for regions far away from data source, so the obvious solution is to divide into multiple nodes but this generates problem of consistency.

**The 2 Generals Problem** 

It is a classical analogy to show the difficulty of achieving consistency. Acknowledgement of consistency ( did data change in other server too or not ) can get lost too and hence it is impossible to reach perfect consistency.

### CAP Theorem

The CAP theorem states that a distributed system can only guarantee two of the following three properties:

- Consistency - How up to date data is
- Availability - Every request should be served
- Partition Tolerance - System continues to operate despite arbitrary partitioning due to network failures