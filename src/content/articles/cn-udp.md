---
title: What Is UDP? The Fast but Unreliable Protocol
author: Arjit Sharma
meta_title: Understanding UDP  Fast, Lightweight & Unreliable Transport Protocol
description: Explore how UDP trades reliability for speed. Learn its segment structure, use cases in gaming, VoIP, and video streaming, and why connectionless communication suits low-latency applications.
series: cn
categories: ["Core-CS"]
---

Not every application needs perfect reliability. Sometimes, speed and low latency matter more. That’s where UDP (User Datagram Protocol) shines.

## What Is UDP?


![udp-protocol](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788774831/udp_q82aug.webp)

UDP is a connectionless, lightweight Transport Layer protocol (Layer 4 in the OSI model). Unlike TCP, it adopts a **"fire-and-forget"** approach:

- **No handshake:** It begins transmitting immediately without establishing a connection.
- **No acknowledgments (ACKs):** It doesn't check whether packets arrived safely.
- **No retransmissions:** Lost datagrams are not retransmitted by UDP.

By skipping these overheads, UDP trades guaranteed delivery for lower latency and less protocol overhead.

---

## Key Features

| **Feature** | **UDP** |
| --- | --- |
| Connection setup | ❌ None |
| Reliability | ❌ No ACKs or retransmissions |
| Order guarantee | ❌ No sequencing |
| Speed | ✅ Very fast with near-zero latency |
| Header size | ✅ Extremely low (8-byte fixed header vs. TCP's 20+ bytes) |

---

## HOW UDP works 

![how-udp-works](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788774831/how-udp-works_ajfvfs.webp)

UDP (User Datagram Protocol) provides a minimal, connectionless communication model at the transport layer of the Internet protocol suite.

- Application Data Generation: The sender application (such as video streaming, audio, or messaging) generates the payload data.

- UDP Segment Creation: The transport layer appends an 8-byte UDP header to the data.

- IP Packet Encapsulation: The entire UDP segment is passed down to the network layer, where an IP Header (containing source and destination IP addresses) is prepended to form an IP packet.

- Network Transit: The packet routes across intermediate network hops without sequence tracking, connection state, or guaranteed delivery.

- Receiver Decapsulation: The destination server strips the IP and UDP headers and delivers the raw application data directly to the listening port.

Because UDP skips connection setup, packet acknowledgment, and retransmission, it minimizes overhead and latency, making it ideal for real-time applications.

---

## UDP Header Structure

![udp-header-structure](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788774831/udp-header-structure_lgb15p.webp)

A standard UDP datagram header has an *8 byte (64 bits) header*, split into four 2-byte fields:

| Field | Description |
| --- | --- |
| Source Port | Identifies the sending process/application (optional). |
| Destination Port | Directs the packet to the receiving process/application. |
| Length | Total size in bytes of the UDP header and payload. |
| Checksum | Verifies packet integrity against corruption during transit. |

Because UDP omits sequence numbers, acknowledgment counters, and flow control windows, it has less processing and protocol overhead than TCP.

---

## Where Is UDP Used and Why?

UDP is chosen for applications where **speed and low latency** are more important than perfect reliability. These use cases often benefit from its lightweight design and minimal overhead.

| **Use Case** | **Why UDP Is Used** |
| --- | --- |
| 🎥 **Live video/audio streaming** | No time to retransmit lost packets - smooth playback is the priority |
| 🎮 **Online gaming** | Real-time movement updates need speed, not packet perfection |
| 🌐 **DNS queries** | Quick request-response cycles - usually just one short exchange |
| ☎️ **Voice over IP (VoIP)** | Timely audio delivery matters more than getting every word right |
