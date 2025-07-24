---
title: The Web - History & Evolution
meta_title: The Web’s Evolution- From ARPANET to the Modern MERN Stack
description: Dive into the origin and growth of the internet from early protocols like TCP/IP to modern web technologies. Learn how the Web works behind the scenes and build a solid foundation for MERN stack development.
author: Arjit Sharma
series: ["fullstack"]
categories: ["Development"]
draft: false
year: 2025
---

The internet and the World Wide Web have transformed how we communicate, work, and access information.

## The Birth of the Internet and Web

- In **1960s**, The U.S. Department of Defense funded *ARPANET*, which devised a revolutionary method of breaking a message into packets and send independently across network called **packet switching** (unlike circuit switching which used to take the whole line - early telephone calls)
- **1974**: TCP/IP Protocol was developed, allowing different computers to communicate reliably.
- **1983**: ARPANET adopted TCP/IP, and this became the foundation for the modern internet.

### World Wide Web

In **1989**, Tim Berners-Lee, a scientist at CERN, invented the World Wide Web (WWW) to make information sharing easier.

His vision was a system where documents could be linked via hypertext *(clickable connections between pages)* using HTML *(HyperText Markup Language)*. What made this possible was HTTP *(HyperText Transfer Protocol)*, a standardized protocol for requesting and delivering web content.

- **1991:** The first website went live at CERN, explaining the *WWW* project.
- **1993**: The Mosaic browser, with its graphical interface, made the web intuitive for non-technical users, sparking widespread adoption.
- **1995:** JavaScript introduced dynamic behavior, allowing interactivity like form validation or animations directly in the browser.

---

## How Websites Load: From URL to Screen

When you type a URL like https://csprimer.in on Google/Mozilla etc , a series of step take place - 

- **DNS Lookup:** The browser translates the domain name into an IP address (e.g., 142.250.190.78).
- **HTTP/HTTPS Request:** The browser sends an HTTP request to the server at that IP address, asking for the webpage’s resources.
- **Server Response:** The server processes the request, often querying a database or running backend logic (e.g., via PHP, Python, or Node.js). It then sends back the necessary files, including *HTML, CSS, JS and Media*
- **Browser Rendering:** The browser parses the HTML to build the DOM (Document Object Model), applies CSS for visuals, and executes JavaScript for interactivity.