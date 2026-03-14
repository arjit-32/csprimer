---
title: What Is QUIC? The Modern Replacement for TCP+TLS
author: Arjit Sharma
meta_title: QUIC Explained  Faster, Secure Alternative to TCP & TLS for HTTP/3
description: Explore how QUIC transforms internet transport with faster handshakes, built-in encryption, and multiplexed streams. Learn how it solves TCP’s limitations and powers modern web protocols like HTTP/3.
series: ["cn"]
categories: ["Core-CS"]
---

QUIC (Quick UDP Internet Connections) is a next-generation transport protocol designed to make the web faster, more secure, and more reliable, especially over modern networks.

Developed by Google, now standardized by the IETF, QUIC is used in HTTP/3, YouTube, and Google services.

## Why QUIC?

QUIC was created to fix the pain points of TCP + TLS:

| **TCP Problem** | **QUIC Solution** |
| --- | --- |
| Handshake takes time | QUIC combines connection + encryption setup in 1 round-trip (or 0-RTT!) |
| Head-of-line blocking | QUIC supports multiplexed streams, if one packet is lost, others continue |
| Connection loss = reset | QUIC supports connection migration, like moving from Wi-Fi to 4G |
| Needs kernel update | QUIC is implemented in user space, easier to update and deploy |

---

## How QUIC Works

Under the hood, QUIC blends familiar ideas with new enhancements:

- **Runs on UDP**, bypassing TCP’s limitations
- **TLS 1.3 built-in** encryption is always on
- **Multiplexed streams** send multiple data flows independently
- **Reliability features** ACKs, retransmissions, and congestion control, just like TCP but smarter

Instead of relying on multiple layers like TCP + TLS + HTTP/2, QUIC streamlines everything at once.

---

## Secure by Default

With QUIC, encryption is mandatory, not an add-on. Every QUIC packet is secured using TLS 1.3, and there’s no fallback to plaintext. It’s designed for the secure web by default.

QUIC = UDP + TLS + TCP-like reliability + stream multiplexing - all in one modern protocol
