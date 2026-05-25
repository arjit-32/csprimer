---
title: DOM Manipulation Cheatsheet
meta_title: JavaScript DOM Manipulation Guide | CS Primer
description: Master JavaScript DOM manipulation including element selection, content updates, styling, and dynamic page interactions.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

The Document Object Model (DOM) is the heart of web interactivity, enabling developers to dynamically manipulate HTML elements and the document structure. It acts as a bridge between HTML and JavaScript.

## Accessing Document Properties

The document object is the entry point to a webpage’s content, providing access to its elements and metadata.

```jsx
console.log(document); // Returns entire document
console.log(document.head);
console.log(document.body);
console.log(document.forms); // Get all form elements
console.log(document.links); 
console.log(document.images);
console.log(document.scripts);
```

---

## Selecting Elements

### By ID

```jsx
const title = document.getElementById("task-title");
title.className = "highlight";
```

### By Class Name

```jsx
const items = document.getElementsByClassName("collection-item");
items[0].style.color = "red"; // Changes first item's color
```

### By Tag Name

```jsx
const liItems = document.getElementsByTagName("li");
console.log(liItems[0]); // Logs first `<li>` element
```

### Using Query Selector

A more flexible way to select elements. 

```jsx
document.querySelector("#task-title"); // Selects element by ID
document.querySelector(".card-title"); // Selects by class
document.querySelector("h3"); // Selects first <h3> element
document.querySelector("ul li").style.color = "blue"; // Changes first list item color
```

`querySelector` returns the first match, while `querySelectorAll` returns a NodeList of all matches. Used to get all matching elements.

```jsx
const listItems = document.querySelectorAll("ul.collection li.collection-item");
```

---

## Converting HTML collection to an array

Methods like `getElementsByClassName` and `getElementsByTagName` return an HTMLCollection, which is array-like but does not support array methods directly.

```jsx
let li = document.getElementsByTagName("li");
	
li = Array.from(li);

// Can use array methods now
li.reverse();
li.forEach(function(li){
    console.log(li);
});
```

---

## Modifying Elements

### Changing Styles

```jsx
let title = document.getElementById("task-title")
title.style.background = "#333";
title.style.color = "#fff";
title.style.display = "none"; // Hides element
```

### Changing Content

```jsx
let title = document.getElementById("task-title")
title.textContent = "New Title"; // Updates text
title.innerHTML = "<span>Updated Title</span>"; // Injects HTML
```

- textContent → returns all text (faster)
- innerText → considers styling (slower)


_Note - Be careful with innerHTML - it can introduce security risks (XSS) if used with untrusted input._

---

## Working with Classes and Attributes

Dynamically update an element’s classes or attributes for styling or functionality. `classList` provides a safe and convenient way to manage classes compared to modifying className directly.

```jsx
const firstLi = document.querySelector("li:first-child");
const link = firstLi.children[0];

link.classList.add("test");
link.classList.remove("test");

console.log(link.hasAttribute("href"));
console.log(link.getAttribute("href"));
link.setAttribute("href", "https://example.com");
link.removeAttribute("href");
```

---

## Traversing the DOM

Navigate elements dynamically. `children` returns only element nodes, while `childNodes` includes text and comment nodes.

```jsx
const list = document.querySelector("ul.collection");
const listItem = document.querySelector("li.collection-item:first-child");

console.log(list.children); // Gets direct children
console.log(list.firstElementChild); // First child element
console.log(list.lastElementChild); // Last child element
console.log(listItem.nextElementSibling); // Next sibling
console.log(listItem.parentElement); // Parent of element
```

---

## Creating & Adding Elements

```jsx
const li = document.createElement("li");
li.className = "collection-item";
li.id = "new-item";
li.setAttribute("title", "New Item");

const link = document.createElement("a");
link.className = "delete-item secondary-content";
link.innerHTML = '<i class="fa fa-remove"></i>';

li.appendChild(document.createTextNode("Hello World"));
li.appendChild(link);
document.querySelector("ul.collection").appendChild(li);
```

Modern methods like `append()` can be used instead of `appendChild()` and support multiple elements.

```javascript
parent.append(child1, child2);
```

---

## Replacing and Removing Elements

### Replacing an existing heading

```jsx
const newHeading = document.createElement("h2");
newHeading.id = "task-title";
newHeading.appendChild(document.createTextNode("Task List"));

const oldHeading = document.getElementById("task-title");
document.querySelector(".card-action").replaceChild(newHeading, oldHeading);
```

### Removing a element

`.remove()` is simpler and preferred, while `removeChild()` requires a reference to the parent.

```jsx
document.querySelectorAll("li")[0].remove();
document.querySelector("ul").removeChild(document.querySelectorAll("li")[3]);
```