---
title: Prisma Cheatsheet
meta_title: Prisma ORM Cheatsheet | CS Primer
description: A practical Prisma cheatsheet covering schema design, migrations, CRUD operations, relations, and query patterns.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

Prisma is a modern, type-safe ORM for Node.js/TypeScript. It provides a clean query API, excellent developer experience, and auto-generated types from your database schema.

---

## Installation

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init
```

*Environment Variables- Edit .env file*

```bash
# .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
```

---

## Prisma Schema

Define your Models in *prisma/schema.prisma*

```javascript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  age       Int?
  role      Role     @default(USER)
  isActive  Boolean  @default(true)

  posts     Post[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
}

model Post {
  id          Int      @id @default(autoincrement())
  title       String
  content     String?
  published   Boolean  @default(false)

  authorId    Int
  author      User     @relation(fields: [authorId], references: [id])

  createdAt   DateTime @default(now())

  @@index([authorId])
}
```

---

## Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Generate client
npx prisma generate

# Reset DB
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

---

## Prisma Client Setup


```js
// prisma.js or lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```


Connect in Express (singleton pattern recommended):

```js
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

---


## Create Operations

```js
// Create single user
const newUser = await prisma.user.create({
  data: {
    name: "Alice",
    email: "alice@example.com",
    age: 25,
  },
})

// Create many (Prisma supports it efficiently)
await prisma.user.createMany({
  data: [
    {
      name: "John",
      email: "john@example.com",
    },
    {
      name: "Jane",
      email: "jane@example.com",
    }
  ],
  skipDuplicates: true,
})

// Create with related data (posts)
await prisma.user.create({
  data: {
    name: "Bob",
    email: "bob@example.com",

    posts: {
      create: [
        {
          title: "Post 1"
        },
        {
          title: "Post 2"
        }
      ]
    }
  }
})
```


## Read Operations


```js
// Find all users
const users = await prisma.user.findMany()

// Find one user
await prisma.user.findUnique({
  where: {
    email: "alice@example.com"
  }
})

await prisma.user.findUniqueOrThrow({
  where: {
    id: 1
  }
})

// Find first match
const firstMatch = await prisma.user.findFirst({
  where: {
    age: {
      gte: 18
    }
  }
})

// Select specific fields
const selected = await prisma.user.findMany({
  select: {
    id: true,
    name: true,
    email: true,
  }
})

