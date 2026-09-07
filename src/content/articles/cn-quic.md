---
title: What Is QUIC? The Modern Replacement for TCP + TLS
author: Arjit Sharma
meta_title: QUIC Explained  Faster, Secure Alternative to TCP & TLS for HTTP/3
description: Explore how QUIC transforms internet transport with faster handshakes, built-in encryption, and multiplexed streams. Learn how it solves TCP’s limitations and powers modern web protocols like HTTP/3.
series: cn
categories: ["Core-CS"]
---

QUIC (Quick UDP Internet Connections) is a modern transport layer protocol designed to make web communication faster, safer, more secure and resilient.

Originally developed by *Google* and now standardized by the IETF [(RFC 9000)](https://www.rfc-editor.org/info/rfc9000/), QUIC serves as the underlying foundation for *HTTP/3* - powering major platforms like YouTube, Cloudflare, and Google services.


## How QUIC Works ? 

![how-quic-works](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788802395/how-quic-works_goxgam.webp)

A new QUIC connection combines connection establishment with the TLS 1.3 handshake. Unlike TCP + TLS, these are not performed as two separate, sequential handshakes.

- Step 1 (Client → Server): The browser sends an Initial packet containing connection setup settings and encryption keys (ClientHello).
- Step 2 & 3 (Server → Client): The server answers with its own Initial and Handshake packets (ServerHello + TLS certificates + verification).
- Step 4 (1-RTT Data): Both sides are now secure. The browser can immediately start downloading content (HTML, CSS, images).

*Note -1 RTT does not mean that every handshake message travels in exactly one request and one response. It means that a new connection can reach the point where the client can send protected application data after one network round trip.*


---

## Core Pillars of QUIC

QUIC doesn't start from scratch., it replaces the rigid parts of TCP while keeping its retaining essential transport mechanisms such as **reliable delivery, congestion control, and flow control**.

### 1. Built on UDP

![quick-protocol-on-udp](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788802395/quic-on-udp_ue85tn.webp)

TCP has traditionally been implemented as part of operating-system networking stacks. Changing its behavior can therefore depend on OS updates and compatibility with existing network infrastructure.

QUIC runs on top of UDP, while implementing its transport logic in user space. This makes the protocol easier to evolve and deploy without requiring changes to the operating system's TCP implementation.

### 2. Built-in, Non-Negotiable Encryption

![quic-protocol-encryption-flow](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788802395/quic-connection_xivvvz.webp)

With TCP, TLS is a separate protocol layered above TCP.

QUIC integrates TLS 1.3 into its connection establishment. TLS is responsible for the cryptographic handshake and key establishment, while QUIC uses those keys to protect its packets.

- TLS handshake and QUIC connection establishment progress together.
- Application data is protected using the keys established through TLS.
- QUIC provides no plaintext application-data mode.

QUIC does not encrypt literally every byte of a packet header; some header information remains visible because the network needs it to process packets. Instead, QUIC authenticates packets and encrypts as much of each packet as practical.

### 3. True Multiplexing (No Head-of-Line Blocking)

![quic-multiplexing](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788802395/quic-multiplexing_kv0sst.webp)

One of QUIC's most important differences from TCP is how it handles multiple streams.

HTTP/2 can multiplex multiple requests over a single TCP connection. However, TCP presents the application with one ordered byte stream. If a TCP segment is lost, TCP must recover that missing data before delivering later bytes to the application. This can create head-of-line blocking across HTTP/2 streams.

QUIC instead provides multiple independent streams within the same connection.

### 4. Connection Migration (Zero Drops on Mobile)

![quic-connection-migration](https://res.cloudinary.com/dwa6rcttw/image/upload/v1788802394/quic-connection-migration_gsnktp.webp)

Traditional TCP connections are identified by the familiar 4-tuple: *(Source IP, Source Port, Dest IP, Dest Port)*. If you walk out of your house and switch from Wi-Fi to cellular data, your IP changes - breaking the TCP connection.

QUIC instead uses a Connection ID to identify a connection independently of the current network path. This allows a connection to migrate to a new path when network conditions change, such as when a device switches from Wi-Fi to cellular data.

---

## The Big Idea

QUIC is often described as *"TCP implemented over UDP."* While that is a helpful starting analogy, it undersells the real innovation.

Instead of merely porting legacy TCP features to UDP, QUIC takes essential transport guarantees—reliability, congestion control, and flow control and **completely redesigns them** for the modern internet. 

It's better to think of QUIC using the following mental model:
> QUIC = Reliable transport + congestion control + multiplexed streams + TLS 1.3 + connection migration, carried over UDP

This clean slate is why **HTTP/3** favors QUIC.
