---
title: Inside a Router- How Packets Are Actually Moved
author: Arjit Sharma
meta_title: How Routers Work  Inside a Packet’s Journey Through Networking Devices
description: Explore the inner workings of Internet routers from input ports and switching fabric to queuing and packet forwarding. Learn how routers process, schedule, and transmit data efficiently across networks.
series: ["cn"]
categories: ["Core-CS"]
---

Routers are the core switching devices in the Internet. Their job: take incoming packets, examine headers, and forward them out the correct link fast and efficiently.

But what’s actually inside a router?

## Main Components of a Router

1. **Input Ports**
    - Receive incoming packets
    - Perform lookup to decide where to send the packet next
    - May queue packets if outgoing link is busy
2. **Switching Fabric**
    - High-speed internal network connecting input ports to output ports
    - Types: memory-based, bus-based, crossbar
3. **Output Ports**
    - Transmit packets onto outgoing links
    - May also buffer packets and perform scheduling
4. **Routing Processor**
    - Runs routing algorithms (e.g., OSPF, BGP)
    - Maintains the forwarding table (used by input ports)

---

## Packets Journey Inside a Router

1. Packet arrives at input port
2. Input port does a lookup in the forwarding table
3. Packet is sent via switching fabric to the right output port
4. If output port is busy, packet is queued
5. Eventually, packet is sent out the link

---

## Queuing Delay & Packet Loss

When a router’s output buffer becomes full:

- Packets are dropped causing packet loss
- Queuing delays increase as packets wait their turn

These conditions often occur in congested networks and serve as signals for protocols like TCP to slow down, reducing transmission speed and relieving pressure.