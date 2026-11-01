---
title: Getting Started with Node.js
meta_title: Getting Started with Node.js | CS Primer
description: Set up your first Node.js project, understand execution flow, and explore core built-in modules.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

Ready to write your first piece of server-side JavaScript? This guide will walk you through setting up a Node.js project, creating your entry file, and understanding how Node executes your code.

## Creating Your First Node.js Project

### Step 1: Initialize a Node Project

Open your terminal and run the following commands to create a new directory and initialize your project:

```bash
mkdir node-app
cd node-app
npm init -y # This creates a package.json file, which stores project metadata and dependencies.
```

*Note: The npm init -y command automatically creates a package.json file with default settings, which acts as the blueprint for your project, storing metadata and dependencies. When you install external packages later, they will be stored locally inside a node_modules folder.*


### Step 2: Create the Entry File

Create a new file named index.js in your project root and add a simple console.log statement:

```javascript
// index.js
console.log("Hello, Node.js!");
```

### Step 3: Run Your Code

Execute your file from the terminal using the Node runtime:

```bash
node index.js
```

*Note: In Node.js, each file is treated as an independent module with its own local scope, preventing variables from leaking globally (unlike traditional browser JavaScript).*

---

## How Node Executes your Code

1. Runtime Initialization: Node.js fires up its core components, initializing the V8 engine to handle code execution and libuv to manage asynchronous operations and the event loop.
2. File Loading: Node reads your target JavaScript file from the file system.
3. Parsing and Compilation: V8 parses the source code and compiles it into native machine code.
4. Execution: The script starts running. Synchronous code executes immediately.
5. Lifecycle Management:
    - If your script only contains synchronous code (like a simple console.log), the program exits automatically when no more work remains.
    - If your script creates an HTTP server, opens a database connection, or sets timers (setTimeout), the Event Loop stays active, keeping your application running and listening for incoming requests.

