---
title: Communication Patterns in Distributed Systems
meta_title: Communication Patterns in Distributed Systems | CS Primer
description: Discover the communication patterns used in distributed systems. Learn how synchronous and asynchronous communication plays a role in system design in 2025.
author: Arjit Sharma
series: distributed
categories: ["System-Design"]
draft: false
year: 2025
---

Distributed systems often need to exchange data between services running on different machines, platforms, or programming languages. To make this possible, data must be converted into a transferable format.


## Data Serialization & Deserialization

- Serialization is the process of converting an in-memory data structure into a format suitable for transmission or storage.

- Deserialization is the reverse process of reconstructing the original data structure from the serialized format.


### Common Serialization Formats

**JSON (JavaScript Object Notation)**
- Human-readable and easy to debug.
- Widely used in REST APIs and web applications.
- Language-independent and supported by virtually every programming language.
- Larger payload size compared to binary formats, resulting in higher network overhead.

**Protocol Buffers (Protobuf)**
- Compact binary serialization format developed by Google.
- Requires a predefined schema (.proto files).
- Faster serialization and deserialization than JSON.
- Reduces bandwidth usage and is commonly used with gRPC.

Choosing the right serialization format involves balancing readability, performance, and compatibility requirements.

---

## Data Transfer Models

Data transfer models define how services communicate and exchange information in a distributed system.

### Synchronous Communication (Request–Response)

It is HTTP-based(REST, gRPC) where client sends a request and waits for response. It can cause latency issues.

Common technologies include:
- HTTP/REST APIs
- gRPC
- GraphQL

Example: A frontend application calling a user-service API to fetch profile information.

### Asynchronous (Message Driven Model)

It uses message queues (RabbitMQ, Kafka) or event logs where Producer sends a message without waiting for a response and consumer keeps processing messages at its own pace.

Common technologies include:
- RabbitMQ
- Apache Kafka
- Amazon SQS
- NATS

Example: An e-commerce service publishing an OrderCreated event that is consumed by inventory, payment, and notification services.

---

## Communication Models

Communication models describe how messages are routed between participants in a distributed system.

### Point-to-Point (P2P)
In a point-to-point model, a message is sent directly from one sender to one receiver.

Characteristics

- One producer → one consumer.
- Simple routing and processing.
- Commonly used in task queues and job-processing systems.

Example: A payment processing worker consuming jobs from a queue.

### Publish-Subscribe (Pub-Sub)

In the publish-subscribe model, publishers send messages to a topic, while subscribers receive messages for topics they are interested in.

Characteristics

- Publishers and subscribers are decoupled.
- A single message can be delivered to multiple consumers.
- Supports event-driven architectures.

Example: A user registration event triggering email, analytics, and auditing services simultaneously.
