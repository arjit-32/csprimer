---
title: Going Serverless with Lambda
meta_title: Going serverless with lambda | CSPrimer
description: Learn about serverless computing with AWS Lambda. Complete guide to microservices, event-driven applications using AWS Lambda.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

Serverless applications are software systems that runs  in an environment where hosting provider takes responsibility of infrastructure *(provisioning, scaling and maintaining servers)*. These apps only need to provide the code that runs when an event happens.

## What is AWS Lambda

Lambda is AWS serverless backbone. Its a FaaS *(Function as a Service) ,* that lets you run your code when some event occurs *( like a file upload, API request etc).*

When to Use AWS Lambda :

- **Microservices**: Deploy isolated units of functionality independently.
- **Event-driven Applications**: React to events from S3, DynamoDB, Kinesis, etc.
- **APIs**: Connect Lambda to API Gateway to build scalable HTTP endpoints.
- **Scheduled Jobs**: Run periodic tasks like cron jobs without managing infrastructure.

---

## How AWS Lambda Works

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746251453/how-lambda-works_ndcv3v.png)

1. Something triggers your function (like uploading a file or clicking a button on a website)
2. AWS Lambda springs into action by:
    - Creating a lightweight container
    - Loading your code
    - Running it for you
    - Handling the result
3. When the task is done, Lambda cleans up automatically. You only pay for the exact time your code runs.

Imagine a valet service, which takes care of your car while you enjoy your meal. The best part being if you have 100 cars, it will scale to give you 100 valets.

### Key Concepts in Lambda (Quick Reference)

| Term | Description |
| --- | --- |
| **Function** | The code executed in response to an event. |
| **Trigger** | The AWS service or event that invokes the function. |
| **IAM Role** | Grants your function permissions to access other AWS resources. |
| **Timeout** | Maximum time the function is allowed to run (up to 15 minutes). |
| **Memory** | Adjustable setting that also affects CPU allocation. |

### Lambda Integration Flow

Event comes in → Lambda processes it → Result goes out to another service.

**Triggers (Input) -** What can start the Lambda

- HTTP/API Triggers → *API Gateway(RESTful APIs)*
- Storage Triggers → *S3, DynamoDB Streams*
- Messaging Triggers → *SQS,SNS, Kinesis*
- Others → *CloudWatch logs, CodeCommit*

**Destinations (Output)  -** Where lambda can send results

- SNS topics
- SQS queues
- Other Lambda functions

### Monitoring and Debugging Lambda

AWS Lambda automatically integrates with **CloudWatch** for monitoring and logging. You can view metrics like execution duration, error count, and invocation frequency.

---

## **Lambda Version Control**

Lambda allows you to publish versions of your functions. This enables you to maintain different stages (e.g., development, testing, production) with stable, immutable versions of your code.

- Version: A unique identifier for a deployed version of your function.
- Alias: A pointer to a specific version of the Lambda function.

To think in Git way : Versions are like commits(snapshots), while aliases are like branch names(movable pointers)

---

## Lambda Performance Considerations

1. **Cold Starts**: Lambda functions are stateless, and when a function is triggered for the first time after a period of inactivity, it may experience a "cold start," which adds latency to the response time. This happens because the function needs to be initialized.

- Mitigation: Use provisioned concurrency to keep a set number of instances warm.

2. **Timeouts**: Lambda functions have a maximum timeout (15 minutes). If your process runs longer than this, you’ll need to rethink the approach (e.g., split the workload into smaller tasks or use Step Functions for orchestration).

---

## Create Your First Lambda Function

### Step 1: Setup

1. Go to the AWS Lambda Console and click Create function.
2. Choose Author from scratch and set the runtime (e.g., Node.js, Python).
3. Give your function a name (e.g., my-first-lambda).
4. Assign an appropriate **IAM role**.
5. Click Create function.

### Step 2: Add Code

Here’s an example Lambda function written in Node.js that responds to an HTTP request:

```jsx
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
```

### Step 3: Test the Function

1. Click *Test* in the Lambda console.
2. Choose a test event type (e.g., S3, API Gateway, custom JSON).
3. Execute and view logs in **CloudWatch**.