// Include relations
const usersWithPosts = await prisma.user.findMany({
  include: {
    posts: true
  }
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

// relation count
await prisma.user.findMany({
  include: {
    _count: {
      select: {
        posts: true
      }
    }
  }
})
```


### Filtering

```js
// Basic Filtering
await prisma.user.findMany({
  where: {
    age: {
      gte: 18
    }
  }
})

// Comparisor Operators
gt   // greater than
gte  // greater than or equal
lt   // less than
lte  // less than or equal
not
// String Filters
startsWith
endsWith
contains
// IN / NOT IN
// Logical Operators - and, or, not
// Relation Filters - some, every, none
const adults = await prisma.user.findMany({
  where: {
    age: { gte: 18 },
    AND: [{ name: { startsWith: "A" } }],
    OR: [{ age: { gt: 30 } }, { name: "Bob" }],
  },
})
```

---

## Update Operations

```js
// Update one
await prisma.user.update({
  where: {
    id: 1
  },
  data: {
    age: 26
  }
})

// Update many
await prisma.user.updateMany({
  where: {
    age: {
      lt: 18
    }
  },
  data: {
    isActive: false
  }
})

// Upsert (create if not exists, update if does)
await prisma.user.upsert({
  where: {
    email: "alice@example.com"
  },

  update: {
    age: 30
  },

  create: {
    name: "Alice",
    email: "alice@example.com"
  }
})


```

## Delete Operations

```js
// Delete one
await prisma.user.delete({
  where: {
    id: 1
  }
})

// Delete many
await prisma.user.deleteMany({
  where: {
    age: {
      lt: 18
    }
  }
})
```

---

## Relation Management

```js
// Connect Existing Relation
await prisma.post.create({
  data: {
    title: "Hello",

    author: {
      connect: {
        id: 1
      }
    }
  }
})

// Connect Multiple
posts: {
  connect: [
    { id: 1 },
    { id: 2 }
  ]
}

// Disconnect Relation
posts: {
  disconnect: [
    { id: 1 }
  ]
}

// Replace Relations
posts: {
  set: [
    { id: 3 }
  ]
}

// Connect Or Create
author: {
  connectOrCreate: {
    where: {
      email: "john@example.com"
    },

    create: {
      email: "john@example.com",
      name: "John"
    }
  }
}
```

---

## Nested Updates

```js
// Create Nested
await prisma.user.update({
  where: {
    id: 1
  },

  data: {
    posts: {
      create: {
        title: "New Post"
      }
    }
  }
})

// Update Nested
await prisma.user.update({
  where: {
    id: 1
  },

  data: {
    posts: {
      update: {
        where: {
          id: 2
        },

        data: {
          title: "Updated"
        }
      }
    }
  }
})

// Delete Nested
await prisma.user.update({
  where: {
    id: 1
  },

  data: {
    posts: {
      delete: {
        id: 2
      }
    }
  }
})
```

---

## Pagination

```js
// Offset Pagination
await prisma.user.findMany({
  skip: 20,
  take: 10
})

// Cursor Pagination
await prisma.user.findMany({
  cursor: {
    id: 10
  },

  take: 10
})
```

---

## Sorting

```js
// Single Sort
orderBy: {
  createdAt: 'desc'
}

// Multiple Sort
orderBy: [
  {
    createdAt: 'desc'
  },
  {
    name: 'asc'
  }
]

// Distinct
await prisma.user.findMany({
  distinct: ['email']
})
```

---

## Aggregations 

```js
// Count
const count = await prisma.user.count()
const adultCount = await prisma.user.count({
  where: { age: { gte: 18 } },
})

// Aggregate
await prisma.user.aggregate({
  _count: true,
  _avg: {
    age: true
  },
  _sum: {
    age: true
  },
  _min: {
    age: true
  },
  _max: {
    age: true
  }
})

// Group By
await prisma.user.groupBy({
  by: ['age'],

  _count: {
    _all: true
  },

  _avg: {
    age: true
  }
})

```

---

## Transactions

```js
// Batch Transactions
await prisma.$transaction([
  prisma.user.create({
    data: {
      email: "a@example.com"
    }
  }),

  prisma.post.create({
    data: {
      title: "Post"
    }
  })
])

// Interactive transaction
await prisma.$transaction(async (tx) => {

  const user = await tx.user.create({
    data: {
      email: "a@example.com"
    }
  })

  await tx.post.create({
    data: {
      title: "Hello",
      authorId: user.id
    }
  })

})
```

---


## Running Raw SQL

```js
// Query Raw
await prisma.$queryRaw`SELECT * FROM User`

// Execute Raw
await prisma.$executeRaw`DELETE FROM User WHERE id = 1`
```

---

## Prisma Middleware

```js
prisma.$use(async (params, next) => {

  console.log(params.model)
  console.log(params.action)

  const result = await next(params)

  return result
})
```

---

## Error Handling

```js
try {

  await prisma.user.create({
    data: {
      email: "test@example.com"
    }
  })

} catch (error) {

  console.log(error)

}
```

---


## Composite Keys

```js
model Like {
  postId Int
  userId Int

  @@id([postId, userId])
}
```

---

## Common Prisma Commands

```bash
# Generate client
npx prisma generate

# Create migration
npx prisma migrate dev

# Reset DB
npx prisma migrate reset

# Open DB GUI
npx prisma studio

# Pull existing DB schema
npx prisma db pull

# Push schema without migration
npx prisma db push

# Seed database
npx prisma db seed
```

---

## Useful Attributes

```js
// Field Attributes
@id
@default()
@unique
@updatedAt
@relation()


// Model Attributes
@@index()
@@unique()
@@id()
```

---

## Mapping Prisma to SQL

| Prisma   | SQL      |
| -------- | -------- |
| where    | WHERE    |
| select   | SELECT   |
| include  | JOIN     |
| orderBy  | ORDER BY |
| take     | LIMIT    |
| skip     | OFFSET   |
| distinct | DISTINCT |
| groupBy  | GROUP BY |
| having   | HAVING   |
| _count   | COUNT    |
| _sum     | SUM      |
| _avg     | AVG      |
| _min     | MIN      |
| _max     | MAX      |


## Quick Summaries

```js
// CRUD

create()
createMany()

findUnique()
findFirst()
findMany()

update()
updateMany()

delete()
deleteMany()

upsert()

// Relations
connect
disconnect
set
create
connectOrCreate


// Filtering

contains
startsWith
endsWith

gt
gte
lt
lte

in
notIn

AND
OR
NOT

// Aggregation
_count
_sum
_avg
_min
_max
groupBy
```