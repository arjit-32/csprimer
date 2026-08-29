---
title: Logging in Express.js
meta_title: Logging in Express.js Applications | CS Primer
description: Understand logging strategies in Express.js for debugging, monitoring, observability, and production troubleshooting.
author: Arjit Sharma
series: express
categories: ["Development"]
draft: false
year: 2025
---

Logging is an essential part of backend development. It helps developers:

- Debug issues
- Monitor application behavior
- Track incoming requests
- Detect failures
- Analyze production systems

While `console.log()` works for small applications, production systems require structured and scalable logging solutions.

In Express.js applications, one of the most popular logging libraries is [Pino](https://getpino.io).


## Why Use a Logging Library?

Logging libraries provide features like:

- Structured JSON logs
- Log levels (`info`, `warn`, `error`, `debug`)
- Request tracing
- Better performance
- Integration with monitoring tools

Structured logging becomes extremely valuable in production environments and distributed systems.

---

## Installing Pino

```bash
npm install pino pino-http
```

- pino → Core logger
- pino-http → Express/HTTP request logging middleware

--- 

## Creating a Logger

```javascript
import pino from "pino";

const logger = pino({
    level:
        process.env.NODE_ENV === "production"
            ? "info"
            : "debug",
});
```

The log level controls which logs are displayed.

Common levels:

| Level   | Purpose                         |
| ------- | ------------------------------- |
| `debug` | Detailed debugging information  |
| `info`  | General application events      |
| `warn`  | Warnings or unexpected behavior |
| `error` | Application errors              |

---

## Integrating Logging with Express.js

```javascript
import express from "express";

import pino from "pino";
import pinoHttp from "pino-http";

const app = express();

const logger = pino({
    level:
        process.env.NODE_ENV === "production"
            ? "info"
            : "debug",
});

// HTTP logging middleware
app.use(
    pinoHttp({
        logger,
    })
);
```

pino-http automatically logs: _Incoming requests, Response status codes, Response times, Request metadata_

---

## Logging Inside Routes

Once configured, every request gets a request-specific logger attached to `req.log`

Example:

```javascript
router.get("/", (req, res) => {
    req.log.info("Fetching users");

    res.json(users);
});
```

This automatically includes useful request metadata such as request IDs and HTTP information.

---

## Production Logging

- **Use Log Streams**
Instead of printing logs directly to the console, pipe them to a file or external service

```bash
node app.js | pino-pretty >> logs/app.log
```
*Note - pino-pretty → formats logs for readability in development*


- **Request IDs / Correlation IDs**
Attach a unique ID to each request so you can trace a single user’s journey across multiple logs.

```javascript
import { v4 as uuid } from "uuid";

app.use((req, res, next) => {
  req.id = uuid(); // Generate a UUID per request
  req.log = logger.child({ reqId: req.id }); // Attach it to req.log so every log line carries the ID
  res.setHeader("X-Request-ID", req.id); // propagate to client
  next();
});
```

- **Centralized Log Management** 

Local log files don’t scale; you need aggregation, search, and alerts. Send logs to external systems like Elasticsearch + Kibana, Grafana Loki, Datadog, CloudWatch, or Splunk. Define *retention policies (e.g., 30 days)* and alerting rules for errors.


```javascript
import pinoElastic from "pino-elasticsearch";

const stream = pinoElastic({
  index: "express-logs", // name of the log index
  node: "http://localhost:9200", // Elasticsearch endpoint
});

const logger = pino({ level: "info" }, stream);
```

This means every logger.info(...) or req.log.error(...) call will be shipped directly into Elasticsearch under the express-logs index. Use Kibana (Elastic’s dashboard tool) to visualize and search logs.
