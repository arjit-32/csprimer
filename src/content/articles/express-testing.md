---
title: Testing Express.js Applications (Jest + Supertest)
meta_title: Testing Express.js APIs with Jest & Supertest | CS Primer
description: Learn how to test Express.js applications using Jest and Supertest for reliable, maintainable, and bug-free APIs.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Testing ensures that your application behaves correctly and continues working as new features are added.

Backend testing commonly verifies:

- API responses
- Status codes
- Request validation
- Authentication flows
- Database operations


In Express.js applications, a popular testing setup is:

- [Jest](https://jestjs.io?utm_source=chatgpt.com) → Test runner and assertion library
- [Supertest](https://github.com/ladjs/supertest?utm_source=chatgpt.com) → HTTP testing for Express APIs

---

## Installing Testing Dependencies

```bash
npm install --save-dev jest supertest
```

---

## Configuring Jest

Update package.json:

```json
"scripts":{
  "test":"jest"
}
```

Now tests can be executed using:
```bash
npm test
```

---

## Structuring the Express App for Testing

A common practice is separating the Express app from the server startup.

**Example**

```javascript
// app.js
import express from "express";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
    res.json([
        { id: 1, name: "Arjit" }
    ]);
});

export default app;
```

Then start the server separately:

```javascript
// server.js
import app from "./app.js";

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

This allows tests to import the app directly without starting a real server.

---

## Writing Your First Test

```javascript
// tests/users.test.js
import request from "supertest";

import app from "../app.js";

describe("GET /users", () => {

    it("should return list of users", async () => {

        const res = await request(app)
            .get("/users")
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
    });

});
```

- describe() - Groups related tests together.
- it() - Defines an individual test case.
- request(app) - Supertest sends HTTP requests directly to the Express app.
- expect() - Jest assertions verify behavior.
