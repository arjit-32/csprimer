---
title: "Networking concept for Oracle cloud infrastructure"
youtubeId: "wBRhP4BNdZQ"
series: "oci-shorts"
seriesName: "Oracle Cloud Shorts Course"
order: 3
---

Key networking concepts you need to know for OCI.

### Core Networking Components:
- **Subnets**: Public or Private.
- **SG (Security Group)**: VNIC layer security.
- **SL (Security List)**: Subnet layer security.

```yaml
# Security List Rule Example
- protocol: "6"
  source: "0.0.0.0/0"
  tcpOptions:
    destinationPortRange:
      min: 80
      max: 80
```
