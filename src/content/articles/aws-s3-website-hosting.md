---
title: Hosting a website using S3
meta_title: Hosting a website using S3 | CS Primer
description: Learn how to host static websites on Amazon S3, from basic setup to production-ready improvements with CloudFront and custom domains. Includes step-by-step configuration and best practices.
author: Arjit Sharma
series: ["aws"]
categories: ["System-Design"]
draft: false
year: 2025
---

S3 also allows you to host static websites (HTML, CSS, JS) directly from a bucket.



## Step 1. Configure Bucket for Website Hosting

- Create a new bucket *(ex - testbucket)*
- Unblock all public access (required for website hosting)
- Go to Bucket → Properties → Static website hosting
    - Enable static website hosting
    - Set *index.html* as index document

---

## Step 2.  Set Bucket Policy
    
```jsx
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::testbucket/*"
        }
    ]
}
```

---

## Step 3. Upload Website Files

- Create a index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Static Website</title>
</head>
<body>
    <h1>Hello, world!</h1>
</body>
</html>
```

- Upload your index.html in *testbucket*
```jsx
testbucket/
|---index.html
```

---

## Step 4. Access URL
Use the bucket’s provided endpoint to access your website.

You can do several improvements in your current setup, a custom domain setup using Route 53 , a cloudfront integration for CDN, monitor using CloudWatch metrics.