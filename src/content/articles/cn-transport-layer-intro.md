---
title: The Transport Layer- Connecting Applications Across the Internet
author: Arjit Sharma
meta_title: Transport Layer in Internet Explained  TCP, UDP, Sockets & Services
description: Learn how the transport layer enables reliable app-to-app communication over the Internet. Explore protocols like TCP and UDP, multiplexing, port numbers, and how sockets route data to the right process.
series: ["cn"]
categories: ["Core-CS"]
---

Every time you send a WhatsApp message, stream a YouTube video, or upload a photo, you're not just moving data from one device to another, you're connecting apps running on different devices. That’s where the Transport Layer steps in

## What Is the Transport Layer?

The transport layer is responsible for end-to-end **communication between processes** running on different hosts. 

Think of it like this:

- 🧑‍💻 The Application Layer is where user-facing apps live - like WhatsApp, Netflix, or your web browser. It handles what you see and interact with.
- 📮 The Network Layer moves packets of data from one device to another.
- 📬 The Transport Layer ensures those packets go to the right app on the right device, reassembles them correctly, checks for errors, and makes sure nothing gets lost.

---

## Key Services of the Transport Layer

| **Service** | **Purpose** |
| --- | --- |
| **Reliable Data Transfer** | Ensures data is delivered without loss, duplication, or errors |
| **Flow Control** | Prevents sender from overwhelming the receiver |
| **Congestion Control** | Helps prevent too much data flooding the network |
| **Multiplexing/Demultiplexing** | Manages data for multiple applications on the same device |

---

## Transport Layer Protocols: TCP vs UDP

| **Feature** | **TCP (Transmission Control Protocol)** | **UDP (User Datagram Protocol)** |
| --- | --- | --- |
| Connection | Connection-oriented | Connectionless |
| Reliability | Yes (acknowledgments, retransmissions) | No |
| Flow & Congestion Control | Yes | No |
| Use Cases | Web, email, file transfer | DNS, video streaming, VoIP |

---

## Multiplexing and Demultiplexing

Multiple apps can run on a device, how does the transport layer know which app should get the data? That’s handled through multiplexing (sending side) and demultiplexing (receiving side).

**Multiplexing -** Combining data from different applications and sending it over the network.

**Demultiplexing -** At the receiving end, using headers (like port numbers) to deliver the data to the correct application.

---

## Sockets and Port Numbers

Each application is identified by a socket:

```
Socket = IP Address + Port Number
```

Examples - HTTP*(Port 80),* HTTPS*(443)*, DNS*(53)*, FTP*(Port 21)*

When your browser connects to www.example.com, it uses a socket like → **[Your IP]:[Random Port] = [93.184.216.34]:80**

Imagine your device is downloading a file via HTTP and sending a message via WhatsApp, both happen simultaneously.

- HTTP might use port 80, WhatsApp might use port 5222
- The transport layer uses these port numbers to keep data streams separate

Note - *I know what you are thinking, how does chrome or edge having multiple tabs identify from which website data was sent. There comes the concept of source port to distinguish each connection behind the scenes.*