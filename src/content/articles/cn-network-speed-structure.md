---
title: Network Speed, Structure, and Safety
author: Arjit Sharma
meta_title: Network Speed, Protocol Stack & Cybersecurity Explained 
description: Explore how network performance is impacted by delay types and layering in protocol stacks. Learn about threats like malware, DoS, and packet sniffing—and how internet security protects modern communication.
series: ["cn"]
categories: ["Core-CS"]
---

## Performance

Packets experience delays as they travel through the network. Types of delays are →

| **Delay Type** | **Meaning** | **Analogy** |
| --- | --- | --- |
| Queuing Delay | Packets waiting in the router's buffer before being forwarded due to network congestion | Cars waiting in line before reaching the toll booth due to traffic congestion |
| Processing Delay | Router checking the packet’s header and deciding where to forward it | Toll booth verifying payment before allowing the car to pass |
| Transmission Delay | Time taken to push all bits of a packet onto the transmission medium (fiber-optic or copper cable) | The toll booth lifts the barrier, and your car moves onto the highway.
 |
| Propagation Delay | Time taken for data to travel through the physical medium (fiber optic cable or wireless network) | Time taken for a car to drive from the toll booth to the next checkpoint or destination |

Throughput - The rate at which data is successfully transferred between sender and receiver, measured in bits per second (bps, Mbps, Gbps).

---

## Layering

The Internet organizes its protocols into a stack of layers, each providing specific functions and services to the layer above it.

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1752678947/image_swy32i.png)

---

## Network Security

Internet’s open nature makes it vulnerable to attacks that disrupt services or compromise data.

Types of Attacks:

- Malware: Malicious software (e.g., viruses, worms, ransomware) that infects end systems, often spreading via email, downloads, or network vulnerabilities. Can steal data, delete files, or take control of devices.
- Denial-of-Service (DoS): Attackers flood a server, router, or network with traffic to overwhelm it, preventing legitimate users from accessing services.
- Packet Sniffing: Attackers intercept and read packets traveling over unencrypted networks (e.g., public Wi-Fi), capturing sensitive data like passwords.
- Spoofing: Attackers impersonate a trusted system by forging packet headers (e.g., fake IP addresses) to trick devices into accepting malicious data.