---
title: Code Quality with ESLint
meta_title: Linting Express.js Applications | CS Primer
description: Learn code linting best practices for Express.js using ESLint to improve code quality, consistency, and maintainability.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Writing code that works is important, but writing code that is clean, consistent, and maintainable is equally essential in real-world applications.
Linting helps identify potential issues, enforce coding standards, and maintain consistency across a codebase before code reaches production

## What is ESLint?

ESLint is a popular open‑source *JavaScript linter*. It analyzes your code, flags potential problems (like unused variables or unsafe patterns), and enforces coding standards across your project. 

### Step 1 : Install ESLint

```bash
npm install eslint --save-dev
```

This adds ESLint as a development dependency in your project.

### Step 2 : Initialize Configuration

```bash
npx eslint --init
```

ESLint will ask a series of setup questions, such as:

- Module system (CommonJS or ES Modules)
- Framework (React, Vue, or none)
- Language (JavaScript or TypeScript)
- Preferred style guide
- Environment (Node.js, browser, etc.)

After setup, ESLint generates a configuration file such as - `.eslintrc.json` or `eslint.config.js` depending on the ESLint version.

### Step 3 : Add a Lint Script

Update your `package.json`:

```sql
"scripts": {
  "lint": "eslint ."
}
```

Now you can lint the entire project using:

```bash
npm run lint
```

---

## Automatically Fixing Issues

ESLint can automatically fix many formatting and style problems

```bash
npm run lint -- --fix
```

This can correct issues like: *Indentation, Spacing, Quotes or Semicolons* while leaving application logic unchanged

---

## Integrate with Editor

Install the ESLint extension in VS Code (or your editor of choice). Errors and warnings will appear inline as you type, making it easier to catch problems early.

