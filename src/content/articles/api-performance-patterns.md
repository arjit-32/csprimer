---
title: API Optimization & Performance Patterns
meta_title: API Optimization- CS Patterns | CS Primer
description: Learn API optimization. Master performance patterns for fast, scalable APIs in web development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Cool, you have a functional API but are you sure it will be able to handle the load, be optimized for the kind of device it is called from. Lets walk through some practical strategies to improve your API performance.

## Adapting API to Client Needs

APIs can be tailored according to end devices*(phones, laptops etc)* to improve performance.

- **Intermediate Adaption Layer:** We detect client type *(say from headers)* and tailor the responses based on client. *Ex - Netflix*
- **Expandable Fields:** Design API such that client can request expanded version of objects by adding a parameter. *Ex - GET /users?expand=profile,preferences*
- **GraphQL:** A query language for the API to only request the resources we need.

---

## Efficient Data Fetching Patterns

- Short Polling: Client requesting data at regular intervals *(usually < 1 minute)*
- Long Polling: Client stays connected to server until it gets the update or the waiting time is reached *(unlike short polling)*. Also called hanging get.
- WebSockets: Fully duplex communication protocol that runs on single TCP connection.

---

## Frontend Rendering Methods

- Server-Side Rendering (SSR): Generate a complete HTML doc on the server and send it to client as response. On initial load page is static but once the JS file is downloaded then it becomes interactive. This method makes fewer API calls, as data comes bundled with initial HTML.

- Client-Side Rendering (CSR): Browser generates the complete web page, instead of on the server. Multiple API calls are made after page load and also has higher client-side processing.

---

## Resource Hints

Resource hints are instructions that help browser in managing resources *(webpages, images, and even APIs).* 

- **Preloading-** Force download a resource asap as it is crucial to the page.

```jsx
<link rel="preload" href="/api/critical-data">
```

- **Prefetching-** Allows browser to fetch resources that might be needed later and store in browsers cache. Has a lower download priority than preload.

```jsx
<link rel="prefetch" href="/api/secondary-data">
```

- **Preconnect-** Helps browser establish connection to a domain in advance *(establish early TCP connection, complete DNS lookup and Handle TLS negotitations in advance)*

```jsx
<link rel="preconnect" href="https://api.some-service.com">
```

---

## API Gateway

In cases of microservices architecture, clients shouldn’t talk to every service directly. That’s where we use a API Gateway as a central entry point. Its primary job is to -

- Handles routing, caching, auth, and more.
- Improve performance and reduce client complexity.

---

## Debouncing

It is a API optimization technique, where we limits the times an event fires. Imagine you're typing in a search box, so instead of making an API call for every keystroke, debouncing waits until you've finished typing before making the request.

---

## Rate Limiting

It is a constraint mechanism that controls number of requests by using throttling *(discard some of the requests)* to protect system resources.

- To avoid latency by rate limiter a cache can be used.
- Common Algorithms - *Fixed window counter, Token bucket, leaking bucket, sliding window log*

---

## Caching at different layers

A cache acts as a temporary memory store for frequently accessed API responses, using eviction policies like LRU (Least Recently Used), LFU (Least Frequently Used), and MRU (Most Recently Used) to manage storage.

### Caching Layers

- Browser’s has a built in cache.
- CDN Cache → Geographically distributed caching servers that store content closer to users for faster delivery.
- Server side →
    - API Gateway Cache- Stores frequent API responses to avoid redundant processing
    - Web Server Cache- Maintains commonly requested static web pages
    - Database Cache- Stores results of complex, time-consuming queries
    - Distributed Cache- Solutions like **Redis** and **Memcached** for scalable caching across servers

### HTTP Cache Headers

Server sends the HTTP response to the client, it also sends the cache headers in the response. The header *(Cache-Control)* define caching policies like -

- Cacheability: `no-cache`, `no-store`
- Scope: `private`, `public`
- Expiration: `max-age`, `s-max-age`

---

## API Monitoring

Monitoring helps track API performance and identify issues before they affect users.

Types of Monitoring -

| Type | Description |
| --- | --- |
| Synthetic | Automated scripts that simulate user behavior from different locations |
| Real User | Tracking actual user interactions in production |

Key Metrics -

1. Performance Metrics - Requests per minute (RPM), Latency (response time)
2. Reliability Metrics - Availability (uptime), Failure rate

Regular monitoring helps maintain API health and user satisfaction, there are many tools one case use for monitoring like *Prometheus, Datadog etc*
