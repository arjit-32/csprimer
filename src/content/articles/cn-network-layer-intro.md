---
title: Introduction to the Network Layer - Forwarding, Routing & Services
author: Arjit Sharma
meta_title: Network Layer Explained  IP Addressing, Forwarding & Routing in Internet
description: Discover how the Network Layer enables host-to-host communication across the Internet using IP, routing, and forwarding. Learn about data vs control planes and why best-effort delivery matters.
series: cn
categories: ["Core-CS"]
---

The Network Layer is like the postal service of the Internet its mission is to deliver data packets from one device to another, even if they’re separated by continents and multiple networks. 

![network-layer-intro](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788896741/network-layer_gtryma.webp)

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

While often used interchangeably, routing and forwarding represent two distinct network layer functions: the Control Plane (planning) and the Data Plane (action).

A simple way to summarize is:

> Routing decides the path. Forwarding moves the packet along that path.

### Routing 

**Routing is a network-wide process.** 

![routing](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788897004/routing_dzxy5g.webp)

Determining the paths that packets should take through the network. Routing protocols exchange information and calculate paths so that routers can build the forwarding information they need.

*How Routing Works -*

1. Information Exchange: Routers communicate using routing protocols (such as OSPF or BGP) to share link states, reachability, and network topology.
2. Path Computation: Each router runs an algorithm (e.g., Dijkstra's shortest path) to determine the best paths and next hops for all remote destinations.
3. Table Construction: The computed paths are compiled into a Routing Table, which is subsequently used to populate the router's local forwarding table.


### Forwarding 

**Forwarding is a local, per-packet operation.**

![forwarding](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788897004/forwarding_kook67.webp)

Moving a packet from a router's input interface to the appropriate output interface. A router examines a packet's destination IP address and uses its forwarding table to determine where to send it next.

*How Forwarding Works -*

1. Packet Arrival: A packet arrives at an input interface, and the router reads the destination IP header.
2. Table Lookup: The router searches its Forwarding Table for the longest prefix match corresponding to that destination address.
3. Packet Transmission: The packet is switched across the internal fabric and sent out onto the matched physical output interface toward the next hop.

---

## Data Plane vs Control Plane - Inside the Router

Router performs two different kinds of work: *figuring out where packets should go* and *actually moving them*. These are commonly described as the **control plane** and **data plane**.

![data-and-control-plane](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788896740/data-plane-vs-control-plane_qwmgdt.webp)

A simple way to summarize is:

> Control plane: figure out where packets should go.
> Data plane: actually move the packets.

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
