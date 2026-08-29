---
title: MongoDB Cheatsheet
meta_title: MongoDB Cheatsheet | CS Primer
description: A practical MongoDB cheatsheet covering CRUD operations, queries, aggregation, indexing, and commonly used commands.
author: Arjit Sharma
series: mongo
categories: ["Development"]
draft: false
year: 2025
---

MongoDB is a powerful NoSQL database designed for high-speed, scalable applications. It stores data as BSON (binary JSON), which makes it perfect for modern stacks like MERN (MongoDB, Express, React, Node).

---

## Database Operation

```jsx
// Switch to or create a database
use myDatabase

// List all databases
show dbs

// Show current database
db

// Delete current database
db.dropDatabase()
```

---

## Collection Operations

```jsx
// Create a collection
db.createCollection("users")

// List collections
show collections

// Delete a collection
db.users.drop()

// Rename collection
db.users.renameCollection("customers")
```

---

## Insert Operations

```jsx
// Insert one document
db.users.insertOne({
  name: "Arjit",
  age: 25
})

// Insert multiple documents
db.users.insertMany([
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 22 }
])
```

---

## Query Documents

```jsx
// Find all documents
db.users.find()

// Find one document
db.users.findOne({ name: "Arjit" })

// Find by ObjectId
db.users.findOne({
  _id: ObjectId("507f1f77bcf86cd799439011")
})
```

---

## Projection 

Select Specific Fields.

```jsx
// This includes name , age and excludes _id
db.users.find(
  {},
  {
    name: 1,
    age: 1,
    _id: 0
  }
)
```

---

## Query Operators

### Comparison Operators

```jsx
db.users.find({
  age: { $gt: 20 }
})

db.users.find({
  age: { $gte: 18, $lte: 30 }
})
```


### Logical Operators

```jsx
// AND
db.users.find({
  age: { $gt: 25 },
  name: "Arjit"
})

// OR
db.users.find({
  $or: [
    { age: 25 },
    { name: "Bob" }
  ]
})

// NOT
db.users.find({
  age: {
    $not: { $gt: 30 }
  }
})
```

### Membership Operators

```jsx
db.users.find({
  age: { $in: [25, 30] }
})

db.users.find({
  age: { $nin: [25, 30] }
})
```

### Regex Search

```jsx
// Matches names starting with "J" (case-insensitive)
db.users.find({
  name: {
    $regex: /^J/,
    $options: "i"
  }
})
```

---

## Cursor Operations

```jsx
// Sort documents
db.users.find().sort({ age: -1 }); // Sort by age in descending order

// Limit documents
db.users.find().limit(5); // Limit to 5 documents

// Skip documents
db.users.find().skip(5); // Skip the first 5 documents
```

---

## Update Operation

```jsx
// Update one document
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
)

// Update multiple documents
db.users.updateMany(
  {},
  { $inc: { age: 1 } }
)
```

---

## Delete Operation

```jsx
// Delete one document
db.users.deleteOne({
  name: "Bob"
})

// Delete many documents
db.users.deleteMany({
  age: { $lt: 20 }
})
```

---

## Aggregation Framework

### Count documents

```jsx
db.users.countDocuments()
```

### Group and Aggregate

```jsx
// Groups users by age and counts them.
db.users.aggregate([
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 }
    }
  }
])
```

### Filter and Aggregate

```jsx
db.users.aggregate([
  {
    $match: {
      age: { $gt: 25 }
    }
  },
  {
    $group: {
      _id: "$age",
      count: { $sum: 1 }
    }
  }
])
```

### Sort, Limit, and Skip in Aggregation

```jsx
db.users.aggregate([
  { $sort: { age: -1 } },
  { $limit: 5 },
  { $skip: 2 }
])
```

---

## Indexing

```jsx
// Create ascending index
db.users.createIndex({
  name: 1
})

// Create unique index
db.users.createIndex(
  { email: 1 },
  { unique: true }
)

// Delete index
db.users.dropIndex("name_1")

// Show indexes
db.users.getIndexes()
```

---

## Useful Utility Commands

```jsx
// Count all documents
db.users.countDocuments()

// Pretty print output
db.users.find().pretty()

// Check query execution plan
db.users.find({
  age: { $gt: 20 }
}).explain("executionStats")
```

---

