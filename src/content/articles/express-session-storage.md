---
title: Sessions in Express.js
meta_title: Session Storage in Express.js | CS Primer
description: Understand session management, storage strategies, authentication sessions, and user state handling in Express.js.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

## What are Sessions?

HTTP is a stateless protocol, meaning every request is treated independently. Once a response is sent, the server does not automatically remember anything about the client. However, real-world applications often need to persist user-specific data across multiple requests, such as:

- Logged-in user information
- Shopping cart items
- User preferences
- Authentication state

Sessions solve this problem by allowing the server to store data associated with a specific client across requests.

---

## How Sessions Work

A typical session flow looks like this:

1. A client sends a request to the server
2. The server creates a session object
3. The server generates a unique session ID
4. The session ID is sent to the browser as a cookie
5. The browser automatically sends the cookie with future requests
6. The server uses the session ID to retrieve stored session data

*Note - The browser stores only the session ID, while the actual session data remains on the server.*

---

## Express Session

### Installing 

```bash
npm install express-session
```


### Setting Up Sessions

```javascript
import express from "express";
import session from "express-session";

const app = express();

app.use(
    session({
        secret: "supersecretkey", // Used to sign the session ID cookie (keep this secret!)

        resave: false,
        saveUninitialized: false,  // Avoids creating empty sessions for unauthenticated users

        cookie: {
            secure: false, // true in production with HTTPS
        },
    })
);
```

*Important Session Options -*

| Option              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `secret`            | Signs the session ID cookie              |
| `resave`            | Prevents unnecessary session saves       |
| `saveUninitialized` | Avoids storing empty sessions            |
| `cookie.secure`     | Ensures cookies are sent only over HTTPS |


### Storing Data in a Session

Session data is attached to req.session.

```javascript
// Route: simulate login
app.get("/login", (req, res) => {
  
    // Store user info inside the session object
    req.session.user = {
        id: 1,
        name: "Arjit", 
    };

    res.send("User logged in"); 
});
```

Now the session persists across future requests.

### Accessing Session Data

```javascript
// Route: profile page
app.get("/profile", (req, res) => {
    // Check if user data exists in session
    if (!req.session.user) {
        return res.status(401).send("Not logged in");
    }

    res.json(req.session.user);
});
```

### Destroying a Session 

```javascript
app.get("/logout", (req, res) => {
    // Destroy the session data on the server
    req.session.destroy(() => {
        res.send("Logged out");
    });
});
```
Destroying the session removes the stored server-side data.

---

## Default Memory Store Problem

By default, express-session stores sessions in memory using MemoryStore.

This is fine for development but not suitable for production because:

- Memory usage grows over time
- Sessions are lost when the server restarts
- It does not scale across multiple servers

Production applications typically use external session stores

---

## Using Redis for Session Storage

Redis is the most common production-ready session store for Express.js applications.

Redis is:

- Extremely fast (in-memory database)
- Shared across multiple servers
- Scalable
- Reliable for session persistence


### Installing Redis Dependencies
```bash
npm install connect-redis redis
```

### Configuring Redis Session Store

```javascript
import express from "express";
import session from "express-session";

import RedisStore from "connect-redis";  // Redis session store adapter
import { createClient } from "redis"; // Redis client

const app = express();

// Create Redis client
const redisClient = createClient();
await redisClient.connect(); // Connect to Redis server

// Configure session middleware with Redis store
app.use(
    session({
        store: new RedisStore({
            client: redisClient, // Store sessions in Redis
        }),

        secret: "supersecretkey", // Secret key for signing cookies

        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: false, // true in production
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    })
);
```

---

## Session Security Best Practices

Always configure secure session cookies in production:

```javascript
cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
}
```

| Option     | Purpose                               |
| ---------- | ------------------------------------- |
| `httpOnly` | Prevents JavaScript access to cookies |
| `secure`   | Sends cookies only over HTTPS         |
| `sameSite` | Helps prevent CSRF attacks            |


---

## When to Use Sessions

- Building traditional web applications
- You need server-side authentication state
- You want easy session invalidation/logout handling
- Managing user state on the server

Sessions are widely used in dashboards, admin panels, and server-rendered applications.
