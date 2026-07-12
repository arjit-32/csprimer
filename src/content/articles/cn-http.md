---
title: A Beginner’s Guide to HTTP and Web Pages
author: Arjit Sharma
meta_title: HTTP & Web Page Basics Explained  Request-Response, Caching & HTTPS
description: Explore how HTTP powers the modern web—from request-response cycles and cookies to caching and secure connections. Learn about persistent vs non-persistent HTTP and the evolution of HTTP/1.0 to HTTP/3.
series: ["cn"]
categories: ["Core-CS"]
---

When you type a URL into your browser and hit Enter, a lot of things happen in the background to fetch and display that page. The magic behind it all is HTTP (HyperText Transfer Protocol). It is the foundation of data communication on the World Wide Web.

## What Is the Web?

The World Wide Web is a system of interlinked documents and applications, accessed through the Internet using web browsers.

- Each web page is stored on a web server.
- Your browser (the client) sends a request to the server.
- The server responds by sending back the requested web content (HTML, images, videos, etc.).

---

## HTTP: The Web's Communication Protocol

HTTP (HyperText Transfer Protocol) is the protocol used by browsers and web servers to communicate. It is:

- Text-based (you can read the messages)
- Stateless (each request is independent; the server doesn’t remember past interactions)
- Usually runs over TCP *(port 80 for HTTP, 443 for HTTPS)*

---

## HTTP Request-Response Cycle

When you load a web page, here's what typically happens -

1. Your browser sends an HTTP request to the web server (e.g., *GET /index.html*)
2. The server processes the request and sends back an HTTP response containing:
    - Status code (e.g., *200 OK, 404 Not Found*)
    - Headers *(metadata like content type)*
    - Body *(actual HTML, image, etc.)*

---

## Example: Basic HTTP Request and Response

**Request:**

```
GET /index.html HTTP/1.1
Host: www.csprimer.in
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 147

<html>
  <body>Hello, world!</body>
</html>
```

---

## Persistent vs Non-Persistent HTTP

HTTP connections can be either persistent or non-persistent, depending on how they handle multiple requests.

**Non-Persistent HTTP**

- For each object (HTML, image, CSS, etc.), a separate TCP connection is made.
- Slower due to repeated connection setup.
- Common in older versions like HTTP/1.0.

**Persistent HTTP**

- One TCP connection is reused for multiple objects.
- Reduces latency and is now the **default in HTTP/1.1**.

---

## Cookies: Making HTTP “Remember”

Since HTTP is stateless, how do websites remember if you’re logged in?

Enter cookies, a small data stored on your device*(browser)* that the server can use to maintain session state.

*This enables features like shopping carts, user logins, and preferences.*

---

## Web Caching: Speeding Things Up

Web caches are servers or devices that store copies of web content to reduce loading time and server load. If a requested object is in the cache *(and still valid)*, it’s served directly and there is no need to contact the origin server.

**Benefits:**

- Faster response times
- Lower bandwidth usage
- Reduced load on origin servers

*Note - Browser itself also has a cache*

---

## HTTP vs HTTPS

HTTPS (HyperText Transfer Protocol Secure) is HTTP over TLS (Transport Layer Security). In simple words it encrypts your communication with the server. It has become a standard for all modern websites, especially those with logins or sensitive data.

---

## HTTP Versions: Evolution Over Time
HTTP has evolved significantly since its inception, with each version introducing new features and improvements.

### HTTP/0.9:
- Single-line protocol supporting only the GET method.
- Responses were raw HTML without headers or status codes.

### HTTP/1.0:
- Introduced headers and additional methods (POST, HEAD).
- Opened a new TCP connection for each request-response pair.

### HTTP/1.1:
- Enabled persistent connections (keep-alive).
- Added request pipelining (sending multiple requests before receiving responses). But this still has a problem of Head-of-line blocking (if large request is delayed, subsequent request wait as well)
- Introduced chunked transfer encoding for streaming data.

### HTTP/2:
- Multiplexing: Interleaved multiple requests/responses over a single connection. In simple terms, multiple request-response share same TCP connection at same time using independent streams. This also solves Head of Line blocking problem.
- Header Compression: Reduced overhead using HPACK.
- Server Push: Allowed servers to send resources proactively (largely deprecated).
- Stream Prioritization: Each stream can have priority, server uses this priority to send important items first.
- The HTTP/2 specification does not strictly mandate encryption at the protocol level (unencrypted HTTP/2 is called h2c). However, all major browsers (such as Chrome, Safari, and Firefox) effectively require SSL/TLS (called h2)

### HTTP/3:
- Switched to QUIC (UDP-based transport protocol with built-in TLS 1.3).
- Faster connection setup compared to HTTP/2, because it doesnt have to do TCP handshake, then TLS handshake.
- Allows a connection to survive network changes(IP address change) without restarting.
- Eliminated Head-of-Line Blocking at the transport layer. While HTTP/2 streams are logically independent at the application layer and eliminate request-blocking, they share a single, underlying TCP connection, so a dropped packet blocks all streams which is not the case with HTTP/3.
- Improved performance and reliability.

---

## Conclusion

HTTP is the backbone of web communication, enabling seamless interaction between clients and servers. From its humble beginnings as a simple protocol to its modern iterations like HTTP/3, it has evolved to meet the demands of a fast, secure, and scalable web. 