---
title: Message Queues
meta_title: Message Queues Explained  Decoupling, Asynchronous Workflows & Ordering Models
description: Learn how message queues enable decoupled, fault-tolerant communication between microservices. Explore ordering models and real-world examples like signup workflows using RabbitMQ, Kafka, and Amazon SQS.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

A system that allows different parts of an application or different applications to communicate with each other by sending messages. It acts as a buffer between services, ensuring smooth, decoupled interactions and reliable message processing.

## Why Use a Message Queue?

Imagine a distributed application with multiple servers handling various tasks. If one server crashes mid-task, you'd risk losing data. Storing tasks in a file or database is an option but it demands constant polling, leading to performance issues. A message queue solves this elegantly. Popular examples of messaging queues are *RabbitMQ, Amazon SQS* and *Kafka.*

Key Advantages -

- Decoupling of services
- Asynchronous communication (no need for both ends to be online simultaneously)
- Load balancing
- Reliability and fault tolerance
- Scalability

---

## Example: Email Signup Workflow

- The Signup Service receives a new user registration and sends a message to the Email Queue.
- The Email Service consumes the message and sends a welcome email to the user.
- Meanwhile, the Analytics Service picks up the same message from a different queue to log the signup event.

Each service works independently, allowing the system to remain responsive and scalable even if email delivery or analytics take extra time.

---

## Message Ordering Models

| Model | Description |
| --- | --- |
| **Best-effort ordering** | Messages are queued in the order they're received (not guaranteed) |
| **Strict ordering** | Message sequence is tightly preserved, useful for ordered workflows |

---

## Conclusion

Whether it's handling requests, notifications, or critical backend events, message queues makes the modern microservice architecture possible.