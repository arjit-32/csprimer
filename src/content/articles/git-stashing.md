---
title: Stashing in Git
meta_title: Stashing Changes in Git | CS Primer
description: Learn how to use Git stash to temporarily save your uncommitted changes, allowing you to switch tasks without losing your progress in 2025.
author: Arjit Sharma
series: ["git"]
categories: ["Advanced-Development"]
draft: false
year: 2025
---

Stashing allows you to **save** uncommitted changes temporarily and restore them later. This is useful when you're interrupted and need to switch contexts without committing your work.

## Basic Stashing workflow

```
[do some work]
[get interrupted]
git stash
[deal with interruption]
git stash pop
```

### **Example Scenario -**

Lets say I am in following state 

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781396/Untitled_6_xpt2ez.png)

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781395/Untitled_8_c8o0ro.png)

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781396/Untitled_7_wm8vw1.png)

My project had just 1 commit, which is the first line but then while adding new feature I got interrupted, thats where git stash comes into play.

```bash
git stash
git status
git log --graph --all --oneline
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781395/Untitled_9_o6itoa.png)

The stash branch created is special one. And now state is back to the previous commit and yet my changes are saved. 

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781395/Untitled_10_ehj1qa.png)

After doing this ad-hoc work we can pop back our changes

```bash
git stash pop
```

## **Multiple Stash**

Lets say we were working on a feature and we gave one implementation but stashed it and then second implementation stashed it too. 

```bash
git stash list # Shows all the stashes
```

To check stash information 

```bash
git stash show --patch stash@{0}
git stash show --patch stash@{1}
```

### Applying Specific Stash

After above step we will know which stash had right implementation and we can apply that

```bash
git stash apply stash@{1}
```

## Deleting a Stash

To drop another implementation we can use `drop`

```bash
git stash drop stash@{0}

git stash clear # remove all stashes
```

## How to Stash Untracked Files?

Normally, stash only tracks files that are already being tracked ( new files that are’nt added/staged do not get saved ) 

In order to save untracked files, use 

```bash
git stash -u

# If we want to stash everything even those mentioned in .gitignore
git stash --all
```