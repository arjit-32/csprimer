---
title: Assignment-1 - HTML Structure & Semantics
meta_title: Building Meaningful Webpages with Semantic HTML
description: Learn how to properly structure webpages using semantic HTML tags
author: Arjit Sharma
series: ["dev-foundations"]
categories: ["Development"]
draft: false
year: 2026
---

_🎯 Goal: Learn proper HTML document structure and semantic tags._

**Tasks:**

- **Create a full HTML page using:**
```html
  <header>
  <nav>
  <main>
  <section>
  <article>
  <footer>
```
- **Add content for each.**
- **Validate HTML structure.**

---

## 🧠 Brief

Understand how to structure a webpage using semantic HTML, not just making things look right, but making them mean something.

Most begineer write HTML like this - 
```html
<div>
  <div>Header</div>
  <div>Content</div>
</div>
```

This works visually, but its meaningless for crawlers, screen readers and more.

Semantic HTML gives structure + meaning
```html
<header> → top section (branding, title)
<nav> → navigation links
<main> → primary content
<section> → grouped content
<article> → standalone piece (post, card)
<footer> → bottom info
```

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
    <h1>Assignment 1: Semantic HTML</h1>

    <header>
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" width="24px" alt="Github Logo">

        <span>Github</span>
    </header>

    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Explore</a></li>
        </ul>
    </nav>

    
    <!-- aside - use when related links, ads, author bio etc (not main content) -->
    <aside>
        <h2>My Repositories</h2>
        <ul>
            <li>My Repository 1</li>
            <li>Repo 2</li>
            <li>Repo 3</li>
            <li>Repo 4</li>
        </ul>
    </aside>


    <main>
        <!-- Section - grouping related content under a thematic heading  -->
        <section class="community-posts"> 
            <h2>Community Posts</h2>
            <!-- article - content is self‑contained like blog post, news story, forum post, product card -->
           <article>
                <h3>Post 1</h3>
                <p>Content of post 1...</p>
            </article>
            <article>
                <h3>Post 2</h3>
                <p>Content of post 2...</p>
            </article>
        </section>
    </main>


    <footer>
        <p>&copy; 2026 My Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

---

For all CSPrimer assignments in one place, here is the repo - [Github](https://github.com/arjit-32/csprimer-assignments/tree/main)