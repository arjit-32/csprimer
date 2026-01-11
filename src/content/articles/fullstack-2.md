---
title: How websites are served
meta_title: How Websites Work- Servers, DNS, and HTTP
description: Understand the process of how websites are delivered to users. Learn about web servers, DNS resolution, HTTP requests, and the role of browsers in rendering pages. Build a clear foundation for modern web development.
author: Arjit Sharma
series: ["html-css"]
categories: ["Development"]
draft: false
year: 2025
---


Ever wondered What happens when you type a URL like *https://csprimer.in* on Google/Mozilla etc ?


## From URL to Screen

A series of steps take place starting right at the browser.

- **DNS Lookup:** The browser translates the domain name into an IP address (e.g., 142.250.190.78).
- **HTTP/HTTPS Request:** The browser sends an HTTP request to the server at that IP address, asking for the webpage’s resources.
- **Server Response:** The server processes the request, often querying a database or running backend logic (e.g., via PHP, Python, or Node.js). It then sends back the necessary files, including *HTML, CSS, JS and Media*
- **Browser Rendering:** The browser parses the HTML to build the DOM (Document Object Model), applies CSS for visuals, and executes JavaScript for interactivity.

---

## Evolution of How Websites Are Served

Over the last three decades, how we serve websites has changed drastically. From being a simple collection of HTML files to generating dynamic content on the fly, a lot has evolved.

- **1991 (Static Sites):** Websites were simple `.html` files served directly from a server.
- **1995 (Dynamic PHP Era):** Server-side scripting enabled pages generated from databases and user input.
- **2000s (Java & Enterprise):** Frameworks like Struts/Spring powered scalable, monolithic enterprise web apps.
- **2006 (Cloud Infrastructure):** AWS EC2 democratized hosting, shifting from physical servers to on-demand cloud.
- **2010s (JavaScript Frameworks & SPAs):** React, Angular, Vue moved rendering to the browser with API-driven backends.
- **2010s (Microservices & Containers):** Apps split into independent services, deployed via Docker and Kubernetes.
- **Late 2010s (Serverless & Edge):** Functions and CDNs delivered code and content globally without managing servers.
- **2020s (Jamstack & Hybrid):** Static generation plus APIs and modern frameworks (Next.js, SvelteKit) enable fast, secure, flexible sites.