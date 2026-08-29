---
title: Computer Network- A Complete Picture
author: Arjit Sharma
meta_title: How a URL Loads a Website  DNS, TCP/IP Stack & HTTP Request Explained
description: Explore how browsers fetch websites step by step—from DNS resolution and TCP handshake to protocol stacks and server responses. A complete journey through modern computer networking.
series: ["cn"]
categories: ["Core-CS"]
---

Ever wondered what happens when you type a URL like ***csprimer.in*** into your browser and hit Enter? Beneath that simple action lies series of networking and system events. In this article lets unpack this.

## Step 1: You Type *csprimer.in* into Chrome

![you-type-domain](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/1-complete-picture-of-cn_v8nq4l.webp)

Your browser is just another software application. It doesn’t yet know the IP address of *csprimer.in*, so it needs to ask.

---

## Step 2: DNS Resolution

![dns-resolution](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/2-complete-picture-of-cn_ndkbel.webp)

- Chrome queries the Operating System (OS) to resolve the domain name
- OS checks its DNS cache; if not found, it queries a configured DNS resolver
- This may involve multiple recursive DNS queries until it reaches the authoritative server for *csprimer.in*
- The resolved IP address (e.g., *142.250.190.78*) is returned to the browser

---

## Step 3: Browser Prepares an HTTP Request

![browser-prepares-http-request](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269443/3-complete-picture-of-cn_b2zury.webp)

- The browser constructs a **GET / HTTP/1.1** request with headers (Host, User-Agent, etc.)
- This is application-layer data ready to be sent to the web server

---

## Step 4: OS Assigns a Source Port & Initiates TCP Connection

![tcp-connection](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/4-complete-picture-of-cn_arymxu.webp)

- The browser hands the HTTP request to the OS’s networking stack
- OS chooses a **source port** (e.g., *49152*) and uses **TCP** to establish a **three-way handshake** with the destination server's port *80* or *443* (for HTTPS)
- A reliable channel is now established for sending data

---

## Step 5: Request Travels Through the Protocol Stack

![request-travels](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/5-complete-picture-of-cn_juhldy.webp)

The HTTP request is encapsulated in layers as it moves down:

| **Layer** | **Action** |
| --- | --- |
| Application | Constructs HTTP request |
| Transport | TCP segments the data, adds port info |
| Internet | Adds IP headers, including source and destination IPs |
| Network Access | Converts data into frames; moves via physical medium |

The request is sent over the Internet, hopping through routers and switches.

---

## Step 6: Server-Side Handling

![server-side-handling](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/6-complete-picture-of-cn_iokkjq.webp)

- The destination server (e.g., running **Apache** or **Nginx**) receives the packet
- OS on the server checks the **destination port**, sees it's for HTTP (port *80*), and passes it to the **correct application process** via a **socket**
- The web server reads the request and processes it (e.g., routing, templating, database queries)

---

## Step 7: Server Sends Back an HTTP Response

![server-sends-http-request](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/7-complete-picture-of-cn_msxed8.webp)

- Web server generates a response: headers + HTML body
- This response is sent back through the same TCP connection
- It travels up the stack from physical → data link → network → transport → application

---

## Step 8: Browser Receives and Renders

![browser-renders-page](https://res.cloudinary.com/dwa6rcttw/image/upload/v1786269444/8-complete-picture-of-cn_bkc90j.webp)

- Chrome receives the HTTP response
- It parses the HTML, requests additional resources (CSS, JS, images)
- Renders the page to the user - *csprimer.in* now appears fully loaded

---

## Conclusion

This is the magic behind every click. A few milliseconds, and a cascade of layers and global collaboration help load those websites for you. Understanding this stack empowers software engineers to build better web apps, debug smarter, and optimize network-heavy systems.
