---
title: Object Oriented Javascript
meta_title: Object Oriented JavaScript | CS Primer
description: Learn object-oriented programming in JavaScript including classes, objects, encapsulation, inheritance, and polymorphism.
author: Arjit Sharma
series: ["javascript"]
categories: ["Development"]
draft: false
year: 2025
---

JavaScript uses prototypal inheritance, even when using class syntax.

## What are Classes?

A class is a blueprint for creating objects.
In JavaScript, classes are syntactic sugar over the prototype system.

It defines:

- Properties (data)
- Methods (behavior)

```jsx
class Car {
    constructor(name, doors) {
        this.name = name;
        this.doors = doors;
    }
    startTheCar() {
        return `The car ${this.name} with ${this.doors} doors started`;
    }
}
const ferrari = new Car("Ferrari", 4);
console.log(ferrari.startTheCar()); // The car Ferrari with 4 doors started

// ferrari instanceof Car; // Used to check if an object belongs to a class.
```

Methods defined inside a class are actually stored on the object's prototype, not copied to each instance. Inside class methods, `this` refers to the instance of the object.


---

## Constructor

The constructor is a special method that runs when a new instance is created using `new`. If no constructor is defined, JavaScript provides a default empty constructor.

```jsx
constructor(name, doors)
```

- Runs automatically when `new Car()` is called
- Initializes object properties

```jsx
const ferrari = new Car("Ferrari", 4); // ferrari is an instance of the Car class.
console.log(ferrari.startTheCar());
```

---

## Inheritance

Classes can inherit from other classes using `extends`.

```jsx
class ElectricCar extends Car {
    constructor(name, doors, battery) {
        super(name, doors);
        this.battery = battery;
    }

    charge() {
        return `${this.name} is charging`;
    }
}

const tesla = new ElectricCar("Tesla", 4, "100kWh");

console.log(tesla.startTheCar());
console.log(tesla.charge());
```

`super()` calls the parent class constructor and must be called before accessing `this` in a subclass.

---

## Method Overriding

Child classes can override parent methods. The child method replaces the parent method for that instance, but the parent method can still be accessed using `super.methodName()`.

```jsx
class ElectricCar extends Car {
    startTheCar() {
        return `The electric car ${this.name} starts silently`;
    }
}
```

---

## Private Fields

Modern JavaScript supports private properties using `#`. Private fields are only accessible inside the class where they are defined and are not part of the prototype. Encapsulation means restricting direct access to some data and exposing it through methods.

```jsx
class Car {
    #engineStarted = false;

    start() {
        this.#engineStarted = true;
        return "Engine started";
    }
}
```

- Cannot be accessed outside the class
- Enforces encapsulation

---

## Static Methods

Static methods belong to the class itself, not to instances.

```javascript
class Car {
  static info() {
    return "Cars are vehicles";
  }
}

Car.info(); // Works
```