---
title: "My Nodejs app broke"
youtubeId: "g4qfO6O_l_A"
series: "dev-nightmares"
seriesName: "Dev Nightmares"
order: 1
---

What happens when your node.js server crashes in production and how to fix it.

### Handling Crashes:
```javascript
process.on('uncaughtException', (err) => {
  console.error('CRASH!', err);
});
```
