---
title: Password Handling
meta_title: js
description: js
author: Arjit Sharma
series: ["auth"]
categories: ["Development"]
draft: false
year: 2025
---

When a system collects a password, it must be able to verify it later without ever storing or exposing the real password.

Why shouldn’t systems store raw passwords?

Because anyone with database access could see users’ actual passwords. If the database is leaked, every password becomes compromised immediately. Many users also reuse passwords across multiple services, which makes the damage even worse.

To avoid this, systems store a **hashed version** of the password instead of the password itself.


## Hashing

A **hash function** takes an input like a password and produces a fixed irreversible string called a hash.

```bash
"mypassword" → "$2b$10$7XYZ..."
```

The important property is that hashing is designed to be one-way. You can generate a hash from a password, but you cannot realistically recover the original password from the hash.

During login ->
- The user submits a password.
- The system hashes the submitted password again.
- The newly generated hash is compared with the stored hash.
- If they match, the password is correct.

The system never needs to store or retrieve the original password.

*Note - Passwords are hashed, not encrypted. Encryption is reversible, while hashing is designed to be a one-way process.*

---

## Salting

A salt is random data added to a password before hashing. It prevents identical passwords from producing identical hashes.

*Example without salts:*

```bash
"mypassword" → abc123
"mypassword" → abc123
```
This makes password patterns easier to detect. Without salts, two users with the same password would produce the same hash.

*Example with salts:*

```bash
salt1 + "mypassword" → xyz456
salt2 + "mypassword" → pqr789
```

Salts also help protect against precomputed attacks like rainbow tables.

Modern hashing libraries like bcrypt automatically generate and manage salts internally.

---

## Example of Password Handling

### Hashing Password During Registration

```javascript
import bcrypt from "bcrypt";

async function registerUser(email, password) {
  const saltRounds = 10; // controls hashing cost

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // store hashed password instead of raw password
  await User.create({
    email,
    password: hashedPassword,
  });
}
```

bcrypt.hash() automatically:

- generates a salt
- combines it with the password
- produces the final secure hash


### Verifying Password during Login

```jsx
async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) return "User not found";

  const isValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValid) return "Invalid password";

  return "Login success";
}
```

bcrypt.compare() hashes the submitted password again using the original salt stored inside the hash and checks whether both hashes match. The raw password is never stored in the database at any point.