---
title: JSON Web Tokens(JWT) Deep Dive
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---
JWT (JSON Web Token) is one of the most common formats used for stateless authentication.

This article explains:

- what a JWT contains
- how it proves identity
- why signatures matter
- how JWT authentication works in practice

---
## What Is a JWT?

A JWT is a **digitally signed token** that contains JSON data.

The server generates the token after authentication and later verifies it to confirm identity.

A JWT has 3 parts:

```
header.payload.signature
```

Example (shortened):

```
eyJhbGciOi...eyJ1c2VySWQiOi...hSDGf7...
```
Each part is Base64URL encoded.

JWTs are:

- **Not encrypted** → anyone can read the payload
- **Digitally signed** → payload tampering can be detected

The important property is not secrecy. It is integrity.

---

## JWT Structure

A JWT contains three sections.

### 1. Header

The header describes:

- the token type
- the signing algorithm used

Example - 
```json
{
  "alg": "HS256", // HMAC SHA256 signing algorithm
  "typ": "JWT" // token type
}

```

### 2. Payload

The payload contains JSON data called claims.

Example:

```json
{
  "userId": "123",
  "role": "admin",
  "exp": 1710000000
}

```

Claims may include:

- custom data (userId, role)
- standard JWT fields (exp, iat, iss, sub)


### 3. Signature

The signature is generated using:

```
HMACSHA256(
  base64(header) + "." + base64(payload),
  secret
)
```

The signature allows the server to verify:

> "Was this token created by my backend, and has it remained unchanged?"
>

If someone modifies the payload, the signature becomes invalid.
 

---

## JWT Integrity: Readable but Verifiable

### JWT Is NOT Encryption

Because the goal is **integrity**, not secrecy.

Anyone can see the payload, but that’s fine because:

- No sensitive data should be placed inside (passwords, etc.)
- What matters is that the Data **cannot be tampered with**

**Why Signatures Matter?**

Suppose a token payload originally contains:

```json
{
  "role": "user"
}
```

An attacker modifies it to:

```json
{
  "role": "admin"
}
```

They can edit the payload because JWTs are readable. However, they cannot generate a valid signature without the server's secret key.

**Result:**

```
Modified payload + invalid signature → verification fails
```

The server rejects the token. This is the core security property of JWTs.



### Decode vs Verify

**Decode**

- Anyone can decode a JWT using online tools or base64 decode.
- Shows header + payload.
- Does not confirm authenticity.

Analogy: reading the text on an ID card.


**Verify**

- Server checks the signature using the secret key.
- Confirms:
    - Token hasn’t been altered
    - Token is from your backend
    - Token is not expired

Analogy: checking the hologram + barcode on an ID card.

Verification is what makes JWT useful.

---

## JWT Implementation Example

```text
User logs in
  → Server verifies credentials
  → Server creates signed JWT
  → Client stores token
  → Client sends token in future requests
  → Server verifies JWT signature
```

**Generating a JWT (after login)**

```jsx
import jwt from "jsonwebtoken";

function generateToken(userId) {
  return jwt.sign(
    { userId },                // payload
    process.env.JWT_SECRET,    // secret key
    { expiresIn: "1h" }        // expiry
  );
}

```

**Verifying a JWT**

```jsx
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Missing token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { userId, iat, exp }
    next();
  } catch {
    res.status(401).send("Invalid or expired token");
  }
}

```

Use `auth` to protect routes:

```jsx
app.get("/profile", auth, (req, res) => {
  res.send("Welcome " + req.user.userId);
});
```

---

## Why Access Tokens Expire

Access tokens should usually be short-lived. Common expiry: *15 minutes to 1 hour*

**Why?**

- JWTs cannot be easily revoked once issued.
- Short lifetimes limit damage if a token is stolen.
- Expiry forces regular renewal, improving overall security.

---

## Refresh Tokens

Refresh Tokens

A refresh token is a separate long-lived credential used to obtain new access tokens.

Typical properties:

| Token         | Purpose                          |
| ------------- | -------------------------------- |
| Access Token  | Sent on requests, short-lived    |
| Refresh Token | Used to obtain new access tokens |

Refresh tokens are usually:

- longer-lived
- stored more securely
- not sent with every API request

Often stored in:

- HttpOnly cookies
- secure storage

### Basic Refresh Flow

```text
User logs in
  → Server returns:
       accessToken (short expiry)
       refreshToken (long expiry)

Access token expires
  → Client sends refresh token
  → Server verifies refresh token
  → Server issues new access token
```

This allows users to remain logged in without constantly re-entering credentials.


### Minimal Refresh Implementation

**Issue Tokens on Login**

```javascript
const accessToken = jwt.sign(
  { userId },
  ACCESS_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { userId },
  REFRESH_SECRET,
  { expiresIn: "7d" }
);
```

**Refresh Endpoint**

```javascript
app.post("/refresh", (req, res) => {
  const token = req.body.refreshToken;

  try {
    const data = jwt.verify(
      token,
      REFRESH_SECRET
    );

    const newAccess = jwt.sign(
      { userId: data.userId },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      accessToken: newAccess
    });

  } catch {
    res
      .status(401)
      .send("Invalid refresh token");
  }
});
```

---

## Pros & Cons of using JWT

| Aspect          | Advantages                                                                 | Trade-offs / Cons                                                                 |
|-----------------|----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| Architecture    | Stateless authentication – no server-side session storage required         | Harder to revoke tokens once issued (server can’t easily “kill” them)             |
| Scalability     | Works well across APIs and microservices; ideal for distributed systems    | Requires careful design for token refresh and invalidation                        |
| Verification    | Easy to verify with public/private keys; no DB lookup needed               | Payload is readable (unless encrypted), so sensitive data must never be stored    |
| Performance     | Reduces server overhead since no session store is needed                   | Large payloads increase token size, impacting performance over slow networks      |
| Flexibility     | Portable across domains, services, and platforms                           | Easy to misuse if stored insecurely (e.g., in localStorage vulnerable to XSS)     |

---

