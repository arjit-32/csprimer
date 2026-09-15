---
title: Understanding IP and Subnetting- From Global Allocation to Local Networks
author: Arjit Sharma
meta_title: IP Addressing & Subnetting Explained  Global Allocation to Private Networks
description: Dive into how IPv4 addresses are structured and allocated globally. Learn classful vs classless addressing, subnetting strategies, and how ISPs distribute IPs efficiently using CIDR and private ranges.
series: cn
categories: ["Core-CS"]
---

The IP protocol(specifically IPv4) is the backbone of the Internet. 

It provides "logical addresses" that allow hosts and interfaces to be identified and packets to be routed across interconnected networks.

IPv4 addresses are limited, so networks need ways to divide address space efficiently. Concepts such as *subnetting, CIDR, private IP addresses, and NAT* help networks make better use of the available address space.


## The IPv4 Datagram

![ip-datagram-packet-structure](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488652/ipv4-datagram_ij7bnj.webp)

An IPv4 packet, often called an *IPv4 datagram*, contains:

- **Source and Destination IP addresses** - identify the sender and intended destination
- **Header information** -  contains fields used for forwarding, lifetime control, fragmentation, and other IP functions
- **Payload** - carries data from an upper-layer protocol such as TCP or UDP

![ip-packet-moving-on-router](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488652/ip-packet-moving-on-router_nfozgo.webp)

Routers examine the destination IP address use their routing tables to decide where to forward the datagram next.

The packet can therefore travel through multiple routers, or hops, before reaching its destination network.

---

## IP Address Structure

![ip-address-structure](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488652/ip-address-structure_dqzxzn.webp)

IPv4 addresses is 32 bits long and is usually written as four decimal octets:

```text
192.168.1.18
```

An IPv4 address by itself does not specify where the network portion ends and the host portion begins. Every address is divided into two distinct components:
- Network Prefix: Identifies the specific network or subnet.
- Host Identifier: Identifies the specific device on that subnet.

To define this boundary, we use a subnet mask or CIDR prefix length (slash notation):

```text
192.168.1.18/24
```

In this example, /24 indicates that the first 24 bits represent the network prefix, leaving 32 - 24 = 8 bits for host assignments *(2^8 = 256 total addresses)*.

---

## Classful vs Classless Addressing

![classful-classless-addressing](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488652/classful-vs-classless-adressing_xphbrl.webp)

### Classful Addressing

In the early days of IPv4, addresses were divided into fixed classes.

| **Class** | **Prefix Bits** | **Typical Use** |
| --- | --- | --- |
| A | /8 | Very large networks |
| B | /16 | Medium networks |
| C | /24 | Small networks (256 IPs) |

This rigid structure led to rapid address exhaustion. If an organization needed 500 IP addresses, a Class C network (256 addresses) was insufficient, forcing them to claim an entire Class B block (65,536 addresses) - wasting over 65,000 usable IPs.

This was one of the problems that classless addressing was designed to solve.

### Classless Inter-Domain Routing (CIDR)

Introduced in 1993, CIDR eliminated fixed classes entirely. 

Instead of restricting networks to /8, /16, or /24, CIDR allows networks to use arbitrary prefix lengths such as: */26, /20 or anything else*. 

Example - 

```text
192.168.1.18/24
```

Above IP, contains: 32 - 26 = 6 host bits and 2^6 = 64 total addresses

CIDR also enables route aggregation, sometimes called supernetting. Multiple contiguous networks can be represented by a shorter common prefix, allowing routers to advertise a single route instead of many individual routes.

This helps keep Internet routing tables more manageable.

---

## Subnetting

Subnetting is the practice of dividing an existing network block into smaller, distinct networks called subnets. This is achieved by extending the network prefix (subnet mask) and borrowing bits previously allocated to the host portion.

![subnetting-infographic](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488654/subnetting_dmsulg.webp)

### Example

A single /24 block can be partitioned into four /26 subnets. Lets walk through it for better understanding.

Consider the network: **192.168.1.0/24**

- Original host bits: IPv4 addresses contain 32 bits, leaving 32 - 24 = 8 host bits *(2^8 = 256 total addresses)*.
- Borrowing bits: Borrowing 2 bits for the prefix turns /24 into /26, creating 2^2 = 4 new subnets.
- Remaining host bits: 32 - 26 = 6 bits per subnet. Total addresses oer subnet 2^6 = 64 total addresses.

