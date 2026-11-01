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

This guide walks through setting up production-ready database connections for two standard stacks:

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

```bash
npm install express mongoose dotenv
```

### Configure the Environment (.env)

```text
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/myapp
```

### Creating a Mongoose Model
```javascript
// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true, 
      lowercase: true,
      trim: true 
    },
    age: { 
      type: Number, 
      min: [0, 'Age cannot be negative'] 
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
```

### Connecting to MongoDB

```javascript
// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1); // Terminate process on connection failure
  }
};

export default connectDB;
```

### Creating Express Routes

```javascript
// routes/users.routes.js 
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /users - Retrieve users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('name email age createdAt');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// POST /users - Create user with explicit field whitelisting
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = await User.create({ name, email, age });
    res.status(201).json(user);
  } catch (err) {
    // 11000 is MongoDB's duplicate key error code
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
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
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
// Route Middleware
app.use('/users', userRoutes);

// Await database connection before binding to network port
try {
  await connectDB();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (error) {
  console.error('Server failed to start:', error.message);
  process.exit(1);
}
```

---

## MySQL with Prisma ORM

MySQL is a relational database that stores data in structured tables.

[MySQL](https://www.mysql.com/)

Prisma is a modern ORM that simplifies working with relational databases using a type-safe API.

[Prisma](https://www.prisma.io/?utm_source=chatgpt.com)

Prisma supports:

- MySQL
- PostgreSQL
- SQLite

---

### Install Dependencies


```bash
npm install @prisma/client
npm install -D prisma

# Initialize your Prisma configuration:
npx prisma init
```

### Configure the Environment

```text
PORT=5000
DATABASE_URL="mysql://username:password@localhost:3306/myapp"
```

### Define the Schema

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


### Run Migrations & Generate Client

After updating the Prisma schema:

```bash
npx prisma migrate dev --name init_users_table
```
This creates database tables based on your schema.


### Instantiate the Prisma Client

```javascript
// db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

export default prisma;
```


### Create Express Routes with Prisma

```javascript
// routes/users.routes.js
import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        createdAt: true
      }
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /users
router.post('/', async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        age: age ? Number(age) : null
      }
    });

    res.status(201).json(user);
  } catch (err) {
    // P2002 is the Prisma error code for unique constraint violation
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: err.message });
  }
});

export default router;
```

### Starting the Server

```javascript
// server.js
import express from 'express';
import dotenv from 'dotenv';
import prisma from './db.js';
import userRoutes from './routes/users.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', userRoutes);

try {
  // Test connection to MySQL prior to opening the port
  await prisma.$connect();
  console.log('✅ Connected to MySQL database via Prisma');

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  await prisma.$disconnect();
  process.exit(1);
}
```

