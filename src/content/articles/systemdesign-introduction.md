---
title: Introduction to System Design
meta_title: System Design Introduction | Scalable Architecture Explained with Pizza Analogy
description: Explore the fundamentals of system design through a relatable pizza shop analogy—covering scaling strategies, resilience, microservices, distributed systems, and agile architecture principles.
author: Arjit Sharma
series: system-design-foundation
categories: ["System-Design"]
draft: false
year: 2025
---

## The Pizza Shop Analogy

Imagine we run a pizza shop. It starts becoming successful and our daily customers start to increase, now what will you do ? Expand or Give poor service ? This is what system design is ! 
Let’s explore foundational system design concepts through this analogy -

- **Vertical Scaling -** Ask a chef to work faster or smarter.
![vertical-scaling](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372103/vertical-scaling_wephum.webp)
- **Pre-processing & Cron Jobs** - Prep the pizza dough in advance during off-peak hours.
![pre-processing](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372355/Screenshot_2025-07-24_212100_zfq0qs.webp)
- **Resilience via Backup** - Keep a backup chef ready.
![resillience](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372355/Screenshot_2025-07-24_212105_mhyifq.webp)
- **Horizontal Scaling** - Hire more chefs.
![horizontal-scaling](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372354/Screenshot_2025-07-24_212109_ko0i74.webp)
- **Microservices Architecture** - Specialize! Two chefs handle pizzas, one handles garlic bread. Route orders based on expertise.
![microservice](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372354/Screenshot_2025-07-24_212115_ssc7am.webp)
- **Distributed Systems** - Open more branches of the pizza shop. Route orders to the nearest store. This is partitioning by geography.
![distributed-systems](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372354/Screenshot_2025-07-24_212122_wa0gzp.webp)
- **Load Balancing** - Use a central system to route customer orders to the shop with the shortest wait time.
![load-balancing](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372355/Screenshot_2025-07-24_212126_ih2wln.webp)
- **Decoupling** - Delivery agents operate on their own system. Their work is independent of the pizza shop internals.
![decoupling](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1753372354/Screenshot_2025-07-24_212131_tao7eu.webp)
- **Logging & Metrics** - Track orders, delays, ingredients. Find patterns, improve quality.


*Disclaimer - This analogy was given by [Gaurav Sen](https://youtu.be/SqcXvc3ZmRU?si=m9e2S7GWnHJ5C5Bw), by far the best explanation for system design.*

---

## What is System Design ?

System design is the process of defining components data flows, APIs, and integrations to build large-scale systems that meet a specified set of functional *(e.g., order pizza, payments)* and non-functional requirements *(e.g., 99.9% uptime, low latency).*

### Phases in design process

1. Requirement Analysis - Identify functional requirements *(e.g., order pizza, payments)* and non-functional requirements *(e.g., 99.9% uptime, low latency)*.
2. System Decomposition - Break system into components *(e.g., frontend, api, databases, external services etc).*
3. Architecture Design - Define how components interact *(e.g., communication patterns-REST,gRPC, data flows and storage decisions).*
4. Technology Choices - Select techn-stack based on requirements.
5. Make a HLD(High level design) diagram.

### System Design in Agile Methodology

In Agile, you start building quickly and deliver in small increments and design evolves as the product grows. This means there is no grand design phase, just start with enough architecture, ex- just one database but keep in mind the awareness that this needs to scale. Iteratively keep refining the design


