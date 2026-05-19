---
title: Routing in Express.js
meta_title: js
description: js
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Routing is the process of defining how your server responds to client requests for specific URLs and HTTP methods.
Think of it this way: routing tells your server *what to do* when someone *visits a particular path*.

*For example - When someone goes to csprimer.in/about, the server should return the About page.*


## How Routing Works in Express

Express provides methods such as get(), post(), put(), and delete() to handle different HTTP request types.
Each method takes:
- A path (URL pattern)
- A handler function that processes the request and sends a response

---

## Example: Basic Routes
```javascript
// Middleware to parse incoming JSON request bodies
// (We’ll explore middlewares in detail later)
app.use(express.json()); 

// Handle GET request to /about
app.get("/about", (req, res) => {
    res.send("This is the About page.");
});

// Handle POST request to /submit
app.post("/submit", (req, res) => {
    const { name, message } = req.body; // Extract data from request body
    if (!name || !message) {
        return res.status(400).send("Missing required fields: name and message.");
    }
    res.send(`Thank you, ${name}! We received your message: "${message}"`);

});
```

Key Points:
   - app.use(express.json()) enables Express to read JSON data from requests.
   - app.get() handles GET requests (usually for fetching data or pages).
   - app.post() handles POST requests (commonly used for submitting data).
   - req.body contains the data sent by the client.

---

## Common HTTP Methods 

| Method    | Purpose     |
| --------- | ----------- |
| GET       | Fetch data  |
| POST      | Create data |
| PUT/PATCH | Update data |
| DELETE    | Remove data |

---

## Route Chaining 

Express also allows you to define multiple handlers for the same route using route chaining. This is useful when you want to group different HTTP methods under a single path


```javascript
app.route("/users")
   .get((req, res) => res.send("List all users"))
   .post((req, res) => res.send("Create a user"))
   .delete((req, res) => res.send("Delete all users"));
```

Here:
- GET /users → Returns a list of users
- POST /users → Creates a new user
- DELETE /users → Deletes all users

---

## Conclusion

Routing is the backbone of any Express.js application. By mastering GET, POST, PUT, DELETE, and route chaining, you can build clean, organized APIs that scale easily.

