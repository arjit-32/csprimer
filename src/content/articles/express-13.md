---
title: Managing Environment Variables 
meta_title: js
description: js
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Environment variables allow applications to store configuration and sensitive information outside the source code. Common examples include:

- API keys
- Database credentials
- JWT secrets
- Port numbers
- Third-party service tokens

Keeping such values outside your codebase improves security and makes it easier to configure applications across different environments like development, staging, and production.

# What is a `.env` File?

A `.env` file is a plain text file containing key-value pairs used for configuration.

### Step 1 : Install dotenv

```bash
npm install dotenv
```

This package loads variables from your .env file into process.env.

### Step 2 : Create a .env file

```sql
# .env
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=supersecretkey
```

### Step 3 : Load .env in your app

```js
// index.js
require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

**Note - .env files should never be committed to version control. Always add them to .gitignore.**

---

## Native Node.js Support\

Modern Node.js versions support loading .env files without installing dotenv.

Since Node.js v20.6.0, you can use the --env-file flag:

```jsx
**"scripts": {
  "start": "node index.js", // Production: set vars via hosting platform
  "dev": "node --env-file=.env.development index.js",
  "test": "node --env-file=.env.test index.js"
}**
```
This allows different environment files for development, testing, and production.


---

## Production Secret Management

While .env files are excellent for local development, large-scale production systems typically use dedicated secret management tools such as:

AWS Secrets Manager
Google Secret Manager
HashiCorp Vault

These systems provide centralized, secure, and scalable secret management.