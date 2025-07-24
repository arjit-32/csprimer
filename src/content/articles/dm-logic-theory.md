---
title: Theory of Logic
author: Arjit Sharma
meta_title: Theory of Logic- Discrete Math Core | CS Primer
description: Understand the theory of logic in discrete math. Learn propositions, predicates, and proofs to excel in CS and reasoning
series: ["dm"]
categories: ["Core-CS"]
draft: false
---

Logic is the backbone of programming, testing, and systems design. Discrete math formalizes logic so we can reason clearly like turning *“maybes”*  into *“provable truths”*.

## Propositional Logic

A proposition is a statement that’s either true or false. 

Example - “It is raining”, “I am happy” ., etc all these statements *(predicate)* can be either true or false.

### Logic operators

| Symbol | Meaning | Condition |
| --- | --- | --- |
| ¬p | NOT | Reverse true to false and vice cersa. |
| p∧q | AND | Results true if both are true |
| p∨q | OR | Results true if either is true |
| p→q | IMPLIES | If p is true, then q must be true |
| p↔q | BICONDITIONAL | True if p and q have the same truth value |

### Truth Tables

These are your cheatsheet showing all possible outcomes from a proposition.

Example - Let A = “It is sunny” and B = “I have money”. Then lets make a truth table for

![logic](https://res.cloudinary.com/dwa6rcttw/image/upload/v1748157124/logic_y2wz5f.png)

| **A (sunny)** | **B (have money)** | **Buy ice-cream** |
| --- | --- | --- |
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

Then we can look at our truth table and identify suitable combinations from the table. In this case we know a similar result as buying a ice cream, is achievable by And operator (A And B)

### Code Example

```jsx
if (isAdmin && isActive) {
    allowAccess();
}
```

Its nothing but a proposition logic *(isAdmin ∧ isActive → access)* in form of a code.

---

## First Order Predicate Logic

Goes beyond simple statements and lets us talk about variables. Quantifiers are used to express statements about collections of objects. There are 2 types -

- **Universal Quantifier** - ∀x *(“for all x”)*
`∀x (x² ≥ 0)` This is read as “For all x, x squared is greater than equal to 0”
- **Existential Quantifier** - ∃x *(“there exists an x”)*
`∃x (x² = 4)` This is read as “There exists an x, where x squared equals 4”

This is the basis of assertions in formal verification, tests, and proofs.

### Code Example

```jsx
SELECT * FROM products 
WHERE EXISTS (
    SELECT * FROM inventory 
    WHERE inventory.quantity = 0
);
```

It shows that is there atleast one product out of stock *(Existential)*

---

## Conclusion

Logic helps you write code that makes sense and prove that it works the way it should. No guesses anymore !