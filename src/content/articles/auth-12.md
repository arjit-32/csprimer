---
title: RBAC vs ABAC Authorization
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

After authentication, the next big question is:

> **"What is this user allowed to do?"**

This is the domain of **authorization**.  
Two common models dominate modern systems:

- **RBAC (Role-Based Access Control)**
- **ABAC (Attribute-Based Access Control)**

Both aim to restrict access, but they take very different approaches.

---

## RBAC (Role-Based Access Control)

RBAC is the simpler and most widely used model.  
Users are assigned *roles*, and each role carries a set of permissions.


| Role   | Permissions       |
|--------|------------------|
| User   | Read posts       |
| Editor | Edit articles    |
| Admin  | Manage users     |

Instead of attaching permissions directly to every user:

```text id="r4v8pm"
User → Role → Permissions

Arjit → Admin
John → Editor
Sarah → User
```

The role determines what actions are allowed.


### Implementing RBAC in Express.js

- User logs in
- System loads their role
- Request checks required role
- Access granted or denied

```js
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Forbidden");
    }
    next();
  };
}

app.delete("/users/:id", auth, requireRole("admin"), async (req, res) => {
  res.send("User deleted");
});
```

Only admins can delete users.

---



## ABAC (Attribute-Based Access Control)

ABAC is more flexible. Instead of just roles, it evaluates attributes.
Attributes can belong to:
- User → department, country, clearance level
- Resource → owner, project ID, classification
- Request → method, IP address, endpoint
- Environment → time, device type, location


**How ABAC Works**
Instead of asking *“Is this user an admin?”*
ABAC asks *“Can this user perform this action on this resource under these conditions?”*


### Implementing ABAC in Express.js

```javascript
function canEditDocument(req, res, next) {
  const document = req.document;

  if (document.ownerId !== req.user.id) {
    return res.status(403).send("Forbidden");
  }

  next();
}
```

Here, access depends on user ID vs document owner ID, not role



