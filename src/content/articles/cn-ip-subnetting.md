---
title: Understanding IP and Subnetting- From Global Allocation to Local Networks
author: Arjit Sharma
meta_title: IP Addressing & Subnetting Explained  Global Allocation to Private Networks
description: Dive into how IPv4 addresses are structured and allocated globally. Learn classful vs classless addressing, subnetting strategies, and how ISPs distribute IPs efficiently using CIDR and private ranges.
series: cn
categories: ["Core-CS"]
---

The IP protocol(specifically IPv4) is the backbone of the Internet. It gives every device a unique logical address and ensures packets find their destination.

IPv4 addresses are limited, so networks need ways to divide address space efficiently. Concepts such as *subnetting, CIDR, private IP addresses, and NAT* help networks make better use of the available address space.


## The IPv4 Datagram

An IPv4 packet, often called an *IPv4 datagram*, contains:

- **Source and Destination IP addresses** - identify the sender and intended destination
- **Header information** -  contains fields used for forwarding, lifetime control, fragmentation, and other IP functions
- **Payload** - arries data from an upper-layer protocol such as TCP or UDP

Routers examine the destination IP address and *forward the datagram hop by hop* toward its destination.

---

## IP Address Structure

IPv4 addresses is 32 bits long and is usually written as four decimal octets:

```text
192.168.1.18
```


Every IP address is split into two logical segments:
- Network Prefix: Identifies the specific network or subnet.
- Host Identifier: Identifies the specific device on that subnet.

Using CIDR notation (slash notation), the network boundary is defined explicitly:

For example:
```text
192.168.1.18/24
```

Here, /24 indicates that the first 24 bits represent the network prefix, leaving 32 - 24 = 8 bits for host assignments *(2^8 = 256 total addresses)*.

---

## Classful vs Classless Addressing

### Classful Addressing

In the early days of IPv4, addresses were divided into fixed classes.

| **Class** | **Prefix Bits** | **Typical Use** |
| --- | --- | --- |
| A | /8 | Very large networks |
| B | /16 | Medium networks |
| C | /24 | Small networks (256 IPs) |

The problem: This rigid allocation caused massive address waste. If an organization needed 500 IP addresses, a Class C network (/24 with 256 addresses) was too small, forcing them to acquire a Class B network (/16 with 65,536 addresses)—wasting over 65,000 addresses in the process.

### Classless Inter-Domain Routing (CIDR)

Introduced in 1993, CIDR eliminated fixed classes entirely. 

CIDR allows networks to use flexible prefix lengths such as: */26, /20,* or */12*. Instead of being restricted to fixed classes, networks can be allocated address blocks that better match their requirements.

Example - 
```text
192.168.1.18/24
```

CIDR also enables Route Aggregation (Supernetting), allowing routers to combine multiple contiguous subnets into a single advertised routing prefix, dramatically shrinking global routing tables.

---

## Subnetting

Subnetting is the practice of taking an assigned network block and splitting it internally into smaller, distinct subnets. This is done by "borrowing" bits from the host portion of an address and assigning them to the network prefix.

For example, a single /24 block can be partitioned into four /26 subnets:

```text
Base Network: 192.168.1.0/24 (256 addresses)

Subnet 1: 192.168.1.0/26   (Range: .0   to .63)
Subnet 2: 192.168.1.64/26  (Range: .64  to .127)
Subnet 3: 192.168.1.128/26 (Range: .128 to .191)
Subnet 4: 192.168.1.192/26 (Range: .192 to .255)
```

### The 2^n - 2 Rule 

In every IPv4 subnet, two addresses are reserved and cannot be assigned to hosts

- First Address (All host bits 0): The Network ID (e.g., 192.168.1.0).
- Last Address (All host bits 1): The Subnet Directed Broadcast address (e.g., 192.168.1.63).

Therefore, a /26 block yields 62 usable host addresses.

---

## Private IP Ranges (RFC 1918)

To combat global IPv4 depletion, three ranges were reserved exclusively for private internal use. These addresses are non-routable on the public Internet and can be freely reused inside private networks worldwide:


| **CIDR Prefix** | **Total Capacity** |
| --- | --- |
| 10.0.0.0/8 | ~16 million |
| 172.16.0.0/12 | ~1 million |
| 192.168.0.0/16 | ~65,000 |

Because millions of homes simultaneously use 192.168.1.0/24, these addresses never enter public ISP routing tables directly.

---

## NAT - Connecting Private Networks to the Internet

Because private RFC 1918 addresses cannot traverse public Internet transit, how does a laptop with IP 192.168.1.15 fetch a webpage from an external server?

This is solved by Network Address Translation (NAT), typically running on your border gateway or home router:
- Outbound Translation - The router intercepts the outgoing packet, modifies the private source IP (e.g., 192.168.1.15) to its own single ISP-assigned public IP, and logs the mapping along with a unique source port in its NAT state table.
- Inbound Reply - When the remote web server replies to the router's public IP, the router references its NAT state table, replaces the public destination IP with the original private IP (192.168.1.15), and forwards the packet onto the local network.

---

## Conclusion

IPv4 does not rely on a flat, global pool of individual device identifiers. Instead, it functions through a layered hierarchy: CIDR enables granular network boundaries, Subnetting divides those boundaries into local domains, RFC 1918 Private Addressing allows limitless local reuse, and NAT bridges private hosts onto the public web.