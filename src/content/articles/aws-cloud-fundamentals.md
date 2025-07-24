---
title: Fundamentals of Cloud Computing
meta_title: AWS Cloud Computing Fundamentals | CS Primer
description: Learn cloud computing basics with AWS - explore service models (IaaS, PaaS, FaaS, SaaS), deployment options, global infrastructure, and AWS Well-Architected Framework principles for building robust cloud solutions.
author: Arjit Sharma
series: ["aws"]
categories: ["Advanced-Development"]
draft: false
year: 2025
---

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1746107663/cloud_dwom8y.png)

## What is Cloud Computing?

Cloud computing is the on-demand delivery of IT resources - like servers, storage, databases, networking, software - over the internet. In simple terms *“rent services/platform/infrastructure over internet”.*

### Key Concepts:

- **On-Demand Access:** Resources are available when needed, without human intervention.
- **Elasticity:** Scale resources up or down based on demand.
- **Resource Pooling:** Providers use multi-tenant models to serve multiple customers.
- **Pay-as-you-go Pricing:** You’re charged based on usage—no upfront infrastructure investment.

---

## Cloud Service Models

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1746107663/iaas-paas_qquz9g.png)

### 1. IaaS (Infrastructure as a Service)

You rent basic computing resources like virtual machines and storage. You manage most things except the underlying hardware. **Example**: Launching an EC2 instance on AWS.

### 2. PaaS (Platform as a Service)

You just focus on writing and deploying your app - AWS handles the rest. **Example**: Deploying a Node.js app using Elastic Beanstalk.

### 3. FaaS (Function as a Service)

You write code that runs in response to events. You’re only charged while it runs. _Example: A Lambda function that resizes an image when uploaded to S3_.

### 4. SaaS (Software as a Service)

You use fully built apps over the internet. No setup, no deployment. **Examples**: Gmail, Zoom, or AWS WorkDocs.

---

## Deployment Models

### 1. Public Cloud

Services are shared and accessed over the internet. Example: AWS.

### 2. Private Cloud

Cloud infrastructure dedicated to a single organization, can be on-premises or hosted by a provider.

### 3. Hybrid Cloud

Mix of public and private clouds. Great for when you want to use public cloud only during high traffic times.

---

## AWS Infrastructure Basics

Understanding AWS’s global infrastructure is essential for architecting reliable apps.

### Regions

Geographically isolated areas where AWS hosts data centers. Examples: `us-east-1`, `eu-west-1`

### Availability Zones (AZs)

Multiple, physically separate data centers within a region.  They help make your app more reliable and fault tolerant.

### Points of Presence (PoPs)

Locations that serve cached content to users via CloudFront.

### Regional Edge Caches

Extra caching layers between origin and users for less frequently accessed content.

---

## Well-Architected Framework in AWS

Its a set of **guiding principles and best practices** AWS recommends. 6 Pillars of a great AWS architecture are - 

1. **Operational Excellence** - Monitor and evolve systems
2. **Security** - Protect data and systems
3. **Reliability** - Recover gracefully from failures
4. **Performance Efficiency** - Scale with demand
5. **Cost Optimization** - Avoid unnecessary costs
6. **Sustainability -** Minimize environmental impact of your workloads

Checkout more on [AWS website](https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc&wa-guidance-whitepapers.sort-by=item.additionalFields.sortDate&wa-guidance-whitepapers.sort-order=desc)