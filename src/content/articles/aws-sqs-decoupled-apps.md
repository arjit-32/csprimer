---
title: AWS SQS - Reliable Messaging Between Services
meta_title: Messaging Service using AWS SQS | CSPrimer
description: Build your own distributed and scalable application using SQS and Lambda.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

When your services need to talk without depending on each other in real time, we would need a message queue that decouples components and keeps your app resilient.

## What Is SQS?

AWS SQS is a fully managed **message queue service** that enables you to send, store, and receive messages between distributed parts of your system *(safely and asynchronously)*

When to Use SQS:

- Decouple microservices or distributed systems
- A component might be *slow or unavailable*, but you still want to keep sending messages
- Store messages temporarily in case of processing delays

---

## How SQS Works

- A **producer** sends a message to an SQS queue.
- A **consumer** reads messages from the queue and processes them.
- Messages stay in the queue until they’re processed or expire.

### Key Concepts in SQS (At a Glance)

| Concept | Description |
| --- | --- |
| Queue | A storage mechanism for messages waiting to be processed. |
| Message | The content sent to the queue by producers. |
| Visibility Timeout | The time a message is hidden after being read by a consumer to avoid duplication. |
| Dead Letter Queue (DLQ) | A queue for messages that can't be processed successfully. |
| Long Polling | A mechanism for reducing empty responses when polling a queue. |

---

## Example - Using SQS to Handle User Registrations Asynchronously

Let’s say you want to decouple your user signup process so your app remains fast, even if downstream processing (like sending a welcome email) is slow.

Here’s how to do it using **SQS + Lambda**

### Step 1: Create a Queue

- Go to *SQS → Create Queue*.
- Choose a *Standard* queue.
- Give it a name

### Step 2: Send a Message on Signup

In your application backend (e.g., Node.js), send a message to SQS using the AWS SDK.

```jsx
const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

const sendSignupMessage = async (user) => {
  const params = {
    QueueUrl: process.env.QUEUE_URL, // e.g., from env vars or AWS Console
    MessageBody: JSON.stringify({
      username: user.username,
      email: user.email,
    }),
  };

  await sqs.sendMessage(params).promise();
};
```

Call *sendSignupMessage()* when a new user signs up.

### Step 3: Process Messages with Lambda

Set up a Lambda function triggered by the queue to process user data:

```jsx
exports.handler = async (event) => {
  for (const record of event.Records) {
    const user = JSON.parse(record.body);
    // Process user registration (e.g., send email)
    console.log(`New user: ${user.username} (${user.email})`);
  }
};

```

- Connect this Lambda to your SQS queue under *Event Source Mapping*.
- SQS will invoke the Lambda whenever a new message arrives.
