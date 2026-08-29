---
title: OAuth 2.0 & OpenID Connect 
meta_title: js
description: js
author: Arjit Sharma
series: auth
categories: ["Development"]
draft: false
year: 2025
---


OAuth is everywhere - “Login with Google”, “Login with GitHub”, mobile app permissions, third-party integrations.

But many developers misunderstand what OAuth actually does.

This article explains **exactly what OAuth does**, **what it does *not*** do, and **how OpenID Connect adds authentication**.

---

## Why OAuth Exists

OAuth was originally designed to solve one problem:

> Users should not have to share their credentials with third-party applications.

Example:

A calendar app wants to access your Google Calendar. Without OAuth, you'd have to give your Google password to the calendar app, which is dangerous because the calendar app can misuse your password (duhh..).

OAuth solves this using **delegated authorization**. 

The user authenticates directly with Google and grants limited permissions to the third-party app. The app never sees the user's password.

OAuth allows:
- delegated access
- limited permissions through scopes
- revocable access
- secure third-party integrations

_Note - OAuth is authorization, not authentication._

---

## The Four Roles in OAuth 2.0

Understanding these roles is important because most OAuth flows are built around them.

| Role | Meaning |
| --- | --- |
| **Resource Owner** | The user (the person with the data) |
| **Client** | The app requesting access (your app) |
| **Authorization Server** | Google/GitHub login system |
| **Resource Server** | API that holds user data (Calendar API, GitHub API) |


Example with Google Calendar:

| Role | Example |
|---|---|
| Resource Owner | User |
| Client | Calendar app |
| Authorization Server | Google Login |
| Resource Server | Google Calendar API |


---

## OAuth Is Authorization, Not Authentication

This is the most important concept in OAuth.  OAuth provides **access tokens**.

An access token only means:

> "The user granted permission to access certain resources."

It does not automatically mean:

- who the user is
- whether the user logged in successfully
- what identity the application should trust

OAuth is fundamentally about **permissions**, not identity. That is why OAuth alone is not a login system.

---

## OpenID Connect (OIDC)

OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0. OIDC adds one important thing:

> An **ID Token**

The ID token is usually a JWT that contains identity information about the authenticated user.

Example payload:

```json
{
  "iss": "https://accounts.google.com",
  "sub": "109238409123840912384", // unique user ID
  "email": "user@gmail.com",
  "email_verified": true,
  "iat": 1680000000,
  "exp": 1680003600
}

```

The ID token acts as proof that:

- the user authenticated successfully
- the identity provider verified the user
- the token was issued by the provider

---

## OAuth vs OIDC

| Technology                | Purpose                              |
| ------------------------- | ------------------------------------ |
| **OAuth 2.0**             | Delegated authorization              |
| **OpenID Connect (OIDC)** | Authentication layer on top of OAuth |
| **Social Login**          | OAuth + OIDC packaged as login       |


---

**Authorization Code Flow (Used for Web Apps)**

This is the main flow used for Google login.

**Step-by-step flow diagram (described)**

![image.png](attachment:ec56ec06-0273-4dbd-a1ad-f7dccd97e659:image.png)

```
[Your App] → redirect user → [Google Login Page]
      The user logs in & consents

[Google] → returns Authorization Code → [Your Backend]
      Backend exchanges code for tokens

[Your Backend] ← Access Token + ID Token + (optional) Refresh Token
      Backend verifies ID Token (JWT)

Backend establishes session/JWT in your system

```

Let’s break it down:

---

**Step 1: Redirect User to Provider**

Your backend generates a URL like:

```
https://accounts.google.com/o/oauth2/v2/auth
?client_id=...
&redirect_uri=...
&response_type=code
&scope=openid email profile
```

Important:

- `response_type=code` → Authorization Code Flow
- Scope **must include `openid`** (that triggers OIDC)
- Add `email profile` to get user info

---

**Step 2: User Logs In & Grants Consent**

Google shows:

- Login screen
- Permissions consent screen

Then Google redirects user back to:

```
redirect_uri?code=XYZ123
```

This `code` is a **temporary one-time authorization code**.

---

**Step 3: Backend Exchanges Code for Tokens**

Your backend sends the `code` to Google:

```
POST https://oauth2.googleapis.com/token
{
  code: "...",
  client_id: "...",
  client_secret: "...",
  redirect_uri: "...",
  grant_type: "authorization_code"
}
```

Google returns:

```json
{
  "access_token": "...",
  "id_token": "...",
  "refresh_token": "...", // optional
  "expires_in": 3600
}
```

Important:

- **Access Token** → for APIs
- **ID Token** → for authentication
- **Refresh Token** → only if offline access is allowed

---

**Step 4: Backend Verifies ID Token**

Your backend must:

1. Decode ID token (it's a JWT)
2. Verify signature using Google public keys
3. Check:
    - issuer (iss)
    - audience (aud)
    - expiry (exp)

If valid → user is authenticated.

---

**Step 5: Backend Creates a Session in Your System**

Google does **authentication**, not your app’s session management.

So your backend still needs to:

- Look up user (by `sub` or email)
- Create user if not exists
- Issue YOUR OWN JWT or session cookie

This is critical:

> OAuth authenticates the user.
> 
> 
> Your app controls authorization and sessions.
> 

---

**Minimal Implementation Sketch (Backend)**

**Redirect Route**

```jsx
app.get("/auth/google", (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=openid%20email%20profile`;

  res.redirect(redirectUrl);
});

```

---

**Callback Route**

```jsx
import axios from "axios";
import jwt from "jsonwebtoken";

app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  const body = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code"
  };

  const tokenRes = await axios.post("https://oauth2.googleapis.com/token", body);

  const idToken = tokenRes.data.id_token;
  const userInfo = jwt.decode(idToken); // decode first

  // normally you verify signature here (recommended)

  // use userInfo.sub as unique Google user ID
  const user = await findOrCreateUser(userInfo);

  // create your own session/JWT
  const appToken = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: "1h" });

  res.json({ token: appToken });
});

```

This completes the authentication.

---

 **OAuth vs OIDC vs "Login with Google" (Clear Distinction)**

| Technology | Purpose |
| --- | --- |
| **OAuth 2.0** | Delegated authorization (access APIs safely) |
| **OpenID Connect (OIDC)** | Authentication layer built on OAuth |
| **Social Login (Google, GitHub)** | OAuth + OIDC packaged as a login solution |

---

**When Should You Use OAuth/OIDC?**

| Use Case | Should You Use OAuth? |
| --- | --- |
| Standard email/password login | ❌ No |
| Login with Google/GitHub/etc | ✔ Yes |
| Access third-party APIs | ✔ Yes |
| Internal employee login | Optional |
