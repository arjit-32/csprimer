---
title: Token-Based Authentication (Stateless)
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

In token-based authentication, the server does not store authentication state for each logged-in user.

Instead:

- The server generates a signed token
- The client stores the token
- Future requests include the token
- The server verifies the token on each request

This is why token-based authentication is commonly called **stateless authentication**.

A common token format is a **JWT (JSON Web Token)**.

---

## Basic Flow

```text id="yb4kmj"
User logs in
  → Server verifies credentials
  → Server generates signed token
  → Client stores token
  → Client sends token in future requests
  → Server verifies token signature
```

Unlike session-based systems, the server usually does not need to look up session state from a database or memory store for every request. The token itself contains identity-related information.

---

## Implementing Token Based Session

### Install 

```bash
npm install jsonwebtoken
```

### Generating a Token After Login

```jsx
import jwt from "jsonwebtoken";

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });

  if (!user)
    return res.status(401).send("Invalid credentials");

  const isValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValid)
    return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { userId: user._id }, // payload
    "jwt-secret-key",     // signing secret
    { expiresIn: "1h" }   // token expiration
  );

  res.json({ token });
});
```

**What Happens Here?**

jwt.sign() creates a digitally signed token.

The token usually contains:

- user identity
- expiration information
- optional roles or permissions

Example payload:
```text
{
  "userId": "42",
  "exp": 1715550000
}
```

The signing secret allows the server to detect whether the token was modified.


### Sending the Token

The client stores the token and sends it with future requests.

Commonly using the Authorization header:

```bash
Authorization: Bearer <token>
```

The Bearer format simply means: _"Whoever possesses this token is treated as authenticated."_


### Verifying Tokens in the Backend

```javascript
function auth(req, res, next) {
  const token =
    req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send("Missing token");
  }

  try {
    const data = jwt.verify(
      token,
      "jwt-secret-key"
    );

    req.userId = data.userId;

    next();
  } catch {
    res
      .status(401)
      .send("Invalid or expired token");
  }
}
```

**What jwt.verify() Does**

jwt.verify():

- checks whether the token signature is valid
- ensures the token was signed using the correct secret
- checks expiration time
- returns the decoded payload if valid

If verification fails, the request is rejected.

### Protecting Routes

```javascript
app.get("/dashboard", auth, (req, res) => {
  res.send("Protected route");
});
```

The middleware runs before the route handler and ensures the request is authenticated


### Logout in Token Systems

Unlike session-based authentication, the server usually does not store tokens.

Because of this, logout works differently.

Typically:

- the client deletes the stored token
- OR the server maintains a token blocklist for revoked tokens
Example:

```javascript
app.post("/logout", (req, res) => {
  // client removes stored token
  res.send("Logged out");
});
```