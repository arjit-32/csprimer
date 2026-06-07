---
title: Security Best Practices in Express.js
meta_title: Express.js Security Best Practices | CS Primer
description: Learn how to secure Express.js applications against common vulnerabilities using proven security techniques and middleware.
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Security is a critical part of backend development. Even simple APIs can become vulnerable if proper protections are not in place.

Express.js applications commonly use middleware to improve security by:

- Setting secure HTTP headers
- Restricting cross-origin requests
- Preventing abuse with rate limiting
- Protecting sensitive data

In this article, we explore some essential security middleware used in modern Express.js applications.

## Installing Security Middleware

```bash
npm install helmet cors express-rate-limit
```

These packages provide common security protections out of the box.

---

## Using Helmet

[Helmet](https://helmetjs.github.io/) helps secure Express.js apps by setting various HTTP security headers automatically.

```jsx
import helmet from "helmet";

app.use(helmet());
```

Helmet helps protect against:

- Cross-site scripting (XSS)
- Clickjacking
- MIME-type sniffing
- Unsafe resource loading

It is one of the most commonly used Express.js security middleware packages

---

## Configuring CORS

Browsers restrict cross-origin requests by default using the Same-Origin Policy. [CORS Middleware](https://github.com/expressjs/cors) allows controlled access to your API from other domains.

```javascript
import cors from "cors";

app.use(
    cors({
        origin:
            process.env.CLIENT_URL ||
            "http://localhost:3000",

        credentials: true,
    })
);
```

This configuration:
- Allows requests from the frontend application
- Enables cookies/auth credentials across origins


*Note - In production, always restrict origin to trusted domains.*

---

## Rate Limiting

APIs can be abused through excessive requests, brute-force attacks, or spam.

[express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) limits how many requests a client can make within a time window.

```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 100, // limit each IP

    standardHeaders: true,

    legacyHeaders: false,
});

app.use("/api/", limiter);
```

This example limits each IP address to:
- 100 requests
- Every 15 minutes

Rate limiting helps protect APIs from abuse and denial-of-service attacks.

---

## Additional Security Best Practices

Security is not limited to middleware alone. Production applications should also:

- Validate and sanitize user input
- Store secrets in environment variables
- Use HTTPS in production
- Hash passwords using bcrypt or Argon2
- Avoid exposing stack traces to clients
- Keep dependencies updated
- Use secure authentication strategies