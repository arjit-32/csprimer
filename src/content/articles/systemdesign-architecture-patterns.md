---
title: Architecture Patterns for dummies
meta_title: Architecture Patterns Explained  Centralized, MVC, Microservices & More
description: Discover common architecture patterns used in system design—from client-server and P2P to layered, broker, and microservices. Learn how systems are structured for scale, flexibility, and resilience.
author: Arjit Sharma
series: ["system-design-foundation"]
categories: ["System-Design"]
draft: false
year: 2025
---

While the usual client-server model is great starting point for most applications, there exist other patterns based on deployment, code organization etc. In this article we explore key architecture patterns in concise way.

## What is a Architecture pattern

An architecture pattern is a reusable solution to a commonly occurring problem in software system design. It’s like a blueprint or high-level structure that guides how the components of a system should be organized and how they should interact.

---

## Centralized and Decentralized

A **centralized system** is one where all processing, data storage, and decision-making are handled by a *single central server* or a tightly controlled group of servers. All clients (users or devices) depend on this central authority to function.

A **decentralized system** distributes control and processing across *multiple independent nodes.* Each node can make decisions and operate without relying on a central authority. Paul Baran, a researcher at RAND corp. came up with idea of distributed communication to survive a attack (remember it was cold war) in 1964 which was seen with skepticism by telecom operators but later influenced of ARPANET(1969) and later with birth of Internet.

---

## Layered Architecture

Divides a system into logical units or layers(e.g., presentation, business, data) each handling a specific task. Request flows through layers and can be open (allowing bypass) or closed (sequential)

*layer = Logical seperation*

---

## N-Tier Architecture

N-Tier Architecture (also called Multitier Architecture) is a software architecture pattern that divides an application into multiple physical tiers, where each tier is responsible for a specific concern and runs on a separate server or process.

These tiers communicate with each other using APIs.

*tier = Physical seperation*

---

## Model-View-Controller (MVC)

This architecture divides application into 3 primary components - 

Model - Business logic and data of the application. 

View - UI of the application.

Controller - Responsible for handling user input/interactions and communication between Model & View

---

## Model-View-ViewModel (MVVM)

The concept of the *Model* and *View* in MVVM is similar to MVC. The key difference is that instead of a *Controller* directing the View, a *ViewModel* acts as the intermediary. The View binds directly to properties and commands exposed by the ViewModel. This binding enables automatic UI updates whenever the underlying data changes - without the ViewModel needing to explicitly instruct the View.

---

## Client Server

It is a two-layered and typically two-tiered, architecture. The flow is quite simple, clients *(e.g., web browsers, mobile apps)* send requests to a server, which processes them and returns responses. The server typically handles the business logic and data processing, while the client focuses on the user interface and lightweight logic *(e.g., input validation)*.

---

## Peer to Peer (P2P)

Peer-to-Peer (P2P) architecture is a decentralized network model where each node (or peer) can act as both a client and a server, sharing resources directly with other nodes without relying on a central authority. *Example - File sharing (BitTorrent), blockchain, decentralized messaging.*

---

## Broker Pattern

A messaging architecture where a central **broker** acts as an intermediary between clients and services. It decouples senders and receivers, managing requests and responses, often using a message queue.

---

## Pipe and Filter

Pipe and Filter pattern is a typical technique used in data processing where there are a series of steps(filters) connected by pipes that pass output of one filter to input of next. *Example*  - *Text processing in editors(grammar check etc), Data Analytics, Streaming data*

---

## Event Driven Architecture

A design where components **react to events** (e.g., “user registered”, “payment failed”) instead of directly calling one another. Often times Pub-Sub is used to facilitate event-driven architecture. *Example - Webhooks, IoT, real-time analytics.*

---

## Publish and Subscribe

Messaging pattern where publishers broadcast messages to subscribers without directly knowing who they are. Subscribers express interest in specific topics, and any message published on that topic is delivered to them. Message queues can be used to implement pub-sub pattern.

---

## Serverless Architecture

An architecture where apps run as functions in the cloud, automatically scaling and executing only when triggered with no need to manage the underlying servers. Can be used in event-driven apps.

---

## Monolithic Architecture

A application that is self-contained, whose components (UI, business logic, data stores) are all tightly coupled is a monolith.

**Note** -  All monoliths are centralized, but not all centralized systems are monoliths. *Example* - A traditional web application where the frontend (UI), business logic, and database access are all part of a single codebase and deployed as one unit is a monolith. In contrast, a client-server app with separate frontend and backend services is not a monolith, even if centralized.

---

## Microservice Architecture

An approach that splits applications into **small, independently deployable services**, each focused on a single responsibility and communicating over APIs.

Components of Microservice architecture are - 

- Microservices - Independent component of application which is self contained and communicates with other via well-defined APIs
- API gateway - Sits between clients and Microservice and routes to appropriate one using APIs.
- Service Registry - Maintains list of microservices and their status.

**Note** - Microservices are decentralized by design, as each service operates independently and communicates via APIs. However, they can be deployed on centralized infrastructure *(e.g., a single cloud provider behind an API gateway)* or in a fully decentralized manner *(e.g., across multiple cloud providers or regions)*.