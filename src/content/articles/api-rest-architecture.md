---
title: REST - Representational State Transfer
meta_title: REST API Design- CS Guide | CS Primer
description: Master REST APIs. Learn Representational State Transfer principles for scalable web app development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

REST isnt a protocol or standard, it is a **architectural style** defined by constraints. It focuses on *resources*, their *state*, and how that state is transferred over a network *(typically via HTTP as HTTP fulfills its constraints)*

**REST Concept →**

- Resource: Anything that can be named (documents, services, collections)
- Representation: The data format sent (e.g., JSON, XML) - a snapshot of the resource's state

---

## REST Architectural Constraints

1. **Client-server architecture** - Client manages user interface while server manages data storage and logic.
2. **Statelessness** - Each request is independent and hence no client context or information can be stored on server between requests.
3. **Cacheability** - All REST responses must be marked with cacheable or not.
4. **Layered System** - Client cannot know whether its directly connected to server or intermediatory layers *(e.g., DNS lookups, Load balancer, Caching servers, logging, audit trails, Authentication & Authorization)*
5. **Code on demand** *(Optional)* - Server can send executable code to Client.
6. **Uniform Interface** - 
    - Resource identification via URI (e.g., `/users/1`)
    - Resource manipulation through representations (e.g., JSON/XML)
    - Self-descriptive messages (method + headers + body)
    - Hypermedia as the Engine of Application State **(HATEOAS)** - Client interacts with the application entirely through hypermedia (links) provided dynamically by the server.

---

## REST Requests

Each REST request typically includes:

- HTTP method *(GET, POST, PUT, etc.)*
- URI to identify the resource
- Headers *(e.g., Content-Type, Authorization)*
- Body *(for methods like POST/PUT)*

### Example

```json
POST https://reqres.in/api/users
Content-Type: application/json

{
  "name": "arjit",
  "job": "engineer"
}
```

---

## REST Response

Responses include:

- Status code *(e.g., 200 OK, 404 Not Found)*
- Headers
- Body *(if applicable)*

### HTTP Status Codes

```json
1xx   Information

2xx   Success
	200 OK
	201 Created
	202 Accepted (Action has started) 
	204 No Content

3xx   Redirection
	301      Moved Permanently
	302/303	 Found at this other URL
	307      Temporary Redirect
	308      Resume incomplete or Permanent Redirect

4xx   Client Error
	400 Bad Request
	401 Unauthorized
	403 Forbidden
	404 Not Found
	405 Method not Allowed

5xx   Server Error
	500 Internal Server Error
	502 Bad Gateway
	503 Service Unavailable
```

---

## Why APIs Use REST Over HTTPS

REST over HTTP *(or more specifically, HTTPS)* became popular because:

- **Built on familiar infrastructure -** Works with proxies, CDNs, firewalls, and load balancers
- **Browser-compatible -** Native support in JavaScript for calling REST endpoints
- **Firewall-friendly -** Uses standard ports: *80* (HTTP), *443* (HTTPS)
- **Protocol evolution -** HTTP/2 and HTTP/3 improve performance (multiplexing, compression) without changing the REST interface