---
title: Crash course on Internet Basics
meta_title: Internet Basics- Crash Course | CS Primer
description: Learn internet basics in this crash course. Understand networks and protocols for API design and web development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Whether you’re building APIs or just consuming them, understanding how the Internet works is like knowing the roads before you start driving. In this post we will go through a brief overview of Computer Networks.

## What *Is* the Internet?

Internet is a giant network of networks. Billions of devices - laptops, phones, servers  all connected together, talking via shared rules.

---

## What About the Web?

The **World Wide Web (WWW)** is a service that *uses* the Internet. It’s the collection of websites, documents and multimedia content that your browser fetches *(chrome, firefox etc)* when you go to say, `https://csprimer.in`.

---

## What Are Web Protocols?

Web protocols are rules that help different parts of the Internet talk to each other. When you use a web browser, it shows you information from a server in form of a web page. This information travels between your browser and the server using a protocol called *HTTP*.

Other examples of protocols are - FTP, SMTP that send information over the internet and use lower level protocol TCP, UDP, IP.

---

## HTTP - The Language of the Web

When you type a URL into your browser or call an API, you're using *HTTP (Hypertext Transfer Protocol)* - a request/response based protocol.

**Example:**

```sh
GET /hello HTTP/1.1
Host: csprimer.in
```

*GET* is the HTTP method (retrieve data), */hello* is the API *endpoint.* Headers often include things like *Authorization: Bearer <token> ( Used in JWT Auth )* and *Content-Type: application/json (which kind of data is being sent)*

The server replies with something like:

```sh
200 OK
Content-Type: text/html

<html><body>Hello world!</body></html>
```

---

## Where Does TCP/IP Fit In?

HTTP relies on lower-level protocols for correct communication between you and websites.

- **TCP (Transmission Control Protocol) -** Think of this like sending a set of numbered envelopes, it guarantees that all your data arrives and in the correct order.
- **IP (Internet Protocol) -** This handles *where* the data goes *(its like the mailing address)*.

---

## Conclusion

Understanding this stack helps you write faster, more reliable APIs, and debug tricky issues like latency, dropped packets, or CORS errors which we will discuss later in the series

