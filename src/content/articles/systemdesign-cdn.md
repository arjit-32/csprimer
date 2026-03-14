---
title: Content-Delivery Networks
meta_title: Content Delivery Networks (CDN) Explained  GeoDNS, Anycast & Caching Strategies
description: Discover how CDNs accelerate web content using global edge servers, DNS-based routing, and caching models like pull vs push. Learn how Anycast and GeoDNS optimize performance for static websites and modern apps.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

CDN is a global network of edge servers*(system of distributed servers)* designed to deliver web content and other digital assets to users based on their geographic location. General usecases for a CDN are in media streaming, e-commerce and even websites with loads of static content just like this one. *Companies like Akamai, Cloudflare and AWS provides CDN as a Service*

**Key Features -** 

- Low Latency by delivering content quickly through edge server.
- Region-Specific content by storing different versions of content.
- Distributed Cache System to reduce latency and also handle data consistency challenges.

## Content caching strategies

- Push CDN : Content gets sent automatically to CDN proxy servers from origin server. Used for static content.
- Pull CDN : Pulls unavailable data from origin server when requested by a user. Proxy server keep the files for a specified time and then remove them from cache. Favored for frequently changing content and high traffic load.

---

## Content Consistency in CDN

To ensure users get fresh and accurate content, CDNs use caching strategies that periodically validate or expire content stored at edge servers.

1. Periodic Polling : Using the pull model, proxy servers request the origin server periodically for updated data and change the content in the cache accordingly. It uses TTR(Time to Refresh). Think of it like checking your inbox every 10 minutes to see if a new email has arrived—even if there’s nothing new.
2. TTL ( Time to Live ) : Each object has a TTL attribute assigned to it by the origin server. This is much more efficient. TTL is like setting an alarm to recheck something only after a specific time has passed

---

## How a CDN works ?

**The Setup**

Lets say you’ve bought a domain [*www.csprimer.in](http://www.csprimer.in)* from godaddy/hostinger and host a static site on AWS S3 bucket.

For smart, location-aware routing, you use **Amazon Route 53** for DNS, since GoDaddy’s DNS service doesn’t support GeoDNS. You link your domain to CloudFront using Route 53’s DNS settings, completing the setup.

**User accesses the website** 

A user in Bengaluru, India opens [*www.csprimer.in](http://www.csprimer.in)*  in their browser. Browser asks your OS to resolve domain which in turn contacts a DNS resolver *(either by your network - airtel, jio or public DNS like Google’s or Cloudflare’s)*

**🚀 Anycast DNS Accelerates the Resolution**

DNS query is routed using Anycast DNS- a technique where multiple DNS servers worldwide share the same IP address.

The query automatically travels to the **nearest** DNS server, thanks to BGP *(Border Gateway Protocol)*

**🧭 GeoDNS Comes Into Play**

Once the DNS resolver reaches the authoritative server*(AWS Route 53)* - **GeoDNS** kicks in. It examines the user's IP address, estimates their location, and responds with the IP address of a CloudFront edge server that’s geographically optimal.

**Cloudfront Edge Servers handle the request** 

Browser now sends a request to the CloudFront edge server IP it received. If it is cached at edge, served instantly otherwise fetches it from S3 origin, caches and delivers.

**🔀 Client Multiplexing (Advanced Optimization)**

If you use multi-CDN setups or advanced routing logic, client multiplexing can optimize delivery further. The browser or app may test multiple CDN paths and choose the fastest, and can even switch CDNs automatically based on latency.

**User receives the website**

With these mechanisms in place, the user receives a fast, secure, and cached version of your website delivered from a server that’s practically next door.
