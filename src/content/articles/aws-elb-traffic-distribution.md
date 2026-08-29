---
title: AWS Elastic Load Balancer (ELB) for Developers
meta_title: AWS Elastic Load Balancer for Developers | CSPrimer
description: Build resillient applications using load balancer by AWS called Elastic load balancer. Create your own scalable application.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

When your app starts to grow, one server won’t cut it. You need to balance traffic across multiple servers, handle traffic spikes, and stay online even if some parts fail. That’s where *AWS Elastic Load Balancer (ELB)* comes in.

## What Is ELB?

*Elastic Load Balancer (ELB)* is a managed AWS service that automatically spreads incoming traffic across multiple targets like EC2 instances, containers, or IPs. Its a traffic controller for your webapps.

When to Use ELB:

- Scale your app across multiple EC2 instances
- Handle sudden surges in traffic
- Increase fault tolerance and uptime

---

## How ELB Works

- **Traffic Distribution**: When a request comes to your app, ELB *distributes* it to healthy targets based on the routing rules and health checks.
- **Health Checks**: It continuously checks if your targets are healthy, and only routes traffic to healthy instances.
- **Auto Scaling Integration**: ELB integrates with Auto Scaling to automatically scale the number of instances in your pool as traffic increases or decreases.

### Key Concepts in ELB (Quick Reference)

| Concept | Description |
| --- | --- |
| Target Group | A group of targets (EC2 instances, Lambda functions, etc.) that the load balancer routes traffic to. |
| Listener | A process that checks for connection requests (e.g., HTTP on port 80). |
| Routing Rules | Determines how requests are forwarded based on conditions (e.g., host-based routing). |
| SSL Termination | ELB can handle the SSL handshake for secure communication, offloading the EC2 instances. |

---

## Types of Load Balancers

| Type | Best For | Layer |
| --- | --- | --- |
| **Application Load Balancer (ALB)** | HTTP/HTTPS apps with smart routing *(e.g., path-based)* | Layer 7 |
| **Network Load Balancer (NLB)** | High performance TCP/UDP traffic | Layer 4 |
| **Classic Load Balancer (CLB)** | Legacy or simple use cases | Layer 4 & 7 |

---

## Scaling with ELB

*Elasticity* is the key benefit of ELB. Whether you are running a few EC2 instances or hundreds of them, ELB can handle *massive fluctuations in traffic* while maintaining *high availability*.

- As traffic increases, the load balancer adds instances to the target group.
- If traffic decreases, ELB gracefully removes instances.

**ELB + Auto Scaling Group = True Elasticity** - It lets you add or remove EC2 instances automatically based on demand and keep traffic flowing smoothly, even during heavy load or failure.

---

## Setting Up an Application Load Balancer (ALB)

**Step 1: Create a Target Group**

- Go to the *EC2 > Target Groups* section.
- Choose targets (like EC2 instances).
- Set a *health check path* (e.g., /health).

**Step 2: Create the ALB**

- Choose *Internet-facing* (for public apps).
- Add listeners (usually HTTP 80 or HTTPS 443).
- Attach to at least two *subnets* in different availability zones.
- Assign a *security group* to allow traffic.

**Step 3: Register Targets**

- Add your EC2 instances to the target group.

**Step 4: Test It!**

- Open the *ALB DNS name* in a browser to confirm traffic is being load balanced.
