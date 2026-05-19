---
title: Prisma Cheatsheet
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

Prisma is a modern, type-safe ORM for Node.js/TypeScript. It provides a clean query API, excellent developer experience, and auto-generated types from your database schema.

Setup and Connection

```sql
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma (creates prisma folder + schema.prisma)
npx prisma init
```

Edit .env (created by Prisma):

```sql
# .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
```

Define your Models in prisma/schema.prisma

```sql
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  age       Int?
  createdAt DateTime @default(now())
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

Generate client and migrate:

```sql
# Create migration and apply to DB
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

Connect in Express (singleton pattern recommended):

```sql
// prisma.js or lib/prisma.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // optional: log queries
})

export default prisma
```

```sql
// app.js or server.js
import express from 'express'
import prisma from './prisma.js'

const app = express()
app.use(express.json())

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
```

CRUD Operations
Create

```sql
// Create single user
const newUser = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@example.com",
    age: 25,
  },
})

// Create with related data (posts)
const userWithPosts = await prisma.user.create({
  data: {
    email: "bob@example.com",
    name: "Bob",
    posts: {
      create: [
        { title: "First Post" },
        { title: "Second Post" },
      ],
    },
  },
})

// Create many (Prisma supports it efficiently)
await prisma.user.createMany({
  data: [
    { email: "c@example.com", name: "Charlie", age: 30 },
    { email: "d@example.com", name: "Dave", age: 22 },
  ],
  skipDuplicates: true, // optional: skip if unique constraint violated
})

```

Read

```sql
// Find all users
const users = await prisma.user.findMany()

// Find one user
const user = await prisma.user.findUnique({
  where: { email: "alice@example.com" },
})

// Or by ID
const userById = await prisma.user.findUnique({
  where: { id: 1 },
})

// Find first match
const firstMatch = await prisma.user.findFirst({
  where: { age: { gte: 18 } },
})

// Select specific fields
const selected = await prisma.user.findMany({
  select: {
    name: true,
    email: true,
    age: true,
  },
})

// Include relations
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true,
  },
})

// Or select specific relation fields
const usersWithPostTitles = await prisma.user.findMany({
  select: {
    name: true,
    posts: {
      select: { title: true },
    },
  },
})

// Filtering
const adults = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    AND: [{ name: { startsWith: "A" } }],
    OR: [{ age: { gt: 30 } }, { name: "Bob" }],
  },
})

// Sort, pagination
const paginated = await prisma.user.findMany({
  orderBy: { age: 'desc' },
  take: 10,     // LIMIT
  skip: 20,     // OFFSET
  cursor: { id: 50 }, // for keyset pagination
})
```

```sql
// Find all users
const users = await prisma.user.findMany()

// Find one user
const user = await prisma.user.findUnique({
  where: { email: "alice@example.com" },
})

// Or by ID
const userById = await prisma.user.findUnique({
  where: { id: 1 },
})

// Find first match
const firstMatch = await prisma.user.findFirst({
  where: { age: { gte: 18 } },
})

// Select specific fields
const selected = await prisma.user.findMany({
  select: {
    name: true,
    email: true,
    age: true,
  },
})

// Include relations
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true,
  },
})

// Or select specific relation fields
const usersWithPostTitles = await prisma.user.findMany({
  select: {
    name: true,
    posts: {
      select: { title: true },
    },
  },
})

// Filtering
const adults = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    AND: [{ name: { startsWith: "A" } }],
    OR: [{ age: { gt: 30 } }, { name: "Bob" }],
  },
})

// Sort, pagination
const paginated = await prisma.user.findMany({
  orderBy: { age: 'desc' },
  take: 10,     // LIMIT
  skip: 20,     // OFFSET
  cursor: { id: 50 }, // for keyset pagination
})
```

Update

```sql
// Update one
await prisma.user.update({
  where: { email: "alice@example.com" },
  data: { age: 26 },
})

// Update many
await prisma.user.updateMany({
  where: { age: { lt: 18 } },
  data: { isActive: false },
})

// Upsert (create if not exists, update if does)
const upserted = await prisma.user.upsert({
  where: { email: "alice@example.com" },
  update: { age: 27 },
  create: { email: "alice@example.com", name: "Alice", age: 27 },
})
```

