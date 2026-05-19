---
title: Closures 
meta_title: js
description: js
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---


## Closures Deep Dive
A closure is created when a function retains access to variables from its lexical scope, even after the outer function has finished executing. Closures are a direct result of lexical scoping.

A closure is a combination of:
  - a function
  - its lexical environment (the variables it closes over)

Closures allow functions to have persistent state without using global variables.

To put it bluntly - When a function *“remembers”* the variables from its surrounding scope, even after the outer function has finished running.


### Example of Closure - Bank Account


```jsx
function createBankAccount(initialBalance) {
  // Variables inside a function are not directly accessible from outside, which allows closures to simulate data privacy.
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited: $${amount}. New balance: $${balance}`);
    },
    withdraw(amount) {
      if (amount > balance) {
        console.log("Insufficient funds!");
      } else {
        balance -= amount;
        console.log(`Withdrew: $${amount}. Remaining balance: $${balance}`);
      }
    },
    checkBalance() {
      console.log(`Current balance: $${balance}`);
    }
  };
}

const myAccount = createBankAccount(100);
myAccount.deposit(50);     // Deposited: $50. New balance: $150
myAccount.withdraw(30);    // Withdrew: $30. Remaining balance: $120
myAccount.checkBalance();  // Current balance: $120
console.log(myAccount.balance); // Undefined! because balance is private, balance is not a property of myAccount, it exists only inside the closure.
```

Even after createBankAccount finishes execution, the returned methods still have access to balance because they form a closure over that variable.

---

### Example of Closure - function factory

```javascript
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```

---

## Common Use Cases
- Data privacy (like our bank example)
- Function factories
- Maintaining state in async code (timers, callbacks)


_Note - Closures can retain variables in memory longer than expected, which can lead to increased memory usage if not handled carefully._

