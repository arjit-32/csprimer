---
title: AWS DynamoDb
meta_title: AWS DynamoDb | CSPrimer
description: Learn about NoSQL database offered by AWS called DynamoDB, how it works and set up your own DynamoDB database.
author: Arjit Sharma
series: aws
categories: ["System-Design"]
draft: false
year: 2025
---

We already have EC2 for compute and S3 for storage, so where do we store application data that needs *fast access*, *flexible schema*, and *massive scalability*?

Meet *DynamoDB* - AWS's answer to NoSQL databases.

## What Is DynamoDB?

DynamoDB is a serverless key-value and document database.

It’s *ultra-fast, highly available, auto-scalable,* and *fully managed* - meaning you never worry about servers or database maintenance.

When to Use DynamoDB:

- Backend for mobile/web apps (user profiles, posts, likes)
- Shopping carts, chat apps, session storage
- IoT device data
- Anywhere low-latency access at any scale is needed

---

## How DynamoDB Works

- **Key-Value Store**: Every item in DynamoDB is stored with a primary key (like an ID) and associated attributes.
- **Partitions**: Data is split across partitions based on the primary key to achieve scale. It uses consistent hashing to save data across multiple servers based on partition key.
- **Replication**: DynamoDB automatically replicates your data across multiple AZs (Availability Zones) for high durability.
- **Capacity Modes**:
    - **Provisioned**: Manually set read/write throughput.
    - **On-Demand**: Pay only for what you use (recommended for unpredictable traffic).
- **SSD Storage**: DynamoDB runs on fast SSD drives and uses in-memory caches (DAX) for even faster reads if needed.

### Key Concepts in DynamoDB (Quick Reference)

| Concept | What it Means |
| --- | --- |
| Item | A single record (like a row in SQL) |
| Attribute | A property of an item (like a column) |
| Table | A collection of items |
| Primary Key | Unique key for fetching item fast (Partition key / Partition + Sort key) |
| GSI (Global Secondary Index) | Enables querying by alternative keys |
| LSI (Local Secondary Index) | Allows sorting by a different attribute within the same partition |


### Key Concept: Partition Key vs Sort Key

- **Partition Key**: Determines the partition location for the item. Must be unique if no sort key is defined.
- **Sort Key (Optional)**: Allows multiple items with the same partition key, sorted by this attribute.
- Combined, they form a **composite primary key** which must be unique.

---

## Up and Running with DynamoDB

### Creating DynamoDB Table

1. *Go to AWS Console → DynamoDB → Create Table*.
2. Set *Table Name** *(e.g., Users).*
3. Set *Primary Key*:
    - **Partition Key**: A unique identifier *(e.g., UserId).*
    - *(Optional)* **Sort Key**: Additional way to organize data *(e.g., CreatedAt).*
4. Choose *on-demand capacity* unless you have predictable load.
5. Create table - ready to use!

No need to think about servers, indexes *(unless you want)*, or backups *(automatic)*.

### Using DynamoDB with Nodejs

**Step 1: Install AWS SDK**

```
npm install aws-sdk
```

**Step 2: Configure DynamoDB Client**

```jsx
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-1',
});
```

**Step 3: Put Item**

```jsx
const params = {
  TableName: 'Users',
  Item: {
    UserId: '123',
    Name: 'Alice',
    Email: 'alice@example.com',
  },
};

dynamoDb.put(params).promise()
  .then(() => console.log('User created'))
  .catch(err => console.error(err));
```

**Step 4: Fetch (Get Item)**

```jsx
const params = {
  TableName: 'Users',
  Key: {
    UserId: '123',
  },
};

dynamoDb.get(params).promise()
  .then(data => console.log(data.Item))
  .catch(err => console.error(err));
```

---

## Go complete serverless

Imagine creating a serverless and scalable app with near-zero infra management

- *API Gateway* for HTTP endpoints
- *Lambda* for business logic
- *DynamoDB* for data persistence

```sh
Frontend → API Gateway → Lambda → DynamoDB
```
