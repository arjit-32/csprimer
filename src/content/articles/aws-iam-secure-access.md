---
title: AWS IAM - Security in the Cloud
meta_title: Access Management Made Simple | CS Primer
description: Learn what AWS IAM (Identity and Access Management) is, how it works, and how to use it effectively as a developer. Includes real-world examples, policies, and best practices to secure your cloud resources.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

Have you wondered if public cloud is secure, then think again. Bunch of servers open to everyone, accessible with an api !

## What is IAM and Why Should You Care?

IAM (Identity and Access Management) is AWS's security layer for controlling access to resources. Think of it as a *gatekeeper*. It manages:

- Authentication - *Who are you?*
- Authorization - *What can you do?*

Every action on AWS goes through an **API**. Whether you're uploading a file to S3, launching an EC2 instance, or querying a DynamoDB table, **IAM controls whether that request should be allowed**.

---

## How IAM works ?

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746115508/how-iam-works_zhmwcg.png)

A Entity(user, service etc) tries to access a resource, IAM checks credentials and verifies authentication, then it evaluates attached policies to determine if they permission of requested action. If allowed then authorization is granted.

---

## Key Concepts in IAM (Quick Reference)

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746115509/aws-iam_tdpl8f.png)

IAM deals with 3 entities - 

- **Users** - Humans *(like you, me)*
- **Groups** - Collections of users with the same permissions *(”Developers”, “Devops”)*
- **Roles** - Temporary access for apps, services, or users from other accounts

**IAM Policies** are where the real power lies - they define **who can do what, on which resources, and under what conditions**.

---

## IAM Policies: The Heart of IAM

Policies are written in **JSON**. Here's what they include:

- **Effect** - `Allow` or `Deny`
- **Action** - What you can do (e.g. `s3:GetObject`)
- **Resource** -Where you can do it (e.g. `arn:aws:s3:::my-bucket/*`)
- **Condition** - Additional rules (like IP restrictions)

**Example Policy:**

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::dev-bucket/*",
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "203.0.113.0/24"
                },
                "StringEquals": {
                    "s3:prefix": "home/"
                }
            }
        }
    ]
}
```

## Types of IAM Policies

There are 2 types of Policies we work with - 

### 1. Identity-Based Policies

Attached to IAM users, groups, or roles.

- **Managed Policies** - Reusable, created by AWS or you *(ex-AmazonS3ReadOnlyAccess)*
- **Inline Policies** - Custom, one-off policies attached to single identity.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": ["s3:ListBucket"],
            "Resource": ["arn:aws:s3:::dev-bucket"]
        }
    ]
}
```

### 2. Resource-Based Policies

Attached directly to resources like S3 buckets or Lambda functions.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": { "Service": "lambda.amazonaws.com" },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::dev-bucket/uploads/*"
        }
    ]
}
```

---

## Real World Example: Lambda Uploads to S3

Say you're building a photo app. Your Lambda function should upload images to S3.

You would:

- Create an IAM Role for Lambda
- Attach a policy like:

```json
{
    "Effect": "Allow",
    "Action": "s3:PutObject",
    "Resource": "arn:aws:s3:::photo-app-images/*"
}
```

- Assign this role to your Lambda function

Thats it! Now your Lambda can upload photos - and nothing more.

## Conclusions

**Best Practices -**

- Only grant minimum permission needed.
- Use IAM roles for apps, dont hardcode AWS keys in code.
- Use AWS managed policies wherever possible.

IAM in itself is free, you only pay for other services. In conclusion, this is a must know service.

