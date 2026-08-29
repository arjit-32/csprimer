---
title: A Brief Overview of Computer Networks
author: Arjit Sharma
meta_title: Introduction to Computer Networks  History, Models & Data Communication
description: Learn the foundations of computer networking—from ARPANET to the Internet. Explore transmission modes, network types, and OSI vs TCP/IP models in this beginner-friendly Core-CS guide.
series: ["cn"]
categories: ["Core-CS"]
---

A computer network is a collection of interconnected devices *(computers, servers, routers)*, that communicate to exchange data, services and resources across the globe.


## A Brief History

![cn-brief-history](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786263601/brief-history_vkkije.webp)

- **1969 - ARPANET Launches**
- **1974 - TCP Protocol Proposed**
Cerf & Kahn introduce TCP, enabling reliable communication across diverse networks.
- **1983 -** ARPANET adopts TCP/IP; DNS system introduced to map domain names to IPs.
- **1989 - World Wide Web Invented**
Tim Berners-Lee creates HTTP and HTML, revolutionizing how we access and share information.
- **1993 - Mosaic Browser Released**
First graphical web browser makes the Internet user-friendly and widely accessible.

---

## Data Communication


![cn-introduction](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786263601/cn-introduction_exygvb.webp)

Data communication is the exchange of data between devices over a transmission medium. It relies on:

![cn-data-communication](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786263602/data-communication_rojmen.webp)

- **Sender, Receiver, and Medium**: These entities define the communication setup
- **Protocols**: Rules that ensure data integrity and order
- **Bandwidth & Latency**: Affect the speed and efficiency of transmission

---

## Transmission Modes

Data can flow between devices in several ways:

- **Simplex**: One-way only *(e.g., keyboard to CPU)*
- **Half-Duplex**: Two-way, but only one direction at a time *(e.g., walkie-talkies)*
- **Full-Duplex**: Two-way simultaneous *(e.g., Zoom calls)*

---

## Connection Types

Networks can be built with different connection structures:

- **Point-to-Point**: Direct link between two nodes. It is fast and simple
- **Multipoint**: Multiple nodes share a link. It is efficient but complex

---

## Types of Networks

- **LAN (Local Area Network)**: Small-scale, such as office or home networks. *Example - A JioFiber router in your home*
- **MAN (Metropolitan Area Network)**: Covers a city or campus. *Example - Fiber infrastructure across Bengaluru city managed by local ISPs or government*
- **WAN (Wide Area Network)**: Large-scale, spans countries or continents (like the Internet).
- **PAN (Personal Area Network)**: Close-range, like Bluetooth-based systems

---

## Network Models

![network-models](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786263603/network-models_phc2d5.webp)

| **OSI Model (7 Layers)** | **TCP/IP Model (4 Layers)** | **Function of the Layer** |
| --- | --- | --- |
| 7. Application | Application | Interface for end-user software (e.g. HTTP, FTP, SMTP, DNS); handles network services |
| 6. Presentation | Application | Translates data format (e.g. encryption, compression, encoding) |
| 5. Session | Application | Manages sessions, connections, and dialogs between applications |
| 4. Transport | Transport | Provides reliable data transfer with error handling and flow control (e.g. TCP, UDP) |
| 3. Network | Internet | Handles routing, IP addressing, and packet forwarding across networks |
| 2. Data Link | Network Access | Manages physical addressing (MAC), framing, and error detection at node-to-node level |
| 1. Physical | Network Access | Handles transmission of raw bits over a physical medium (cables, signals, etc.) |

---

## Conclusion

Understanding the basics of computer networking empowers software engineers to build more robust, scalable, and efficient applications.
