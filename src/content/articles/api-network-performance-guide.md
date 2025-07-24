---
title: Understanding Network Performance - A Simple Guide
meta_title: Network Performance Guide- APIs | CS Primer
description: Explore network performance. Learn latency, bandwidth, and optimization for efficient API design and web apps.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

When you click a link or make an API call, various factors affect how quickly you get a response. Let's break down the key terms with real-world examples.


| Term | Meaning | Example |
| --- | --- | --- |
| **Latency** | Time it takes for round trip *(request + response )* | When you click a link, it takes 100ms to get a response |
| **Bandwidth** | Maximum possible speed | Your ISP provides 100 Mbps internet connection |
| **Throughput** | Actual speed achieved | You download a file at 80 Mbps |
| **Jitter** | If latency varies across calls, that’s jitter | Lag in your video calls. |
| **Cache** | Temporarily stored data for faster access | Browser remembering your login details. |
| **Proxy** | Network middleman | A company’s firewall. |

*Note - API technologies like RESTful, GraphQL at most basic level use socket interface for process identification, connection establishment and inter-process communication.*

---

## Latency Breakdown

```sh
Latency = Transmission + Propagation + Queuing + Processing
```

- Transmission delay - Time to push bits onto the wire.
- Propagation delay - Travel time across the network.
- Queuing delay - Waiting at routers or switches.
- Processing delay - Time for servers to compute results.

---

## Bandwidth-Delay Product (BDP)

Latency × Bandwidth = how many bits the "pipe" can hold.

In simple terms it is **maximum amount of data that can be "in flight".** Useful when optimizing for data transfers, we can keep buffer !

---

## Simple Example

Let's see what happens when you visit [csprimer.in](http://csprimer.in) with a 40 Mbps connection:

- Bandwidth = 40Mbps *(your connection speed)*
- Actual Throughput ≈ 32 Mbps *(due to network conditions)*
- Latency = 110 ms *(includes the 4 kind of delays discussed below)*
    
    Breakdown of latency →
    
    - DNS lookup *(Processing + Propagation ~10ms ) -* DNS server looks up the address.
    - TCP handshake *(Transmission + Propagation ~25ms) -* Packets travel from client to server.
    - Server processing *(Processing + Queuing ~50ms) -* Server prepares the response.
    - Response travel *(Propagation+ Queuing ~25ms) -* Packets travels from server to client.
- BDP = 40 Mbps × 0.11s = 4.4 Mb → Network path can hold 4.4Mb data in flight.

So a website like [csprimer.in](http://csprimer.in) which is fairly small ~ 200 KB, at 32 Mbps throughput, transfer time will be 200 KB  * 8 / 32 Mbps  ⇒ 0.05 seconds, but may increase upto 0.2 seconds on delays.