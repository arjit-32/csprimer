---
title: Browser Storage
meta_title: JavaScript Browser Storage APIs | CS Primer
description: Understand browser storage in JavaScript including localStorage, sessionStorage, cookies, and client-side persistence.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Browser storage allows applications to persist data without relying on a backend. Browsers provide built‑in storage options that allow web applications to save data locally in the user’s browser.

## Local and Session Storage

**Local Storage** 
   - Stores key‑value pairs, data persists even after closing the browser.
   - Data is shared across all tabs/windows of the same origin
   - Sensitive data (like tokens) should not be stored in localStorage due to XSS risks.

**Session Storage**
   - Useful for temporary data like form inputs or session state.
   - Data is limited to a single tab (per browsing session)


```jsx
// Local Storage (persists until cleared)
localStorage.setItem("name", "John");
console.log(localStorage.getItem("name"));
localStorage.removeItem("name");
localStorage.clear();

// Session Storage (cleared when tab closes)
sessionStorage.setItem("name", "Beth");

// Save tasks to local storage
function storeTaskInLocalStorage(task) {
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

_Note - Both localStorage and sessionStorage store only strings, so objects must be serialized using JSON.stringify()._

---

## Cookies

Server sets cookies by sending a *Set-Cookie* header in the HTTP response. The browser stores the cookie and automatically sends it with future requests to the same domain.

Cookies are often used for authentication, session management, and tracking.

__Types of Cookies -__
- HttpOnly → not accessible via JavaScript (prevents XSS attacks). You cannot set HttpOnly Cookie from javscript, only server can.
- Secure → sent only over HTTPS
- SameSite → controls cross-site request behavior

```jsx
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: userId=42; Expires=Wed, 01 Jun 2026 12:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=Strict
```

Manipulating Cookie in Client-side using Javascript.

```jsx
document.cookie = "userId=42; expires=Wed, 01 Jun 2026 12:00:00 GMT; path=/";
```

_Note - Cookies are sent with every HTTP request, which can impact performance if overused._

---

## Comparison of Storages

| Feature        | localStorage  | sessionStorage   | Cookies      |
| -------------- | ------------- | ---------------- | ------------ |
| Persistence    | Until cleared | Until tab closes | Configurable |
| Size           | ~5–10MB       | ~5–10MB          | ~4KB         |
| Sent to server | ❌ No         | ❌ No          | ✅ Yes       |
| Scope          | All tabs      | Single tab       | Domain-based |


_Note - For larger or structured data, browsers provide IndexedDB, a more powerful storage solution._