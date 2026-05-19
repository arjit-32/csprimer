---
title: MongoDB Cheatsheet
meta_title: js
description: js
author: Arjit Sharma
series: ["mongo"]
categories: ["Development"]
draft: false
year: 2025
---

MongoDB is a powerful NoSQL database designed for high-speed, scalable applications. It stores data as BSON (binary JSON), which makes it perfect for modern stacks like MERN (MongoDB, Express, React, Node).

Basic Database Operation

```jsx
use myDatabase; // Switch to or create a database
show dbs; // List all databases
db.dropDatabase(); // Drop the current database
```

Collection Operations

```jsx
db.createCollection("users"); // Create a new collection
show collections; // List all collections in the current database
db.users.drop(); // Drop the "users" collection
db.users.renameCollection("customers"); // Rename "users" collection to "customers"
```

Insert Operations

```jsx
// Add a single document
db.users.insertOne({ name: "Arjit", age: 25 });

// Add multiple documents at once
db.users.insertMany([
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 22 }
]);
```

Query Documents

```jsx
db.users.find(); // Returns all documents
db.users.findOne({ name: "Arjit" }); // Find the first document matching the query

db.users.findById("1"); // Find a document by its ID

// Projection (Include/Exclude fields)
db.users.find({}, { name: 1, age: 1, _id: 0 }); // Include "name" and "age", exclude "_id"
```

Query Operators

```jsx
// Comparison
db.users.find({ age: { $gt: 20 } }); // Users older than 20
db.users.find({ age: { $gte: 18, $lte: 30 } });

// Logical
db.users.find({ age: { $gt: 25 }, name: "Arjit" });           // AND
db.users.find({ $or: [{ age: 25 }, { name: "Bob" }] });       // OR
db.users.find({ age: { $not: { $gt: 30 } } });                 // NOT

// Membership
db.users.find({ age: { $in: [25, 30] } });
db.users.find({ age: { $nin: [25, 30] } });

// Regex search
db.users.find({ name: { $regex: /^J/, $options: "i" } }); // Names starting with "J" (case-insensitive)

```

Cursor Operations

```jsx
// Sort documents
db.users.find().sort({ age: -1 }); // Sort by age in descending order

// Limit documents
db.users.find().limit(5); // Limit to 5 documents

// Skip documents
db.users.find().skip(5); // Skip the first 5 documents
```

Update Operation

```jsx
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
db.users.updateMany({}, { $inc: { age: 1 } });      // increment age
```

Delete Operation

```jsx
db.users.deleteOne({ name: "Bob" });
db.users.deleteMany({ age: { $lt: 20 } });
```

Aggregation Framework

```jsx
// Count documents
db.users.countDocuments();

// Group by and aggregate
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);

// Filter and aggregate
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: "$age", count: { $sum: 1 } } }
]);

// Sort, limit, and skip in aggregation
db.users.aggregate([{ $sort: { age: -1 }}]);
db.users.aggregate([{ $limit: 5 }]);
db.users.aggregate([{ $skip: 10 }]);
```

Indexing

```jsx
db.users.createIndex({ name: 1 }); // Create an ascending index on "name"
db.users.createIndex({ email: 1 }, { unique: true }); // Create a unique index on "email"
db.users.dropIndex("name_1"); // Drop the index on "name"
db.users.getIndexes(); // List all indexes
```