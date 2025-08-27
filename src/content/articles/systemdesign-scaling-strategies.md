---
title: Vertical and Horizontal Scaling
meta_title: Vertical vs Horizontal Scaling  System Design Explained with Netflix Case Study
description: Understand the difference between vertical and horizontal scaling in system architecture. Learn how Netflix overcame scaling challenges using distributed servers, microservices, and AWS cloud migration.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

Scaling is how businesses handle increased demand on their systems. Whether you're running a website, an app, or a service, scaling ensures your system can handle more users or data without crashing. 

## Vertical Scaling (Scaling Up)

![vertical-scaling](https://res.cloudinary.com/dwa6rcttw/image/upload/v1753696243/vertical-scaling_t5yu1y.webp)

Vertical scaling means making a single machine more powerful, adding more RAM, faster procesor, bigger hard-drive.

Advantage - 

- Easy to implement.
- No need to change your application.

Disadvantage -

- Limited by the maximum capacity of the hardware.
- Can get expensive as you scale up.

---

## Horizontal Scaling (Scaling Out)

![horizontal-scaling](https://res.cloudinary.com/dwa6rcttw/image/upload/v1753696243/horizontal-scaling_xbj7tu.webp)

Horizontal scaling means adding more machines to share the workload. Instead of upgrading one server, you add more servers and distribute the traffic between them.

Advantage -

- No limit to how much you can scale.
- Reduces the risk of a single point of failure.

Disadvantage -

- More complex to set up.
- Requires changes to your application (e.g., making it stateless).

---

## Case Study

Initially, Netflix relied on vertical scaling by upgrading its on-premises servers to handle growing traffic. However, this approach proved costly and limited, especially during a major database failure in 2008. To overcome these challenges, Netflix transitioned to horizontal scaling by migrating to AWS.

 Over time, they further optimized their system with a microservices architecture and their own CDN, Open Connect, showcasing how horizontal scaling can support massive global growth compared to the constraints of vertical scaling.