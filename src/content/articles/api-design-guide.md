---
title: Complete Guide to API Design
meta_title: API Design- Complete Guide | CS Primer
description: Master API design. Learn best practices for creating scalable, user-friendly APIs in software development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Designing an API is not just about creating endpoints - it’s about making intentional decisions about how an API will allow different software components to interact and exchange data with one another. 

## API Integration Approaches

Depending on your system’s maturity and goals, you can introduce an API in three ways:

- **🔩 Bolt-On Strategy**  - Build an API for existing system. It’s quick, but existing tech debt can leak through.
- **🌱 Greenfield Strategy** - Build a brand new API from the ground up. Can use newer technologies.
- **🎭 Facade Strategy** - Add a new API layer in front of a legacy system, replacing it piece by piece over time without downtime.

---

## Choosing the Architecture

As discussed in earlier articles, each architecture style is meant for different kind of communication.

| Style | Type | Best For | When to Use |
| --- | --- | --- | --- |
| **REST** | Architectural Style | CRUD operations, resource-focused services | Standard web/mobile APIs |
| **GraphQL** | Query Language & API Style | Fine-grained client control, varied data needs | Mobile apps, dashboards, data-heavy UIs |
| **gRPC** | Protocol & Framework | High-performance, service-to-service calls | Microservices, internal APIs, streaming needs |

In most of the cases we are dealing with REST api style, but other protocols and styles include -

- SOAP: XML-based protocol for enterprise systems
- WebSocket: For real-time bidirectional communication
- SSE (Server-Sent Events): For server to client streaming
- WebHooks: For event-driven HTTP callbacks

### Choosing the Right Data Format

Once your architecture is chosen, the data format follows naturally:

- If you're using **REST →** JSON is used mostly because of readability in case of public APIs, though other types(XML, YAML) are allowed as well. Binary data is sent via `multipart/form-data` and file references via URLs in JSON response.
- GraphQL → A query language, the results we get are in JSON. Also similar for binary data and Files *(multipart forms and urls in json)*.
- If you're using **gRPC →** Protocol Buffers (Protobuf) is the only choice and is efficient for service to service communication.

`Note` - For any architecture, binary data (files, images, videos) should be handled through dedicated upload endpoints and referenced via URLs in the response payload.

### Choosing the HTTP Protocol Version

When using REST (or HTTP-based GraphQL):

| HTTP Version | When to Use |
| --- | --- |
| **HTTP/1.1** | Simple request-response, |
| **HTTP/2** | Needed for multiplexing or server push (e.g., search, content feeds) |
| **HTTP/3** | Ultra-low latency applications (e.g., real-time games or video APIs) |

---

## API Versioning

You will need versioning as your API grows. Following are versioning strategies we can use -

| Method | Example |
| --- | --- |
| URL path | `/v1/tasks` |
| Header-based | `Accept: application/vnd.api.v2+json` |
| Hostname | `api.example.com` vs `v2.api.example.com`  |

Most of the times, we would be using URL path strategy as it is easier to implement and highly visible. 

Header-based keeps our URL clean but more complex to implement. 

Hostname gives complete API isolation but DNS overhead and more complex.

---

## Key Things to Remember

### Security

APIs often expose sensitive functionality. At a minimum, you should handle: **Authentication (AuthN)** - Verify *who* the user is and **Authorization (AuthZ)** which checks *what* the user is allowed to do.

Common Security Patterns are OAuth for delegated access (e.g., “Log in with Google”) or other common ways in APIs is Keys for public/limited use.

### Validation & Prototyping

Before you commit to full development, use a microframework (e.g., hapi.js, FastAPI) to mock endpoints. Return static responses and validate routes, methods, and URL patterns. This approach reduces rework and enables frontend/backend teams to work in parallel.

### Evolving Your API Gracefully

A well-designed API should evolve *without breaking clients*.

- Introduce new endpoints or parameters without removing old ones.
- In case of REST APIs introduce filtering so clients can ask for what they exactly need.

---

## Summary

A well-designed API isn’t just functional  it’s intuitive, scalable, and evolves without friction. By making the right choices early on from architecture and data formats to security and versioning you ensure your API stands the test of time.