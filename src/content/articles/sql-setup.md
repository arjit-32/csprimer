---
title: MySQL Setup and CLI Basics
meta_title: MySQL Setup Guide | CS Primer
description: Set up MySQL on your system, connect to databases, and prepare a development environment for SQL learning.
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---


Before writing SQL queries, you first need access to a MySQL server.

You can interact with MySQL using:
- the MySQL command-line client,
- graphical tools,
- or online playgrounds.

This guide covers the basics of connecting to MySQL and navigating the CLI.

---

## MySQL CLI ( Command Line Interface )

`mysql` is the official interactive command-line client for MySQL databases.

It allows you to:
- connect to databases,
- run SQL queries,
- inspect tables,
- and manage databases directly from the terminal.


### Connecting to MySQL

```bash 
mysql -h <host> -P 3306 -u <username> -p <database>
```

| Option       | Description                   |
| ------------ | ----------------------------- |
| `-h`         | Hostname or IP address        |
| `-P`         | Port number (default: `3306`) |
| `-u`         | Username                      |
| `-p`         | Prompt for password           |
| `<database>` | Optional database name        |


Example - 

```bash
mysql -u root -p shop
```

### Useful MySQL CLI Commands

```bash
SHOW DATABASES; # List all databases

USE shop; # Switch to the shop database

SHOW TABLES; # Show all tables in the current database
 
DESCRIBE users; # Display table structure

SHOW CREATE TABLE users; # Show full table creation SQL

SHOW INDEX FROM users; # List indexes on a table

SHOW VARIABLES; # Display MySQL server variables

SHOW PROCESSLIST; # Show active database connections

EXIT; # Exit the MySQL CLI
```

---

## GUI Tools for MySQL

Many developers prefer graphical database clients instead of the terminal. These Software applications provide query editors, table viewers, visual management interfaces and much more.

Popular MySQL GUI tools include: *HeidiSQL, MySQL Workbench, DBeaver, TablePlus*

---


## Online SQL Playground

If you do not want to install MySQL locally, online SQL playgrounds are useful for practice. Just google something man.