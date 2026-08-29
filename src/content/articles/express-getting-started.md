---
title: Getting Started with Express.js
meta_title: Getting Started with Express.js | CS Primer
description: Set up your first Express.js application, create routes, handle requests, and build a basic web server from scratch.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

In this article, we will learn how to set up a basic Express.js server step by step.

## Step 1 - Setting up Project

```bash
mkdir express-app
cd express-app
npm init -y
```

This creates a package.json file to manage project metadata and dependencies

---

## Step 2 - Install Express

```bash
npm install express
```

Express and its dependencies are installed inside the node_modules folder

---

## Step 3 - Basic Server

```javascript
// server.js
const express = require("express");
const app = express(); 
const port = 3000;

// Define a basic route that responds to HTTP GET request
// req represents the incoming request, while res is used to send the response back to the client.
app.get("/", (req, res) => {
    res.send("Hello, Express!");
    // Alternatively: res.json({ message: "API working" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

Here's what's happening:
   - express() creates an application instance.
   - app.get() defines a route that responds to HTTP GET requests.
   - req represents the incoming request, while res is used to send a response back to the client.
   - app.listen() starts the server on the specified port.

---

## Step 4 - Run the Server

```bash
node server.js
```

Open *[http://localhost:3000/](http://localhost:3000/)* in your browser, and you should see “Hello, Express!” displayed.

