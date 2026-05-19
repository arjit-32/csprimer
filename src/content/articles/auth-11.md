---
title: Principles of Least Privelage
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

Modern systems are built assuming something will eventually fail. Maybe a password leaks, a JWT gets stolen or an API key gets exposed. The real question is - *How much damage can happen after that?*

That is exactly what the Principle of Least Privilege (PoLP) tries to solve.

---

## What is Principle of Least Privelage ?

The Principle of Least Privilege (PoLP) is one of the most important security principles in software systems.

The idea is simple:

> A user, service, or application should only have the minimum permissions required to perform its task. Nothing more.

If something gets compromised, limited permissions reduce the amount of damage an attacker can cause.

*Example - If you stay at a hotel, do you need a key to all the rooms or just one where you are staying.*

---

## Why Least Privilege Matters

Imagine a blog application.

A regular user only needs permission to read posts, create comments and edit their own profile. They should not be able to delete databases, manage all users, modify server settings If every user had admin-level access, a single compromised account could destroy the entire system. Least privilege reduces the blast radius of mistakes, bugs, and attacks.

---

## Common Places Where Least Privilege Applies

Least privilege exists at many levels in a system.

1. User Permissions - Different users should have different permissions. Ex - Admins, User etc

2. Database Access - Applications should avoid connecting to databases using highly privileged accounts.

3. API Tokens & Service Accounts - APIs often use tokens with scopes or permissions.

4. Cloud Infrastructure - Modern cloud systems use IAM (Identity and Access Management) policies to control this.

5. Internal Services & Microservices - In distributed systems, services should not trust each other blindly.

---

## Least Privilege in Authentication Systems

Authentication answers:

> "Who are you?"

Authorization answers:

> "What are you allowed to do?"

Least privilege mainly applies to **authorization**.

After identifying a user, the system should grant only the permissions required for that role.

Example:

```text id="z9w4rm"
Admin → manage users
Editor → edit articles
User → read content
```

Not every authenticated user should automatically receive full access.

--- 

## Express Authentication Example

Suppose only admins should delete users.

```javascript
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    next();
  };
}

app.delete(
  "/users/:id",
  auth,
  requireRole("admin"),
  async (req, res) => {
    // delete logic
  }
);
```

The route first checks:
- Is the user authenticated?
- Does the user have enough permissions?

This is least privilege in practice.

---

## JWT Permissions

After learning JWTs, many beginners make this mistake:

```javascript
{
  "userId": "123",
  "admin": true
}
```

Now every service trusts this token as full admin access. Instead, modern systems use granular permissions.

Example:

```javascript
{
  "sub": "123",
  "role": "editor",
  "scopes": [
    "articles:write"
  ]
}
```

This token only allows article-writing access. Not full system control.

---

---

## Conclusion

The Principle of Least Privilege is not just theory it’s a practical safeguard. By limiting permissions at every layer (users, databases, APIs, cloud, services), you reduce the blast radius of any compromise.