---
title: The Internet Demystified-  Core Concepts
author: Arjit Sharma
meta_title: Internet Demystified  Core Concepts, Network Edge & Routing Explained
description: Understand the building blocks of the Internet—from access networks and packet switching to routing and protocols. Learn how data travels from your browser to global servers in this Core-CS primer.
series: cn
categories: ["Core-CS"]
---

Internet is a worldwide network of computer networks that connects millions of devices. The Internet provides services to applications, like delivering web pages (HTTP), emails (SMTP), or file transfers (FTP).

![internet-and-its-components](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/the-internet_e1akqw.webp)

Components →

- End Systems: Devices that run applications (e.g., your laptop running a browser or a server hosting a website).
- Communication Links: Physical media like fiber optic cables, Wi-Fi, or Ethernet that carry data.
- Packet Switches: Routers and switches that direct data traffic. Routers connect different networks; switches operate within a single network.
- Protocols: Rules that govern data communication, like TCP, IP, and HTTP. They ensure devices can “talk” to each other. Internet protocols are defined by standards bodies like the IETF (Internet Engineering Task Force), which publishes RFCs (Request for Comments).

---

## Network Edge

End Systems (Hosts) like laptops, smartphones or servers that run applications (e.g., browsers, email clients, web servers) make up the network edge.

**2 Models of connectivity -**

![network-edge](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/network-edge_funxbt.webp)

- Client-Server Model - Your browser (client) sends an HTTP request to a website’s server, which responds with the webpage data.
- Peer-to-Peer(P2P) Model - File-sharing systems like BitTorrent, where users download and upload files to each other.

---

## Access Networks

The networks that connect end systems. 

**Types -**

![access-networks](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/access-networks_venjbk.webp)

- Residential: Connects homes to internet using wired technologies. Example - DSL (uses phone lines), cable (uses TV cables), or fiber-to-the-home (FTTH).
- Wi-Fi: Wireless local area networks (LANs) connecting devices to a router, which in turn can be connected to a cable or Fiber Internet.
- Mobile: Cellular networks (e.g., 4G, 5G) connecting smartphones to the Internet.

---

## Network Core

The network core is the interconnected mesh of routers and switches that moves data packets between end systems across the Internet.

### Packet Switching and Circuit Switching

- *Packet Switching -* Data is divided into packets, small chunks with source/destination addresses, onde they reach destination packets are reassembled.
![packet-switching](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/packet-switching_utebjg.webp)

- *Circuit Switching -* Reserves a dedicated circuit for the entire communication, like traditional phone calls.
![circuit-patching](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/circuit-patching_o0toij.webp)

### Forwarding and Routing

![forwarding-and-routing](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786640884/routing-and-forwarding_tgwhf6.webp)

- *Forwarding -* A router uses its forwarding table to send a packet to the next hop based on the packet’s destination IP address.

- *Routing -* Algorithms (e.g., RIP, OSPF, BGP) compute the best paths and update forwarding tables to guide packets across the network.