Subnet 1: 192.168.1.0/26   (Range: .0   to .63)
Subnet 2: 192.168.1.64/26  (Range: .64  to .127)
Subnet 3: 192.168.1.128/26 (Range: .128 to .191)
Subnet 4: 192.168.1.192/26 (Range: .192 to .255)


### The 2^n - 2 Rule 

For a traditional IPv4 subnet, if there are n host bits: Total addresses = 2^n

Two addresses are normally not assigned to hosts:
- Network address - all host bits are 0 (identifies the subnet itself).
- Directed broadcast address - all host bits are 1 (used to send packets to all devices on that subnet).

Therefore: **Usable host addresses = 2^n - 2**

What it means in a subnet ? Lets take our /26 network

| Subnet | Network Address | Broadcast Address | Total Range |
| :--- | :--- | :--- | :--- |
| Subnet 1 | 192.168.1.0/26 | 192.168.1.63 | 192.168.1.0 – 192.168.1.63 |
| Subnet 2 | 192.168.1.64/26 | 192.168.1.127 | 192.168.1.64 – 192.168.1.127 |
| Subnet 3 | 192.168.1.128/26 | 192.168.1.191 | 192.168.1.128 – 192.168.1.191 |
| Subnet 4 | 192.168.1.192/26 | 192.168.1.255 | 192.168.1.192 – 192.168.1.255 |


### Practical Usage of Subnetting in AWS

![subnets-in-aws-vpc](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488653/subnetting-in-aws_y1fcsf.webp)

In AWS, subnetting is used to divide a VPC into smaller networks for different parts of an application.

Each component can be placed in separate subnets, with routing and security rules controlling communication between them. Subnets can also be distributed across different Availability Zones for high availability.

*A Example Architecture*
- User accesses the application.
- Request goes through Internet -> Internet Gateway -> Load Balancer (public subnet).
- Load Balancer forwards traffic to application servers (private subnet).
- Application servers access the database (provate subnet).
- For outbound internet access (e.g. software updates), private subnets use a NAT Gateway.

> Subnetting helps organize, isolate, and control communication between different parts of an application.

---

## Private IP Ranges

To conserve the limited 32-bit IPv4 address pool, the Internet Engineering Task Force reserved three specific address blocks under RFC 1918 for internal networking. These addresses cannot be routed across the public Internet; edge routers automatically drop incoming or outgoing packets with private destination or source addresses.


| CIDR Block | IPv4 Address Range | Usable Addresses | Typical Use Case |
| :--- | :--- | :--- | :--- |
| 10.0.0.0/8 | 10.0.0.0 - 10.255.255.255 | 16,777,216 | Large enterprise networks, data centers |
| 172.16.0.0/12 | 172.16.0.0 - 172.31.255.255 | 1,048,576 | Mid-sized business networks |
| 192.168.0.0/16 | 192.168.0.0 - 192.168.255.255 | 65,536 | Home networks, small offices |

Because these subnets exist only on private local networks, millions of organizations and homes can reuse the exact same ranges *(such as 192.168.1.0/24)* without IP conflict.

---

## NAT - Connecting Private Networks to the Internet

![nat-gateway](https://res.cloudinary.com/dwa6rcttw/image/upload/v1789488654/Nat-gateway_alpel2.webp)

Because private RFC 1918 addresses cannot traverse public Internet transit, how does a laptop with IP 192.168.1.15 fetch a webpage from an external server?

This is solved by Network Address Translation (NAT), typically running on your border gateway or home router:
- Outbound Translation - The router intercepts the outgoing packet, modifies the private source IP (e.g., 192.168.1.15) to its own single ISP-assigned public IP, and logs the mapping along with a unique source port in its NAT state table.
- Inbound Reply - When the remote web server replies to the router's public IP, the router references its NAT state table, replaces the public destination IP with the original private IP (192.168.1.15), and forwards the packet onto the local network.

---

## Conclusion

IPv4 does not rely on a flat, global pool of individual device identifiers. Instead, it functions through a layered hierarchy: CIDR enables granular network boundaries, Subnetting divides those boundaries into local domains, RFC 1918 Private Addressing allows limitless local reuse, and NAT bridges private hosts onto the public web.