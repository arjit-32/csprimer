---
title: Input Validation in ExpressJS
meta_title: Input Validation with Zod in Express.js | CS Primer
description: Learn request validation using Zod in Express.js to build secure, type-safe, and reliable backend APIs.
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Input request validation ensures incoming request data is correct, safe, and follows the expected structure before your application processes it.

## What is Zod ?

Zod is a TypeScript-first schema validation library that allows you to:

- Define the expected structure of data
- Validate incoming requests
- Generate meaningful validation errors
- Infer TypeScript types directly from schemas

**Install zod**

```bash
npm install zod
```

---

## Creating a Validation Schema

Schemas define the rules your data must follow.

```javascript
const { z } = require("zod");

// User validation schema
const UserSchema = z.object({
    name: z.string().min(1, "Name is required"),

    age: z
        .number()
        .int()
        .min(18, "Age must be at least 18"),
});
```

This schema ensures:
- name must be a non-empty string
- age must be an integer greater than or equal to 18

---

## Creating Validation Middleware

Instead of validating data inside every route, we can create reusable middleware.

```javascript
const validate = (schema) => {
    return (req, res, next) => {
        try {
            // Validate request body
            req.body = schema.parse(req.body);

            next();

        } catch (error) {
            return res.status(400).json({
                success: false,
                errors: error.errors,
            });
        }
    };
};
```

The middleware:
- Validates req.body
- Stops invalid requests
- Forwards valid requests to the next middleware or route handler

---

## Using Validation Middleware in Routes

```jsx
app.post(
    "/api/users",

    validate(UserSchema),

    async (req, res, next) => {
        try {
            const { name, age } = req.body;

            const user = new User({ name, age });

            await user.save();

            res.status(201).json({
                message: "User created",
                user,
            });

        } catch (err) {
            next(err);
        }
    }
);
```

If the request body does not match the schema, the request never reaches the route handler.



