---
title: Publisher and Subscriber Model
meta_title: Publisher-Subscriber Model Explained  Async Messaging & Loose Coupling in System Design
description: Understand how the Pub-Sub model enables scalable, decoupled microservices communication. Explore its architecture, real-world e-commerce use case, and benefits like asynchronous messaging and fault tolerance.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

Publisher-Subscriber model is a messaging pattern where message senders (publishers) do not send messages directly to specific receivers (subscribers). Instead, messages go through something called a **message broker**, which acts like a middleman. Subscribers just “*subscribe”* to the topics they care about, and the broker sends relevant messages to them.

Note - Think of a messaging queue as the **foundation** (the “*what*”), while Pub-Sub is the pattern (the “*how*”) for exchanging messages.

---

## Why Use Pub-Sub?

Imagine you have tons of microservices talking to each other. If each service tries to connect directly, things get messy. 

Key Advantages - 

- Loose Coupling: Publishers and subscribers don’t need to know each other.
- Asynchronous Communication: No need to wait for responses.
- Reliability: Messages can be stored temporarily, reducing data loss.
- Scalability: You can add more services without changing existing ones.

Disagvantages - 

- Latency: There can be delays between publishing and receiving messages.
- Eventual Consistency: Subscribers may not get data instantly.
- Single Point of Failure: If the broker fails, the whole system could break.

---

## Example: E-Commerce System

Let’s say you're building an online store. A customer places an order, what happens next?

1. **Order Service** (Publisher) - Publishes an *OrderPlaced* event with order details.
2. **Message Broker -** Receives the event and routes it to all interested subscribers.
3. **Subscriber Services Respond**:
    - **Inventory Service**: Updates stock levels.
    - **Payment Service**: Initiates billing.
    - **Notification Service**: Sends a confirmation email or SMS.
    - **Shipping Service**: Prepares the order for delivery.

Thanks to Pub-Sub, these services act independently yet stay in sync, all without needing to directly call one another.
