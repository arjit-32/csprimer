---
title: Introduction to Operating System
author: Arjit Sharma
meta_title: Introduction to Operating Systems  History, Role & Developer Tools Explained
description: Explore the evolution of Operating Systems from punch cards to cloud computing. Learn how OS tools help developers optimize and troubleshoot real-world web applications.
series: ["os"]
categories: ["Core-CS"]
---

Operating systems (OS) are the backbone of every program you build, acting as the bridge between your code and the hardware.

## A Brief History

In the 1940s, computers like ENIAC had no operating systems. Programmers manually wired cables and flipped switches to run programs. The von Neumann architecture (1945) revolutionized this by storing programs and data in memory, enabling flexible computing.

![history-of-operating-systems](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780379383/history-of-os_j0dqzr.webp)

- Batch Processing (1950s): Systems like the IBM 701 introduced batch processing, where programs were loaded via punch cards and executed sequentially.
- Time-Sharing (1960s): Computers evolved to support multiple users simultaneously. Systems like CTSS allowed interactive terminals, a precursor to modern multitasking.
- UNIX (1970s): The birth of UNIX at Bell Labs transformed computing. It introduced modularity, file systems, and multitasking shaping the modern OS design.
- GUI & Personal Computing (1980s): The rise of Macintosh and Windows introduced graphical user interfaces, making computing more accessible.
- LINUX(1990s): Then with the internet boom and open source, linux was developed and is used in most web servers today.
- Mobile and Cloud Computing(2000s): iOS and Android rose to power. Also with virtualizations cloud computing became popular.

---

## A developer’s use case ?

![developers-use-case-of-os](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780379382/developers-use-of-os_wghca2.webp)

An OS manages system resources, making it essential when deploying applications. It runs web servers as processes, sharing CPU with services like databases. It also handles networking, routing HTTP requests to the correct ports, and manages file systems to serve static assets efficiently.

While the OS operates behind the scenes of web applications, understanding its core concepts simplifies **troubleshooting and optimization**.

Useful OS Tools for Developers

![useful-tools-for-developers](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780379384/useful-os-tools-for-developers_wdanka.webp)

- Monitoring: top and htop show real-time CPU, memory, and process usage; Prometheus tracks detailed metrics for scaling.
- Process Management: systemd or pm2 manage app processes, restarting them if they crash.
- Logging: journalctl (Linux) or ELK Stack analyze logs to debug issues.
- Security: Firewalls (ufw, iptables) and permissions (chmod) protect your server.
- Resource Control: nice or cgroups prioritize CPU and memory for critical services.

---

## Real World Example

Lets say you’re deploying a simple Todo app (MongoDB, Express.js, React, Node.js) for creating and managing tasks on an AWS EC2 instance running Ubuntu .

![example-of-os-for-devs](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780379383/real-example-for-devs_foydo6.webp)

OS plays crucial role in →

- Node.js and Express run as a process, handling API requests. OS manages CPU/memory allocation for this.
- React is built to static files and served via Nginx or Express.
- MongoDB runs as background service, OS ensures disk and memory allocation.
- HTTP requests to port 80/443 serve the frontend (React static files), while API requests from the React app are sent to the backend (Express on port 5000 or another API port).

![dev-monitor](https://res.cloudinary.com/dwa6rcttw/image/upload/v1780379383/real-example-for-devs-monitor_bcdcsm.webp)

Lets say you realize adding tasks in your webapp became slow, so you can run *top ,* and lets say detect a high MongoDB CPU usage. Then you can add some solution, maybe improve query/add index and thereby knowing OS would help you find these type of performance bottlenecks quicker *(indirectly)*.
