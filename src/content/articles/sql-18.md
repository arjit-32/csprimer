---
title: Stored Procedures, Triggers & Events
meta_title: js
description: js
author: Arjit Sharma
series: ["sql"]
categories: ["Development"]
draft: false
year: 2025
---

MySQL supports several features for running logic directly inside the database:

- Stored Procedures
- Triggers
- Events

These features help automate:
- repetitive tasks,
- data validation,
- scheduled cleanup,
- and business logic.

However, they also introduce additional complexity, so they should be used carefully.

---

## Stored Procedure

A stored procedure is a reusable block of SQL stored inside the database.

Think of it like a database function or a reusable script.


### Creating a Stored Procedure

```sql
DELIMITER //

CREATE PROCEDURE get_active_users()
BEGIN

  SELECT *
  FROM users
  WHERE is_active = TRUE;

END //

DELIMITER ;
```

*Why DELIMITER Is Needed ?*
MySQL normally treats `;` as the end of a statement. Stored procedures contain multiple SQL statements internally, so the delimiter is temporarily changed to `//`. This allows MySQL to parse the full procedure definition correctly.


### Calling a Stored Procedure

```sql
CALL get_active_users();
```

This executes the stored procedure.

---

## Triggers

A trigger automatically runs when certain database events occur.

Triggers can execute before or after INSERT, UPDATE or DELETE operations.

### Trigger Example

```sql
CREATE TRIGGER before_user_update

-- Runs before a row is updated
BEFORE UPDATE
ON users

-- The trigger executes once for every affected row.
FOR EACH ROW

-- NEW refers to the incoming updated row.
SET NEW.updated_at = CURRENT_TIMESTAMP;
```

---

## Events (Scheduler)

MySQL includes an internal event scheduler for running scheduled tasks automatically.

This behaves similarly to cron jobs or scheduled background tasks.


### Enabling the Event Scheduler

```sql
SET GLOBAL event_scheduler = ON;
```

### Creating a Scheduled Event

```sql
CREATE EVENT cleanup_logs

ON SCHEDULE EVERY 1 DAY

DO

DELETE FROM logs
WHERE created_at < NOW() - INTERVAL 30 DAY;
```

What this Event does -  Every day old log records older than 30 days are deleted automatically.
