---
title: WebSockets - For Real-Time APIs
meta_title: WebSockets for Real-Time APIs | CS Primer
description: Explore WebSockets for real-time APIs. Learn bidirectional communication for dynamic web apps in CS.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

While HTTP is great for request-response communication, but  it struggles with real-time use cases like live chats, multiplayer games or collaborative editors.
That’s where **WebSockets** shine.

## Why WebSockets over HTTP ?

| **Characteristic** | **HTTP** | **WebSocket** |
| --- | --- | --- |
| Communication Style | Half-duplex (one way at a time) | Full-duplex (bidirectional) |
| Connection Type | Stateless, closes after request | Persistent, stays open |
| Connection Lifecycle | New connection per request | Single long-lived connection |
| Message Initiation | Client-only | Both client and server |
| Server Push | Requires workarounds (polling, SSE) | Native support |
| Overhead | Headers sent with each request | One-time handshake, minimal after |
| State Management | Requires external mechanisms (cookies, sessions) | Built-in connection state |
| Best Used For | Regular web requests, CRUD operations | Real-time updates, streaming data |

---

## How WebSockets Work ?

1. The client sends an **HTTP request** with an `Upgrade` header:
    
    ```sh
    GET /chat HTTP/1.1
    Host: example.com
    Upgrade: websocket
    Connection: Upgrade
    ```
    
2. The server accepts and switches protocols:
    
    ```sh
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    ```
    
3. The connection is upgraded from HTTP to **WebSocket**.
4. Both sides can now send and receive messages *asynchronously*, without re-opening the connection.

---

## HTTP workarounds !

Though if you are using HTTP for near real-time apps, following are the workarounds - 

- Short Polling - Client repeatedly asks for updates. Has high latency.
- Long Polling - Client holds request open until update. Delayed responses and HTTP overhead.
- HTTP Streaming - Keeps connection open to stream data. Works but still one-directional.

---

## Conclusion

Despite using TCP like HTTP, WebSockets are more efficient because they eliminate the overhead of re-sending HTTP headers for every message.