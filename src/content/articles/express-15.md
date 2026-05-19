---
title: Modularity in Express.js
meta_title: js
description: js
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

As applications grow beyond a few routes, keeping all logic inside a single file quickly becomes difficult to maintain. Modularity is the practice of splitting an application into smaller, focused components where each file has a clear responsibility.

In Express.js applications, code is commonly separated into:

- Routes → Define API endpoints
- Controllers → Handle request/response logic
- Services → Contain business logic
- Models → Interact with the database


## Typical Project Structure

```
project/
│
├── routes/
│   └── users.routes.js
│
├── controllers/
│   └── users.controller.js
│
├── services/
│   └── users.service.js
│
├── models/
│   └── schema.prisma
│   └── db.js
│
└── app.js
```

## Example: Users Module

### Step 1: Database Configuration

```prisma
// models/schema.prisma
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

**Run migrations**

```jsx
npx prisma migrate dev --name init
```

**Database Client**

```javascript
// models/db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

The database client is shared across services.


### Step 2: Defining Routes

Routes define the API endpoints and map them to controller functions.

```javascript
// routes/users.routes.js
import express from "express";
import { getUsers, createUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
```

### Step 3: Creating Controllers

Controllers handle incoming requests and outgoing responses.

```javascript
// controllers/users.controller.js
import * as userService from "../services/users.service.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.listUsers();

        res.json(users);

    } catch (err) {
        next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.addUser(req.body);

        res.status(201).json(newUser);

    } catch (err) {
        next(err);
    }
};
```

Controllers should remain lightweight and primarily coordinate request handling

### Step 4: Creating Services

Services contain the core business logic and database operations.

```javascript
// services/users.service.js
import prisma from "../models/db.js";

export const listUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            age: true,
        },
    });
};

export const addUser = async (data) => {
    return prisma.user.create({
        data,
    });
};
```

Separating business logic into services improves code reuse and testing

### Step 5: Connecting Everything in app.js

```javascript
// app.js
import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---


## Request Flow

A request typically flows through the application like this:

```bash
Client Request
      ↓
Route
      ↓
Controller
      ↓
Service
      ↓
Database
```

The response then travels back through the same chain.