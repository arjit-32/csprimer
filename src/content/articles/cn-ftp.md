---
title: What Is FTP? A Simple Guide to File Transfer Protocol
author: Arjit Sharma
meta_title: FTP Explained for Beginners  File Transfer, Security & SSH Essentials
description: Learn how FTP transfers files over networks and how secure alternatives like SFTP and FTPS protect your data. Explore SSH’s powerful role in file handling, remote access, and deployment workflows.
series: ["cn"]
categories: ["Core-CS"]
---

Ever needed to upload a file to a server or download a large file from one? That’s where FTP (File Transfer Protocol) ****comes in. It is one of the oldest yet still widely used methods for transferring files over the Internet.

## What Is FTP?

FTP (File Transfer Protocol) is a standard protocol used to transfer files between a client and a server over a network.

- The client initiates the connection and requests uploads/downloads.
- The server provides access to a file system where files can be stored or retrieved.

---

## How FTP Works

FTP uses two separate TCP connections - 

1. Control Connection *(Port 21)* - Used for sending commands and receiving responses (e.g., `USER`, `PASS`, `RETR`, `STOR`). It remains open throughout the session.
2. Data Connection *(Port 20 or dynamically assigned)* - Used for actual file transfer. It is opened and closed for each file sent/received.

---

## FTP Modes: Active vs Passive

**Active Mode**

- The client opens a port and waits for the server to establish the data connection.
- This can cause issues if the client is behind a firewall or NAT, as incoming connections may be blocked.

**Passive Mode (PASV)**

- The server opens a port, and the client initiates both connections.
- More compatible with firewalls and NAT setups — making it the default mode for most clients today.

---

## Is FTP Secure?

Classic FTP is not secure, it sends everything in plain text*(including your username, password, and file contents)*.  To solve this, developers now prefer secure alternatives that feel familiar to FTP but offer encryption built-in - 

**FTPS (FTP Secure) -** Adds **SSL/TLS encryption** to traditional FTP and is ideal when working with legacy systems or hosting providers that still support FTP.

**SFTP (SSH File Transfer Protocol)** - It is built on top of SSH protocol, using port 22.  It allows file transfers, directory traversal, permission management, and more - all over a secure connection. 

---

## SSH for Developers

SSH (Secure Shell) is your Swiss Army knife for remote development. It’s not just for logging into servers - it’s a gateway to automation, deployment, and secure file handling.

**Common Developer Use Cases**

- Remote access:`ssh user@server.com`  log into a remote machine securely.
- Securely transferring the file.
- Access remote web server locally or expose your local dev server remotely.
- Connect to a remote DB securely without exposing it to the internet.
