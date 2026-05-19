---
title: Introduction to MongoDb
meta_title: js
description: js
author: Arjit Sharma
series: ["mongo"]
categories: ["Development"]
draft: false
year: 2025
---
Traditional relational databases (MySQL, Postgres) store data in tables with strict schemas. MongoDB instead stores semi-structured documents that look like JSON.

**MongoDB** 

- NoSQL (not relational)
- Schema-flexible (documents can differ)
- Document-based (JSON/BSON)
- Horizontally scalable (sharding built-in)

## How **MongoDB Stores Data**

MongoDB stores data in a hierarchy:

```flow
Database
   → Collections
       → Documents (BSON)
           → Fields
```

**Documents**

A document is essentially a JSON-like object:

```jsx
{
  "name": "Alice",
  "age": 25,
  "skills": ["JS", "Node", "MongoDB"]
}
```

MongoDB stores documents as BSON (Binary JSON), which supports more types than JSON: *Date, Decimal128, ObjectId, Binary data, Regex*

The _id field uniquely identifies each document. If not provided, MongoDB generates an ObjectId, which includes a timestamp and ensures uniqueness without coordination.

## Types of data in MongoDB

## Querying in MongoDB

MongoDB queries use a rich set of operators to filter documents. 

- Comparison: *$gt, $gte, $lt, $eq*
- Logical: *$and, $or, $not*
- Membership: *$in, $nin*
- Pattern Matching: *$regex* for partial matches

Queries can target nested fields, array elements, and multiple conditions at once. This makes MongoDB query language surprisingly powerful for a schema-flexible database.

MongoDB queries return a cursor, not a raw array. A cursor streams results and allows operations like: .*sort() , .limit() , .skip() , .project() (include or exclude fields)*

This prevents loading large datasets into memory unnecessarily.

## Updating Data in MongoDB

MongoDB provides powerful update operators that let you modify documents without replacing them entirely. This makes updates efficient and flexible, especially for nested structures:

- **$set** - change specific fields
- **$inc** - increment numeric values
- **$push / $pull** - add or remove items from arrays

Example:

```jsx
{ $inc: { score: 1 } }
```

These operators allow partial updates, avoiding the need to overwrite entire documents.

**Atomicity of Updates**

All updates in MongoDB are **atomic at the document level**. This means that if a document contains multiple fields, arrays, or nested objects, the update either applies fully or not at all, ensuring consistency.

For scenarios requiring changes across multiple documents, MongoDB supports **multi-document transactions** (introduced in 4.0). While transactions provide stronger guarantees, they are slower and often unnecessary if your data model is designed around MongoDB’s document-centric approach.