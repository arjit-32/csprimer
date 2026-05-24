---
title: Mongoose Cheatsheet
meta_title: js
description: js
author: Arjit Sharma
series: ["mongo"]
categories: ["Development"]
draft: false
year: 2025
---

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It provides:
- schema validation,
- middleware,
- query helpers,
- relationships via population,
- and a cleaner API on top of the MongoDB driver.

---

## Setup and Connection

```jsx
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mydb");

// Connection events
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Connection error:", err);
});
```

---

## Schema & Model


### Defining a Schema 

```jsx
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  age: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

### Creating a Model

A model provides an interface for interacting with a MongoDB collection

```jsx
// Create a Model
const User = mongoose.model("User", userSchema)
```

---


## CRUD Operations

### Create

```jsx
// Create and save a single user using .create()
const newUser = await User.create({
  name: "Alice",
  email: "alice@example.com",
  age: 25,
});
console.log(newUser);

// Alternatively, create a user instance and save it using .save()
const newUser = new User({
  name: "Alice",
  email: "alice@example.com",
  age: 25,
});
await newUser.save();
console.log(newUser);

// Create multiple users
await User.insertMany([
  { name: "Bob", age: 30, email: "bob@example.com" },
  { name: "Charlie", age: 22, email: "charlie@example.com" },
]);
```

*Note - Use .save() when you need document middleware or want to modify the document before saving.*

### Read 

```jsx
// Find all users
const users = await User.find();

// Find one user by a condition
const user = await User.findOne({ name: "Arjit" });

// Find by ID
const userById = await User.findById("64a7f8c2e4b0f1a2d3e4f567");

// Select specific fields
const selectedFields = await User.find({}, "name age -_id"); // Include "name" and "age", exclude "_id"

// Query with conditions
const adults = await User.find({ age: { $gte: 18 } });

// AND condition
const specificUser = await User.find({ name: "Arjit", age: 25 });

// OR condition
const orCondition = await User.find({
  $or: [{ age: { $gt: 25 } }, { name: "Arjit" }],
});

// Sort, limit, and skip
const sortedUsers = await User.find().sort({ age: -1 }).limit(5).skip(2);
```


### Update

```jsx
// Update one document
await User.updateOne({ name: "Arjit" }, { $set: { age: 26 } });

// Update multiple documents
await User.updateMany({ age: { $lt: 18 } }, { $set: { isActive: false } });

// Find a document and update it
const updatedUser = await User.findOneAndUpdate(
  { name: "Arjit" },
  { $set: { age: 27 } },
  { new: true } // Return the updated document
);
```

### Delete

```jsx
// Delete one document
await User.deleteOne({ name: "Bob" });

// Delete multiple documents
await User.deleteMany({ age: { $lt: 18 } });

// Find a document and delete it
const deletedUser = await User.findOneAndDelete({ name: "Charlie" });
```

---

## Validation

### Built-in Validators

```jsx
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },

  age: {
    type: Number,
    min: 0,
    max: 120,
  },

  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
});
```


### Custom Validators

```jsx
userSchema.path("age").validate(
  (value) => value >= 18,
  "Age must be 18 or older"
);
```

---

## Aggregations

```jsx
// Count documents
const count = await User.countDocuments();

// Group and aggregate
const grouped = await User.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } },
]);

// Filter and aggregate
const filtered = await User.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $group: { _id: "$age", count: { $sum: 1 } } },
]);

// Sort, limit, and skip in aggregation
const sorted = await User.aggregate([{ $sort: { age: -1 } }]);
const limited = await User.aggregate([{ $limit: 5 }]);
const skipped = await User.aggregate([{ $skip: 10 }]);
```

---

## Middleware

```jsx
// Pre-save middleware
userSchema.pre("save", function (next) {
  console.log("Before saving:", this);
  next();
});

// Post-save middleware
userSchema.post("save", function (doc) {
  console.log("After saving:", doc);
});
```

---

## Populate (Relationships)

Population allows Mongoose to replace referenced IDs with actual documents

### Define Relationships

```jsx
const postSchema = new mongoose.Schema({
  title: String,

  content: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
```

### Create a Referenced Document

```jsx
const post = new Post({
  title: "My First Post",

  content: "This is the content of the post.",

  author: "64a7f8c2e4b0f1a2d3e4f567",
});

await post.save();
```

### Populate Referenced Data

```jsx
const populatedPost = await Post.findOne({
  title: "My First Post",
}).populate(
  "author",
  "name email -_id"
);
```

This replaces the author ObjectId with actual user data.