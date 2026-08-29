---
title: Assignment-2 - Core HTML elements
meta_title: Practicing Essential HTML Building Blocks
description: Strengthen your foundation in HTML by working with core elements like headings, paragraphs, lists, links, images, and multimedia. Learn how to use semantic tags such as <figure> and <figcaption> to give content proper meaning and accessibility.
author: Arjit Sharma
series: ["html-css"]
categories: ["Development"]
draft: false
year: 2026

---

_🎯 Goal:  Master core HTML elements._

**Tasks:**

- **Add**
    - headings
    - paragraphs
    - unordered & ordered lists
    - links (internal & external)
    - images with alt tags
    - video
- **Use `<figure>` + `<figcaption>` for images.**


---

## 💻 Solution

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Assignment 2: Core HTML Elements</h1>
   
   
    <h1>This is a Heading</h1>
   <h2>This is sub-heading</h2>

   <p>Adding a paragraph is simple as well</p>

   <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
   </ul>

    <br>

   <a href="google.com">This is link to Google</a> 
   <a href="a1.html">This is Internal link</a>
   
    <br>

   <img src="https://www.w3.org/thumbnails/250/logos/organizations/35507.png?x-version=1" alt="mozilla logo">

   <br>

   <video controls width="400">
        <source src="https://www.w3.org/cms-uploads/2025-w3c-holiday-card.mp4" type="video/mp4">
    </video>
 
    <br>

    <article>
        <h1>Image with figure</h1>
        <!-- Semantic Tag for image - Groups the image with a caption -->
        <figure>
            <img src="https://www.w3.org/thumbnails/250/logos/organizations/35507.png?x-version=1" alt="mozilla logo">
            <figcaption>This is caption</figcaption>
        </figure>
    </article>
</body>
</html>
```

---

For all CSPrimer assignments in one place, here is the repo - [Github](https://github.com/arjit-32/csprimer-assignments/tree/main)