Delete

```sql
// Delete one
await prisma.user.delete({
  where: { email: "bob@example.com" },
})

// Delete many
await prisma.user.deleteMany({
  where: { age: { lt: 18 } },
})
```

Aggregations & Counting

```jsx
// Count
const count = await prisma.user.count()
const adultCount = await prisma.user.count({
  where: { age: { gte: 18 } },
})

// Group by + aggregate
const grouped = await prisma.user.groupBy({
  by: ['age'],
  _count: { _all: true },
  _avg: { age: true },
  _sum: { age: true },
  _min: { age: true },
  _max: { age: true },
})
```

Transactions

```jsx
// Interactive transaction
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: "t@example.com", name: "Tx" } }),
  prisma.post.create({ data: { title: "Tx Post", author: { connect: { email: "t@example.com" } } } }),
])

// Sequential transaction (with rollback on error)
await prisma.$transaction(async (tx) => {
  await tx.user.update({ where: { id: 1 }, data: { age: { increment: 1 } } })
  await tx.post.create({ data: { title: "New", authorId: 1 } })
})
```

---

// BASIC CRUD
prisma.model.create({ data: { ... } })
prisma.model.findUnique({ where: { id: 1 } })
prisma.model.findFirst({ where: { ... } })
prisma.model.findMany({ where: { ... } })
prisma.model.update({ where: { id: 1 }, data: { ... } })
prisma.model.delete({ where: { id: 1 } })
prisma.model.upsert({
where: { id: 1 },
update: { ... },
create: { ... }
})

// FILTERING (WHERE)
where: {
id: 1,
title: "Task",
completed: true,

// Comparison
id: { gt: 5 },          // >
id: { gte: 5 },         // >=
id: { lt: 10 },         // <
id: { lte: 10 },        // <=
id: { not: 3 },         // !=

// String filters
title: { contains: "work" },     // LIKE %work%
title: { startsWith: "A" },      // LIKE A%
title: { endsWith: "Z" },        // LIKE %Z
title: { mode: "insensitive" },  // case insensitive

// In / Not In
id: { in: [1,2,3] },
id: { notIn: [4,5] },

// AND / OR / NOT
AND: [{ completed: true }, { userId: 1 }],
OR: [{ completed: true }, { userId: 1 }],
NOT: { completed: false }
}

// RELATIONS (JOIN)
include: {
user: true,
posts: true,

// Nested include
user: {
select: { id: true, email: true }
}
}

select: {
id: true,
title: true
}

// RELATION FILTERING
where: {
user: {
email: "[test@email.com](mailto:test@email.com)"
}
}

where: {
posts: {
some: { published: true }   // EXISTS
}
}

where: {
posts: {
every: { published: true }
}
}

where: {
posts: {
none: { published: true }
}
}

// PAGINATION
take: 10         // LIMIT
skip: 20         // OFFSET

cursor: { id: 5 }   // Cursor pagination

// SORTING
orderBy: {
createdAt: "desc"
}

orderBy: [
{ createdAt: "desc" },
{ title: "asc" }
]

// DISTINCT
distinct: ["userId"]

// AGGREGATIONS
_count: true

_count: {
select: { posts: true }
}

_sum: { amount: true }
_avg: { price: true }
_min: { createdAt: true }
_max: { createdAt: true }

// GROUP BY
prisma.model.groupBy({
by: ["userId"],
where: { completed: true },
_count: { userId: true },
_sum: { amount: true },
orderBy: {
_count: { userId: "desc" }
},
having: {
userId: { gt: 5 }
}
})

// TRANSACTIONS
await prisma.$transaction([
prisma.user.create({ data: {...} }),
prisma.todo.create({ data: {...} })
])

// RAW SQL
await prisma.$queryRaw`SELECT * FROM User`
await prisma.$executeRaw`DELETE FROM User WHERE id = 1`

where        → WHERE
include      → JOIN
select       → SELECT columns
orderBy      → ORDER BY
take         → LIMIT
skip         → OFFSET
_count       → COUNT()
_sum         → SUM()
groupBy      → GROUP BY
having       → HAVING
distinct     → DISTINCT