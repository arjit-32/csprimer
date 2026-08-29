---
title: AWS EC2 - Virtual Machine in the Cloud
meta_title: EC2 Essentials | CS Primer
description: Learn when to choose EC2 over serverless, understand core concepts, instance types, and practical setup guide. Complete walkthrough from launching to connecting to your first AWS virtual machine.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

Seriously, do I still need a virtual machine in the era of serverless? The answer is yes., do you want to run long processes in your stateful application., great then use a VM.

## What Is EC2 ?

EC2 (Elastic Compute Cloud) gives you virtual servers on-demand. EC2 gives you full control over the OS, runtime, software stack, and more.

When to Use EC2:

- Application hosting - Host a backend server or a microservice per instance
- Heavy Workloads: Run batch jobs, machine learning, data processing, or computational tasks.
- Full Control: When you need complete control over the infrastructure, such as customizing firewalls or the OS itself.

---

## How EC2 Actually Works ?

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746121685/how-ec2-works_yknniq.png)

- Provisioning: EC2 provisions a virtual machine (VM) on a physical host in Amazon’s data centers.
- Networking: Your instance gets a private IP (inside a Virtual Private Cloud), and optionally a public IP.
- Storage: Each instance gets persistent storage via **EBS** (Elastic Block Store), which is allocated automatically. The storage size depends on the AMI (Amazon Machine Image) chosen.

Under the hood, multiple EC2 instances might run on the same server ( thank you hypervisors ) 

### Key Concepts in EC2 (Quick Reference)

| Concept | What it is |
| --- | --- |
| AMI (Amazon Machine Image) | Pre-installed OS template |
| Instance | The running VM. |
| Instance Type | Hardware spec (CPU, memory) e.g., *t2.micro.* |
| Key Pair | Your SSH login credentials. |
| Security Group | Acts like a firewall - controls which ports/IPs can talk to your instance. |
| Elastic IP | Static IP you can attach to your instance (optional but useful for production) |
| EBS Volume | Persistent disk storage. |

---

## Choosing the Right Instance Type

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746121684/ec2-instance-types_icytmu.png)

| Family | Use Case | Examples |
| --- | --- | --- |
| t3, t4g | Cheap burstable workloads | Websites, dev servers |
| m6i | General purpose | Application servers |
| c7g | Compute optimized | High-performance APIs, games |
| r6a | Memory optimized | In-memory databases |

💸 Start with T3.micro (free tier) for tests

---

## EC2 States You Should Know

| State | Meaning |
| --- | --- |
| **Running** | VM is up and accessible. |
| **Stopped** | VM is halted, not billing for compute. |
| **Terminated** | VM is deleted - irreversible. |

You pay hourly when an instance is running. Stop it when not needed.

---

## Launching and Connecting to Your First Instance

Before anything launch and connect to your VM remotely, then we can get into building blocks of EC2.

### Launching an EC2 Instance

- Go to **EC2 → Launch Instance** and give it a name *(e.g., dev-webserver)*.
- Choose an **AMI** - Amazon Machine Image *(e.g., Ubuntu 20.04 or Amazon Linux 2).*
- Select an **Instance Type** *(e.g., t2.micro).*
- Create a **Key Pair** (download *.pem* file).
- Configure networking:
    - Select a **VPC** and **Subnet**.
    - Create or select a **Security Group** with:
        - Port **22** for SSH (your IP only)
        - Port **80/443** or custom app port (like 3000)
- Click **Launch Instance**.

### Connect to EC2

On Mac/Linux:

```jsx
chmod 400 your-key.pem
ssh -i "your-key.pem" ec2-user@<public-ip>
```

On Windows: Use **PuTTY** or WSL

`Tip:` Use VS Code Remote SSH for a full coding environment on your EC2 box.

---

In the [next article](/articles/aws-6), lets learn how to deploy a nodejs app on EC2 instance.

