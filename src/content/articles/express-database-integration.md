---
title: Database Integration in Express.js
meta_title: Database Integration with Express.js | CS Primer
description: Learn how to connect Express.js applications to databases, perform CRUD operations, and manage data effectively.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Most backend applications need to store and retrieve data from a database. Express.js can integrate with different database systems such as MongoDB, MySQL, PostgreSQL, and more.

In this article, we explore two popular approaches:

- MongoDB with Mongoose
- MySQL with Prisma ORM

---

# MongoDB with Mongoose

MongoDB is a NoSQL document database that stores data in flexible JSON-like documents.

[MongoDB](https://www.mongodb.com)

Mongoose is an ODM (Object Data Modeling) library for MongoDB that provides:

- Schema validation
- Data modeling
- Middleware/hooks
- Query helpers

[Mongoose](https://mongoosejs.com)

---

### Installing Dependencies
```bash id="jlwm4v"
npm install mongoose dotenv
```

### Creating a Mongoose Model
```javascript
// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  age: Number,
});

export default mongoose.model('User', userSchema);
```

### Connecting to MongoDB

```javascript
// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process if DB fails
  }
};

export default connectDB;
```

The database connection string is usually stored inside environment variables.

Example: .env file
```text
MONGODB_URI=mongodb://localhost:27017/myapp
```

### Creating Express Routes

```javascript
// routes/users.routes.js 
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('name email age');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
```

### Starting the Express Server

```javascript
// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import userRoutes from './routes/users.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Connect DB and start server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## MySQL with Prisma

MySQL is a relational database that stores data in structured tables.

[MySQL](https://www.mysql.com/)

Prisma is a modern ORM that simplifies working with relational databases using a type-safe API.

[Prisma](https://www.prisma.io/?utm_source=chatgpt.com)

Prisma supports:

- MySQL
- PostgreSQL
- SQLite

---

### Installing Prisma

```bash
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init
```


### Defining the Prisma Schema

```javascript
// prisma/schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  age       Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Creating the Prisma Client

```javascript
// db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```


### Creating Routes with Prisma

```javascript
// routes/users.routes.js
import express from "express";
import prisma from "../db.js";

const router = express.Router();

// Get users
router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                age: true,
            },
        });

        res.json(users);

    } catch (err) {
        res.status(500).json({
            error: "Failed to fetch users",
        });
    }
});

// Create user
router.post("/", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body,
        });

        res.status(201).json(user);

    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

export default router;
```

### Starting the Server

```javascript
// server.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```


### Running Database Migrations

After updating the Prisma schema:

```bash
npx prisma migrate dev --name init
```
This creates database tables based on your schema.
