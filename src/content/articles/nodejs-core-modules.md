---
title: Essential Core Modules in Node.js
meta_title: Node.js Core Modules Explained | CS Primer
description: Explore essential Node.js core modules including fs, path, http, os, events, and stream with practical examples.
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

Node.js comes with a rich set of *built-in (core) modules* that let you work with files, paths, URLs, operating system data, and networking. Core modules are built into Node.js and do not require installation via npm.

| Module | Purpose |
| --- | --- |
| `http` | Create web servers |
| `fs` | File system operations |
| `path` | Path manipulation |
| `url` | Parse and format URLs |
| `os` | Get system info |
| `events` | Event-driven architecture |
| `process` | Control runtime & env vars |
| `crypto` | Hashing and encryption utilities |

---

## Working with File System (fs)

Node’s `fs` module lets you read and write files.

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
console.log(path.extname(fullPath)); // '.html'
```

Commonly used methods:

- `path.join()`
- `path.resolve()`
- `path.extname()`
- `path.basename()`

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
const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  const contentType = mime.lookup(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end("Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```