---
title: Introduction to APIs 
meta_title: Introduction to APIs- CS Basics | CS Primer
description: Start with APIs. Learn what APIs are, their role in software, and how they power modern applications in CS.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

## What is an API ?

API ( Application Programming Interface ) is an intermediatory that lets software components talk to each other. 

It started with IBM’s release of [CICS](https://www.notion.so/API-Design-Development-79b3f02dabd24fdbbf2fb2739e1c0ecf?pvs=21) , which allowed different programs to communicate with each other and then later with UNIX’s system calls(api) became more mainstream.

---

## What is an API Endpoint?

An API endpoint is simply **a specific location on a server** where your app sends a request and expects a response.

### URI vs URL vs URN

- URI ( Uniform Resource Identifier ) is  **general term** for anything that identifies a resource.
- URL ( Uniform Resource Locator ) is a type of URI that specifies location of resource on internet. It identifies *“where”.*
    
    Example - **https://www.csprimer.in/page.html**
    
- URN ( Uniform Resource Name ) is a type of URI that identifies a resource by name instead of location. It identifies *“what” .*
    
    Example - **urn:isbn:0451450523**
    

---

## Benefits of APIs

1. Hiding complexity - You dont need to learn how Google Maps work, just ask what you want.
2. Improved Modularity - Teams can build parts of system independently.
3. Efficient development - Use API’s instead of re-inventing the wheel. *Example - just use Stripe for payment*

---

## Types of APIs

1. **Public APIs** - Free to access by consumers. *Example: Google Maps API lets apps show locations or directions.*
2. **Private APIs** - Used within the organization.  *Example: A bank’s internal API for checking customer balances between systems.*
3. **Partner APIs** - Used between two strategic business partners. *Example: Amazon shares APIs with delivery partners to track packages.*
4. **Composite APIs** - Bundle multiple requests into one. *Example:  Purchasing an item on Amazon involves adding product to cart, then checkout and then make payment. Combine all in one.*

---

## Business-Side of APIs

At the end of the day, APIs are products, and are sold by companies. So lets look at some business terms - 

- *SLI* (Service Level Indicator) is quantitative measure of service being provided.
    
    👉 “How fast does the API respond?”
    
- *SLO* (Service Level Objective) is target set for one or more SLI.
    
    👉 “We aim for 99.9% uptime and 200ms response time.”
    
- *SLA* (Service Level Agreement) is contract between customer and provider.