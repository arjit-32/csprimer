---
title: From IP to MAC- What Happens Just Below the Internet Layer
author: Arjit Sharma
meta_title: From IP to MAC  Link Layer, ARP & Local Frame Delivery Explained
description: Explore what happens beneath the network layer as devices use MAC addresses, ARP, and Ethernet-style framing for local data transfer. Learn how your phone connects to the router before reaching the Internet.
series: ["cn"]
categories: ["Core-CS"]
---

Let’s say you're relaxing at home, phone in hand, connected to Wi-Fi. You open the YouTube app and tap on a video. That simple action kicks off a surprisingly complex dance of networking protocols beneath the surface.

Lets checkout what happens below the internet layer by this example.

## Link Layer - The Layers Beneath Network

By now you're probably familiar with the basics:

- IP: Provides addressing so devices can communicate across networks
- TCP/UDP: Handles transport of data (reliable or fast, depending on the protocol)
- HTTP: Tells the server what content you want (like a video)

But these all sit above the link layer, the part responsible for getting data from your phone to the Wi-Fi router and out to the internet.

---

## Local Delivery Needs MAC Addresses

Your phone knows YouTube’s IP address ( *142.250.72.206*) from a DNS lookup. But since YouTube isn’t directly reachable, your phone must first send packets to the Wi-Fi router, which acts as a gateway to the internet.

To do that, it needs the router's MAC address.

- Your phone’s Wi-Fi chip has its own MAC (a unique hardware ID like *AA:BB:CC:DD:EE:FF*)
- So your router is used for local communication only

Your phone asks - “To send my video request to YouTube, I need to pass it to my router first. What’s its MAC address?”

---

## ARP: Finding the Router’s MAC

Here’s how your phone figures it out:

1. It sends an **ARP request** over Wi-Fi:
“Who has IP `192.168.1.1`?” (That’s usually your router’s IP)
2. Your router replies:
“My MAC is `AB:CD:EF:12:34:56`”
3. Your phone stores this in its ARP cache and sends the YouTube request **framed** for that MAC

---

## The Ethernet Frame: Packaging for Local Travel

To get your request to the router, your phone wraps the IP packet in an **Ethernet-style frame** (yes, even on Wi-Fi):

- **Destination MAC**: Your router’s MAC
- **Source MAC**: Your phone’s MAC
- **Payload**: The IP packet with your HTTP request to YouTube
- **CRC**: A code for detecting transmission errors

The Wi-Fi router receives this frame, extracts the IP packet, and forwards it out to YouTube's servers using its public IP.

---

## Wi-Fi’s Role: Different Transport, Same Concepts

Though Ethernet is typically wired, Wi-Fi works similarly at the link layer just with a different media access technique called **CSMA/CA (Collision Avoidance)**.

Your phone still:

- Uses MAC addresses
- Resolves them via ARP
- Wraps IP packets in frames

It just sends them *over radio waves instead of cables*.