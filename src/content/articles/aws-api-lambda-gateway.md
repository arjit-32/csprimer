---
title: Build an API with Lambda and API Gateway
meta_title: Build an API with Lambda and API Gateway | CSPrimer
description: Learn how to build a API using Lambda and API Gateway
author: Arjit Sharma
series: ["aws"]
categories: ["Advanced-Development"]
draft: false
year: 2025
---

Let's build a simple REST API using AWS Lambda and API Gateway. This API will respond to HTTP GET requests.

## Step 1: Create a Lambda Function

- Go to the AWS Lambda Console.
- Click *Create function*.
- Choose *Author from scratch*.
- Function name as *HelloFunction* and Runtime as *Node.js*  
- In the Function code section, use this basic example

```jsx
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from Lambda!" }),
    };
};
```
- Click *Deploy* to save your code.

---

## Step 2: Add Execution Permissions

Ensure your Lambda function has permissions to be triggered by API Gateway:

- Go to the *Permissions* tab of your Lambda function.
- Under *Execution role*, click the role name to go to IAM.
- Attach the *AWSLambdaBasicExecutionRole* if not already attached.

---

## Step 3: Create a REST API in API Gateway

- Go to the API Gateway Console.
- Click *Create API*.
- Choose *REST API (not private)*.
- Select *New API* and enter:
    - API name: *MyAPI*
    - Endpoint Type: Regional

---

## Step 4: Create a Resource and Method

- In your new API, under *Resources*, click *Actions > Create Resource*.
- Enter:
    - *Resource Name: hello*
    - *Resource Path: /hello*
- With the resource selected, click *Actions > Create Method > GET*.
- Choose:
    - Integration type: *Lambda Function*
    - Check *Use Lambda Proxy integration*
    - Enter the function name: *HelloFunction*
- Click *Save*. Confirm to give API Gateway permission to invoke Lambda.

---

## Step 5: Deploy the API

- Click *Actions > Deploy API*.
- Choose:
    - *Deployment stage: [New Stage]* 
    - *Stage name: prod*
- Click *Deploy*.

You’ll receive a public *Invoke URL*, e.g.:

```
https://<api-id>.execute-api.<region>.amazonaws.com/prod/hello
```

---

## Step 6: Test Your API

Use `curl`, Postman, or a browser:

```bash
curl https://<api-id>.execute-api.<region>.amazonaws.com/prod/hello
```

Expected output:

```json
{"message": "Hello from Lambda!"}
```

