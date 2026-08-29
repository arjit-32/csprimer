---
title: MongoDB Data Modelling and Performance
meta_title: MongoDB Data Modelling and Performance
description: Learn how MongoDB data modelling, indexing, query planning, and aggregation affect performance and scalability.
author: Arjit Sharma
series: mongo
categories: ["Development"]
draft: false
year: 2025
---

MongoDB's real strength is not just flexible documents.

The way you model, organize, and query data directly affects:
- performance,
- scalability,
- maintainability,
- and how efficiently MongoDB can use indexes.

A good schema design can make queries extremely fast. A poor design can lead to slow queries, excessive memory usage, and complicated application logic.

---

## Thinking About Data Modelling in MongoDB

In relational databases, schema design usually starts with **normalization**:
- splitting data into multiple tables,
- reducing duplication,
- and connecting records using joins.

MongoDB approaches this differently.

Instead of optimizing for normalization, MongoDB encourages you to model data based on:
- how the application reads data,
- how frequently data changes,
- and which data is accessed together.

A common MongoDB principle is:

> Store data together if it is usually accessed together.

---

## Embedding vs Referencing

One of the most important design decisions in MongoDB is whether related data should be:
- embedded inside the same document,
- or stored separately and referenced using IDs.

|  | Embedding | Referencing |
|---|---|---|
| What is it? | Store related data inside the same document | Store related data in separate collections and connect them using `ObjectId` references |
| Best for | Tightly coupled data | Independent or large datasets |
| Benefits | Faster reads, fewer queries | Better scalability and independent updates |
| Drawbacks | Documents can grow large | Requires additional queries or `$lookup` |
| Example | Blog post with embedded comments | Orders referencing users |


### Example: Embedding

```json id="y8i6pp"
{
  "title": "MongoDB Basics",
  "comments": [
    {
      "user": "Alice",
      "text": "Great article!"
    }
  ]
}
```

This works well because comments are closely related to the blog post. MongoDB can fetch everything in a single read.

### Example: Referencing

```json
{
  "title": "MongoDB Basics",
  "authorId": ObjectId("...")
}
```

The author information lives in another collection. This is useful when related data is large, reused in multiple places or updated indpendently.

---

## Indexing in MongoDB

Indexes help MongoDB find documents efficiently without scanning the entire collection. Without indexes, MongoDB performs a collection scan, checking every document one by one. Indexes are implemented internally using a B-tree data structure.

**Example**

Suppose you frequently search users by email:

```javascript
db.users.find({ email: "alice@example.com" })

// Creating an index
db.users.createIndex({ email: 1 })
```

Now MongoDB can locate matching users quickly instead of scanning the entire collection.


### When MongoDB Uses Indexes

MongoDB uses indexes when query patterns match indexed fields.

Indexes can improve: *filtering, sorting, range queries, uniqueness checks, and prefix-based searches*.

**Range Query Example**

```javascript
db.users.find({
  age: { $gt: 18 }
})
```

An index on age helps MongoDB efficiently locate matching documents.


### Compound Indexes

Compound indexes contain multiple fields.

Example:

```json
{ age: 1, name: 1 }
```

This index supports - queries on age and queries on age + name.

However, it does not efficiently support queries only on name. This is because MongoDB follows the prefix rule.

**Prefix Rule** - MongoDB can use a compound index only from the left-most fields onward. So the above index works well for age and name, also works well for age but not for name.


### Index Trade-offs

Indexes improve read performance, but they also introduce costs.

- Slower writes: Every insert or update must also update indexes.
- Indexes consume additional disk space.
- Too many indexes or incorrect field order can reduce efficiency.

A good indexing strategy focuses on real query patterns, not indexing every field blindly.


---

## Query Planner

MongoDB has a built-in query planner that decides how queries should execute.

When a query runs, MongoDB:

- checks available indexes,
- generates multiple candidate plans,
- benchmarks them,
- and selects the most efficient one.

**Winning Plan** - The execution plan selected by MongoDB.

**Rejected Plans** - Alternative plans that were considered but not chosen.


### Using explain()

You can inspect query execution using:

```javascript
db.collection.find(...).explain("executionStats")
```
The executionStats mode shows: which plan was selected, how many documents were scanned, how many matched,and whether indexes were used.

This is one of the most important tools for diagnosing slow MongoDB queries.

---

## Aggregation Framework

MongoDB’s Aggregation Framework is used for:

- analytics,
- transformations,
- grouping,
- joins,
- and complex data processing.

It works as a **pipeline**, where documents pass through multiple stages.


### Common Aggregation Stages

| Stage      | Purpose                                      |
| ---------- | -------------------------------------------- |
| `$match`   | Filter documents                             |
| `$group`   | Group documents and calculate aggregates     |
| `$project` | Reshape output fields                        |
| `$sort`    | Sort results                                 |
| `$lookup`  | Join another collection                      |
| `$unwind`  | Split array elements into separate documents |


### Aggregation Example

```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      total: { $sum: 1 }
    }
  }
])
```

This groups orders by status and counts them.


*Note - MongoDB also optimizes aggregation pipelines internally. For example, MongoDB may automatically move $match stages earlier to reduce the amount of data processed.*

---

## Conclusion

MongoDB performance depends less on raw hardware and more on how you design your schema, choose indexes, and structure queries. By embedding related data, indexing wisely, and using tools like explain() and aggregation pipelines, you can build applications that scale smoothly while staying efficient.
