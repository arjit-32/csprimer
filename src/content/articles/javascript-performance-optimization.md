---
title: Performance Optimization Techniques
meta_title: JavaScript Performance Optimization | CS Primer
description: Learn JavaScript performance optimization techniques including debouncing, throttling, lazy loading, and efficient rendering.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

In this article we will discuss the common techniques that reduce unnecessary function executions, improving performance and responsiveness. 

## Debouncing

Runs a function after user stops triggering it. 

Debounce can be configured to run:
- Trailing → after user stops (most common)
- Leading → immediately, then pause

Used for: search input, API calls, auto-save.

```jsx
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}


// Usage - search input
const searchBox = document.getElementById("search");

searchBox.addEventListener("input", debounce((e) => {
  console.log("Searching for:", e.target.value);
  // Imagine calling an API here
}, 500));

```

---

## Throttling

Ensures a function runs at most once every specified interval. So will be running once even if triggered many times. 

Throttling can also be configured to run at the start (leading) or end (trailing) of an interval.

Used for - scroll tracking, animations, resize handling

```jsx
function throttle(fn, limit) {
  let waiting = false;

  return function(...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;
      setTimeout(() => waiting = false, limit);
    }
  };
}

// Usage - scroll event
window.addEventListener("scroll", throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 200));

```

In above example, Even if the user scrolls rapidly, the handler runs once every 200ms, improving performance.


---

## Memoization (Caching Results)

Improves performance for expensive functions. Memoization can increase memory usage since results are stored indefinitely unless manually cleared.

```jsx
function memoize(fn) {
  const cache = {};
  return (x) => {
    if (x in cache) return cache[x];
    cache[x] = fn(x);
    return cache[x];
  };
}

const square = memoize(x => x * x);

// Usage
console.log(square(5)); // Calculates and caches
console.log(square(5)); // Returns cached result instantly

```

This simple implementation works for single primitive arguments. For multiple or complex arguments, a more robust keying strategy is needed.
