---
title: Indexing
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---
## Basic Index

```
CREATE INDEX idx_users_emailON users(email);
```

## Composite Index

```
CREATE INDEX idx_users_country_ageON users(country, age);
```

## Unique Index

```
CREATEUNIQUE INDEX idx_users_email_uniqueON users(email);
```

## Full-Text Index

```
CREATE FULLTEXT INDEX idx_articles_bodyON articles(body);

SELECT*
FROM articles
WHEREMATCH(body) AGAINST('mysql performance');
```