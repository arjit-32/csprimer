---
title: Events & Event Handling
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---


Event handling in JavaScript allows developers to make web pages interactive by responding to user actions such as clicks, typing, scrolling, or touch gestures


## Event Object

The event object (e) contains information about the event, such as:
- e.type → type of event (click, keydown, etc.)
- e.target → element that triggered the event
- e.currentTarget → element the listener is attached to
- e.clientX / e.clientY → mouse coordinates
- e.key → key pressed during keyboard events

```javascript
document.addEventListener("click", function(e) {
    console.log("Event type:", e.type);
    console.log("Clicked element:", e.target);
    console.log("Coordinates:", e.clientX, e.clientY);
});
```

---

## Attach an Event Listener

- `addEventListener` is the modern way to attach events.
- You can attach multiple listeners to the same element without overwriting previous ones.

```jsx
document.querySelector(".clear-task").addEventListener("click", function(e) {
    console.log("Button clicked");
    e.preventDefault();
});
```

`e.preventDefault()` prevents the browser’s default behavior (e.g., form submission or link navigation).

---

## Keyboard Events

```jsx
document.getElementById("task").addEventListener("keydown", function(e) {
    console.log(e.target.value);
});
```

`e.target.value` gives the current value of the input field during typing.

---

## Other Types of Events

| Event Type | Triggered by |
| --- | --- |
| `click` | Mouse click on an element. |
| `keydown / keyup` | Keyboard key press or release. |
| `mousemove` | Moving the mouse over an element. |
| `submit` | Submitting a form. |
| `change` | Changing the input value *(dropdowns, text).* |
| `scroll` | Scrolling a page or element. |
| `touchstart` | Touch interaction on mobile devices. |
| `focus/blur` | Input field gaining or losing focus. |


---

## Understanding Event Behavior

Events in JavaScript follow a specific flow(3 phases) when they are triggered.

- **Event Capturing** - In this phase, the event starts at the root of the DOM (e.g., `document`) and travels down the DOM tree toward the target element. By default, event listeners run in the bubbling phase. To use capturing, pass true as the third argument.
    
    ```jsx
    element.addEventListener("click", handler, true); // Capturing phase
    ```
    
- **Target Phase** - This is the phase where the event reaches the target element (the element that was clicked or interacted with).
- **Event Bubbling (default)** - After the target phase, the event bubbles back up the DOM tree, moving from the target element to its ancestors (e.g., parent, grandparent, etc.).

---

## Event Delegation

Efficient way to manage events. 

Instead of attaching individual event listeners to each child element, you attach a single event listener to a parent element and use the event's bubbling behavior to handle events triggered by its children.

```jsx
document.querySelector("ul").addEventListener("click", (e)=>{
    // tagName is always uppercase in HTML ("LI"), so comparisons must match case.
    if(e.target.tagName === "LI"){
        console.log("Clicked:", e.target.textContent);
    }
});
```

- `e.target` → actual element that triggered the event.
- `e.currentTarget` → element the listener is attached to.

---

## Other Important Concepts

### stopPropagation

Stops the event from propagating further in the DOM. Useful when you don’t want parent elements to react to the same event.

```javascript
document.querySelector(".btn").addEventListener("click", function(e) {
    e.stopPropagation();
    console.log("Button clicked without bubbling");
});
```

### once and passive options

You can pass options like { once: true } to run the handler only once.

```javascript
element.addEventListener("click", handler, { once: true });
```

{ passive: true } tells the browser the handler won’t call preventDefault(), improving performance for scroll/touch events.

```javascript
element.addEventListener("scroll", handler, { passive: true });
```