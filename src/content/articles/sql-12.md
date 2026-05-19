---
title: Working with JSON in MySQL
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---
## Insert

```
INSERTINTO products (details)
VALUES ('{"brand":"Dell","ram":"16GB"}');
```

## Query

```
SELECT details->>'$.brand'FROM products;
```

## Filter

```
SELECT*
FROM products
WHERE JSON_EXTRACT(details,'$.ram')='16GB';
```

## JSON Contains

```
SELECT*
FROM posts
WHERE JSON_CONTAINS(tags,'"tech"');
```