---
title: Asynchronous JavaScript
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

Built on top of the event loop, JavaScript handles asynchronous operations using callbacks, promises, and async/await.

## Callbacks

Callbacks are functions passed as arguments to execute after a task or event. 

They enable deferred execution for asynchronous operations such as *API responses, Timers(setTimeout, setInterval), Event listeners etc*. Event loop ensures that once the async task finishes, the callback is placed in the task queue and executed when the call stack is empty. (does not block the main thread)

```jsx
function fetchUserData(userId, callback) {
    setTimeout(() => {
        console.log(`Fetched data for User ${userId}`);
        callback({ id: userId, name: `User${userId}` });
    }, Math.random() * 2000); // Simulating variable API response time
}

function displayUser(user) {
    console.log(`Processing User: ${user.name}`);
}

// Fetching data for multiple users independently
fetchUserData(1, displayUser);
fetchUserData(2, displayUser);
fetchUserData(3, displayUser);

// Expected Output (order will vary due to async behavior):
// Fetched data for User 2
// Processing User: User2
// Fetched data for User 1
// Processing User: User1
// Fetched data for User 3
// Processing User: User3
```

_Note - Can lead to callback hell, where deeply nested callbacks make code hard to read and maintain._

---

## Promises

A promise represents the **eventual result of an asynchronous operation**. Promises provide a cleaner way to handle async results. Instead of dealing with nested callbacks *(callback hell)* it avoids deep nesting of callbacks, improving readability.

**A promise has three states:** 
- pending - initial state, it doesn’t have a value yet.
- resolved - Operation completes successfully and then passes data to *.then()* where resolved value is handled
- rejected - Operation fails and we handle the error

*Note - Promise callbacks (.then, .catch) run in the microtask queue, giving them higher priority than timers.*

```jsx
function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Fetched data for User ${userId}`);
            resolve({ id: userId, name: `User${userId}` }); // triggers .then(), The .then() handler is scheduled in the microtask queue
        }, Math.random() * 2000); 
    });
}

function displayUser(user) {
    console.log(`Processing User: ${user.name}`);
}

// Fetching data for multiple users independently
fetchUserData(1).then(displayUser);
fetchUserData(2).then(displayUser);
fetchUserData(3).then(displayUser);
```

### Promise Chaining

Each .then() returns a new promise, enabling sequential transformations:

```javascript
fetchUserData(1)
  .then(user => user.name)
  .then(name => console.log(name));
```

### Error handling in promises

```javascript
return new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      resolve({ id: userId, name: `User${userId}` });
    } else {
      reject("Failed to fetch user");
    }
  }, Math.random() * 2000);
});

// Usage
fetchUserData(1)
  .then(displayUser)
  .catch(err => console.error(err));

```

---

## Async/Await

Async/await (ES2017) is syntactic sugar over promises, making async code look synchronous. `await` only works inside async functions. `await` pauses execution of the function, but does not block the main thread.

```jsx
async function getData() {
    try {
    // Wait for HTTP request to complete and give Response object
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); 
    // Wait for the response body to be converted to JSON
        const data = await response.json();
        console.log(data.map(user => user.name));
    } catch (error) {
        console.error("Error:", error);
    }
}
getData();

// Same thing in promises
/*
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json()) // Convert response to JSON
    .then(data => console.log(data));  // Process data
*/
```

Errors in async/await can be handled using try...catch, similar to synchronous code.


### Sequential vs Parallel Execution

Use sequential execution when tasks depend on each other, and parallel execution when tasks are independent.

```javascript
async function sequential() {
  const user1 = await fetchUserData(1); // waits until done
  const user2 = await fetchUserData(2); // runs only after user1 finishes
  console.log(user1, user2);
}


// Same thing in promises
/*
fetchUserData(1)
  .then(user1 => {
    console.log("Processed:", user1.name);
    return fetchUserData(2); // only runs after user1 finishes
  })
  .then(user2 => {
    console.log("Processed:", user2.name);
    return fetchUserData(3); // only runs after user2 finishes
  })
  .then(user3 => {
    console.log("Processed:", user3.name);
  })
  .catch(err => console.error(err));
```

For independent tasks, run them in parallel with Promise.all:

```javascript
async function parallel() {
  const [user1, user2] = await Promise.all([
    fetchUserData(1),
    fetchUserData(2)
  ]);
  console.log(user1, user2);
}
```

