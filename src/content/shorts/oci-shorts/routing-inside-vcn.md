---
title: "Routing inside a VCN ( Oracle Cloud )"
youtubeId: "Y0bw-wVSjR8"
series: "oci-shorts"
seriesName: "Oracle Cloud"
order: 5
---

Understanding how routing works within a Virtual Cloud Network in Oracle Cloud.

### Key Concepts:
- **Route Table**: A collection of route rules.
- **VCN Routing**: How traffic flows between subnets or to the internet.

```javascript
// Example Route Rule logic
if (destination === '0.0.0.0/0') {
  sendToGateway('InternetGateway');
}
```
