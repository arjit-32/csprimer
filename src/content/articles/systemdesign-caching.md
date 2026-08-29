---
title: Caching in Databases
meta_title: Caching in System Design  Strategies, Eviction Policies & Bloom Filters
description: Learn how caching boosts performance in modern systems. Explore cache placement, write and eviction policies, popular strategies like Cache Aside, and Bloom filters for efficient cache lookups.
author: Arjit Sharma
series: system-design-foundation
categories: ["System-Design"]
draft: false
year: 2025
---

Caching is a fundamental technique used to improve performance and minimizing the load on primary data sources.

Caching is the process of storing copies of data in a temporary storage layer *(cache)* to serve future requests faster. It acts as an intermediary between the client and the primary data sourc*e (e.g., database, API).*

Key Concepts →

- Cache Hit*(requested data is found in the cache)* and Cache Miss
- Hit Ratio = No of Hists / Total access
- Cache Thrashing - Frequent cache miss can lead to excessive calls to backend
- Data consistency between cache and primary data source is a challenge.

## Cache Placement

- Local Cache - You can put the cache in memory in your server. It’ll be faster and simpler but if server goes down so does the cache.
- Global Cache ( Redis ) - Even if a server crashes, cache remains up. Slightly slower but more accurate. 

---

## Types of Caching

- Client-side cache - Stored on the client’s device *(Browser cache, Proxy Cache)*
- Server-side cache - Stored on the server *(in-memory cache like Redis or database cache)*.
- Content Delivery Network - Stores static resources (e.g., images, videos) across geographically distributed servers *(Cloudflare, Akamai).*

---

## Cache Policies

When to load or evict data from cache. 

*Eviction Policies :*

- FIFO (First In, First Out): Removes the oldest cached item.
- LIFO (Last In, First Out): Removes the most recently added item.
- LFU (Least Frequently Used): Removes the least accessed item.
- LRU (Least Recently Used): Removes the least recently accessed item.

*Writing Policies :*

- Write-Through cache : Write data on cache and go through it and write on database.
- Write-Back : Write on cache and later write to DB
- Write-around cache : Directly to DB, and then make sure either that data is deleted from cache or updated

---

## Caching Strategies

- Cache Aside - Check the cache for a requested item before retrieving it from the original source.
- Write-Through - Involves writing data to both the cache and the original source at the same time. 
- Write-Back -  Writing data to the cache and delaying the write to the original DB until a later time.
- Write-Around - Directly to DB, and then make sure either that data is deleted from cache or updated

---

## Bloom Filters

A Bloom filter is a space-efficient probabilistic data structure used to test whether an element is a member of a set. It helps optimize cache usage by avoiding unnecessary cache lookups.

**How Bloom Filters Work**

1. When a request comes in, the Bloom filter checks if the data might be in the cache.
2. If the Bloom filter says "not in cache," the system directly queries the database, bypassing the cache.
3. If the Bloom filter says "possibly in cache," the system checks the cache for the data.
