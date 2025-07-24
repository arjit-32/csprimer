---
title: Common Data Formats for Web APIs
meta_title: API Data Formats- JSON & More | CS Primer
description: Learn API data formats like JSON and XML. Master data exchange for efficient web API design in CS.
author: Arjit Sharma
series: ["api"]
categories: ["System-Design"]
draft: false
year: 2025
---

Before data can travel between systems over a network, it must be **serialized***(converted into a format suitable for transmission)*. Choosing the right format impacts speed, readability, and interoperability.

What to Consider When Choosing a Data Format →

1. Low Latency - Smaller, faster-to-transfer payloads
2. Fast Processing - Easy for machines to parse
3. Human Readable - Helpful for debugging and documentation
4. Flexible - Ease to introduce changes over time
5. Interoperable - Works well across platforms and systems

---

## Text-Based Formats

Textual formats are human-readable, widely supported, and easy to debug making them ideal for public APIs. *JSON, XML, and CSV* are data representation formats that use Unicode characters (text) and support encoding in many languages.

### JSON (JavaScript Object Notation)

The most common data format for web APIs. 

Advantages - 

- Faster than XML
- Native browser support
- Human-readable

```json
{
  "name": "Arjit",
  "age": 22,
  "city": "Bengaluru",
  "isStudent": false,
  "hobbies": ["anime", "music", "sports"]
}
```

### XML (eXtensible Markup Language)

More verbose than JSON and suitable for complex structures. Used in wireless communication industry like Personal digital assistants.  

Advantages - 

- Strong tooling (XPath, XQuery)
- Still used in SOAP and enterprise integrations

```xml
<message>
  <status>success</status>
  <code>200</code>
  <text>Hello World</text>
</message>
```

---

## Binary Data Formats

This format is Machine friendly, is schema dependent and is standardized unlike text data formats. It is best where performance matters *(and human readability doesnt).*

Advantages -

- Small size hence lower bandwidth usage
- Faster to parse by machines

Common Binary Formats - 

| Format | Use Case |
| --- | --- |
| **ProtoBuf** | Google’s gRPC, microservices |
| **Avro** | Big Data, Apache Kafka |
| **Thrift** | Facebook’s RPC framework |
| **BSON** | Binary JSON used in MongoDB |

 Example: ProtoBuf

```protobuf
message Node {
  required int64 node_id = 1;
  optional string node_content = 2;
  repeated string node_links = 3;
}
```
