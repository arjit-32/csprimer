---
title: AWS SNS - Sending Notifications the Smart Way 
meta_title: Send Notifications with AWS SNS | CSPrimer
description: Key to microservices application, learn about notification systems in AWS using Simple Notification Service.
author: Arjit Sharma
series: ["aws"]
categories: ["System-Design"]
draft: false
year: 2025
---

Need to send alerts, emails, or trigger backend processes when something happens in your app? *Simple Notification Service (SNS)* is your tool.

## What Is SNS?

AWS SNS is a fully managed **(publish/subscribe)** messaging service. It allows you to send messages(notifications) to subscribers using multiple protocols such as *email, SMS, Lambda etc.*

When to Use SNS:

- Sending notifications or alerts to users
- You want to broadcast messages to multiple systems
- Decoupling application components

---

## How SNS Works

1. **Publishers** send messages to **SNS topics**.
2. SNS forwards the message to all **subscribers** of that topic.
3. Subscribers receive the message via their preferred protocol - email, SMS, Lambda, SQS, HTTP, etc.

### Key Concepts in SNS (Quick Reference)

| Concept | Description |
| --- | --- |
| Topic | A channel where messages are sent (like a mailing list) |
| Subscriber | Anything that receives messages (email, Lambda, etc.) |
| Publish | Sending a message to a topic |
| Message | The content you’re sending |
| Message Attributes | Optional metadata attached to the message |

---

## Example - Email Notification on User Signup

Let’s say you want to notify your team every time a new user signs up:

### Step 1: Create a Topic

- Go to the *SNS Console → Create Topic.*
- Choose *Standard Topic* (or FIFO if you need strict ordering).
- Give it a name.

### Step 2: Add Subscribers

- After the topic is created, click *Create Subscription.*
- Set protocol to *Email.*
- Enter your team’s email address.
- Confirm the subscription via the confirmation email SNS sends.

### Step 3: Automatically Publish a Message from Lambda

Whenever a new user signs up, trigger a Lambda function that publishes a message to the SNS topic. Here’s how your Lambda function might look:

```jsx
const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
  const user = event; // e.g., { username: 'jdoe', email: 'jdoe@example.com' }

  const params = {
    TopicArn: process.env.TOPIC_ARN, // Set in Lambda environment variables
    Message: `🎉 New user signed up:\nUsername: ${user.username}\nEmail: ${user.email}`,
    Subject: '🚀 New User Registration',
  };

  await sns.publish(params).promise();
};
```
