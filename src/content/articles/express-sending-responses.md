---
title: Sending Response in Express.js
meta_title: Sending Responses in Express.js | CS Primer
description: Learn how Express.js sends JSON, text, files, redirects, and HTTP status codes to clients efficiently.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

In Express.js, sending a response is the final step in the request–response cycle. Once a response is sent, the cycle ends and no further actions can be taken on that request.


## Common Response Methods

Express provides several methods to send responses of different types: text, JSON, HTML, files, or even redirects.

```javascript
// Sending plain text
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Sending JSON
app.get("/json", (req, res) => {
  res.json({ message: "Hello, JSON!", status: "success" });
});

// Sending error with status code
app.get("/error", (req, res) => {
  res.status(404).send("Page not found");
});

// Redirecting to another route
app.get("/go-home", (req, res) => {
  res.redirect("/");
});

// Sending a file
const path = require("path");
app.get("/file", (req, res) => {
  res.sendFile(path.join(__dirname, "example.html"));
});
```

### Explanation of Methods 

- res.send()
Sends a response of various types: strings, objects, buffers, or HTML.
Example: `res.send("<h1>Hello HTML</h1>")`;

- res.json()
Converts JavaScript objects into JSON and automatically sets the Content-Type header to application/json.

- res.status(code)
Sets the HTTP status code for the response. Often chained with res.send() or res.json().

- res.redirect(url)
Redirects the client to another URL. By default, it uses status code 302 (Found).

- res.sendFile(path)
Sends a file as a response. path.join(__dirname, ...) is commonly used to safely construct absolute paths.

- res.set(header, value)
Allows setting custom headers.
Example: res.set("X-App-Version", "1.0");

---

## Common Status Codes

| Status Code | Meaning          |
| ----------- | ---------------- |
| 200         | Success          |
| 201         | Resource created |
| 400         | Bad request      |
| 401         | Unauthorized     |
| 404         | Not found        |
| 500         | Server error     |

---

## Best Practices

- Always send a response for every request to avoid hanging connections.
- Use appropriate status codes to make APIs predictable and RESTful.
- Prefer res.json() for APIs since it ensures proper headers and structured data.
- When serving files, use res.sendFile() with absolute paths for security.
- Add custom headers when needed (e.g., versioning, caching)

