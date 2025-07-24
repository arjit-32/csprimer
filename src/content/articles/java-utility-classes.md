---
title: Other utility classes
meta_title: Java Utility Classes- CS Guide | CS Primer
description: Discover Java utility classes. Learn tools like Math and Date for efficient programming and CS tasks.
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Math class
```java
int rounded = Math.round(1.6F);      // 2
double floored = Math.floor(3.9);    // 3.0
double ceiling = Math.ceil(3.1);     // 4.0
int maxVal = Math.max(10, 20);       // 20
int minVal = Math.min(5, -2);        // -2
double pow = Math.pow(2, 3);         // 8.0
double sqrt = Math.sqrt(16);         // 4.0
int abs = Math.abs(-10);             // 10
```

---
## Date & Time
Old way is with *java.util.Date* & *java.util.Calendar*
Since java8 we use *java.time* package

```java
// Getting current date & time
LocalDate.now();
LocalTime.now();
LocalDateTime.now();

// Creating 
LocalDate d1 = LocalDate.of(2021,1,26); // 26 jan 2021
LocalTime t1 = LocalTime.of(9,30,5); // 9:30:05
LocalDateTime dt = LocalDateTime.of(2021,1,26,9,30);

// Manipulating
d1.plusDays(10); // Add 10 days to d1
d1.withYear(2025); // update the year to 2025
d1.minusDays(3);
t1.minusHours(1);
```
---
## Random Numbers
```java
import java.util.Random;

Random rand = new Random();
int num = rand.nextInt();         // any int
int bounded = rand.nextInt(100); // 0 to 99
```

---
## BigInteger and BigDecimal
Used when `int` or `double` aren’t precise enough (like working with huge numbers or decimals in financial apps).

```java
BigInteger big = new BigInteger("12345678901234567890");
BigInteger result = big.multiply(BigInteger.valueOf(2));

BigDecimal decimal = new BigDecimal("1234.56789");
BigDecimal total = decimal.add(new BigDecimal("100.10"));
```

---
## System Class Tricks
```java
System.currentTimeMillis(); // Returns current time in milliseconds
System.exit(0);             // Terminates program
System.gc();                // Suggests garbage collection
```