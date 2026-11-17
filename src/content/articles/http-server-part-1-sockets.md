---
title: "Part 1: Raw TCP Sockets & The Event Loop"
subtitle: "Laying the socket foundation for an HTTP server using POSIX system calls"
description: "Master POSIX socket programming by initializing a TCP listening socket, binding ports, handling client handshakes, and running a clean connection accept loop."
author: "Arjit Sharma"
series: "build-http-server"
categories: ["Core-CS"]
draft: false
featured: false
project: true
part: 1
---

# 🛠️ Part 1: Raw TCP Sockets & The Event Loop

Welcome to Part 1 of the **Building an HTTP Web Server from Scratch** project series. In this initial chapter, we demystify how computers speak over networks by writing socket networking code without any third-party frameworks.

Every major web server—from Nginx and Apache to Node.js and Envoy—relies on low-level OS kernel networking primitives called **sockets**.

---

## What is a Socket?

A network socket is an endpoint for sending and receiving data across a computer network. In Unix-like operating systems, sockets adhere to the fundamental philosophy that **"everything is a file"**. 

When you open a network socket, the operating system kernel returns an integer known as a **file descriptor (FD)**. You can read from and write to this descriptor just like an open text file on your filesystem.

### Sockets vs Connections

- **Listening Socket:** A passive socket bound to a well-known port (e.g. port `8080`). Its sole purpose is to listen for incoming connection attempts and queue them in the kernel backlog.
- **Client Connection Socket:** When a client completes the 3-way TCP handshake, the OS allocates a *separate* active socket descriptor for that specific communication session.

---

## The Socket Lifecycle

To bring up our listening server, we follow a strict sequence of 4 POSIX system calls:

```
socket() -> bind() -> listen() -> accept() -> read()/write() -> close()
```

### 1. `socket()`: Creating the Descriptor

We call `socket(AF_INET, SOCK_STREAM, 0)`.
- `AF_INET`: Address Family IPv4 (using 32-bit IP addresses).
- `SOCK_STREAM`: Reliable, ordered, two-way stream (TCP).
- `0`: Default protocol for TCP (`IPPROTO_TCP`).

### 2. `bind()`: Attaching IP & Port

Next, we specify the network interface and port number. We configure a `sockaddr_in` struct:

```c
struct sockaddr_in server_addr;
memset(&server_addr, 0, sizeof(server_addr));
server_addr.sin_family = AF_INET;
server_addr.sin_addr.s_addr = INADDR_ANY; // Accept from any network interface
server_addr.sin_port = htons(8080);      // Host to Network Short endian conversion
```

### 3. `listen()`: Enabling the Connection Backlog

Calling `listen(server_fd, 128)` transitions the socket from an active connection socket into a passive listening socket with a queue depth of 128 unaccepted connections.

---

## Step-by-Step Implementation

Let's assemble a complete, standalone C/POSIX server program that binds to port `8080`, accepts incoming TCP connections, and echoes back a basic HTTP response.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 8080
#define BUFFER_SIZE 4096

int main() {
    int server_fd, client_fd;
    struct sockaddr_in address;
    int opt = 1;
    socklen_t addrlen = sizeof(address);
    char buffer[BUFFER_SIZE] = {0};

    // 1. Create socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) < 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // 2. Set socket options to reuse address and port immediately
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT, &opt, sizeof(opt))) {
        perror("setsockopt failed");
        exit(EXIT_FAILURE);
    }

    // 3. Configure sockaddr struct
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // 4. Bind socket to port
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // 5. Start listening
    if (listen(server_fd, 10) < 0) {
        perror("listen failed");
        exit(EXIT_FAILURE);
    }

    printf("🚀 Server listening on http://localhost:%d\n", PORT);

    // 6. Accept loop
    while (1) {
        printf("Waiting for connection...\n");
        if ((client_fd = accept(server_fd, (struct sockaddr *)&address, &addrlen)) < 0) {
            perror("accept failed");
            continue;
        }

        // Read raw request bytes
        ssize_t bytes_read = read(client_fd, buffer, BUFFER_SIZE - 1);
        if (bytes_read > 0) {
            buffer[bytes_read] = '\0';
            printf("Received:\n%s\n", buffer);
        }

        // Construct raw HTTP response
        const char *response = 
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: text/plain\r\n"
            "Content-Length: 13\r\n"
            "Connection: close\r\n"
            "\r\n"
            "Hello, World!";

        write(client_fd, response, strlen(response));
        close(client_fd);
    }

    close(server_fd);
    return 0;
}
```

---

## Understanding the Network Byte Order

Network communications mandate **Big-Endian** byte order (most significant byte transmitted first). However, standard modern x86/ARM host processors store integers in **Little-Endian** format.

If you assign port `8080` directly without conversion:
- `8080` in hex is `0x1F90`.
- In Little-Endian memory: `0x90`, `0x1F`.
- If sent across the wire as-is, the network layer interprets this as port `36895`!

The `htons()` function (**Host TO Network Short**) guarantees safe translation regardless of host processor architecture.

---

## Compiling & Testing

You can compile this code on any Linux, macOS, or WSL environment:

```bash
gcc -Wall -O2 server.c -o server
./server
```

In another terminal, test using `curl`:

```bash
curl -i http://localhost:8080
```

You will see the raw headers and payload returned directly from your socket!

---

## What We Learned & Next Steps

In this chapter, we:
1. Understood file descriptors and socket types (`SOCK_STREAM`).
2. Implemented the complete 5-step lifecycle (`socket`, `setsockopt`, `bind`, `listen`, `accept`).
3. Sent raw HTTP byte streams over a TCP connection.

In **Part 2**, we will move beyond raw static responses and build a **complete HTTP/1.1 Request Parser** capable of parsing verbs (`GET`, `POST`), target paths, query parameters, headers, and request bodies!
