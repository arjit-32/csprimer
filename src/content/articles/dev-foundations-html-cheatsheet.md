---
title: HTML Cheatsheet
meta_title: Quick Reference Guide to HTML Tags
description: A handy HTML cheatsheet covering essential tags, attributes, and examples. Perfect for developers and learners who need a fast reference to build and structure web pages.
author: Arjit Sharma
series: ["html-css"]
categories: ["Development"]
draft: false
year: 2025
---

*Markup language* for creating web pages. It defines structure of the webpage like where to put heading, a paragraph a link to another site, etc. 

A web browser is a application that is able to interpret HTML and display it on the screen.

HTML has 2 key components →

Tags - Define elements like headings, paragraphs, or links.

Attributes - Provide additional information about tags.

## Basic Structure

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

---

## Basic Tags

```html
<!-- Headings -->
<h1>,<h2>,<h3>,<h4>,<h5>,<h6> 

<!-- Paragraphs -->
<p>

<!-- Text formatting -->
<b>Bold</b>, <i>Italic</i>, <u>Underline</u>, <strong>Strong Text</strong>, <em>Emphasized</em>

<!-- Links -->
<a href="https://facebook.com">Visit Website</a>
<!-- anchor tag has a target attribute, which tells where to open the page(same window, another window etc) -->

<!-- Code Formatting -->
<pre>

<!-- Line Break & Horizontal Line -->
<br/>, <hr/>

<!-- Containers: Group content together -->
<div class="container">Main Section</div>
<span class="highlight">Inline Element</span>
```

---

## Lists

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<ol>
    <li>First</li>
    <li>Second</li>
</ol>
```

---

## Tables

```html
<table>
   <thead>
	    <tr>
        <th>Name</th>
        <th>Age</th>
	    </tr>
   </thead>
   <tbody>
	    <tr>
        <td>Arjit</td>
        <td>22</td>
	    </tr>
   </tbody>
</table>
```

---

## Media

```html
<!-- Images -->
<img src="[www.arjitsharma.com/img.jpg](http://www.arjitsharma.com/img.jpg)" alt="Alternate text">

<!-- Videos -->
<video controls>
	<source src="location" type="video/mp4">
</video>

<!-- Audios -->
<audio controls>
	<source src="location" type="audio/mp3">
</audio>

<!-- Iframes - displaying webpage within another webpage -->
<iframe src="url" title="description for screen readers"></iframe>
```

---

## Forms

```html
<form>
	<!--Text-->
	<label for="name">Name </label>
	<input type="text" name="name"><br>
	
	<!-- Email -->
	<label for="email">Email </label>
	<input type="email" name="email"><br>
	
	<!--Password-->
	<input type="password" name="pwd">
	
	<!--Button-->
	<input type="button">
	
	<!--Submit: submitting form data-->
	<input type="submit" value="submit">
	
	<!--File-->
	<input type="file" name="filename">
	
	<!--Number-->
	<input type="number" name="quantity" min="1" max="10">
	
	<!--Radio Button-->
	<input type="radio" id="male" name="gender" value="male">
	<label for="male">Male</label>
	
	<input type="radio" id="female" name="gender" value="female">
	<label for="female">Female</label>
	
	<!--Checkbox-->
	<input type="checkbox" id="option1" name="option1" value="option1">
	<label for="option1">Option 1</label>
	
	<input type="checkbox" id="option2" name="option2" value="option2">
	<label for="option2">Option 2</label>
</form>
```

---

## Semantic HTML

Semantic HTML uses tags that convey meaning, improving accessibility and SEO:

```html
<header>Head of doc</header>
<nav>Navigation bar/Has Links</nav>
<section>A section in a doc</section>
<article>Independent, self-contained content</article>
<aside>Content aside from content</aside>
<footer>Footer of doc</footer>
<details></details> & <summary></summary>
```

---

## Accessibility & ARIA

ARIA (Accessible Rich Internet Applications) attributes improve screen reader support.

```html
<!-- ARIA roles and labels -->
<button aria-label="Close dialog" role="button">X</button>

<!-- Landmark roles -->
<nav role="navigation" aria-label="Main menu">
  <ul>
    <li><a href="#home">Home</a></li>
  </ul>
</nav>

<!-- Hiding content from screen readers -->
<p aria-hidden="true">Decorative text</p>
```

---

## Custom Data Attributes
data-* lets you store extra info on elements. Its accessible via `element.dataset` in JavaScript.


```html
<div id="product" data-id="12345" data-category="books">
  Book Title
</div>

<script>
  const product = document.getElementById("product");
  console.log(product.dataset.id);       // "12345"
  console.log(product.dataset.category); // "books"
</script>
```


---

## Additional Concepts

### Collapsible Content

```html
<details>
  <summary>More Information</summary>
  <p>This text is hidden until you expand the summary.</p>
</details>
```

### Progress Indicators

```html
<!-- Progress: shows completion -->
<label for="file">File upload:</label>
<progress id="file" value="70" max="100">70%</progress>

<!-- Meter: shows a measurement within a range -->
<label for="fuel">Fuel level:</label>
<meter id="fuel" value="0.6" min="0" max="1" low="0.2" high="0.8" optimum="0.9">
  60%
</meter>
```

### Symbols & Emojis

HTML supports special characters and emojis using HTML entities or Unicode:

```html
<!-- Symbols -->
<p>&copy; 2025 Copyright</p> <!-- Copyright symbol -->
<p>&rarr; Right Arrow</p> <!-- Right arrow -->

<!-- Emojis (Unicode) -->
<p>😀 Smiley Face</p>
<p>🚀 Rocket</p>
```
