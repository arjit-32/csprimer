---
title: Merging in Git
meta_title: Merging Changes in Git | CS Primer
description: Understand how to merge branches in Git, resolve conflicts, and integrate changes from different development streams effectively in 2025.
author: Arjit Sharma
series: ["git"]
categories: ["System-Design"]
draft: false
year: 2025
---

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778645/image_3_fdtyo7.png)

Merging combines changes from one branch into another. Typically, we merge feature branches into the **main** branch.

## Performing a Merge

```bash
git checkout master # Switched to target branch
git merge experimental # Merging feature branch into master
```

## Types of Merges

1. **Fast Forward Merge / Simple Merge -** Occurs when master has no new commits since feature branch in created. Git just moves branch forward without creating a merge commit.
2. **Recursive Merge -** Happens when master also has new commits, then Git created a new merge commit to combine changes.

## Handling Merge Conflicts

Sometimes the changes made on the branches conflict with one another. Ex - D, E and H changed the same lines of code as F and G. 

```bash
git status # Show conflicted files
cat file # When you open the file, you notice how git marks the conflict
```

We can add or remove the lines as necessary and then simply 

```bash
git commit -am 'merged experimental branch in master'
```

## Aborting a Merge

```bash
git merge --abort # If something goes wrong before merge is committed

git reset --hard HEAD~1 # If merge is already committed
```

## Cherry Picking

Cherry-picking allows you to **pick a specific commit** from one branch and apply it to another, without merging everything.

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778645/Untitled_5_brqziz.png)

```bash
git cherry-pick 5892e85
```

