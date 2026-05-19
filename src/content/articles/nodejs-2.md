---
title: Getting Started with Node.js
meta_title: js
description: js
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

## Creating Your First Node.js Project

**Step 1:** Initialize a Node Project

```bash
mkdir node-app
cd node-app
npm init -y # This creates a package.json file, which stores project metadata and dependencies.
```

*Note - When you install packages, they are stored in the node_modules folder.*


**Step 2:** Create Entry File

```jsx
// index.js
console.log("Hello, Node.js!");
```

Run with:

```bash
node index.js
```

*Note - Each file in Node.js is treated as a module with its own scope (not global like in browsers).*

---

## How Node Executes your Code

1. Node.js starts its runtime (V8 engine + libuv).
2. Loads your JavaScript file.
3. Parses and compiles it.
4. Executes it inside the event loop.
5. Exits when no more work remains.

If you create a server or set timers, the event loop stays active, keeping your program running.

---

## Creating a Basic HTTP Server

Node has a built-in `http` module to create web servers:

```jsx
const http = require("http"); // loads Node’s built-in HTTP module

const server = http.createServer((req, res) => { // (req, res) represents the incoming request and outgoing response
  res.writeHead(200, { "Content-Type": "text/plain" }); // sets the status code and headers
  res.end("Welcome to Node.js!"); // sends the response
});

// starts listening for connections
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

- require() is used to import modules in Node.js (CommonJS module system).
- The callback passed to createServer runs every time a request is received.
- Port 3000 is where the server listens.
- The server keeps running because it keeps the event loop active.

---

## Built-in Modules

Node.js comes with useful built-in modules:
- fs → File system operations
- path → File path utilities
- os → System info
- http → Web servers

```javascript
const fs = require("fs");
fs.writeFileSync("hello.txt", "Hello World!");
```

We will learn more about these built-in modules in next article.