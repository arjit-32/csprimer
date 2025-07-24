---
title: Event-Driven Protocols for Asynchronous Updates
meta_title: Event-Driven APIs- CS Guide | CS Primer
description: Understand event-driven protocols. Learn asynchronous updates for scalable API design in web development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Event-driven architecture centers around events for data and applications. Client gets data whenever an event is triggered in application without requesting server. This provides asynchronous environment. 

Types of event-driven techniques are - 

## Webhooks

One-way event driven pattern*(not a protocol)* based on HTTP. Server pushes data to pre-configured URLs when events occur. *Usecases -  Payment processing notification, order status updates.*

---

## Server-Sent Events (SSE)

Continuous data streaming from the server to the client over a persistent connection. It has automatic reconnection, but one downside is that it doesn’t have support for binary data.. *Example - Stock Applications for real time updates of the stocks*

---

## WebSub (PubSub)

Decentralized publish-subscribe protocol used for decoupling a application.  Ideal when multiple clients require updates from same producers. 

*Publisher* - Content producer publishes the specified topic event information to the defined Hubs.

*Hub* - Middleman between publisher and subscriber. 

*Subscriber* - Consumer receives update for particular topic from subscribed Hubs

---

## WebSockets

Full duplex, bi-directional protocol used for real-time communication we already discussed about.
