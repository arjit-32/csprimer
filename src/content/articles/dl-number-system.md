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

Computers use binary for calculations, hexadecimal for compact code, and decimal for human readability. Conversions between them are common.

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

Like decimal, but simpler (e.g., 1·1 = 1, 1·0 = 0). *Example: 11 (3) × 10 (2) = 110 (6).* 

---

## Signed Numbers

Computers represent positive and negative numbers using different methods:

- **Unsigned**: Only positive numbers
- **Sign-Magnitude**: First bit is the sign (0 = +, 1 = -)
- **1’s Complement**: Invert all bits to get negative
- **2’s Complement**: Invert and add 1 (most widely used)

### Why 2s Complement ?

- Single Zero: Unlike sign-magnitude or 1’s complement, which have +0 (0000) and -0 (1000 or 1111), 2’s complement has only one zero (0000), making comparisons easier.
- Seamless Addition: Addition works the same for positive and negative numbers, no special circuits needed for subtraction. Example: To subtract, add the 2’s complement (e.g., 3 – 2 = 3 + (–2)).
- No End-Around Carry: 1’s complement requires adjusting carries, which complicates hardware. 2’s complement handles carries naturally.
- Efficient Range: For n bits, it represents numbers from –2^(n-1) to +2^(n-1)–1 (e.g., 4 bits: –8 to +7), maximizing usable values.

**Example (2’s complement of 5)**:

*00000101* → Invert → *11111010* → Add 1 → *11111011* = -5