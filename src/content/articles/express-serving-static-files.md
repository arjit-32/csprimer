---
title: Serving Static Files
meta_title: Serving Static Files with Express.js | CS Primer
description: Learn how to serve HTML, CSS, JavaScript, images, and other static assets using Express.js middleware.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Static files are assets like HTML, CSS, JavaScript, images, or fonts that don’t change dynamically. Express makes it easy to serve these files directly to clients, which is especially useful for hosting a website’s frontend or delivering assets such as logos, stylesheets, or scripts


## Basic Setup

To serve static files, use the built-in middleware `express.static()`.

```javascript
app.use(express.static("public")); // Serve files from the public folder
```

This will serve all files inside the public folder. For example:
- public/index.html → available at *http://localhost:3000/index.html*
- public/style.css → available at *http://localhost:3000/style.css*

---

## Custom Mount Path

You can mount the static middleware at a custom route. This is helpful when you want to organize or namespace your assets.

```javascript
app.use('/assets', express.static('public')); // public/logo.png is available at http://csprimer.in/assets/logo.png
```

Now, a file located at public/logo.png will be available at *http://localhost:3000/assets/logo.png*


---

## Advanced Options

You can configure caching and other options when serving static files:

```javascript
app.use(express.static("public", {
  maxAge: "1d",       // Cache files for 1 day
  index: "home.html", // Default file instead of index.html
}));
```

---

## Express.js vs CDN for Static files

Serving static files directly from Express is a good choice when the project is small, is a prototype, or a internal tool where traffic is limited.

For larger or production-grade applications, a Content Delivery Network (CDN) or object storage service is often better

- High traffic websites: CDNs distribute files across global servers, reducing latency.
- Heavy assets: Large images, videos, or downloadable files are better served from optimized storage.
- Scalability: CDNs handle spikes in traffic without stressing your server.
- Caching & performance: CDNs automatically cache assets close to users for faster delivery.
- Security: CDNs provide DDoS protection, HTTPS, and access controls.
- Cost efficiency: Offloading static assets reduces load on your application server, saving compute resources.


Hosting images on AWS S3 and serving them via CloudFront ensures global availability and faster load times compared to serving directly from Express.
