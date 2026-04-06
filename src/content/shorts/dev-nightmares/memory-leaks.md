---
title: "The Ghost of Memory Leaks"
youtubeId: "-B_QeK_J3Xk"
series: "dev-nightmares"
seriesName: "Dev Nightmares"
order: 2
---

Finding and fixing memory leaks in Node.js.

### Memory Monitoring:
```javascript
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Heap used: ${used} MB`);
```
