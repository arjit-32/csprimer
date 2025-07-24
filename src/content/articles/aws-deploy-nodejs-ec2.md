---
title: Deploy a Node.js App on EC2
meta_title: Deploy Node.js Server on AWS EC2 | CS Primer
description: Learn how to set up and deploy a Node.js server on AWS EC2, including SSH connection, Node.js installation, server configuration, and process management with PM2. Complete guide for running production-ready Node.js applications on EC2
author: Arjit Sharma
series: ["aws"]
categories: ["Advanced-Development"]
draft: false
year: 2025
---

In [previous article](/articles/aws-5) you must’ve learned how to create a EC2 instance and connect to it using ssh. Let’s spin up a simple Node.js server.

## 1. Connect to Your EC2 Instance

```bash
ssh -i "your-key.pem" ec2-user@<your-public-ip>
```

Once connected via SSH to your EC2 instance, you’ll be inside the server, where you can directly write and execute code. You can either use a terminal editor like `nano` or connect through VSCode Remote SSH for a smoother development experience.

---

## 2. Install Node.js

```bash
sudo yum update -y
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs git
```
---

## 3. Create a Simple Server

```jsx
// server.js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from EC2!');
});
server.listen(3000);
```

```bash
node server.js
```

Visit `http://<your-ec2-public-ip>:3000` (Make sure port 3000 is open in the security group)

---

## 4. Keep Your Server Running with PM2

Install **PM2** to keep your app alive even after you close the terminal:

```bash
npm install -g pm2
pm2 start server.js
pm2 save
pm2 startup
```

*(Optional)* Allocate and associate an **Elastic IP** to your instance so the public IP doesn’t change.