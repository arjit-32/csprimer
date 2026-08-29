---
title: Understanding the Middleware Pattern in Node.js
meta_title: Node.js Middleware Pattern | CS Primer
description: Learn the middleware pattern in Node.js, request processing flow, chaining, and reusable backend architecture.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

When building web servers with Node.js, you often need to perform common tasks across multiple requests - such as logging, authentication, parsing JSON bodies, or adding headers. Writing the same code repeatedly in every route quickly becomes inefficient. This is where middlewares come in. 


## What are Middlewares

Middleware functions are pieces of code that run during the request–response cycle. They sit between the incoming request and the outgoing response, allowing you to process or modify data, enforce rules, or perform side tasks.

*Key Characteristics :-* 

- Execution order matters: The sequence in which middleware is defined determines how requests flow through them.
- Control flow: A middleware must either:
    - Send a response (res.end, res.send, etc.), or
    - Call next() to pass control to the next middleware.
  If neither happens, the request will hang indefinitely

---

## Example: Building Middleware from Scratch 

```javascript
const http = require('http');

// Middleware 1: Logging
function logger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}

// Middleware 2: Authentication (fake example)
function auth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'secret123') {
    next(); // Allowed
  } else {
    res.writeHead(401);
    res.end('Unauthorized');
  }
}

// Middleware 3: Main handler
function home(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js!');
}

// Server with middleware chain
const server = http.createServer((req, res) => {
  // Run middlewares in order
  logger(req, res, () => {
    auth(req, res, () => {
      home(req, res);
    });
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- next() passes control to the next middleware in the chain. 
- If next() is not called, the request will hang (no response sent).
- Nested middleware chains can become messy, which is why frameworks like Express.js provide a cleaner pipeline

---

## Common Types of Middlewares

Middleware can serve many purposes. Some of the most common include:

- Logging: Track requests for debugging or analytics.
- Authentication/Authorization: Verify user identity and permissions.
- Body Parsing: Convert incoming request bodies (e.g., JSON, form data) into usable objects.
- Error Handling: Catch and process errors. Error-handling middleware typically has four arguments: **(err, req, res, next)**.

Middleware can also be asynchronous. When using async functions, errors should be handled properly with try/catch or by passing them to next(err).

---

## Conclusion

The middleware pattern is a cornerstone of Node.js web development. It enables modular, reusable, and maintainable request handling. While you can implement middleware manually, frameworks like Express.js streamline the process with built-in support for middleware pipelines.

