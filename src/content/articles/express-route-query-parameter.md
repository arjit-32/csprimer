---
title: Route & Query parameters in Express.js
meta_title: Express.js Route & Query Parameters | CS Primer
description: Understand route parameters, query strings, and how to handle dynamic user input in Express.js applications.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Express provides built-in support for extracting values from URLs using route and query parameters. These features allow you to build dynamic routes, filter data, and create flexible APIs.

## Route Parameters

Route parameters are dynamic segments in a URL that capture values from the path. Example - *csprimer.in/user/1*, *csprimer.in/user/2*  can be captured by */user/:id*

Route parameters are typically used to identify a specific resource (like a user ID or product ID)

```jsx
// Single route parameter
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});

// Multiple route parameters
app.get("/user/:id/post/:postId", (req, res) => {
    const { id, postId } = req.params;
    res.send(`User ID: ${id}, Post ID: ${postId}`);
});

```

Route parameters are always strings, so convert them if you need numbers:
```javascript
const userId = Number(req.params.id);
```

---

## Query Parameters

Key-value pairs in a URL’s query string, starting with ?. Example - *csprimer.in?name=Arjit&age=22*

Query parameters are commonly used for filtering, searching, sorting, and pagination.

```javascript
app.get("/search", (req, res) => {
    const { name, age } = req.query;
    res.send(`Searching for: ${name}, Age: ${age || "Not specified"}`);
});
```

*On visiting http://localhost:3000/search?name=Arjit&age=25 , req.query would capture name and age*

**Note - Query parameters are URL-encoded automatically by browsers.**

---

## Conclusion

Route parameters help you identify specific resources, while query parameters let you filter or customize results.
