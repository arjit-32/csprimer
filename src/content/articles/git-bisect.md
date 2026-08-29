---
title: Bisect in Git
meta_title: Using Git Bisect to Find Bugs | CS Primer
description: Learn how to use Git bisect to identify problematic commits quickly, speeding up the bug-fixing process in 2025.
author: Arjit Sharma
series: git
categories: ["Extras"]
draft: false
year: 2025
---

Useful for finding bugs. It does a binary search on your commits to find where the bug was introduced.

## How it Works ?

Git Bisect helps you find the exact commit that introduced bug. It requires us to specify - 

- A *bad* commit (where bug is present)
- A *good* commit (where bug was’nt present)

This will be done repeatedly in binary search way.

## Example : Finding a bug using Git Bisect

Lets say we are writing a code for adding numbers. 

### Step-1: Got error at one point

Following is my code, Either I can go through it all and find the error or check in my commits

```java
import java.util.*;

public class sum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the first number: ");
        int a = sc.nextInt();
        System.out.println("Enter the second number: ");
        int b = sc.nextInt();
        int sum = add(a, b);
        System.out.println("The sum of the two numbers is: " + sum);
    }

    public static int add(int a, int b) {
        a + b; // Here is the bug
    }
}
```

I have 4 commits, out of which any one of the commit broke my code at some point.

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782043/Untitled_13_lh4cbi.png)

### Step-2: Start Git Bisect

We test our bad commit (recent code is bad) and good commit, choose anyone and run the code of that time, in our case can choose very first commit with empty file.

```bash
git bisect start
git bisect bad 8c76244 # Mention a bad commit where code wasnt working as expected
git bisect good 11d3ee4 # Mention a good commit
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782043/Untitled_14_g809l3.png)

### Step-3: Test the checked out commit

Git will now check out a commit in middle range of good and bad we already defined. Open the code and try compiling, it it still breaks, its a bad commit.

```bash
git bisect bad
```

### Step-4: **Repeat Until Buggy Commit is Found**

On recursively doing *Step-3*, we will land on a code which is good. In our case in this very step.

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782044/Untitled_15_qngb4x.png)

Hence we come to know problem occurred When we made sum function and obviously on looking at it we notice it doesn’t have a return statement. Thank you git bisect.

### Step-5: Exit Git Bisect

Now that we know about the buggy commit, we exit bisect and this will return us to our original branch.

```bash
git bisect reset
```

