---
title: AWS Service Cheat Sheet for Developers
meta_title: AWS Services Cheat Sheet | CS Primer
description: Comprehensive guide to AWS services covering security, compute, storage, databases, networking, DevOps, AI/ML, and media services. Essential reference for cloud developers with detailed service descriptions and practical use cases.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1746114385/aws-cheatsheet_ftria9.png)

## Security, Identity & Compliance

Secure access and protection for your AWS environment and data.

| **Service** | **Description** |
| --- | --- |
| **IAM** | **Manage access to AWS resources with fine-grained permissions.** |
| **Cognito** | **User sign-up, sign-in, and access control with OAuth support.** |
| GuardDuty | Detects threats using machine learning. |
| Inspector | Scans EC2 for vulnerabilities and misconfigurations. |
| Certificate Manager | Issue and manage SSL/TLS certificates for websites. |
| Directory Service | Connect AWS with Microsoft Active Directory. |
| WAF | Web Application Firewall for protecting from malicious traffic. |
| Shield & Shield Advanced | DDoS protection service built into AWS. |
| Artifact | Provides access to compliance and audit reports. |

Most used service is **IAM.** Used in every AWS project for user/role management - *e.g., creating permission to access database to developers.*

---

## Compute Services

Run applications on virtual servers, containers, or serverless environments.

| **Service** | **Description** |
| --- | --- |
| **EC2** | **Fully configurable virtual machines.** |
| **Lambda** | **Run event-driven functions with automatic scaling.** |
| ECS | Container orchestration for Docker workloads. |
| Fargate | Run containers without managing servers. |
| LightSail | Simple VPS hosting ideal for small projects. |
| Batch | Process large volumes of jobs efficiently. |

Most used is EC2 which is backbone for traditional applications - *e.g., hosting web servers, application servers.* Lambda is popular for event-driven tasks  *- e.g., image processing when uploaded to S3*

---

## Storage Services

Store and retrieve data reliably and at scale.

| **Service** | **Description** |
| --- | --- |
| **S3** | **Object storage for files, media, and backups.** |
| **EBS** | **Block storage for use with EC2 instances.** |
| EFS | Shared file system storage for multiple instances. |
| Glacier | Low-cost storage for long-term archives. |
| Snowball | Physical device to move large data into/out of AWS. |
| Storage Gateway | Hybrid storage between on-prem and AWS. |

---

### Object Storage vs Block Storage

- **Object Storage (S3):** Stores data with metadata and a unique ID. Ideal for unstructured data like images.
- **Block Storage (EBS):** Raw block-level storage, great for databases and OS-level file systems.

---

## Databases

Managed services for structured, unstructured, and analytical workloads.

| **Service** | **Description** |
| --- | --- |
| **RDS** | **Managed relational DBs (MySQL, PostgreSQL, etc.).** |
| **Aurora** | **High-performance cloud-native SQL database.** |
| **DynamoDB** | **NoSQL key-value and document store.** |
| Neptune | Graph database for highly connected data. |
| Redshift | Analytics and OLAP at scale using columnar storage. |
| ElastiCache | In-memory caching for fast performance. |

### OLTP vs OLAP

- **OLTP (**Online transaction processing) - Handles day-to-day transactions. Ex -  RDS, DynamoDB
- **OLAP** (Online analytical processing) - For analytics and reporting Ex - Redshift

---

## Networking & Routing

Connect your services securely and reliably across the cloud.

| **Service** | **Description** |
| --- | --- |
| **CloudFront** | **Content Delivery Network (CDN).** |
| **VPC** | **Isolated virtual network to launch AWS resources.** |
| Route 53 | DNS service with traffic routing capabilities. |
| Direct Connect | Dedicated network line to AWS from on-prem. |
| NAT Gateway | Enable internet access for private subnets. |
| NACL | Stateless firewall rules for subnets. |
| Bastion Host | Jump server to access private EC2 instances. |
| VPC Peering | Privately connect two VPCs. |

VPC is most commonly used service. It is foundation of AWS network architecture - *e.g., isolating production and development environments*

### Routing Policies

- **Simple:** Direct to one resource.
- **Weighted:** A/B test across resources.
- **Latency-based:** Route to the lowest-latency region.
- **Geolocation / Geoproximity:** Based on user or resource location.

---

## Developer Tools & DevOps

Tools for building, testing, and deploying applications.

| **Service** | **Description** |
| --- | --- |
| **CodeBuild** | **Cloud-native build service.** |
| CodeStar | Manage your CI/CD toolchain in one place. |
| CodeCommit | Git-based source control. |
| CodeDeploy | Automate code deployments. |

CodePipeline is commonly used in CI/CD workflows  *e.g., automating deployment from GitHub to production*

---

## Application Integration

Decouple application components using messaging and orchestration.

| **Service** | **Description** |
| --- | --- |
| **SQS** | **Simple queue for message buffering.** |
| **SNS** | **Pub/sub system for notifications.** |
| Step Functions | Coordinate workflows using visual states. |
| Amazon MQ | Managed message broker using popular standards. |
| SWF | Older workflow orchestration tool. |

Many a times, SNS, SQS and Lambda are used together to create decoupled apps. Often called a fan-out pattern where an event notification (SNS) triggers messages to be placed in multiple queues (SQS) which are then processed by different Lambda functions - for example, *when a new user signs up, one Lambda could send a welcome email, another could update analytics, and a third could process user preferences.*

---

## Management & Monitoring

Monitor and automate your AWS environment.

| **Service** | **Description** |
| --- | --- |
| **CloudWatch** | **Logs, metrics, and dashboards for monitoring.** |
| CloudTrail | Track all API calls across your AWS account. |
| CloudFormation | Infrastructure as Code using templates. |

Cloudwatch is essential for monitoring, can also set up alerts in it.

---

## AI/ML & Analytics Services

Build intelligent applications and analyze data at scale.

| **Service** | **Description** |
| --- | --- |
| SageMaker | Train and deploy ML models. |
| Rekognition | Analyze images and videos for labels and faces. |
| Polly | Convert text to lifelike speech. |
| Comprehend | Natural Language Processing (NLP). |
| Athena | Query S3 data with SQL. |
| Glue | Serverless ETL service. |
| QuickSight | Business intelligence and dashboards. |
| EMR | Managed Hadoop/Spark clusters. |

As developers, cant see using Sagemaker but Athena is quite interesting, can be used in many places *e.g., analyzing logs stored in S3, business intelligence queries.*

---

## Media Services

Tools to process, stream, and manage video content.

| **Service** | **Description** |
| --- | --- |
| Elastic Transcoder | Convert media files to different formats. |
| MediaConvert | High-quality media transcoding. |
| Kinesis Video Streams | Stream video from connected devices. |
| MediaLive, MediaTailor, MediaPackage | End-to-end pipeline for live video broadcasting. |

