---
title: Middleware in Express.Js
meta_title: Express.js Middleware Explained | CS Primer
description: Understand Express.js middleware, request-response lifecycle, middleware chaining, and building reusable application logic.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Middleware in Express.js is essentially a **function that runs between the request and the final route handler**. It can inspect, modify, or terminate requests before they reach the endpoint.  It makes the code modular, instead of writing tasks like logging or auth for each request, just write it once and apply to as many routes or the entire app.

## How Middleware Works

Middleware functions have access to the request (req), response (res), and the next() function.
- Calling next() passes control to the next middleware or route handler.
- If you don’t call next(), the request–response cycle ends there

---

## Example of Middleware

```jsx
// 1. Middleware to log every request
app.use((req, res, next) => {
    console.log(`Request to: ${req.method} ${req.url}`);
    next(); // Move to the next middleware or route
});

// 2. Built-in Express middleware to parse JSON bodies (no need for body-parser!)
app.use(express.json());

// 3. Route-specific middleware
const securityCheck = (req, res, next) => {
    console.log("Checking security...");
    // auth/validation logic
    next();
};
app.get("/secure", securityCheck , (req, res) => {
    res.send("Secure page accessed!");
});
```

---

## Types of Middlewares

- Application-level middleware: Applied globally using app.use().
- Router-level middleware: Applied to specific routes or routers.
- Built-in middleware: Provided by Express (e.g., express.json(), express.static()).
- Third-party middleware: Installed via npm (e.g., morgan for logging, helmet for security).

---

## Practical Use Cases

Middleware is useful in many scenarios:
- Logging: Track incoming requests for debugging or analytics.
- Authentication & Authorization: Verify user identity before accessing secure routes.
- Input Validation: Check request data before processing.
- Error Handling: Catch and format errors consistently.
- Serving Static Files: Use express.static() to serve assets.
- Security Enhancements: Add headers or rate limiting with libraries like helmet or express-rate-limit.
