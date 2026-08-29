---
title: What Is TCP? The Reliable Backbone of the Internet
author: Arjit Sharma
meta_title: TCP Explained  Reliable Communication, Flow Control & Congestion Management
description: Understand why TCP is the Internet’s reliable backbone. Learn about connection setup, reliable data transfer, flow control, and congestion handling techniques like slow start and AIMD in this Core-CS guide.
series: cn
categories: ["Core-CS"]
---

While UDP is fast but unreliable, TCP (Transmission Control Protocol) is all about reliability, order, and control. It powers most of the Internet’s critical applications from web browsing to file transfers by ensuring that data arrives accurately and in order.

## Why TCP?

TCP is a *connection-oriented, reliable* Transport Layer protocol (Layer 4 in the OSI model). It provides four fundamental guarantees:

- Reliable delivery *(no loss, no duplicates)*
- In-order delivery *(data arrives in correct sequence)*
- Flow control *(don’t overwhelm the receiver)*
- Congestion control *(don’t flood the network)*

---

## Connection Lifecycle: The 3-Way Handshake

Before transmitting application data, TCP synchronizes sequence numbers between client and server via a *3-Way Handshake*:

1. **SYN** → Client sends a connection request.
2. **SYN-ACK** → Server acknowledges and replies.
3. **ACK** → Client acknowledges the reply.

> Once the 3-way handshake completes, a full-duplex byte stream connection is established, and application data begins to flow. When terminating the connection, TCP uses a **4-way handshake** using **FIN** flags.

---

## TCP Segment Structure

Unlike UDP's fixed 8-byte header, a standard TCP header is at least 20 bytes (up to 60 bytes with options):

| Field | Size | Purpose |
| :--- | :--- | :--- |
| **Source & Destination Port** | 16 bits each | Identifies the sending and receiving application processes. |
| **Sequence Number** | 32 bits | Tracks the byte position of data sent in the stream. |
| **Acknowledgment Number** | 32 bits | Indicates the next expected byte number from the sender. |
| **Control Flags** | 9 bits | Controls state (`SYN`, `ACK`, `FIN`, `RST`, `PSH`, `URG`). |
| **Window Size (`rwnd`)** | 16 bits | Flow control buffer space advertised by the receiver. |
| **Checksum** | 16 bits | Verifies packet and header integrity against bit corruption. |

---

## How TCP Guarantees Reliability

TCP converts an unreliable underlying network (IP) into a dependable channel using four core mechanisms:

* **Byte-Level Sequencing:** Every byte of payload is indexed so the receiver can detect missing gaps or duplicate segments.
* **Cumulative ACKs:** The receiver explicitly tells the sender which byte sequence it expects next.
* **Retransmission Timers (RTO):** If an acknowledgment is not received within a calculated timeout window, the segment is resent.
* **Fast Retransmit:** If the sender receives 3 duplicate ACKs for the same packet, it retransmits immediately without waiting for the timer to expire.

---

## Flow Control vs. Congestion Control

A common point of confusion is distinguishing between protecting the *receiver* versus protecting the *network*:

### 1. Flow Control (Receiver-Side Protection)
Flow control prevents receiver buffer overflow. It uses the *Sliding Window Protocol*. The receiver continuously advertises its available buffer space *(rwnd)*. The sender restricts the amount of unacknowledged in-flight data so it never exceeds `rwnd`.

### 2. Congestion Control (Network-Side Protection)
Congestion control prevents network router queue overflow and packet drops. It regulates traffic to prevent router buffers inside the Internet from overflowing using a dynamic congestion window *(cwnd)*:

- Slow Start: Begins with a small `cwnd` and doubles it exponentially every Round Trip Time (RTT) to probe network capacity.
- Congestion Avoidance: Once a threshold (ssthresh) is reached, cwnd increases linearly (+1 MSS per RTT) to steadily search for bandwidth.
- Fast Retransmit & Fast Recovery: Triggered by 3 duplicate ACKs; immediately resends the lost packet without waiting for a timeout and halves cwnd (instead of resetting to 1 MSS) to maintain throughput.
- AIMD (Additive Increase, Multiplicative Decrease): The core control loop gradually increases sending rate when clear (+1 MSS/RTT), but slashes cwnd in half upon packet loss.

---

## Where TCP Shines

TCP is the non-negotiable choice for applications where **correctness and complete data integrity** outweigh latency:

| Use Case | Why TCP Is Chosen |
| :--- | :--- |
| 🌐 **Web Browsing (HTTP/1.1 & HTTP/2)** | HTML, CSS, and JS files must load completely without missing code chunks. |
| 📁 **File Transfers (FTP, SFTP)** | A single dropped or corrupted byte corrupts an entire file archive or binary. |
| ✉️ **Email (SMTP, IMAP)** | Messages and attachments must arrive fully intact without omissions. |
| 💾 **Databases & Remote Access (SSH, SQL)** | Commands and transaction logs require guaranteed execution and ordering. |

