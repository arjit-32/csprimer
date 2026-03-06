---
title: CSS Tips and Tricks
meta_title: ss
description: ss
author: Arjit Sharma
series: ["html-css"]
categories: ["Development"]
draft: false
year: 2025
---

Some of the tricks that are regularly usefull for me.

- Box-Sizing: Apply box-sizing: border-box globally

```css
*, *:before, *:after {
    box-sizing: border-box;
}
```

- Fluid Typography: clamp(min, preferred, max) makes text scale smoothly across devices without breaking layouts.
```css
h1 {
  font-size: clamp(1.5rem, 2vw + 1rem, 3rem);
}
```

- Aspect Ratio Control: Ensures consistent image/video proportions without hacky padding tricks.
```css
.card img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

- Center aligning in a container

```css
/* Flexbox */
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}
/* Grid */
.parent {
    display: grid;
    place-items: center; /* Shorthand for justify/align */
}
```

- Responsive Design: Use media queries and relative units (vw, rem)

```css
@media (max-width: 600px) {
    .container {
        font-size: 0.9rem;
    }
}
```

- Use CSS Variables (Custom Properties) - Define reusable values for colors, spacing, fonts etc.

```css
:root {
  --primary-color: #007bff;
  --spacing: 1rem;
}

button {
  background: var(--primary-color);
  margin: var(--spacing);
}
```

- Always set `position` when using `z-index`.

```css
.modal {
  position: fixed;
  z-index: 9999;
}
```

- Dark Mode/ Light Mode - Automatically adapt to user’s system theme

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #121212;
    color: #f5f5f5;
  }
}
```

- Scrollbar Styling
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}
```