---
title: What Is SSH? A Developer's Guide to Secure Remote Access
author: Arjit Sharma
meta_title: SSH Explained for Beginners | Remote Login, Keys, Tunneling & Port Forwarding
description: Learn how SSH works, why developers use it for remote servers, Git, deployment, port forwarding, and secure authentication with SSH keys.
series: ["cn"]
categories: ["Core-CS"]
---

Every time you connect to a Linux server, deploy your application, clone a Git repository, or securely access a database running on another machine, chances are you're using SSH.

SSH (Secure Shell) is the standard protocol for securely accessing and managing remote systems. It has become one of the most important protocols in modern software engineering.

## What is SSH?

SSH (Secure Shell) is a cryptographic network protocol that allows two computers to communicate securely over an untrusted network.

It provides:

- Secure remote login
- Command execution
- File transfer
- Port forwarding
- Tunneling
- Authentication

Unlike older protocols, everything transmitted over SSH is encrypted.

---

## How SSH Works

When an SSH client connects to a server (typically on port 22), the server first proves its identity using its host key. The client and server then negotiate encryption algorithms and securely establish a shared session key. Finally, the user authenticates using either a password or an SSH key. Once authentication succeeds, all communication between the client and server is encrypted, protecting commands and data from eavesdropping.

---

## Authentication Methods

### Password Authentication

The simplest way to connect is with a username and password.

```bash
ssh arjit@192.168.1.10
```

The server verifies your password before allowing access. While easy to use, password authentication is generally less secure and is often disabled on production servers.


### SSH Key Authentication

Instead of passwords, SSH commonly uses public-key cryptography.

You generate a pair of keys:

- **Public Key** – Stored on the server.
- **Private Key** – Stored securely on your machine.

When connecting, the server verifies that you own the matching private key without the private key ever leaving your computer.

This is why services like GitHub ask you to upload your **public SSH key**, never your private one.

---

## Common SSH Commands

- Remote login

```bash
ssh user@server
```

- Copy file or Directory

Besides remote login, SSH also provides secure file transfer utilities such as `scp`, allowing you to copy files between machines over an encrypted connection.

```bash
# File
scp app.zip user@server:/home/app

# Directory
scp -r project user@server:/home/projects

```

- Remote command

```bash
ssh server "docker restart nginx"
```

---

## Conclusion

SSH has become the standard way to securely interact with remote systems. Whether you're deploying applications, managing cloud servers, authenticating with GitHub, or transferring files, chances are SSH is working behind the scenes.

Understanding the basics of SSH—how it establishes secure connections and authenticates users—is an essential skill for every software developer and DevOps engineer.