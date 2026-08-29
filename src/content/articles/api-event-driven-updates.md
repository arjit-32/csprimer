---
title: Event-Driven Protocols for Asynchronous Updates
meta_title: Event-Driven APIs- CS Guide | CS Primer
description: Understand event-driven protocols. Learn asynchronous updates for scalable API design in web development.
author: Arjit Sharma
series: api
categories: ["System-Design"]
draft: false
year: 2025
---

Event-driven architecture communicate through events such as “payment succeeded”, “order shipped”, or “user created” for data and applications. When an event occurs, producers publish or send an event, and interested consumers receive it asynchronously through a delivery mechanism such as a webhook, WebSocket, Server-Sent Events (SSE), a message broker, or a push-notification service. The key idea is that consumers do not repeatedly poll for changes; instead, updates are delivered when events occur.

In this article lets discuss types of event-driven techniques. 

## Webhooks

An event-driven architectural pattern *(not a protocol)* built on standard HTTP. A source system sends an outbound HTTP POST request to a pre-configured destination URL when an event occurs. *Usecases -  Payment processing notification, order status updates.*


### How it works ?
- Create a receiver endpoint: expose an HTTPS URL that accepts incoming POST requests (for example, /webhooks/orders).
- Register that URL with the source system: paste the endpoint into the provider’s webhook configuration page (for example, Stripe, GitHub, or your internal event source).
- Receive events: when the event occurs, the source system sends an HTTP POST request containing a JSON payload to the registered URL.

This is primarily server-to-server communication. The HTTP request is short-lived: the sender connects, delivers the payload, receives a response (typically 2xx), and closes the connection.

**Important Note:**
A webhook does not push directly into a user’s browser or phone. It pushes into a server endpoint you control (or a provider-controlled endpoint). If a user interface updates instantly afterward, that usually happens through a separate real-time delivery mechanism such as WebSockets, SSE, or a mobile push-notification service.




### How the UI updates after a webhook

```jsx
[Step 1: Webhook]     Your Website Server ───(HTTP POST)───► Teams Server
                                                                 │
[Step 2: WebSocket]   Your Phone/Laptop   ◄───(Active Pipe)──────┘
```

Step 1: The webhook notifies the backend that an event occurred.

Step 2: The backend then forwards the update to connected clients through a persistent channel (WebSocket or SSE) or through a mobile push-notification service.

This separation is important: webhooks are usually server-to-server; real-time UI delivery is usually a different mechanism.

---

## Server-Sent Events (SSE)

A web standard that allows a server to continuously push text-based updates to a client over a single long-lived HTTP connection. Unlike traditional request-response communication, the client establishes the connection once and the server can keep sending new events whenever data changes. SSE also provides built-in automatic reconnection if the connection drops. One limitation is that it supports only text-based data (typically UTF-8) and does not natively support binary data. *Use cases - Live stock prices, sports score updates, news feeds, monitoring dashboards.*

### How it works ?

- The client opens a connection: A browser or application sends a normal HTTP request to a special SSE endpoint. *(e.g., Your stock trading app connects to `/stock-prices/stream`.)*

- The server keeps the connection open: Instead of sending a response and closing the connection, the server keeps the HTTP connection alive. *(e.g., The stock server keeps the connection active throughout the trading session.)*

- The server pushes updates: Whenever new data is available, the server streams it through the existing connection. *(e.g., Every time a stock price changes, the server immediately sends the updated price to the app.)*

- Automatic reconnection: If the network drops or the connection is interrupted, the client automatically attempts to reconnect. *(e.g., If your laptop briefly loses Wi-Fi, the stock app reconnects automatically when the network returns.)*

SSE provides **one-way communication** from the server to the client. If the client needs to send data back, it must use a separate HTTP request.


---

## WebSub (PubSub)

An open publish-subscribe protocol built on HTTP that enables real-time content distribution between publishers and subscribers through an intermediary called a Hub. Instead of repeatedly polling for updates, subscribers receive notifications whenever new content is published. WebSub is useful when a single publisher must distribute updates efficiently to many subscribers.


*Use cases - Blog update notifications, RSS feed subscriptions, news distribution, podcast publishing platforms.*


### Core Components

- **Publisher:** The content producer that creates or updates information for a specific topic. It notifies one or more Hubs whenever new content becomes available.

- **Hub:** The intermediary responsible for managing subscriptions and distributing updates from publishers to subscribers.

- **Subscriber:** The consumer interested in a particular topic. It registers with a Hub and receives notifications whenever the topic is updated.


### How it works ?

- The publisher registers a topic: A content source exposes a topic URL and advertises one or more Hubs. *(e.g., A technology blog exposes a feed for new articles.)*

- The subscriber subscribes: A consumer registers interest in the topic through the Hub. *(e.g., A news aggregation service subscribes to the blog's feed.)*

- The publisher publishes an update: When new content is created, the publisher notifies the Hub. *(e.g., A new article is posted on the blog.)*

- The Hub distributes notifications: The Hub sends update notifications to all subscribers interested in that topic. *(e.g., Every subscribed news reader immediately receives a notification about the new article.)*

This creates a loosely coupled architecture where publishers and subscribers do not need direct knowledge of each other.

> **Note:** While WebSub standardizes publish-subscribe communication over HTTP, it is relatively uncommon in modern backend systems. Today, internal publish-subscribe architectures are more often implemented using technologies such as Apache Kafka, RabbitMQ, and cloud messaging services. WebSub remains most relevant for content syndication, feed distribution, and open-web publishing ecosystems.

---

## WebSockets

A communication protocol that provides a persistent, full-duplex connection between a client and a server. Unlike traditional HTTP, where each request requires a separate response, WebSockets allow both the client and server to send messages independently at any time over the same connection.

*Use cases - Chat applications, multiplayer games, collaborative editing, live dashboards, trading platforms.*

### How it works ?
- The client initiates a WebSocket handshake: The client sends an HTTP request asking to upgrade the connection to the WebSocket protocol. (e.g., A chat application opens a connection to the messaging server.)
- The server accepts the upgrade: If supported, the server responds with a protocol upgrade confirmation and the connection switches from HTTP to WebSocket. (e.g., The chat server accepts the connection and establishes a dedicated communication channel.)
- A persistent connection is established: The connection remains open until either side explicitly closes it. (e.g., The user keeps the chat application open throughout the day.)
- Messages flow in both directions: Both client and server can send messages at any time without waiting for a request. (e.g., Users send messages while simultaneously receiving messages from others.)

This creates a bidirectional communication channel where data can flow freely in either direction.
