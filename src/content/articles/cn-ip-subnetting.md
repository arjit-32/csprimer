---
title: Understanding IP and Subnetting- From Global Allocation to Local Networks
author: Arjit Sharma
meta_title: IP Addressing & Subnetting Explained  Global Allocation to Private Networks
description: Dive into how IPv4 addresses are structured and allocated globally. Learn classful vs classless addressing, subnetting strategies, and how ISPs distribute IPs efficiently using CIDR and private ranges.
series: cn
categories: ["Core-CS"]
---

The IP protocol(specifically IPv4) is the backbone of the Internet. It gives every device a unique logical address and ensures packets find their destination.

But with limited IPv4 addresses, ISPs like Jio or Airtel have to carefully plan how to divide and distribute these addresses using subnetting and private IPs.

## The IPv4 Datagram

An IPv4 packet contains:

- Source & Destination IPs - tells routers where the packet’s coming from and going to
- Header info for routing and fragmentation
- Payload from the transport layer (TCP/UDP)

Its job is to deliver the packet hop by hop across networks.

---

## IP Address Structure

IPv4 addresses are 32 bits, usually written like this -

```
192.168.1.18
```

This divides into:

- Network part (which network)
- Host part (which device within that network)

But how many addresses belong to a network? That depends on the prefix (or subnet mask).

---

## Classful vs Classless Addressing

In early IP design, addresses were split into fixed classes:

| **Class** | **Prefix Bits** | **Typical Use** |
| --- | --- | --- |
| A | /8 | Very large networks |
| B | /16 | Medium networks |
| C | /24 | Small networks (256 IPs) |

But classful addressing wasted a lot of IPs, enters CIDR.

**Classless Inter-Domain Routing (CIDR)**

CIDR allows using any prefix length like */26, /20,* or */12* - for flexible subnetting. It saves space and allows ISPs to allocate only what’s needed.

---

## Jio Example: Real-World Subnetting

Suppose Jio buys 7 million IPv4 addresses. It now has to distribute them across cities, neighborhoods, towers, etc. Let’s say in Bangalore, Jio assigns /26 subnets to each neighborhood.

**What’s a /26 subnet?**

- /26 = 64 IP addresses per block (2⁶ = 64)
- Example subnet: `192.0.2.0/26`
    - Range: `192.0.2.0` to `192.0.2.63`
    - Usable: 62 addresses *(1 for network, 1 for broadcast)*

This way, each neighborhood gets just enough IPs for their users, efficient and scalable.

---

## Private IP Ranges

To reduce IPv4 exhaustion, some IP ranges are reserved for private use, they can be reused in every home, office, or local network:

| **Range** | **Size** |
| --- | --- |
| 10.0.0.0/8 | ~16 million |
| 172.16.0.0/12 | ~1 million |
| 192.168.0.0/16 | ~65,000 |

These addresses don’t go on the Internet directly. They are used behind NAT (Network Address Translation) in routers. When you connect to Wi-Fi at home, you likely get a 192.168.x.x address and so does your phone connected to same Wifi.
