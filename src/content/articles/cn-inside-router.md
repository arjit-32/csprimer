---
title: Inside a Router - How Packets Are Actually Moved
author: Arjit Sharma
meta_title: How Routers Work  Inside a Packet’s Journey Through Networking Devices
description: Explore the inner workings of Internet routers from input ports and switching fabric to queuing and packet forwarding. Learn how routers process, schedule, and transmit data efficiently across networks.
series: cn
categories: ["Core-CS"]
---

Routers are the core switching devices in the Internet. Their job: take incoming packets, examine headers, and forward them out the correct link fast and efficiently.

But what’s actually inside a router?

## Main Components of a Router

A router can be broadly understood as having four major components:

![major-components-of-router](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788896740/components-of-router_iyx7de.webp)

### Input Ports

- Receive incoming packets
- Examine packet headers
- Perform a lookup in the **forwarding table** to determine the next hop and output interface
- May queue packets if outgoing link is busy

The input port then passes the packet to the *switching fabric*.

### Switching Fabric

Switching Fabric is the internal mechanism that moves packets from an input port to the appropriate output port. The switching fabric determines how packets are physically transferred inside the router; the forwarding lookup determines *which output port* the packet needs. Common switching-fabric designs include:  *Memory-based, Bus-based and crossbar switching*.

### Output Ports

Output ports are where packets leave the router.

- Receive packets from the switching fabric
- Buffer packets when the outgoing link is busy
- Schedule packets for transmission
- Transmit packets onto the outgoing link

### Routing Processor

The routing processor is part of the router's control plane.

- Runs routing protocols such as **OSPF** and **BGP**
- Learns about reachable networks and available paths
- Computes routes
- Builds or updates routing information
- Installs the resulting **forwarding information** used by the data plane

The routing processor does not normally handle every packet individually. Instead, it prepares the forwarding information that allows the data plane to process packets quickly.

---

## Packets Journey Inside a Router

Once a packet arrives, the basic flow looks like this:

![packets-journey-in-router](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788896740/flow-within-router_h1wp9m.webp)

1. Packet arrives at input port
2. Input port examines the destination IP address
2. Forwarding-table lookup determines the output port / next hop
3. Switching fabric moves the packet to the selected output port
4. Packet may be queued if the output link is busy
5. Output port schedules and transmits the packet onto the outgoing link

---

## Queuing Delay & Packet Loss

![packet-loss](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788896741/queueing-delay-and-packet-loss_yq4d2l.webp)

Routers have finite buffer space. When packets arrive faster than they can be processed or transmitted, queues begin to build. This creates *queuing delay* as packets wait for their turn. 

If a queue becomes full, newly arriving packets may be dropped, resulting in packet loss. Congestion can therefore lead to both increased delay and packet loss.

Transport protocols such as TCP can use signals such as packet loss and changes in round-trip time to infer congestion and reduce their sending rate.