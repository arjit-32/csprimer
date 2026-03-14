---
title: Capacity Estimation in System Design
meta_title: Capacity Estimation in System Design  Metrics, Latency & Real-World Calculation
description: Learn how to estimate system capacity using traffic patterns, QPS, latency benchmarks, and resource modeling. Explore request types, concurrency, and a real-world app scenario to guide scalable architecture.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

It is about predicting amount of resources your system needs*(servers, storage, bandwidth, etc.)* to handle expected traffic.

## Key Concepts

- Traffic - How many people use your app? How often?
- Request Types -
    - *CPU-bound*: Needs lots of processing *(ex - video encoding)*
    - *Memory-bound*: Needs fast access to RAM *(ex - caching)*
    - *I/O-bound*: Depends on disk or network speed *(ex - uploading files)*
- Storage Needs - How much data will be saved? (ex- images, videos, metadata)
- Bandwidth - How much data goes in and out each second?
- Peak Load - Plan for sudden spikes in activity.

---

## Key Metrics to Estimate

| Metric | Description |
| --- | --- |
| DAU (Daily Active Users) | Number of unique users per day |
| QPS (Queries Per Second) | Number of requests handled per second |
| Storage Requirements | Data generated and stored per day/month/year |
| Bandwidth | Data transferred in/out of the system |
| Concurrency | Number of simultaneous users or requests |
| Response Time | Time taken to respond to a request |
| Error Rate | Percentage of failed or erroneous requests |

---

## Standard Latency Numbers to Remember

| Operation | Latency  |
| --- | --- |
| L1 cache reference | 0.5 ns |
| Branch mispredict | 5 ns |
| L2 cache reference | 7 ns |
| Main memory reference | 100 ns |
| SSD random read (4KB) | 150,000 ns = 150 µs |
| Read 1MB sequentially from memory | 250,000 ns = 250 µs |
| Round trip within same datacenter | 500,000 ns = 500 µs |
| Disk seek | 10,000,000 ns = 10 ms |
| Read 1 MB sequentially from the network | 10,000,000 ns = 10 ms |
| Read 1 MB sequentially from disk | 30,000,000 ns = 30 ms |
| Send packet CA → Netherlands → CA | 150,000,000 ns = 150 ms |

---

## Example Estimation

**Scenario:** You're building a photo-sharing app

**Key Assumptions -** 

- DAU = 100,000 users with 20 requests/user
- Average Upload Size = 3MB
- Average Read Size = 1MB read
- Peak QPS → 100,000 * 20 = 2 million requests/day *(23 requests/second).* So we can assume that peak QPS can be roughly double ≈ 50
 

**Resource Estimates -**

| Category | Notes | Calculation | Estimate |
| --- | --- | --- | --- |
| **Daily Requests** | - | 100,000 DAU × 20 request | ~2 million/day |
| **Bandwidth** | Mostly reads at 1MB each; uploads ~3MB × 1 upload/user | 2M × 1MB (reads) + 100K × 3MB (uploads) | ~2.3 TB/day  |
| **Compute** | Avg CPU time/request = 100ms then 1 CPU core can do 10 req/s | 50 QPS / capacity per core(10) | ~5 CPU cores |
| **Storage Growth** | Uploads only; 3MB/image → adjusted for compression (retained data) | 100,000 x 3MB = 300GB. After compression might be 16GB/day | ~500 GB/month  |
| **Write Load** | Uploads, captions, likes/comments | - | ~20–30% of traffic |

## Conclusion

Capacity estimation isn’t about perfect numbers it’s about **directional accuracy**. With a few smart assumptions and standard latency benchmarks, you can design systems that scale gracefully and perform reliably.
