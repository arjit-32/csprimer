---
title: Introduction to MongoDB
meta_title: Introduction to MongoDB
description: Learn the basics of MongoDB, how it stores data, and how querying and updates work.
author: Arjit Sharma
series: ["mongo"]
categories: ["Development"]
draft: false
year: 2025
---

Traditional relational databases like MySQL and PostgreSQL store data in tables with predefined schemas.

MongoDB works differently. Instead of tables and rows, it stores data as flexible JSON-like documents.

This makes MongoDB easier to work with when:
- data structures change frequently,
- objects contain nested data,
- or applications need to scale quickly.

## What is MongoDB?

MongoDB is a **NoSQL document database** designed for flexibility and scalability.

### Key Features

- **NoSQL database**  
  Data is not stored in relational tables.

- **Schema-flexible**  
  Documents inside the same collection can have different fields.

- **Document-oriented**  
  Data is stored as JSON-like documents.

- **Horizontally scalable**  
  MongoDB supports sharding, which allows data to be distributed across multiple servers.

---

## How MongoDB Stores Data

MongoDB organizes data in the following hierarchy:

```text
Database
   └── Collection
          └── Document (BSON)
                  └── Fields
```

### Database

A database is a container for collections.

Example: ecommerce, blog, school


### Collection

A collection is similar to a table in SQL databases. It stores multiple related documents.

Example: users, products, order

Unlike SQL tables, collections do not require a fixed schema.

### Documents

A document is a single record stored in MongoDB. Documents look similar to JSON objects:

```json
{
  "name": "Arjit",
  "age": 25,
  "skills": ["JavaScript", "Node.js", "MongoDB"]
}
```

MongoDB internally stores documents using BSON (Binary JSON). BSON extends JSON with additional data types such as: 

- Date
- ObjectId
- Decimal128
- Binary Data
- Regular Expressions

---


## The _id Field

Every MongoDB document contains a unique _id field.

Example:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice"
}
```

If you do not provide _id, MongoDB automatically generates an ObjectId.

An ObjectId:

- is globally unique,
- contains a timestamp,
- and can be generated without coordination between servers.

This helps MongoDB scale efficiently in distributed systems.

---

## Data Types in MongoDB

| Type     | Example             |
| -------- | ------------------- |
| String   | `"Alice"`           |
| Number   | `25`                |
| Boolean  | `true`              |
| Array    | `["JS", "Node"]`    |
| Object   | `{ city: "Delhi" }` |
| Date     | `ISODate()`         |
| ObjectId | `ObjectId()`        |
| Null     | `null`              |

Because MongoDB supports nested objects and arrays naturally, it works well for complex application data.

---

## Querying Data in MongoDB

MongoDB provides a rich query language for filtering documents.

### Comparison Operators

```bash
$gt   // greater than
$gte  // greater than or equal
$lt   // less than
$eq   // equal
```

Example:

```javascript
db.users.find({ age: { $gt: 18 } })
```

### Logical Operators

```bash
$and
$or
$not
```

Example:

```javascript
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 60 } }
  ]
})
```


### Membership Operators

```bash
$in
$nin
```

Example:

```javascript
db.users.find({
  skills: { $in: ["MongoDB"] }
})
```

### Pattern Matching

MongoDB supports regular expression searches using $regex.

Example:

```javascript
db.users.find({
  name: { $regex: "^A" }
})
```

---

## Query Results and Cursors

MongoDB queries return a cursor, not a plain array. A cursor allows MongoDB to stream results gradually instead of loading everything into memory at once. This is important when working with large datasets.

You can modify cursor results using methods like:

```bash
.sort()
.limit()
.skip()
.project()
```

Example:

```javascript
db.users
  .find({})
  .sort({ age: -1 })
  .limit(5)
```

---

## Updating Data in MongoDB

MongoDB supports partial document updates using update operators. This means you can modify only specific fields instead of replacing the entire document.

Common Update Operators are -

| Operator | Purpose                  |
| -------- | ------------------------ |
| `$set`   | Update specific fields   |
| `$inc`   | Increment numeric values |
| `$push`  | Add items to arrays      |
| `$pull`  | Remove items from arrays |

Example:

```javascript
db.users.updateOne(
  { name: "Alice" },
  { $inc: { score: 1 } }
)
```

---


## MongoDB at Scale


### Atomic Updates 

In MongoDB, updates are atomic at the document level. This means:
- The entire update either succeeds,
- Or nothing changes at all.

Even if a document contains multiple nested fields or arrays, MongoDB ensures that all changes within that single document are consistent. Think of it like flipping a switch: either the whole document is updated, or it stays exactly the same.


### Multi-Document Transactions

Sometimes applications need to update multiple documents together - for example, transferring money between two accounts. To handle these cases, MongoDB introduced multi-document transactions in version 4.0.

Transactions provide stronger consistency guarantees across documents, but they come with a trade-off: they are slower than single-document operations. That’s why MongoDB encourages data models where related information is stored inside the same document whenever possible. This design reduces the need for transactions and keeps operations fast.
