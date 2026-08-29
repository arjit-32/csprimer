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

UDP is a connectionless, lightweight Transport Layer protocol (Layer 4 in the OSI model). Unlike TCP, it adopts a **"fire-and-forget"** approach:

* **No handshake:** It begins transmitting immediately without establishing a connection.
* **No acknowledgments (ACKs):** It doesn't check whether packets arrived safely.
* **No retransmissions:** Lost packets are simply dropped and ignored.

By skipping these overheads, UDP trades guaranteed delivery for minimal latency and maximum speed.

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

UDP (User Datagram Protocol) works as a minimal, connectionless communication model at the transport layer of the Internet protocol suite. Instead of establishing a dedicated end-to-end connection before transmitting, an application simply packages data into standalone units called datagrams and immediately transmits them over the network ("fire-and-forget")

---

## UDP Header Structure

standard UDP datagram header is only *8 bytes (64 bits)* split into four 2-byte fields:

| Field | Description |
| --- | --- |
| Source Port | Identifies the sending process/application (optional). |
| Destination Port | Directs the packet to the receiving process/application. |
| Length | Total size in bytes of the UDP header plus payload. |
| Checksum | Verifies packet integrity against corruption during transit. |

Because UDP omits sequence numbers, acknowledgment counters, and flow control windows, its processing overhead on routers and end devices is practically negligible.

---

## Where Is UDP Used and Why?

UDP is chosen for applications where **speed and low latency** are more important than perfect reliability. These use cases often benefit from its lightweight design and minimal overhead.

| **Use Case** | **Why UDP Is Used** |
| --- | --- |
| 🎥 **Live video/audio streaming** | No time to retransmit lost packets — smooth playback is the priority |
| 🎮 **Online gaming** | Real-time movement updates need speed, not packet perfection |
| 🌐 **DNS queries** | Quick request-response cycles — usually just one short exchange |
| ☎️ **Voice over IP (VoIP)** | Timely audio delivery matters more than getting every word right |
