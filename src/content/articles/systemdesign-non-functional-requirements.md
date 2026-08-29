---
title: Non-Functional Requirements
meta_title: Non-Functional Requirements in System Design  Security, Scalability & Performance
description: Explore key non-functional requirements like security, availability, fault tolerance, and scalability. Learn how system architecture meets quality goals under load, failure, and evolving demands.
author: Arjit Sharma
series: system-design-foundation
categories: ["System-Design"]
draft: false
year: 2025
---

In early stages of architecting any system, one of the most critical responsibilities is to understand “what” the system is supposed to do. These considerations are captured through functional and non-functional requirements.

## Key Non-Functional Requirements

These define system qualities - how it behaves under constraints like load, failures or threats.

| **Requirement** | **Meaning** |
| --- | --- |
| **Security** | Prevent unauthorized access; ensure data confidentiality and integrity. |
| **Availability** | Ensure the system is accessible and operational when needed. |
| **Reliability** | Ensure the system consistently performs its intended functions. |
| **Scalability** | Ability to gracefully handle increased load or traffic. |
| **Maintainability** | Ease of updating, debugging, and evolving the system over time. |
| **Fault Tolerance** | The system’s ability to function even when parts of it fail. |
| **Performance** | Includes response time, throughput, and system resource usage. |

---

## Security Requirement

Security is a foundational NFR, especially for modern, internet-facing systems. Key dimensions include:

- **Access Control** - Restrictions on which users or services can access specific resources.
- **Authentication** - Verifying the user is who they claim to be (e.g., login with credentials, OTP, OAuth).
- **Authorization** - Determining what an authenticated user is allowed to do.
- **Encryption** - Protecting data in transit (TLS/HTTPS) and at rest (AES, RSA).
- **Auditing and Logging** - Recording system events to trace unauthorized or suspicious activity.

---

## Availability & Reliability

Availability measures the proportion of time the system is accessible. It’s usually expressed as a percentage over a time period (e.g., 99.9% uptime per month).

Reliability focuses on whether the system delivers the correct functionality consistently over time. It’s often expressed using *MTBF (Mean Time Between Failures)* and *MTTR (Mean Time to Recovery)*

Techniques to Improve Availability are - 

- **Redundancy** - Duplicate servers or services that can take over during failure.
- **Failover Systems** - Automatic switch to backup components when primary fails.
- **Replication** - Maintain multiple consistent copies of data across nodes.

---

## Scalability

Scalability ensures the system can grow in capacity without degrading performance.

Two Types are -

- **Vertical Scaling** - Increase resources on a single machine (e.g., more CPU/RAM).
- **Horizontal Scaling** - Add more machines to the system.

---

## Maintainability & Fault Tolerance

- **Maintainability** - Focuses on how easily the system can be debugged, upgraded, and modified. Code readability, modular design, and proper documentation all contribute.
- **Fault Tolerance** - It ensures continuity even if part of the system fails. Techniques include graceful degradation, retries with exponential backoff, and circuit breakers.

---

## Conclusion

Functional requirements are the baseline of “what” the system must do, but the non-functional requirements are where architecture comes alive. They answer the harder question: *can it do what it’s supposed to, under pressure, at scale, securely, and reliably?*
