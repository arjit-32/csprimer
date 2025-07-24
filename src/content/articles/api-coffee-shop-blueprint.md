---
title: Designing the Coffee Shop API - A Practical Blueprint
meta_title: Coffee Shop API Design Guide | CS Primer
description: Design a Coffee Shop API. Follow this practical blueprint to build real-world APIs for web apps.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

A good API design doesn’t start with code. It starts with modeling real-world interactions and making thoughtful design choices that allow different software components to communicate clearly and consistently.

In this article, we’ll walk through designing a **Coffee Shop API** by applying the principles we learned in previous article. This won’t involve code just design decisions that shape a future-proof interface.

---

## Step 1: Think in Real-World Terms

Mainly think about → **Participants** *(who will use the app)* and **Activities** *(what will they do with the app)*

**Participants**

- **Customer** - wants to place orders and view the menu
- **Cashier** - helps place orders on behalf of customers

**Activities**

- Customer browses coffee options
- Customer builds/modifies a cart
- Customer places or cancels an order

---

## Step 2: Define Requirements

Let’s identify what the API must do:

### Functional Requirements

- Browse *menu,* look at a specific *item*
- Add/remove/clear items in a *cart*
- Place/cancel an *order*

### Non-Functional Requirements

- Secure endpoints via authentication
- Scalable and simple to maintain

Based on our requirements, we can identify entities of your API →

`menu` , `cart` and `order`

---

## Step 3: Defining Architecture of API

### Architectural Style: REST

We choose **REST over HTTP** for this API because it’s **resource-oriented (** ideal for entities like `menu`, `cart`, and `order` ) on top of that it fits CRUD style well.

### Data Format: JSON

JSON as it's readable and sufficient for our domain.

### Protocol: HTTP/1.1

We wont need HTTP-2 and above as there is no need of multiplexing or streaming. Our only requirement is a *persistent connections (useful for cart/order updates)*

### Map Resources to HTTP Verbs and Endpoints

Based on activities, we define the resources and the operations each supports. We also chose Versioning technique and Endpoints based on that.

| **Resource** | **Action** | **HTTP Method** | **Endpoint** |
| --- | --- | --- | --- |
| **menu** | View menu | *GET* | **/v1/menu** |
|  | Get a item details | *GET* | **/v1/menu/items/{itemId}** |
| **cart** | View cart | *GET* | **/v1/cart/** |
|  | Add item to cart | *POST* | **/v1/cart/items/** |
|  | Remove item from cart | *DELETE* | **/v1/cart/items/** |
|  | Clear cart | *DELETE* | **/v1/cart/** |
| **order** | Place order | *POST* | **/v1/order** |
|  | View order | *GET* | **/v1/order/{orderId}** |
|  | Cancel order | *DELETE* | **/v1/order/{orderId}** |

---

## Step 4: Mock & Prototype Before Coding

Before implementing in code, create static mock responses (JSON) for each endpoint. Validate naming, structure, and flow *(tools like Swagger/OpenAPI, Postman mock server)* might help.

In our case, we just take example requests:

- Looking at cappuccino details →

```json
// GET /v1/menu/items/123
{
  "id": "123",
  "name": "Cappuccino",
  "price": 140
}
```

- Adding cappuccino to cart →

```json
// POST /v1/cart/items
{
  "itemId": "123",
  "quantity": 1,
}
```

*Similarly we can mock all the API endpoints to find wholes in our design.*

---

## Step 5: Security

We can do a simple *Authentication* using JWT tokens as it is made for a small coffee shop. Can add *Authorization* levels as Customer is allowed to GET menu, Add to Cart and Post Order but only Cashier can cancel order once places, as that is a special case.

---

## Step 6: API Evolvution

Design should accommodate change, we can add filters (`GET /v1/orders?status=cancelled&date=today`) or add new endpoints (e.g., `/v1/customer/preferences`) without breaking older versions

---

## Final Summary

Using this simple example we saw a whole timeline of how decisions are made while building a API. We went from identifying entities, choosing Architecture, mapping endpoints and then later we develop. This **design-first approach** ensures our API is scalable, secure, and easy to use before writing a single line of code.