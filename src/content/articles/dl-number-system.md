---
title: Number Systems and Binary Arithmetic
author: Arjit Sharma
meta_title: Number System in Digital Logic | CS Primer
description: Explore number systems in digital logic. Learn binary, hexadecimal, and conversions for computing and circuit design.
series: ["dl"]
categories: ["Core-CS"]
draft: false
year: 2025
---

Computers use binary (0s and 1s) to store and process numbers. Understanding number systems and binary math is key to grasping how data works in digital systems.

## Common Number Systems

| System | Base | Digits Used |
| --- | --- | --- |
| **Binary** | 2 | 0, 1 |
| **Octal** | 8 | 0–7 |
| **Decimal** | 10 | 0–9 |
| **Hexadecimal** | 16 | 0–9, A–F |

- Binary is the native language of computers.
- Hexadecimal is often used by programmers because it’s shorter and maps neatly to binary.
- Decimal is what humans use daily.
- Octal was historically used but is less common today.

Conversions between these systems are essential for programming, debugging, and circuit design.

---

## Binary Arithmetic

Binary math follows rules similar to decimal but uses only 0 and 1.

### Addition Rules

```jsx
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 10 (carry 1)
```

### Subtraction Rules

```jsx
0 - 0 = 0
1 - 0 = 1
1 - 1 = 0
0 - 1 = 1 (borrow 1)
```

### Multiplication and Division

- Multiplication is straightforward: 1·1 = 1, 1·0 = 0.
- Division follows similar logic.

*Example: 11 (binary for 3) × 10 (binary for 2) = 110 (binary for 6).* 

---

## Signed Numbers

Computers represent positive and negative numbers using different methods:

- **Unsigned**: Only positive numbers
- **Sign-Magnitude**: First bit is the sign (0 = +, 1 = -)
- **1’s Complement**: Invert all bits to get negative
- **2’s Complement**: Invert and add 1 (most widely used)

---

## Why we use 2s Complement ?

![twos-complement](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779725270/why-twos-complement_h1am2u.webp)

- Single Zero: Unlike sign-magnitude or 1’s complement, which have +0 (0000) and -0 (1000 or 1111), 2’s complement has only one zero (0000), making comparisons easier.
- Seamless Addition: Addition works the same for positive and negative numbers, no special circuits needed for subtraction. Example: To subtract, add the 2’s complement (e.g., 3 – 2 = 3 + (–2)).
- No End-Around Carry: 1’s complement requires adjusting carries, which complicates hardware. 2’s complement handles carries naturally.
- Efficient Range: For n bits, it represents numbers from –2^(n-1) to +2^(n-1)–1 (e.g., 4 bits: –8 to +7), maximizing usable values.


### Example (2’s complement of 5):

![twos-complement-example](https://res.cloudinary.com/dwa6rcttw/image/upload/v1779725272/twos-complement-example_lr3yoe.webp)

```jsx
00000101 → Invert → 11111010 → Add 1 → 11111011 = -5
```

---

## Conclusion

Number systems and binary arithmetic form the mathematical backbone of digital logic. By mastering conversions and operations, engineers can design efficient circuits, optimize storage, and understand how computers truly "think".
