---
title: Getting Started with Node.js
meta_title: Getting Started with Node.js | CS Primer
description: Set up your first Node.js project, understand execution flow, and explore core built-in modules.
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

