---
title: Assignment-3 - Forms
meta_title: Building Accessible and Validated HTML Forms
description: Practice creating forms with core input types like text, email, password, checkboxes, radio buttons, selects, and textareas. Learn to pair inputs with labels, use placeholders effectively, and apply validation attributes such as required, minlength, and pattern for better user experience.
author: Arjit Sharma
series: ["dev-foundations"]
categories: ["Development"]
draft: false
year: 2026
---


_🎯 Goal:  Understand form elements and semantics._

**Tasks:**

- **Build a form with**
    - text
    - email
    - password
    - checkbox
    - radio buttons
    - select
    - textarea
- **Add labels and placeholders.**
- **Demonstrate HTML validation attributes - `required`, `minlength`, `pattern`**


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
   <h1>Assignment 3: Forms</h1>
    
   <form action="">
    <!-- Text Input -->
    <label for="name">Name</label>
    <input type="text" name="name">

    <!-- Email Input -->
    <label for="email">Email</label>
    <input type="email" name="email" required>

    <!-- Password Input -->
    <label for="password">Password</label>
    <input type="password" name="password" minlength="6" pattern="(?=.*\d).{6,}">

    <br>

    <!-- Radio Buttons -->
    <fieldset>
    <legend>Gender</legend>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">Male</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">Female</label>
    </fieldset>

    <!-- Checkboxes -->
    <fieldset>
      <legend>Mode of Attendance</legend>
        <input type="checkbox" id="virtual" name="attendance" value="virtual">
        <label for="virtual">virtual</label>
        <input type="checkbox" id="inperson" name="attendance" value="inperson">
        <label for="inperson">In Person</label>
    </fieldset>

    <!-- Select Dropdown -->
    <label for="salary">Salary Range</label>
    <select name="salary" id="salary">
        <option value="0-100">less than 100</option>
        <option value="101-200">100-200</option>
        <option value="201-300">more than 200</option>
    </select>

    <!-- Textarea -->
    <textarea name="comments" id="" placeholder="Any Comments"></textarea>

    <!-- Submit -->
    <input type="submit" value="submit">
   </form>

</body>
</html>
```

---

For all CSPrimer assignments in one place, here is the repo - [Github](https://github.com/arjit-32/csprimer-assignments/tree/main)