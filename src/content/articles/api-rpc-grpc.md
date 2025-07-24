---
title: RPC and gRPC - Function Oriented APIs
meta_title: RPC & gRPC APIs- CS Guide | CS Primer
description: Understand RPC and gRPC. Learn function-oriented APIs for high-performance app development in CS.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Lets take *Uber,* where different microservices handle different task (rider profiles, pricing, tracking). These services need to talk to each other quickly. In this case a REST over HTTP would work, but its slow with a lot of overhead. What if, one service could directly call a function in another just like local code ?

That’s the idea behind Remote Procedure Calls (RPCs) and gRPC is the modern, high-performance version of it.

---

## What is RPC ?

RPC (Remote Procedure Call) allows a program to execute a function on another machine, hiding the complexities of the network.

Example Usage-

Imagine the *TripService* just calling:

```json
pricing_service.CalculateFare(trip_id=987)
```

Though under the hood, network call is made, but it feels local !

---

## How RPCs Work ?

At its core, RPC architecture consists of:

- **Client Stub**: Represents the remote function on the client side.
- **Server Stub**: Implements the function on the server side.
- **IDL (Interface Definition Language)**: Declares available functions and their parameters.
- **IDL Compiler**: Generates compatible client/server code in chosen languages.
- **Marshalling/Unmarshalling**: Converts request and response data to/from a transmittable format.

Despite being synchronous by nature, modern RPC systems can support asynchronous behavior and streaming.

---

## Enter gRPC - Fast, Modern RPC

**gRPC** is Google’s high-performance, open-source RPC framework designed for the cloud-native world. It improves upon traditional RPC with:

- Protocol Buffers (protobuf) as the schema/IDL format
- HTTP/2 for fast, bi-directional streaming
- Support for **multiple languages** (Python, Go, Java, C++, etc.)
- Auto-generated, **strongly typed** code for client and server

---

## Summary

RPC allows services to call functions in remote systems as if they were local, abstracting away networking. gRPC takes it further, bringing in speed, structure, and tooling suited for microservice-heavy, distributed environments.