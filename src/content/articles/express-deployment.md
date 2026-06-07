---
title: Deployment Basics for Express.js Applications
meta_title: Express.js Deployment Basics | CS Primer
description: Learn how to deploy Express.js applications, configure production environments, and prepare APIs for real-world usage.
author: Arjit Sharma
series: ["express"]
categories: ["Development"]
draft: false
year: 2025
---

Once your Express.js application is ready, the next step is deployment - making the application accessible to users over the internet.

Deployment typically involves:

- Running the application reliably
- Managing environment variables
- Handling process restarts
- Configuring domains and HTTPS
- Scaling the application

Obviously there are many deployment approaches but in this article covers two common ones: **PM2 → Simple process management** and **Docker → Containerized deployments**

---


## Option 1: Deploying with PM2

[PM2](https://pm2.keymetrics.io/) is a production process manager for Node.js applications.

It provides:

- Automatic restarts
- Process monitoring
- Background execution
- Log management
- Startup on server reboot

PM2 is one of the easiest ways to deploy Node.js applications on a VPS or cloud server.


### Installing PM2

```bash
npm install -g pm2
```

### Starting the Application

```bash
pm2 start app.js --name "my-api"
```

This runs the Express.js application in the background.

### Enabling Auto-Start on Reboot

```bash
pm2 startup # Generates startup scripts
pm2 save # Saves the current PM2 process list
```

This ensures the application restarts automatically if the server reboots.


### Useful PM2 commands

| Command              | Purpose                   |
| -------------------- | ------------------------- |
| `pm2 list`           | View running applications |
| `pm2 logs`           | View application logs     |
| `pm2 restart my-api` | Restart application       |
| `pm2 stop my-api`    | Stop application          |
| `pm2 delete my-api`  | Remove application        |

---

## Option 2: Deploying with Docker

[Docker](https://www.docker.com/) packages applications into lightweight containers that run consistently across environments.

Docker helps solve the classic: *“It works on my machine”* problem by standardizing the runtime environment.

Containerization is widely used in modern backend infrastructure and cloud deployments.


### Creating a Dockerfile

```Dockerfile
# Base image
FROM node:20-alpine

# Working directory inside container
WORKDIR /app

# Copies files into container
COPY package*.json ./

# Executes commands during build
RUN npm ci --only=production

COPY . .

# Documents application port
EXPOSE 3000

# Starts the application
CMD ["node", "app.js"]
```

### Building the Docker Image

```bash
docker build -t my-api.
```
This creates a Docker image named: *my-api*.

### Running the Container

```bash
docker run -d \ 
  -p 3000:3000 \
  --env-file .env \
  --name my-api \
  my-api
```

This:
- Runs the container in detached mode
- Maps port 3000
- Loads environment variables
- Names the container my-api

---

## Other Key Considerations

- Reverse Proxy & SSL: In production, Express.js applications are usually placed behind a reverse proxy such as [Nginx](https://nginx.org/) for HTTPS, domain routing, load balancing, and traffic management.
- Hosting Options: Express.js applications can be deployed on managed platforms like Render or Vercel, cloud providers such as AWS, or traditional VPS providers like Hetzner
- Scaling & Architecture: As traffic grows, applications often scale horizontally by running multiple application instances behind a load balancer or container orchestration platform.
- CI/CD pipelines: Automate testing, building, and deployment for faster iteration and reliability.
- Monitoring & logging: Use tools like Prometheus, Grafana, or ELK stack to track performance and errors.
