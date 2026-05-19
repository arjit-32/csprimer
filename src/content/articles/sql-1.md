---
title: SQL Setup
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


# mysql – MySQL CLI

`mysql` is the interactive command-line tool for MySQL databases.

## Connecting to a Database

```
mysql-h <host>-P3306-u <username>-p <database>
```

- `h` Host (default: localhost)
- `P` Port (default: 3306)
- `u` Username
- `p` Prompt for password
- `<database>` Optional database name

Example:

```
mysql-u root-p shop
```

---

## Useful CLI Commands

```
SHOW DATABASES;
USE shop;
SHOW TABLES;
DESCRIBE users;
SHOWCREATETABLE users;
SHOW INDEXFROM users;
SHOW VARIABLES;
SHOW PROCESSLIST;
EXIT;
```

# Softwares like Heidi 


# Online 