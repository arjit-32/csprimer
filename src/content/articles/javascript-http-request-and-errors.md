---
title: HTTP Requests & Error Handling in Javascript
meta_title: JavaScript HTTP Requests & Error Handling | CS Primer
description: Learn JavaScript HTTP requests, Fetch API, async networking, try-catch, and effective error handling techniques.
author: Arjit Sharma
series: javascript
categories: ["Development"]
draft: false
year: 2025
---

Historical Context - In the late 1990s, web apps became more interactive, and developers needed a way to fetch data asynchronously - this led to **XMLHttpRequest (XHR)**. The **Fetch API** (2015) later modernized HTTP requests using promises.

JavaScript provides several methods to make HTTP requests to fetch or send data to servers.

## XMLHttpRequest (XHR)

Legacy API for making HTTP requests. Handles responses via event listeners. While it offers fine-grained control over the request lifecycle, it does not have native promise support.

```jsx
function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true); // true for async
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) { // readyState === 4 means the request is complete.
            const data = JSON.parse(xhr.responseText);
            console.log(data.map(user => user.name));
        } else if (xhr.readyState === 4) {
            console.error("Error:", xhr.status);
        }
    };
    xhr.send();
}
fetchData();
// Output: Array of user names or error if request fails

```

---

## Fetch API

Modern, promise-based alternative to XHR, built into browsers. Returns a Promise resolving to a Response object. fetch only rejects on network errors. HTTP errors (like 404 or 500) do not reject the promise, we must check response.ok manually.

```jsx
async function fetchData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        console.log(data.map(user => user.name));
    } catch (error) {
        console.error("Error:", error);
    }
}
fetchData();
// Output: Array of user names or error if request fails

```

---

## Axios

Third-party library for HTTP requests, built on top of XHR (in browsers) or Node.js HTTP module. It’s promise-based and provides additional features. Unlike fetch, Axios automatically rejects the promise for HTTP error status codes.

```jsx
import axios from "axios"; // Requires module bundler or CDN

async function fetchData() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log(response.data.map(user => user.name));
    } catch (error) {
        console.error("Error:", error.message);
    }
}
fetchData();
// Output: Array of user names or error if request fails

```

--- 

## Error Handling in Asynchronous JS

Execution is deferred (via event loop). Errors in asynchronous code do not propagate like synchronous errors, so they must be handled explicitly.

### Example with Callbacks:

Here, the error is caught inside the async function and passed back to the caller via the callback.*(Nodejs uses this convention)*

```jsx
function fetchData(callback){
	setTimeout(()=>{
		try{
			throw new Error("Failed to fetch data");
		} catch(error){
			callback(error,null);
		}
	},1000);
}

fetchData((error, data)=>{
	if(error) {
    console.error("Error:", error.message);
    return;
  }
	console.log("Data:", data);
});
```

### Example with Promises:

Promises provide a cleaner way: instead of manually passing errors, you call `reject()`. Consumers handle errors using `.catch()`.

```jsx
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Failed to fetch data"));
    }, 1000);
  });
}

fetchData()
  .then((data) => console.log("Data:", data))
  .catch((error) => console.error("Error:", error.message)); 
```

### Example with `async/await`:

*async/await* syntax makes asynchronous code look synchronous. Errors inside async functions **automatically become rejected promises**. You handle them with try...catch around the await.

```jsx
async function fetchData() {
  throw new Error("Failed to fetch data");
}

(async () => {
  try {
    const data = await fetchData();
    console.log("Data:", data);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
```
