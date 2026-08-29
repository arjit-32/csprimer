---
title: Identity Lifecycle in a System
meta_title: js
description: js
author: Arjit Sharma
series: auth
categories: ["Development"]
draft: false
year: 2025
---

A typical identity flow in a system looks like this:

1. A user registers or an account is created.
2. The user authenticates (logs in).
3. The system issues a way to maintain identity (session, token, etc.).
4. Every request after login includes some form of credential.
5. Authorization checks happen for each protected action.

This flow is the foundation of how modern applications identify users and control access.

## How Systems Remember Logged-In Users

After authentication, the system needs a mechanism to remember that the user is still logged in across future requests.

Two broad approaches are commonly used:

- **Session-based authentication**
- **Token-based authentication**

---

## Session-Based Authentication

In session-based authentication:

- The server stores information about the logged-in user in a **session**.
- The browser stores a **session identifier**, usually inside a **cookie**.
- On each request, the browser automatically sends the cookie back to the server.
- The server uses the session ID to look up the user’s session data.

### Flow in session based auth

```text
Login → Server creates session → Client stores session ID in cookie → Browser sends cookie on each request → Server looks up session to verify identity
```

A session usually contains information like: user ID, login timestamp, expiration time. The important detail is that the actual user state lives on the server. The client only stores a reference to it.

**Example**

Cookie: session_id=abc123
The server may internally map it like this: abc123 → User ID 42
When the request arrives, the server checks the session store, finds the associated user, and treats the request as authenticated.

---

## Token-Based Authentication

In token-based authentication:

- Instead of storing authentication state on the server, the server issues a signed token.
- The client stores the token.
- Future requests include the token.
- The server verifies the token signature to validate identity.

A common token format is a JWT (JSON Web Token).

### Flow in token based auth

```text
Login → Server creates token → Client stores token → Client sends token in requests → Server verifies token signature
```


**Example**

Tokens are commonly sent using the Authorization header: Authorization: Bearer <token>
Unlike sessions, the server usually does not need to look up user state for every request because the token itself contains identity-related information.


---

## Sessions vs Tokens

| Aspect                     | Session-Based Authentication                          | Token-Based Authentication                          |
|-----------------------------|------------------------------------------------------|-----------------------------------------------------|
| **Advantages**              | - Easy to revoke sessions server-side                | - Easier to scale horizontally                      |
|                             | - Sensitive data stays on the server                 | - Works well across APIs and microservices          |
|                             | - Common and straightforward for traditional web apps| - Useful for mobile apps and distributed systems    |
| **Trade-offs**              | - Server must maintain session state                 | - Revoking tokens is harder                         |
|                             | - Scaling requires shared session storage or sticky sessions | - Tokens must be stored securely on the client |
|                             | - Sessions consume server memory or database storage | - Large or poorly designed tokens can be a risk     |
