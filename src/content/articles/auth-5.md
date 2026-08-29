---
title: Session Management
meta_title: js
description: js
author: Arjit Sharma
series: auth
categories: ["Development"]
draft: false
year: 2025
---

The term "session" in web development is unfortunately overloaded and often causes confusion.

This section is **not** about:

- Browser tabs or windows  
  *(e.g. "Restore previous session" in Chrome)*
- `sessionStorage` or `localStorage` in JavaScript
- Cookies that disappear when the browser closes

Instead, this section is about how a server remembers that a user is authenticated (logged in) across multiple HTTP requests.

---

## Why Do We Need Sessions?

HTTP is stateless by default.

Each request sent from the client to the server is independent and contains no memory of previous requests.

For example:

```text
Request 1 → POST /login
Request 2 → GET /dashboard
```

The second request does not automatically know that the user already logged in during the first request.
After a user successfully authenticates using credentials like email and password, the server needs a reliable way to recognize:
_"This request belongs to an already authenticated user."_

Without this mechanism, the user would need to log in again for every single request.

Session management solves this problem by maintaining authentication state across requests.

This allows users to remain logged in while navigating the application
