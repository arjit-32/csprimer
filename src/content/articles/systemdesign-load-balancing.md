---
title: Load Balancing
meta_title: Load Balancing in System Design  Algorithms, Consistent Hashing & OSI Layers
description: Master load balancing techniques—from Round Robin and IP Hash to Consistent Hashing and Layer 4 vs Layer 7 models. Learn how systems scale and stay resilient by distributing traffic intelligently.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

Load balancing is a critical technique used to distribute workloads evenly across multiple servers, ensuring no single server is overwhelmed. This improves system performance, fault tolerance, and scalability. Load balancers, which can be hardware devices or software applications, play a central role in managing traffic distribution.

## Hash-Based Load Balancing

Requests are mapped to servers using a hash function.

```jsx
*server = hash_function(key) % N

//* N is the number of servers
// key can be request-id , user-id
```

### Implementing a Hash-based load balancing

```jsx
const servers = ['http://server1.com', 'http://server2.com', 'http://server3.com'];
const key = 'user123';
const serverIndex = hashFunction(key) % servers.length;
console.log(`Route to: ${servers[serverIndex]}`);
```

Problem with this is that when we add or remove a server, value of *N* changes which results in existing keys to be remapped thereby resulting in lots of data movement and cache invalidation. 

---

## Consistent Hashing

Both servers and keys are mapped to a hash ring. Requests are routed clockwise to the nearest server. Adding or removing a server only affects a small portion of keys.

*Virtual Nodes in consistent hashing -* 

To ensure even distribution of keys, each physical server can be represented by multiple virtual nodes on the ring. This is helpful when number of servers are small.

---

## Load Balancing Algorithms

- Round Robin - Requests are sent to servers in a circular order.
- Weighted round-robin - Assigns weights to servers based on their capacity, prioritizing more powerful servers.
- Least connections - Routes traffic to the server with the fewest active connections.
- IP Hash - Routes requests based on the client’s IP address, ensuring consistent server selection for the same client.
- URL Hash - Maps request to server based on URL requested.

*Note - A visualizer to check different algorithms - https://samwho.dev/load-balancing/*

---

## Types of Load Balancers 

### Based on OSI Model

Load balancers operate at different layers of the OSI model, determining how they process and route traffic.

- Layer 4 Load Balancer - Operates at the transport layer (Layer 4) of the OSI model, routing traffic based on network information such as IP addresses, ports, and protocols (e.g., TCP, UDP). It does not inspect the content of the data (e.g., HTTP headers). *Example - AWS ELB, HAProxy or NGINX in TCP mode*
- Layer 7 Load Balancer - Operates at the application layer (Layer 7), routing traffic based on content, such as HTTP headers, URLs, cookies, or application data. It can make intelligent routing decisions based on the request's content. *Example - AWS ALB, NGINX or HAProxy in HTTP mode*

### Based on State Management

- Stateful Load Balancer - A stateful load balancer maintains information about the client’s session and ensures that subsequent requests from the same client are routed to the same backend server (also known as session persistence or sticky sessions)
- Stateless Load Balancer - A stateless load balancer does not maintain any information about the client’s session or previous requests. The backend server or application is responsible for maintaining session state, if needed (e.g., via cookies, tokens, or a shared database)

*Note - Sticky sessions can be also achieved by stateless LB using techniques like source IP hashing or cookies.*

### Based on Deployement Model

- **Hardware Load Balancing -** A physical appliance dedicated to load balancing, installed on-premises in a data center. Though better performance but is expensive. *Example - F5 BIG-IP, Citrix ADC*
- **Software Load Balancing -** A software based solution running on general-purpose servers or virtual machines, either on-premises or in the cloud. *Example - NGINX, HAProxy, AWS Elastic Load Balancer (ELB).*

---

## Conclusion

Apart from routing traffic, load balancers also provide other features like *health checks, TLS termination* and *Service discovery*. They enhance application scalability and reliability by intelligently distributing workloads across servers.