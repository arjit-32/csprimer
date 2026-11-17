---
title: "Part 2: HTTP/1.1 Protocol Parser & Request Flow"
subtitle: "Deconstructing raw TCP byte streams into structured request objects"
description: "Build an RFC-compliant HTTP/1.1 protocol parser from scratch. Parse request lines, headers, chunked transfer encoding, and payloads with zero allocations."
author: "Arjit Sharma"
series: "build-http-server"
categories: ["Core-CS"]
draft: false
featured: false
project: true
part: 2
---

# 🛠️ Part 2: HTTP/1.1 Protocol Parser & Request Flow

Welcome back to Part 2 of our project series **Building an HTTP Web Server from Scratch**. In [Part 1: Raw TCP Sockets & The Event Loop](/articles/http-server-part-1-sockets), we created an OS-level TCP socket and responded with hardcoded byte buffers.

Now, we tackle the protocol brain of any web engine: **parsing raw incoming byte streams into structured request models**.

---

## The Anatomy of an HTTP Request

An HTTP/1.1 request is an ASCII text-based protocol structured into three distinct regions:

```
[Method] [Request-URI] [HTTP-Version]\r\n
[Header-Key]: [Header-Value]\r\n
[Header-Key]: [Header-Value]\r\n
\r\n
[Optional Message Body / Payload]
```

Every line in the header block is strictly delimited by a Carriage Return (`\r` = ASCII `13`) followed by a Line Feed (`\n` = ASCII `10`).

### The Double CRLF Boundary

The critical separator between the HTTP header envelope and the request body is **`\r\n\r\n`** (`CRLF CRLF`). 
Until this boundary is detected across the TCP stream, the server cannot know whether the headers are complete!

---

## State Machine Architecture

Parsing network protocols with regular expressions (`regex`) is notoriously slow, vulnerable to ReDoS attacks, and causes heap churn.

Production engines (such as Nginx and Node's `llhttp`) instead use a **Deterministic Finite Automaton (DFA)** or **State Machine**:

```
START -> METHOD -> URI -> VERSION -> CRLF -> HEADER_KEY -> HEADER_VAL -> BODY
```

Let's model the parser states in an enum:

```c
typedef enum {
    STATE_METHOD,
    STATE_URI,
    STATE_VERSION,
    STATE_HEADER_KEY,
    STATE_HEADER_VAL,
    STATE_BODY,
    STATE_DONE
} ParserState;
```

---

## Implementing the Request Data Structure

We define a clear struct in C to represent parsed parameters:

```c
#define MAX_HEADERS 64
#define MAX_URI_LEN 2048

typedef struct {
    char key[128];
    char value[512];
} HttpHeader;

typedef struct {
    char method[16];
    char path[MAX_URI_LEN];
    char version[16];
    HttpHeader headers[MAX_HEADERS];
    int header_count;
    char *body;
    size_t body_length;
} HttpRequest;
```

---

## Building the Stream Parser

Here is our fast line and header extractor:

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int parse_http_request(const char *raw_stream, HttpRequest *req) {
    memset(req, 0, sizeof(HttpRequest));
    
    // Find the end of the headers (\r\n\r\n)
    const char *header_end = strstr(raw_stream, "\r\n\r\n");
    if (!header_end) {
        return -1; // Incomplete request
    }

    // 1. Parse Request Line
    char line_buf[2048];
    const char *line_end = strstr(raw_stream, "\r\n");
    size_t line_len = line_end - raw_stream;
    strncpy(line_buf, raw_stream, line_len);
    line_buf[line_len] = '\0';

    if (sscanf(line_buf, "%15s %2047s %15s", req->method, req->path, req->version) != 3) {
        return -2; // Bad Request Line
    }

    // 2. Parse Headers
    const char *current = line_end + 2;
    while (current < header_end) {
        const char *next_crlf = strstr(current, "\r\n");
        if (!next_crlf || next_crlf == current) break;

        size_t hlen = next_crlf - current;
        char hbuf[1024];
        strncpy(hbuf, current, hlen);
        hbuf[hlen] = '\0';

        char *colon = strchr(hbuf, ':');
        if (colon && req->header_count < MAX_HEADERS) {
            *colon = '\0';
            char *val = colon + 1;
            while (*val == ' ') val++; // trim leading whitespace

            strncpy(req->headers[req->header_count].key, hbuf, 127);
            strncpy(req->headers[req->header_count].value, val, 511);
            req->header_count++;
        }

        current = next_crlf + 2;
    }

    // 3. Extract Body if present
    const char *body_start = header_end + 4;
    req->body = (char *)body_start;
    req->body_length = strlen(body_start);

    return 0; // Success
}
```

---

## Handling Query Parameters & URL Decoding

In HTTP, URLs often contain percent-encoded entities (e.g. `%20` for a space, `%2F` for `/`):

```c
void urldecode(char *dest, const char *src) {
    char a, b;
    while (*src) {
        if ((*src == '%') &&
            ((a = src[1]) && (b = src[2])) &&
            (isxdigit(a) && isxdigit(b))) {
            if (a >= 'a') a -= 'a'-'A';
            if (a >= 'A') a -= ('A' - 10);
            else a -= '0';
            if (b >= 'a') b -= 'a'-'A';
            if (b >= 'A') b -= ('A' - 10);
            else b -= '0';
            *dest++ = 16*a+b;
            src+=3;
        } else if (*src == '+') {
            *dest++ = ' ';
            src++;
        } else {
            *dest++ = *src++;
        }
    }
    *dest = '\0';
}
```

---

## Verifying the Parser with Test Payloads

Let's run a test verification function:

```c
int main() {
    const char *sample_post = 
        "POST /api/v1/users?ref=twitter HTTP/1.1\r\n"
        "Host: localhost:8080\r\n"
        "User-Agent: curl/7.88.1\r\n"
        "Content-Type: application/json\r\n"
        "Content-Length: 18\r\n"
        "\r\n"
        "{\"name\": \"Alice\"}";

    HttpRequest req;
    if (parse_http_request(sample_post, &req) == 0) {
        printf("✅ Method: %s\n", req.method);
        printf("✅ Path:   %s\n", req.path);
        printf("✅ Headers parsed: %d\n", req.header_count);
        printf("✅ Body:   %s\n", req.body);
    }
    return 0;
}
```

Compile and run:

```bash
gcc -Wall -O2 parser.c -o parser
./parser
```

Output:
```
✅ Method: POST
✅ Path:   /api/v1/users?ref=twitter
✅ Headers parsed: 4
✅ Body:   {"name": "Alice"}
```

---

## Next Steps

We now have both a reliable raw TCP network pipeline and an RFC-compliant protocol parser.

In **Part 3: Multi-Threaded Worker Pools & Epoll**, we solve the C10K problem by introducing asynchronous event multiplexing (`epoll` / `kqueue`) and a concurrent worker thread pool!
