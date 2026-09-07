---
title: Introduction to the Network Layer - Forwarding, Routing & Services
author: Arjit Sharma
meta_title: Network Layer Explained  IP Addressing, Forwarding & Routing in Internet
description: Discover how the Network Layer enables host-to-host communication across the Internet using IP, routing, and forwarding. Learn about data vs control planes and why best-effort delivery matters.
series: cn
categories: ["Core-CS"]
---

The Network Layer is like the postal service of the Internet its mission is to deliver data packets from one device to another, even if they’re separated by continents and multiple networks. 

At its core, this layer is responsible for *host-to-host communication across interconnected networks*.

## What Does the Network Layer Do?

The Network Layer is responsible for:

- *Logical addressing* of hosts using IP addresses
- *Routing* packets toward their destination
- *Forwarding* packets to the next hop
- Delivering packets across multiple interconnected networks

The **Internet Protocol (IP)** is the backbone protocol, with two major versions: *IPv4* and *IPv6*.

---

## Forwarding vs Routing

These two terms are often confused, but they describe different operations:

| **Term** | **Meaning** |
| --- | --- |
| **Forwarding** | Moving a packet from a router's input interface to the appropriate output interface |
| **Routing** | Determining the paths that packets should take through the network |

**Forwarding is a local, per-packet operation.** A router examines a packet's destination IP address and uses its forwarding table to determine where to send it next.

**Routing is a network-wide process.** Routing protocols exchange information and calculate paths so that routers can build the forwarding information they need.

A simple way to remember it:

> Routing decides the path. Forwarding moves the packet along that path.

---

## Data Plane vs Control Plane - Inside the Router

Routers aren’t just dumb traffic directors. They can be thought of as having two major functional planes:

### Data Plane 

Handles the actual movement of packets.

1. Examines the destination IP address.
2. Looks up the destination in its forwarding table.
3. Sends the packet through the appropriate output interface.

Because routers may need to process enormous numbers of packets per second, data-plane operations are often highly optimized and may be implemented in specialized hardware.


### Control Plane 

Determines how packets should be routed through the network.

It runs routing protocols such as:

- **OSPF** — commonly used for routing within an autonomous system
- **BGP** — used to exchange routing information between autonomous systems

The control plane learns about network topology and routes, then uses that information to build the routing and forwarding information used by the data plane.


In simple terms:

> Control plane: figure out where packets should go.
> Data plane: actually move the packets.

---

## Network Layer Service Model

In the Internet, the network layer operates on a **best-effort delivery** model. 

This means IP attempts to deliver packets toward their destination, but **IP itself does not guarantee successful delivery**.


| **Feature** | **Guaranteed by IP?** | **Explanation** |
| --- | --- | --- |
| Delivery Guarantee | ❌ | No guarantee the packet will arrive |
| Ordering | ❌ | Packets can arrive out of order |
| Timeliness | ❌ | No delay or latency guarantees |
| Duplicate Handling | ❌ | May deliver duplicate packets |

This simplicity is intentional. IP focuses on moving packets between hosts without requiring the Network Layer itself to provide reliable delivery.

Protocols at higher layers can provide additional guarantees when needed. For example, **TCP** adds reliable, ordered delivery on top of IP.
