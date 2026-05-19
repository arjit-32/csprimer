---
title: Single Sign-On (SSO)
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

Single Sign-On (SSO) lets users log in once and access multiple applications without re‑authenticating.
Example:
Login once to Google → Access Gmail, YouTube, Drive


## Why SSO Matters

Without SSO:
- Users juggle many passwords
- Frustrating login experience
- Password reuse increases
- Harder identity management
SSO centralizes authentication, improving usability and security.


### Real World Example 

Imagine a company using Teams, Confluence, Jira etc.

*Without SSO:* Employees must log in separately to each service, juggling multiple usernames and passwords.

*With SSO (via Okta or Microsoft Entra ID):* Employee logs in once → all connected apps trust that login. The identity provider handles authentication, and each app creates its own session based on that trusted identity.


---

## Core Idea of SSO

SSO separates responsibilities:

- Authentication -> Identity Provider
- Application Logic -> Individual Apps

**How it Works ?**

- User visits App A → Redirect to IdP → Login → Return authenticated
- User visits App B → Redirect to IdP → Active session detected → Immediate login

Each app creates its own session but trusts the same IdP.

---

## SSO vs OAuth vs JWT

| Concept               | Purpose                         |
| --------------------- | ------------------------------- |
| SSO                   | Login once across apps          |
| OAuth 2.0             | Delegated authorization         |
| OpenID Connect (OIDC) | Authentication layer over OAuth |
| JWT                   | Token format                    |

In modern web apps: SSO is usually implemented using: OAuth 2.0 + OpenID Connect. Tokens are often JWT

---

## Typical SSO Flow (OIDC)

```text
1. User opens application
2. App redirects user to Identity Provider
3. User logs in at IdP
4. IdP verifies identity
5. IdP returns ID Token / Access Token
6. App validates token
7. App creates local session
8. User is authenticated
```

**Important Components**

- Identity Provider: The central authentication server. Its responsibilities include login, MFA, User Management and Token Issuing. *Example - Google, Okta, Auth0, Microsoft Entra ID*
- Service Provider (SP): The application trusting the IdP. Its responsibilities include redirecting user to IdP, verify Tokens, and maintain app sessions. *Example - Your Express.js app*


---

## Two Major SSO Protocols

- SAML → XML-based, older enterprise standard, still common in large corporations.
- OpenID Connect (OIDC) → Modern, JSON/JWT-based, widely used in web appss.

---

## Example Setup

```text
                  ┌─────────────────┐
                  │ Identity Server │
                  │  (Auth Server)  │
                  └────────┬────────┘
                           │
          ┌────────────────┼───────────────┐
          │                                │
   ┌──────▼──────┐                 ┌──────▼──────┐
   │    App 1    │                 │    App 2    │
   │ localhost:3001                │ localhost:3002
   └─────────────┘                 └─────────────┘
```

- Each app has its own session, cookies, backend.
- All apps trust the same IdP.


### Flow

- User opens App1 (localhost:3001) , it says No session found → redirect to Identity Server 
- User logs into IdP, IdP creates auth_session cookie and stores in browser. 
- IdP redirects back to App1, App1 creates its own local session.


- User later opens App2 (localhost:3002) , App2 redirects to Identity Server again.
- IdP sees auth_session already exists so No login screen showed. User is instantly authenticated. 




