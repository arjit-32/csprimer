---
title: Session-Based Authentication (Server Stateful)
meta_title: js
description: js
author: Arjit Sharma
series: auth
categories: ["Development"]
draft: false
year: 2025
---


In session-based authentication:

- The **server stores authentication state**
- The **client stores only a session identifier**

This is why it is called a **stateful** authentication system. The server maintains session data internally and uses it to recognize authenticated users.

Usually:

- The server stores session data in memory, Redis, or a database
- The browser stores a session ID inside a cookie

---

## Basic Flow

```text 
User logs in
  → Server verifies credentials
  → Server creates session
  → Session ID is stored in browser cookie
  → Browser sends cookie on future requests
  → Server looks up session using session ID
```

The important detail is that the browser does not store the actual authentication state. It only stores a reference to it.

---

## Setting Up Sessions in Express


```jsx
import session from "express-session";

app.use(session({
  secret: "random-secret", // Used to sign the session ID cookie
  resave: false, // Prevents unnecessary session saves
  saveUninitialized: false, // Avoids storing empty sessions
  cookie: { httpOnly: true } // Prevents JavaScript from accessing the cookie
}));
```

**What This Does ?**

express-session adds session support to the Express application.

When a request arrives:

- Express checks whether the browser already has a session cookie
- If the session exists, Express loads the session data
- If not, a new session can be created


---

## Login Example

```jsx
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

  // store identity in server-side session
  req.session.userId = user._id;

  res.send("Logged in");
});
```

After successful login:

- The server creates or updates the session
- userId is stored inside the session data
- The browser receives a session ID cookie

### Protecting Routes

```javascript
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res
      .status(401)
      .send("Not authenticated");
  }

  next();
}
```

This middleware checks whether the session contains an authenticated user. If the session is missing or expired, the request is rejected.
Example usage:

```javascript
app.get("/dashboard", requireAuth, (req, res) => {
  res.send("Protected route");
});
```

### Logging Out

```jsx
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out");
  });
});
```

Logging out destroys the session on the server. After the session is removed:
- the session ID no longer maps to valid session data
- future requests are treated as unauthenticated

---

## What Happens in Real Life

- Small apps often keep sessions in memory. At scale, this doesn’t work because multiple servers need to share session data. Instead, sessions are stored in Redis, Memcached, or a database cluster so all servers can access them.

- Cookies are marked HttpOnly, Secure, and often SameSite to prevent XSS/CSRF attacks. Session IDs are long, random, and rotated after login to prevent fixation attacks.

- With multiple servers, you need either sticky sessions (user always routed to the same server) or a shared session store (any server can look up the session).

- Millions of sessions can pile up. Systems implement TTL (time-to-live) and automatic cleanup to avoid memory bloat.

- Stateful systems require coordination between servers. This adds complexity compared to stateless JWT-based systems _(coming up soon)_, which don’t need a central store.
