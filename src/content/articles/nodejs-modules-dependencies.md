---
title: Modules and Dependencies in Node.js
meta_title: Node.js Modules and Dependencies | CS Primer
description: Learn Node.js 2 types of moduling systems and npm dependencies.
author: Arjit Sharma
series: nodejs
categories: ["Development"]
draft: false
year: 2025
---

As Node.js applications grow, everything can’t live in a single file. You need *modular code*, *third-party libraries*, and *environment-based configuration* to scale your project effectively.

## Modules in Node.js

A module is a reusable block of code in a file that can export values (functions, objects, or variables) and be imported elsewhere. Node.js supports two distinct module systems:

### CommonJS (The Traditional Node.js Way)

CommonJS is the legacy module system built into Node.js, using require() and module.exports.

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


```javascript
// app.js (importing)
const { add, subtract } = require('./math');

console.log(add(5,3));// 8
console.log(subtract(10,4));// 6
```


### ES Modules / ESM (The Modern Standard Way)

Modern Node.js fully supports native ES Modules using import and export syntax. To use ESM in your project, ensure your package.json includes "type": "module", or use the .mjs file extension.

```json
{
"name":"my-app",
"type":"module"
}
```


```javaScript
// math.js (Exporting)
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export default function multiply(a, b) { return a * b; }
```

```javaScript
// app.js (Importing)
import { add, subtract } from "./math.js";
import multiply from "./math.js";

console.log(add(5, 3));      // Output: 8
console.log(multiply(4, 5)); // Output: 20
```

---

## Managing Dependencies with NPM

npm (Node Package Manager) is bundled with Node.js and acts as the registry and package management tool for installing third-party libraries.

### Installing a Package

To add an external package to your project, run:

```bash
npm install axios
```

### Using a Package

Once installed, you can import and use the package in your codebase:

```javascript
import axios from "axios";

axios.get("https://api.github.com")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

**Local vs. Global Packages**

- Local Packages: Installed specifically for a single project and stored locally inside the project's node_modules directory (tracked in package.json).
- Global Packages: Installed system-wide, typically used for developer command-line tools (e.g., installing nodemon globally using npm install -g nodemon).

---
