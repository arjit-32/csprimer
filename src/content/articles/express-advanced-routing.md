---
title: Advanced Routing in Express.JS
meta_title: Advanced Express.js Routing | CS Primer
description: Explore advanced Express.js routing techniques including route grouping, routers, nested routes, and modular APIs.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

As your application grows, organizing routes in a single file can quickly become unmanageable. To solve this, Express provides a *Router* object, allowing us to modularize routes into separate files for better structure and scalability.


## What is express.Router()

The `express.Router()` function creates a new router instance. Think of it as a mini Express app that can handle its own routes and middleware. You can define routes in separate files and then plug them into your main application.

---

## Example of User Routes

Let’s create a dedicated router for user-related endpoints to demonstrate express.Router working.

### Creating a user router

```javascript
// routes/users.js
const express = require("express");
const router = express.Router();

// Define routes
router.get("/", (req, res) => res.send("User list"));
router.get("/:id", (req, res) => res.send(`User ${req.params.id}`));
router.post("/", (req, res) => res.send("User created"));

module.exports = router;
```

Here:
- router.get("/") → Handles requests to /users/
- router.get("/:id") → Handles requests to /users/:id
- router.post("/") → Handles requests to create a new user


### Integrating user router in main app

Now, import and use this router in your main application file

```javascript
// app.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/users");

// Mount the router
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
```

With this setup:
- Visiting /users → Returns "User list"
- Visiting /users/42 → Returns "User 42"
- Posting to /users → Returns "User created"

---

## Benefits of Modular Routing

- Separation of concerns → Each feature has its own route file.
- Scalability → Easier to add new modules without cluttering app.js.
- Maintainability → Debugging and testing routes becomes simpler.
