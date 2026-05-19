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
# Stored Procedures

```
DELIMITER//

CREATEPROCEDURE get_active_users()
BEGIN
SELECT*FROM usersWHERE is_active=TRUE;
END//

DELIMITER ;
```

Call:

```
CALL get_active_users();
```

---

# Triggers

```
CREATETRIGGER before_user_update
BEFOREUPDATEON users
FOREACHROW
SET NEW.updated_at=CURRENT_TIMESTAMP;
```

---

# Events (Scheduler)

Enable:

```
SETGLOBAL event_scheduler=ON;
```

Create event:

```
CREATE EVENT cleanup_logs
ON SCHEDULE EVERY1DAY
DO
DELETEFROM logsWHERE created_at< NOW()-INTERVAL30DAY;
```