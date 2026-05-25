---
title: Modules, Dependencies and Environment Variables
meta_title: Node.js Modules, Dependencies & Environment | CS Primer
description: Learn Node.js modules, npm dependencies, environment variables, package management, and project configuration.
author: Arjit Sharma
series: ["nodejs"]
categories: ["Development"]
draft: false
year: 2025
---

As Node.js applications grow, everything can’t live in a single file. You need *modular code*, *third-party libraries*, and *environment-based configuration*.

## Modules in Node.js

A module is just a reusable file that exports values (functions, objects, etc.) and imports them elsewhere. Node.js supports two system

### CommonJS way - Node.js way

```javascript
// math.js (exporting)
function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

module.exports = { add, subtract};
```


```jsx
// app.js (importing)
const { add, subtract } = require('./math');

console.log(add(5,3));// 8
console.log(subtract(10,4));// 6
```


### ES Modules (ESM) - The Modern Way

Files must use _.js_ with _"type": "module"_ in _package.json_, or use the _.mjs_ extension.

```json
{
"name":"my-app",
"type":"module"
}
```


```jsx
// math.js (exporting)
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export default function multiply(a, b) { return a * b; }
```

```jsx
// app.js (importing)
import { add, subtract } from "./math.js";
import multiply from "./math.js";

console.log(add(5, 3));   // 8
console.log(multiply(4, 5)); // 20
```

---

## Managing Dependencies with NPM

**npm** (Node Package Manager) is bundled with Node.js and is used to manage external libraries.

**Installing a Package**

```bash
npm install axios
```

**Using a Package**

```jsx
import axios from "axios";

axios.get("https://api.github.com")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

**Global vs Local Packages**

- Local → Installed per project (inside node_modules).
- Global → Installed system‑wide, often for CLI tools (npm install -g nodemon).

---

## Process Object

The `process` global gives access to runtime info, environment variables, and command‑line arguments.

```jsx
console.log(process.env.PORT);     // Env variable
console.log(process.argv);         // Command-line args
console.log(process.cwd());        // Current directory
console.log(process.platform);     // OS platform
```

Example: Working with CLI arguments

```bash
node index.js hello world
```

```javascript
process.argv.slice(2).forEach(arg => {
  console.log("Received:", arg);
});
```

---

## Environment Variables with dotenv

Environment variables allow configuration without hardcoding values.

**Install dotenv**

```bash
npm install dotenv
```

**Create a `.env` file**

```jsx
PORT=3000
```

**Load Variables**

```javascript
require("dotenv").config();
console.log(`Running on port ${process.env.PORT}`);
```