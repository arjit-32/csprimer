---
title: What Is UDP? The Fast but Unreliable Protocol
author: Arjit Sharma
meta_title: Understanding UDP  Fast, Lightweight & Unreliable Transport Protocol
description: Explore how UDP trades reliability for speed. Learn its segment structure, use cases in gaming, VoIP, and video streaming, and why connectionless communication suits low-latency applications.
series: ["cn"]
categories: ["Core-CS"]
---

Not every application needs perfect reliability. Sometimes, speed and low latency matter more. That’s where UDP (User Datagram Protocol) shines.

## What Is UDP?

**UDP** is a **connectionless**, **lightweight** transport protocol. It sends data without:

- establishing a connection
- waiting for acknowledgments
- retrying when something goes missing

It just fires off the data and hopes for the best, which is perfect when timing is more critical than accuracy.

---

## Key Features

| **Feature** | **UDP** |
| --- | --- |
| Connection setup | ❌ None |
| Reliability | ❌ No ACKs or retransmissions |
| Order guarantee | ❌ No sequencing |
| Speed | ✅ Very fast |
| Header size | ✅ Only 8 bytes |

---

## UDP Segment Format

| Field | Description |
| --- | --- |
| Source Port | App sending the data |
| Destination Port | App receiving the data |
| Length | Size of header + data |
| Checksum | Error detection |

UDP doesn’t have sequence numbers or acknowledgment flags, making it much simpler and faster.

---

## Where Is UDP Used and Why?

UDP is chosen for applications where **speed and low latency** are more important than perfect reliability. These use cases often benefit from its lightweight design and minimal overhead.

| **Use Case** | **Why UDP Is Used** |
| --- | --- |
| 🎥 **Live video/audio streaming** | No time to retransmit lost packets — smooth playback is the priority |
| 🎮 **Online gaming** | Real-time movement updates need speed, not packet perfection |
| 🌐 **DNS queries** | Quick request-response cycles — usually just one short exchange |
| ☎️ **Voice over IP (VoIP)** | Timely audio delivery matters more than getting every word right |
