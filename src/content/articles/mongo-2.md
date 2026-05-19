---
title: MongoDB Data Modelling and Performance
meta_title: js
description: js
author: Arjit Sharma
series: ["mongo"]
categories: ["Development"]
draft: false
year: 2025
---
MongoDB’s strength isn’t just flexible documents, it’s how you model, organise, and query them at scale. Proper modelling determines performance, maintainability, and how effectively MongoDB can use indexes.

## ****How to Think About Data Modelling in MongoDB

In relational databases, design starts with normalisation and breaking data into tables. MongoDB flips this around. It encourages storing related data together when it makes sense, and separating it only when necessary.

Model your data the way your application uses it, not the way SQL forces you to structure it.

|  | Embedding | Referencing |
| --- | --- | --- |
| What is it ? | Storing related data inside the same document.  | Store related data separately and link via ObjectIds. |
| When to Use ? | Embedding is ideal when the relationship is tightly coupled. Child data does not exist independently. | Use referencing when related data grows large, is accessed independently, or changes at a different rate. |
| Benefits | - One read fetches everything
- No need for joins or extra lookups | - Prevents documents from growing too large. 
- Allows independent updates |
| Example  | Blog post with comments embedded | Orders referencing a user document |

## **Indexing - How MongoDB Finds Data Efficiently**

Indexes in MongoDB work similarly to indexes in SQL: they allow the database to locate documents without scanning entire collections. An index is a sorted data structure (B-tree) that speeds up queries on specific fields.

For example, an index on { email: 1 } allows MongoDB to quickly find users by email instead of checking every document.

**When MongoDB Uses an Index**

Indexes are used when the query’s filter matches the fields in the index.

They also help with:

- Sorting
- Uniqueness enforcement
- Range queries ($gt, $lt, etc.)
- Prefix-based matching in compound indexes

If the filter does not match the index structure, MongoDB falls back to a collection scan.

**Compound Indexes**

A compound index includes multiple fields, like:

```jsx
{ age: 1, name: 1 }
```

MongoDB can use this index for - age queries or age + name queries but not for name alone, because age is the leading field. This is known as the prefix rule.

**Index Trade-offs**

Indexes improve read performance but come with costs - 

- Slower writes (each insert/update must update the index)
- Extra storage consumption
- Choosing the wrong index order can hurt performance

A balanced indexing strategy focuses on actual access patterns, not indexing every field just in case.

## **Query Planner**

MongoDB has a built-in query planner that determines how a query will be executed. It evaluates available indexes and generates candidate plans, then selects the most efficient one based on performance.

- Winning Plan → The plan chosen by MongoDB after evaluating candidates.
- Rejected Plans → Alternative plans considered but not selected.

**COLLSCAN vs IXSCAN**

- COLLSCAN → Collection scan; examines every document in the collection. Usually slow and used when no suitable index exists.
- IXSCAN → Index scan; uses an index to quickly locate matching documents. Typically much faster.

You can see query plans using the *explain()* method

```jsx
db.collection.find(...).explain("executionStats")
```

The *executionStats* mode shows how many documents were scanned, how many matched, and which plan was chosen. 

## **Aggregation Framework**

MongoDB’s **Aggregation Framework** is used for advanced data processing, similar to SQL’s *GROUP BY*, joins, and transformations. It works as a **pipeline**, where documents pass through multiple stages.

**Key Stages**

- $match → filter documents
- $group → group by a field and compute aggregates
- $project → shape the output
- $sort → sort results
- $lookup → perform a join with another collection
- $unwind → split array elements into separate documents

Each stage transforms the data and passes it on to the next.

**Why Use Aggregation ?**

- Perform analytics (counts, sums, averages)
- Transform or reshape data
- Join collections
- Handle complex filters or bucketize data

MongoDB optimizes pipelines internally (e.g., moving *$match* and *$sort* earlier) to reduce data volume.

**Aggregation vs Normal Queries**

- Use Aggregation → when grouping, joining, or multi-step transformations are needed.
- Use Normal Queries → for simple retrieval with filters and projections.