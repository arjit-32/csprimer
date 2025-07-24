---
title: Communication Patterns in Distributed Systems
meta_title: Communication Patterns in Distributed Systems | CS Primer
description: Discover the communication patterns used in distributed systems. Learn how synchronous and asynchronous communication plays a role in system design in 2025.
author: Arjit Sharma
series: ["distributed"]
categories: ["System-Design"]
draft: false
year: 2025
---

## Data Serialization & Deserialization

Serialization is the process of converting data structures into a format suitable for transmission or storage. Deserialization is the reverse process.

Common Serialization Formats:

- JSON (Javascript Object Notation) - Human readable widely used in web APIs but is larger in size.
- Protobuf - Binary format developed by Google, requires a schema but is efficient and compact.

## Data Transfer Models

Determines how data is sent between distributed components.

**1. Synchronously (Request-Response Model)** 

It is HTTP-based(REST, gRPC) where client sends a request and waits for response. It can cause latency issues.

**2. Asynchronous (Message Driven Model)**

It uses message queues (RabbitMQ, Kafka) or event logs where Producer sends a message without waiting for a response and consumer keeps processing messages at its own pace.

## Communication Models

1. Point-to-Point (P2P)
Direct communication between 2 entities

2. Publish-Subscribe (Pub-Sub)
**Decoupled** communication: Publishers send messages, and subscribers receive them based on topics.