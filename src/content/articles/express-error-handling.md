---
title: Error Handling in Express.jS
meta_title: Express.js Error Handling Guide | CS Primer
description: Learn Express.js error handling patterns, custom error middleware, exception management, and API reliability practices.
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Errors are inevitable in any application. Express provides a simple yet powerful way to handle them using error-handling middleware. 

## Error-Handling Middleware

Express recognizes error-handling middleware by the presence of four parameters: **(err, req, res, next)**.

```javascript
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
});
```

This middleware should always be placed after all routes so it can catch errors from anywhere in the application.

---

## Forwarding Errors with next()

When next(error) is called, Express skips all normal middleware and jumps directly to the nearest error-handling middleware

### Synchronous Route Errors

```javascript
// Sync Routes can forward errors using next(error)
app.get("/api/error", (req, res, next) => {
    const error = new Error("Test error");
    next(error); // Pass to error handler
});
```

You can also throw errors inside synchronous routes:

```javascript
app.get("/sync-error", (req, res) => {
    throw new Error("Something broke!");
});
```

### Handling Errors in Async Routes

Asynchronous code behaves differently because errors inside promises are not automatically caught by Express 4.

**Using try/catch**

```javascript
// Async Routes can use try/catch
app.get("/api/users/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.json(user);
    } catch (err) {
        next(err); // Pass to error handler
    }
});
```

---

## Simplifying Async Error Handling

Writing try/catch in every route can become repetitive. Two common approaches simplify this process

### Option A - express-async-errors (simplest)

```bash
npm install express-async-errors
```

```jsx
import 'express-async-errors';// ← add at top of server.js

// Now you can skip try/catch
router.get('/', async(req, res)=>{
  const users = await prisma.user.findMany();
  res.json(users);
});
```

**Note: Express 5 introduces built-in async error handling, reducing the need for external wrappers**



### Option B - Wrapper function

Another common approach is creating a reusable wrapper for async routes

```javascript
// asyncHandler.js
function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
```

Usage:

```javascript
// routes/users.js
const asyncHandler = require("./asyncHandler");

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    })
);
```

The wrapper executes the async function and automatically forwards rejected promises to Express’s error-handling middleware

---

## Handling 404 Errors

A common practice is adding a middleware for undefined routes.

```javascript
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});
```

This should be placed before the global error handler.

---

## Global Error Handler

A centralized error handler keeps route logic clean and ensures all errors return consistent responses.

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong!",
    });
});
```

Production applications often use logging libraries instead of console.error and avoid exposing sensitive stack traces to clients

---

## Key Takeaways

- Express handles errors using middleware with four parameters: (err, req, res, next).
- Use next(error) to forward errors to the global handler.
- Async routes require special handling in Express 4.
- express-async-errors or wrapper functions help avoid repetitive try/catch blocks.
- Always place the global error handler at the end of the middleware stack.
- Centralized error handling improves maintainability and API consistency.
