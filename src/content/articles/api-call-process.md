---
title: What Happens During an API Call?
meta_title: API Call Explained- CS Guide | CS Primer
description: Understand API calls. Learn the request-response cycle and how APIs connect apps in software development.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

So you understand what an API is, you understand how internet works !

But how do API works? What does your app actually *do* when it sends a request to an API like Google Maps or Zomato?

## Step 1: A User Triggers an Action

Imagine a user taps *“Track My Order”*.

This tells the app *“Go fetch the latest order status from the server”.*

---

## Step 2: The App Makes an HTTP Request

```bash
GET https://api.foodapp.com/v1/orders/123
```

---

## Step 3: Networking Stack Does Its Thing

The device starts routing the request. Three key things happen:

- **DNS (Domain Name System)** - Looks up `api.foodapp.com` and finds its IP, like `192.168.2.10`.
- **IP (Internet Protocol)** - ****Handles where the request should go (like the address on a letter).
- **TCP (Transmission Control Protocol)** - ****Breaks the request into packets, ensures reliable delivery.

---

## Step 4: Server Receives and Processes the Request

The server gets the request, looks up data from a *database* or other useful things and assembles a response.

The server sends a response like:

```json
{
  "orderId": "123",
  "status": "On the way"
}
```

---

## Step 5: The Client Gets a Response

The response returns over the same TCP/HTTP path. If all goes well we get a  `200 OK` . The app then parses the JSON and updates the UI.