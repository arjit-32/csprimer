---
title: Authentication vs Authorization
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

The issue we are trying to solve is *Who is making the request* and *What are they allowed to do ?*. 

We’ll stay mostly high-level in this write-up and set up the mental model. Implementation details (JWT, hashing, etc.) will come in later articles.

## Authentication

Authentication answers: *“Who are you?”.* It verifies identity.

Examples - Entering username + password or Logging in with Google /  OTP

If you think about Authenticating a person, the common ways are Knowledge based ( like used in phone pins, passwords), Possesion based( like OTP, authenticator apps), Biometric like fingerprints. To know more deeply about different methods available lets look a bit deeper.

### Factors of Authentication

At a conceptual level, authentication methods fall into three categories:

- **Knowledge-based** → Something you know (PINs, passwords)
- **Possession-based** → Something you have (OTP, authenticator apps, smart cards)
- **Biometric-based** → Something you are (fingerprints, facial recognition)


### Common Technical Implementations

Here’s how those factors translate into real-world developer tools:

 
| Method | How It Works | Pros | Cons | Use Cases | Type |
|-----------------|--------------|------|------|----------------| --------------- |
| Session + Cookies | Server stores session ID; client gets cookie. | Simple, mature, widely supported. | Server must manage state; scaling harder. | Traditional web apps | Knowledge |
| JWT (JSON Web Tokens) | Server issues signed token; client stores it. | Stateless, easy to scale, API-friendly. | Token revocation is tricky; storage must be secure. | SPAs, mobile apps, microservices | Knowledge |
| OAuth2 / OpenID Connect | Delegates authentication to providers (Google, GitHub). | No password handling; trusted providers. | More complex setup; dependency on third-party. | Social login, enterprise SSO | Posession |
| API Keys | Client sends a static key with requests. | Simple for service-to-service auth. | Not secure for user auth; rotation is hard. | Internal APIs | Posession |
| Device-level biometrics | Fingerprint, FaceID, Windows Hello. | Strong identity assurance. | Requires hardware support; privacy concerns. | Mobile apps, secure enterprise systems | Biometric |

---

## Authorization

Authorization answers: *“What are you allowed to do?”*

Example - A regular user can update only their profile, but an admin can update everyone’s.

### Common Authorization Models

| Model | Meaning | Example |
| --- | --- | --- |
| **Role-Based Access Control (RBAC)** | Users have roles, and roles define permissions | `admin`, `editor`, `viewer` |
| **Attribute-Based Access Control (ABAC)** | Decisions based on attributes (user, resource, environment) | Only users from HR can view HR documents |
| **Permission-Based / ACL** | Fine-grained rules per user/resource | File systems: user X can read, user Y can write |
| **Policy-Based** | Explicit policies define rules | AWS IAM policies |