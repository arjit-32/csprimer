---
title: Essential Core Modules in Node.js
meta_title: Node.js Core Modules Explained | CS Primer
description: Explore essential Node.js core modules including fs, path, http, os, events, and stream with practical examples.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

Node.js comes with a rich set of *built-in (core) modules* that let you work with files, paths, URLs, operating system data, and networking. Core modules are built into Node.js and do not require installation via npm.

| Module | Purpose |
| --- | --- |
| http | Create web servers |
| fs , fs/promises | File system operations |
| path | Path manipulation |
| url | Parse and format URLs |
| os | Get system info |
| events | Event-driven architecture |
| process | Control runtime & env vars |
| crypto | Hashing and encryption utilities |

---


## Creating a Basic HTTP Server

Node has a built-in module that provides the low-level foundation for creating web servers and processing HTTP requests.

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

## Working with File System (fs)

Node’s fs module allows file I/O operations. Modern Node.js provides a promise-based API (fs/promises) alongside traditional callback APIs.

```jsx
const fs = require("node:fs");
const fs_p = require("fs/promises");

// Write file
fs.writeFile("hello.txt", "Hello, FileSystem!", (err) => {
  if (err) throw err;
  console.log("File saved!");
});

// Read file
fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Read file (Promises) - Modern Node versions support promise-based file operations:
async function readFilePromise() {
  const data = await fs_p.readFile("hello.txt", "utf8");
  console.log(data);
}
```

_Note - For large files, streaming (fs.createReadStream) is preferred over readFile to avoid high memory usage._

---

## Path Module (path)

File paths differ between operating systems *(/ vs \)*. The `path` module ensures your code works everywhere

```jsx
const path = require("path");

// __dirname gives the absolute path of the current file’s directory.
const fullPath = path.join(__dirname, "public", "index.html");
console.log(fullPath);
console.log(path.extname(fullPath));  // Output: '.html'
console.log(path.basename(fullPath)); // Output: 'index.html'
console.log(path.dirname(fullPath));  // Output: '.../public'
```

---

## Event-Driven Architecture (events)

Node.js is built around events. The EventEmitter class allows you to create custom pub/sub event channels.

```javascript
const EventEmitter = require("events");

class OrderProcessor extends EventEmitter {}
const orderEmitter = new OrderProcessor();

// Listener
orderEmitter.on("orderPlaced", (order) => {
  console.log(`Notification sent for order #${order.id}`);
});

// Trigger event
orderEmitter.emit("orderPlaced", { id: 101, total: 49.99 });
```

---

## Streaming Large Data (stream)

Streams process data chunk by chunk as it arrives, keeping memory consumption flat even for multi-gigabyte files.

```javascript
const fs = require("node:fs");

// Pipe readable stream directly to writable stream
const readStream = fs.createReadStream("large-log.txt");
const writeStream = fs.createWriteStream("copy-log.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("File streaming completed.");
});
```

---

## URL Parsing (url)

Break down URLs into useful components. This is especially useful when building APIs or routing logic.

```jsx
const { URL } = require("url");

const myUrl = new URL("http://localhost:3000/search?name=Arjit&age=25");

console.log(myUrl.pathname);                 // '/search'
console.log(myUrl.searchParams.get("name")); // 'Arjit'
```

In modern Node.js, URL is globally available, so you can use it directly without importing.

---

## MIME Type Handling

When serving files, browsers need to know what kind of content they’re receiving.

This is done using *MIME types*. Node.js does not automatically determine MIME types when serving files, so external libraries are commonly used.

```bash
npm install mime-types
```

```jsx
const mime = require("mime-types");

console.log(mime.lookup("index.html")); // 'text/html'
console.log(mime.contentType("json"));  // 'application/json'

// If mime.lookup() fails, it can return false.
 mime.lookup(filePath) || "application/octet-stream";
```

*MIME types ensure: HTML renders correctly, JSON is parsed properly, Images and videos display as expected*

---

## Putting It Together: Serving a File

Here’s a simple example combining `fs`, `path`, and MIME types:

```javascript
const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

// MIME map for common extensions
const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png"
};

const server = http.createServer(async (req, res) => {
  const safePath = path.normalize(req.url === "/" ? "/index.html" : req.url);
  const filePath = path.join(__dirname, "public", safePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  try {
    const content = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    }
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```
