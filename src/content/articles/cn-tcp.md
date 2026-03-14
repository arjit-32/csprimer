---
title: What Is TCP? The Reliable Backbone of the Internet
author: Arjit Sharma
meta_title: TCP Explained  Reliable Communication, Flow Control & Congestion Management
description: Understand why TCP is the Internet’s reliable backbone. Learn about connection setup, reliable data transfer, flow control, and congestion handling techniques like slow start and AIMD in this Core-CS guide.
series: ["cn"]
categories: ["Core-CS"]
---

While UDP is fast but unreliable, TCP (Transmission Control Protocol) is all about reliability, order, and control. It powers most of the Internet’s critical applications from web browsing to file transfers by ensuring that data arrives accurately and in order.

## Why TCP?

TCP is a **connection-oriented, reliable transport protocol**. It ensures:

- Reliable delivery *(no loss, no duplicates)*
- In-order delivery *(data arrives in correct sequence)*
- Flow control *(don’t overwhelm the receiver)*
- Congestion control *(don’t flood the network)*

---

## The 3-Way Handshake

Before any data moves, TCP establishes a connection using a handshake.

1. **SYN** → Client sends a connection request.
2. **SYN-ACK** → Server acknowledges and replies.
3. **ACK** → Client acknowledges the reply.

Connection is now established. Data can start flowing.

---

## TCP Segment Structure

| **Field** | **Purpose** |
| --- | --- |
| Sequence Number | Keeps track of data byte positions |
| Acknowledgment Number | Confirms received data |
| Flags (SYN, ACK, FIN) | Controls connection setup and teardown |
| Window Size | Used for flow control |
| Checksum | Error detection |

---

## Reliable Data Transfer in TCP

TCP ensures no data is lost or duplicated using:

- Sequence numbers → every byte is tracked
- ACKs → receiver confirms which data has arrived
- Timers + Retransmission → lost packets are resent
- Pipelining → multiple segments in-flight at once

---

## Flow Control (Receiver-Side)

TCP uses a sliding window mechanism:

- Receiver advertises how much buffer space is available (`rwnd`)
- Sender adjusts how much data it can send without overwhelming the receiver

This keeps communication efficient, especially between devices with different processing powers

---

## TCP Congestion Control (Network-Side)

To keep the internet fair and balanced, TCP monitors and adapts to traffic congestion

### 1. **Slow Start**

- Start with a small congestion window (`cwnd`)
- Increase it exponentially with each ACK until a loss is detected

### 2. **Congestion Avoidance**

- After reaching a threshold, grow `cwnd` linearly instead of exponentially

### 3. **Fast Retransmit & Fast Recovery**

- Detects packet loss via duplicate ACKs
- Retransmits quickly and avoids resetting everything

### 4. **AIMD (Additive Increase, Multiplicative Decrease)**

- On success: increase `cwnd` gradually
- On loss: cut `cwnd` in half
