---
title: Introduction to DOM
meta_title: JavaScript DOM Introduction | CS Primer
description: Learn the JavaScript DOM, document structure, node traversal, and how web pages are represented in browsers.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

The DOM acts as a bridge between HTML and JavaScript.

When you build a webpage, you're not just writing HTML. You're creating a document structure that the browser parses and transforms into a dynamic tree structure. The DOM(Document Object Model) is a programming interface (API) that allows JavaScript to interact with the document.

## What Is the DOM?

The DOM (Document Object Model) is a tree-like representation of your web page. It is a structured version of the HTML that JavaScript can interact with.

Key characteristics →

- Each element, attribute, and text becomes a node.
- The DOM is language-neutral, but JavaScript is most commonly used to interact with it.
- It’s dynamic - changes made via JavaScript update the DOM, which then triggers updates in the rendered page.

*Note - The DOM is not the raw HTML file it’s a live, in-memory object model created by the browser.*

**DOM Tree Example**

*HTML:*

```html
<html>
	<body>
		<ul>
		  <li>Item 1</li>
		  <li>Item 2</li>
		</ul>
	</body>
</html>
```

*Becomes a DOM tree like:*

```
Document
 └── <html>
      └── <body>
           └── <ul>
                ├── <li>Item 1</li>
                └── <li>Item 2</li>
```

The document object is the root of the DOM and provides methods to access and manipulate elements.
Each tag is a node, and these nodes form a hierarchy. Once the DOM is loaded, JavaScript can edit elements and can handle user interactions in real-time. This allows interactive behavior like animations, form validation, dynamic data, etc

---

## How the DOM Is Built

1. **HTML Download**: The browser downloads the HTML file.
2. **Parsing**: The browser parses the HTML markup.
3. **DOM Tree Construction**: The browser builds the DOM tree in memory.
4. **CSSOM Construction**: The browser parses CSS and builds the CSS Object Model (CSSOM).
5. **Render Tree Creation**: The DOM and CSSOM are combined to create the render tree.
6. **Layout and Paint**: The browser calculates the layout and paints the elements on the screen.

JavaScript can block DOM construction if executed synchronously during parsing.

*Note: Scripts in the `<head>` or early `<body>` can block rendering unless they use `defer` or `async` attributes.*

Key Events during DOM construction -
- **DOMContentLoaded**: fires when HTML is parsed and DOM is ready (does not wait for images/styles)
- **Load**: fires when the entire page (including images, CSS, etc.) is fully loaded

---

## Node Types in the DOM

DOM represents an HTML document as a hierarchical tree of nodes, where each node corresponds to a part of the page *(tags, text, attributes)*

```jsx
<div class="box">
  Hello <span>World</span>
  <!-- A comment -->
</div>

// Nodes would be formed like -
Element Node: <div>
├── Text Node: "Hello "
├── Element Node: <span>
│   └── Text Node: "World"
└── Comment Node: "A comment"
```

| **Node Types** | **Description** | **Numeric Value** |
| --- | --- | --- |
| Element Node | Represents HTML elements like `<div>, <p>` | 1 |
| Attribute Node | Represents attributes like *class, href* | 2 |
| Text Node | Contains the actual text inside elements | 3 |
| Document Node | Represents the entire HTML document | 9 |
| Document Fragment | Lightweight container for DOM operations | 11 |
| Comment Node | Represents comments in HTML | 8 |

*Note - Document Fragment (11) is especially useful for performance: you can build a set of nodes in memory and then insert them into the DOM in one operation.*

*Note - Attribute nodes exist conceptually, but in modern DOM APIs, attributes are accessed via element properties rather than as separate nodes.*

---

## DOM Events

The DOM event system allows web pages to respond to user interactions like clicks, typing, scrolling, and more. When these occur, the browser dispatches events and we can handle them via JavaScript.

**Event Flow**

- Capturing phase → from root *(document)* down to target.
- Target phase → event reaches the element.
- Bubbling phase → event bubbles back up until root again.

*Note: Event listeners without { capture: true } run in the bubbling phase.*

**Event Delegation**

Event Delegation is a technique that leverages event bubbling to handle events more efficiently. You can use `event.target` or `event.currentTarget` to determine where the event originated.

- Instead of attaching listeners to many child elements, you attach one listener to a parent element.
- When an event bubbles up, you check the event’s target to see which child triggered it.

*Example: One click handler on `<ul>` can handle clicks for all `<li>` items.*

```jsx
<ul id="menu">
  <li>Home</li>
  <li>About</li>
  <li>Contact</li>
</ul>

<script>
  const menu = document.getElementById("menu");

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      console.log("You clicked:", event.target.textContent);
    }
  });
</script>
```

---

## DOM Is Not Just a Browser Thing

The DOM specification comes from **W3C** and **WHATWG**, and not from JavaScript itself. 

It is used in many other contexts like - 

- Libraries like *React* use a virtual DOM, while others like *Vue* and *Svelte* use different strategies to optimize DOM updates.
- *JSDOM* simulates the DOM in Node.js.

DOM is a universal standard, not just a browser feature but the real DOM remains the foundation of how web documents are structured and manipulated.

---

## Reflows & Repaints (Performance)

When you modify the DOM, the browser may need to update the rendering pipeline. Two key processes occur:

- **Repaint** → visual style changes (color, shadows)
- **Reflow** → layout changes (size, position, geometry)

Reflows are much more costly than repaint. Frequent DOM updates should be minimized or batched to avoid performance issues.
