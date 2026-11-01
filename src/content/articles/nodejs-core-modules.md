---
title: Mastering Essential Node.js Core Modules
meta_title: Node.js Core Modules Explained | CS Primer
description: Explore essential Node.js core modules including fs, path, http, os, events, and stream with practical examples.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

Node.js ships with a powerful collection of core modules built directly into the runtime. Because they are compiled natively, you never need to install them via npm, you simply import them using the node: prefix.

This guide covers the most critical core modules every Node.js developer must know.

| Module | Purpose |
| :--- | :--- |
| `http` | Create web servers and handle HTTP requests |
| `fs/promises` | File system operations (reading, writing, deleting files) |
| `path` | Cross-platform file path manipulation |
| `url` | Parsing and formatting URLs |
| `os` | Retrieving operating system and hardware info |
| `events` | Implementing event-driven architecture (EventEmitter) |
| `process` | Controlling the runtime environment and environment variables |
| `crypto` | Hashing, encryption, and cryptographic utilities |

---

## Path Module (path)

File path formats differ across operating systems (Linux and macOS use forward slashes /, while Windows uses backslashes \). The path module ensures your code handles file paths seamlessly regardless of the host machine.

```jsx
const path = require("node:path");

// __dirname gives the absolute directory path of the current file
const filePath = path.join(__dirname, "views", "index.html");

console.log(filePath);                  // Output (Unix): '/home/user/project/views/index.html'
console.log(path.extname(filePath));    // Output: '.html'
console.log(path.basename(filePath));   // Output: 'index.html'
console.log(path.dirname(filePath));    // Output: '/home/user/project/views'
```

---

## Working with File System (fs)

Node's fs module allows your application to interact with the operating system's file system. Modern Node.js provides a promise-based API (fs/promises) alongside traditional callback APIs.

### The Modern Approach

```jsx
const fs = require("node:fs/promises");

async function manageFile() {
  try {
    // 1. Write data to a file
    await fs.writeFile("notes.txt", "Learning Node.js Core Modules!");
    console.log("File written successfully.");

    // 2. Read data from the file
    const data = await fs.readFile("notes.txt", "utf8");
    console.log("File Content:", data);
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

manageFile();
```

_Note - For reading massive multi-gigabyte files, avoid fs.readFile (which loads the entire file into RAM) and use Streams instead._

---

## The Streams Module (node:stream via fs)

Streams process data chunk by chunk as it arrives, keeping memory consumption flat even when handling files that are gigabytes in size.

```javascript
const fs = require("node:fs");

// 1. Create a readable stream to read a large file in small chunks (default is ~64KB per chunk)
const readableStream = fs.createReadStream("large-log.txt", "utf8");

// 2. Create a writable stream to write data into a destination file
const writableStream = fs.createWriteStream("copy-log.txt");

// 3. .pipe() automatically takes chunks from the readable stream and feeds them 
// directly into the writable stream, managing memory efficiently without overloading RAM.
readableStream.pipe(writableStream);

// 4. Listen for the 'finish' event to know when the entire file has been successfully copied
writableStream.on("finish", () => {
  console.log("File streaming and copying completed safely.");
});

// 5. Always handle error events to prevent unhandled exceptions if the file is missing or locked
readableStream.on("error", (err) => {
  console.error("Error reading file stream:", err.message);
});

writableStream.on("error", (err) => {
  console.error("Error writing file stream:", err.message);
});
```

---


## The Events Module

Node.js is fundamentally event-driven. The events module provides the EventEmitter class, allowing you to implement a robust publish/subscribe (pub/sub) pattern within your applications.

```javascript
const EventEmitter = require("node:events");

// Create a custom emitter class
class ChatRoom extends EventEmitter {}
const room = cationic = new ChatRoom();

// 1. Listen for an event
room.on("join", (username) => {
  console.log(`System Alert: ${username} has joined the chat room.`);
});

// 2. Emit (trigger) the event elsewhere in your code
room.emit("join", "Arjit");
```

---

## The URL Module

When building backend logic or handling web requests, you often need to dissect incoming URLs into readable components (like hostnames, query parameters, and pathnames).

```jsx
const { URL } = require("node:url");

const requestUrl = new URL("http://localhost:3000/api/products?category=electronics&sort=desc");

console.log(requestUrl.protocol);               // Output: 'http:'
console.log(requestUrl.pathname);               // Output: '/api/products'
console.log(requestUrl.searchParams.get("category")); // Output: 'electronics'
```

*Note: In modern Node.js environments, the URL constructor is globally accessible, so you don't strictly need to require it.*

---

## OS and Process Modules

These two modules offer deep insight into the computer hardware and the running Node process itself.

### Operating System

```javascript
const os = require("node:os");

console.log("Platform:", os.platform());          // Output: 'darwin', 'win32', or 'linux'
console.log("Free Memory:", os.freemem() / (1024 * 1024), "MB"); // Available RAM
console.log("CPU Cores:", os.cpus().length);      // Number of CPU cores
```

### Process

The process object is globally available and provides information about and control over the current Node.js execution process.

```javascript
// Access environment variables
console.log("Current Environment:", process.env.NODE_ENV);

// Access command line arguments passed when running the script
console.log("CLI Arguments:", process.argv);

// Gracefully exit the process if needed
// process.exit(0);
```

---

## The HTTP Module

The http module is the low-level powerhouse that enables Node.js to transfer data over HTTP. It allows you to create full-fledged web servers, handle incoming requests, and send custom responses without installing any external frameworks (like Express).

```jsx
const http = require("node:http"); // Loads Node’s built-in HTTP module

// Create the server instance
const server = http.createServer((req, res) => { 
  // req = incoming request from the client
  // res = outgoing response from the server

  res.writeHead(200, { "Content-Type": "text/plain" }); // Set HTTP status and headers
  res.end("Welcome to Node.js!"); // Send the response body and close the connection
});

// Start listening for traffic on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

**Key Takeaways:**

- The callback passed to *http.createServer()* executes every single time a client makes an HTTP request to your server.
- *req* gives you access to query parameters, headers, and URLs, while *res* lets you control what data, status codes, and headers are sent back.
- Unlike short-lived scripts that exit immediately, the server stays running indefinitely because *server.listen()* keeps the Event Loop active, listening for incoming network events.

---
