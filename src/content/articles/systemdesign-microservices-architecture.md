---
title: Microservices Architecture
meta_title: Microservices Architecture Explained  Design, Communication & Fault Handling
description: Learn how microservices break applications into scalable, independent units. Explore migration strategies, inter-service communication, service discovery, fault tolerance, and monitoring in modern system design.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

Microservices are a modern architectural approach to building scalable and maintainable applications. Unlike monolithic systems, microservices break down an application into smaller, independent services, each focused on a specific business function.


| **Monolith** | **Microservice** |
| --- | --- |
| Single, unified application with all components tightly coupled. | Modular architecture with independent, loosely coupled services. |
| Scales as a single unit, often requiring more resources for entire app. | Scales individual services independently, optimizing resource use. |
| Simpler to develop initially, but complex to maintain as codebase grows. | Complex to set up, but easier to maintain and update individual services. |
| Single deployment, higher risk of downtime if updates fail. | Independent deployments, enabling continuous delivery with minimal downtime. |
| Uses simpler load balancing (often stateless) for the entire application. | Requires advanced load balancing (often Layer 7) to route to specific services. |
| Small apps, legacy systems, or projects with limited team resources. | Large-scale, distributed apps like Netflix or Amazon, needing flexibility. |

This table highlights how monoliths suit simpler, unified systems, while microservices excel in scalable

---

## Migrating from Monolith to microservice

Migrating to microservices is a gradual process. It should be done when your team scales so that different teams can work on different things.

Instead of breaking the entire monolith into microservices at once, start by extracting new features or functionalities into separate services. *Example -* If you’re adding a chat feature, build it as a microservice and make network calls from the monolith to the chat service.

---

## Communication in Microservices

Microservices need to communicate with each other to function as a cohesive system.

1. **Request-Response:** Services communicate synchronously using HTTP/REST or gRPC. For example, the order service might call the payment service to process a transaction.
2. **Messaging Queues:** Asynchronous communication using tools like RabbitMQ or Kafka. For instance, the order service might publish an event to a queue, and the inventory service consumes it to update stock levels.
3. **Batch Messaging:** Periodic data exchange between services, often used for analytics or reporting.

---

## Service Discovery and Heartbeats

In a microservice environment, services need to locate and communicate with each other dynamically. This is where service discovery comes in. When a new service starts, it registers itself with a service registry *(e.g., Consul, Eureka)*. The registry keeps track of available services and their locations.

Heartbeats are periodic signals sent by services to indicate they are healthy and operational. If a service stops sending heartbeats, it is considered unavailable, and the system stops routing traffic to it.

---

## Cascading Failures

Cascading failures occur when the failure of one service leads to the failure of others, eventually bringing down the entire system. For example, if the payment service crashes, the order service might become overloaded with retries, causing it to crash as well.

Solutions - 

- *Pre-Scaling or Auto-Scaling:* Ensure services have enough capacity to handle sudden spikes in traffic.
- *Circuit Breakers:* Temporarily stop sending requests to a failing service to prevent overload.
- *Rate Limiting:* Limit the number of requests a service can handle. For example, if a service can handle 1,000 requests per second, the 1,001st request receives a "Service Unavailable" error.

---

## Logging and Monitoring

Logging and monitoring become specially important in microservices. It is essential for debugging and performance optimization. Each service generates its own logs, which need to be aggregated and analyzed centrally. *Example - Using a logging system like ELK Stack (Elastisearch, Logstatsh, Kibanba) and for monitoring Prometheus/Graffana can be used.*