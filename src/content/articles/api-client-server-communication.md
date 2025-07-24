---
title: Client-Server Communication in APIs
meta_title: Client-Server in APIs- CS Guide | CS Primer
description: Master client-server communication in APIs. Learn how clients and servers interact for web applications.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

A  way for devices to interact with each other over network is called client-server communication.

Now that we understand how the Internet works, let’s zoom in on **how computers talk to each other** in the world of APIs. Whether it’s your app hitting a backend service or two microservices exchanging data - it’s all **client-server communication** powered by **API protocols**.

## What’s Client-Server Communication?

At its core, it's simple:

- The **client** is whoever initiates the conversation (like a web browser, mobile app, or a script making an API call).
- The **server** is who responds with the data or functionality (your backend service, database, or cloud function).

They talk over a network (usually the Internet), using **protocols** like HTTP, WebSocket, or RPC. This request-response pattern underlies every API interaction, regardless of the protocol.

---

## Communication Patterns

### 1. Request-Response

Most common pattern where client makes a request, waits for server response. *Example: REST APIs, database queries.*

### 2. Push-Based

Server pushes updates to clients, while client maintains an open connection. *Example: WebSocket, Server-Sent Events.*

### 3. Publish-Subscribe

Clients subscribe to topics/events and server publishes updates to subscribers. *Example: Message queues, event streaming*

