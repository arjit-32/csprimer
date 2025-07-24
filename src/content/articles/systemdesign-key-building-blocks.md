---
title: Other essential building blocks in System Design
meta_title: System Design Building Blocks  DNS, Sequencers, Monitoring, KV & Blob Stores
description: Explore essential components in system design beyond databases—learn how DNS, sequencers, distributed monitoring, key-value stores, and blob storage support scalable, reliable applications.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

In system design, while components like databases and load balancers form the core, other building blocks*(KV stores, blob stores etc)* are crucial to know as well. We will go over them in brief in this article.

## Domain Name Server (DNS)

DNS translates domain names (e.g., [csprimer.in](http://example.com/)) into IP addresses, acting as the internet’s phonebook.

- Routes user requests to the appropriate servers
- Enables load balancing by mapping domains to multiple IPs
- Supports failover mechanisms through health checks

**Example -**

When you buy a domain like [*csprimer.in](http://csprimer.in)* from GoDaddy, Google Domains, or Namecheap, they typically provide DNS management. Your Internet Service Provider (ISP) also uses DNS to resolve websites you visit. If you want to customize DNSsay, to point your domain to a server on AWS—you can edit DNS records (like A, CNAME, or TXT) through your registrar’s dashboard.

---

## Sequencer

A Sequencer generates unique, ordered identifiers or sequences in distributed systems, ensuring consistency across nodes.

**Example -**

In a distributed system like WhatsApp, messages may be processed by servers in different regions, which introduces challenges in maintaining a consistent order of messages across clients. A sequencer ensures that each message gets a globally unique and time-ordered ID, preserving the correct sequence of messages as perceived by users.

---

## Distributed Monitoring

Distributed Monitoring tracks metrics, health, and performance across distributed systems, providing real-time insights.

**Example -** 

You run a web service with multiple microservices. To know which service is slow or misbehaving, you integrate tools like **Prometheus**, **Grafana**, or **Datadog** to track metrics such as latency, memory, or traffic.

---

## Logger

A Logger records system events, errors, and activities in a structured format for debugging and auditing.

**Example -**

Suppose you deploy a web app on **AWS**. If something crashes, your Logger *(e.g., Logstash, Fluentd, Winston, or ELK stack)* records the error with timestamp, service name, and the line of code that failed.

---

## Key-Value Store

A Key-Value (KV) Store is a NoSQL database storing data as key-value pairs, optimized for fast reads and writes. It’s simple, scalable, and often in-memory for low-latency access.

**Use Cases:** Caching user sessions, storing configuration data, or real-time analytics like leaderboards.

---

## Blob Store

A Blob Store manages large, unstructured data (e.g., images, videos, backups) as binary objects. It’s designed for durability and cost-effective storage.

**Use Cases:** Storing user-uploaded media, archiving logs, or hosting ML model artifacts.