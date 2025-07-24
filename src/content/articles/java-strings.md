---
title: Working with Strings in Java
meta_title: Java Strings- Programming Guide | CS Primer
description: Master Java strings. Learn string operations and methods for effective text processing in programming
author: Arjit Sharma
series: ["java"]
categories: ["DSA"]
featured: false
draft: false
---

## Creating and Initializing Strings
Strings are objects of the String class in java.lang, but Java lets you use them like primitives.
```java
String msg = "hello world"; // Looks like a primitive, but it's an object
```

### Common Operations in Strings
```java
String msg = "hi" + "!!";       // Concatenation
int len = msg.length();         // Length of the string
int pos = msg.indexOf("l");     // First index of a character
String updated = msg.replace('!','*'); // Replace characters
```

### Escape Sequences 
```java
String quote = "hello \"Arjit\""; // to put double quotes inside double quotes
String path = "c:\\Windows\\";    // Escaping backslashes
String layout = "Hello\nWorld\tHi"; // New line and tab

```

🔒 Note: Strings Are `Immutable` <br/>
Once created, a String cannot be changed. Operations like .replace() or .concat() return new strings. <br/>
👉 For repeated modifications, use StringBuilder.

### String Comparison
```java
String a = "hello";
String b = new String("hello");

// ❌ Wrong: compares references
if (a == b) { ... }

// ✅ Right: compares values
if (a.equals(b)) { ... }

```

---
## String Cheatsheet
```java
char[] vowels = {'a', 'e', 'i', 'o', 'u'};
String s = "aeiou";
String s2 = new String("welcome");

s1.equals(s2);             // Value comparison
s1.equalsIgnoreCase(s2);   // Ignore case
s1.compareTo(s2);          // Lexicographical comparison
String joined = s1 + s2;   // Concatenation
s.substring(0, 2);         // "he" from "hello"
s.length();                // Length
s.charAt(0);               // First character
s.toCharArray();           // Convert to char array
s.toLowerCase();           // Lowercase
s.toUpperCase();           // Uppercase
s.trim();                  // Remove leading/trailing whitespace
String date = String.join(":", "1", "1", "2020"); // "1:1:2020"
String[] tokens = s.split("\\s"); // Split by whitespace
```
---

## StringBuilder Cheatsheet
```java
StringBuilder sb = new StringBuilder("arjit");

sb.append(" sharma");
sb.insert(0, "Mr. ");
sb.replace(0, 2, "Mister");
sb.delete(0, 7);
sb.reverse();
sb.substring(0, 3);
sb.charAt(0);
sb.setCharAt(0, 'A');
sb.toString();
String reversed = sb.reverse().toString(); // reverse

char[] dest = new char[10];
sb.getChars(0, 4, dest, 3);  // Copy chars from sb into dest array
sb.codePointAt(0);          // Unicode of char at index
sb.codePointBefore(1);      // Unicode before index
sb.indexOf("a");
sb.lastIndexOf("a");
```

---

## Character Utility Class
```java
char ch = 'A';

Character.isDigit(ch);
Character.isLetter(ch);
Character.isLowerCase(ch);
Character.isUpperCase(ch);
Character.isWhitespace(ch);
Character.isLetterOrDigit(ch);
```