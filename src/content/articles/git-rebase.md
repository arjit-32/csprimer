---
title: Rebase – Keeping History Clean in Git
meta_title: Git Rebase to Keep Your History Clean | CS Primer
description: Learn how to use Git rebase to keep your commit history linear and clean, making collaboration easier in 2025. Essential for team-based development.
author: Arjit Sharma
series: ["git"]
categories: ["System-Design"]
draft: false
year: 2025
---

Its the key to a Clean and Linear History.

Instead of merging (which creates an extra merge commit), **rebasing applies your commits one by one on top of the new base**. 

Generally when we have a feature branch and we merge it with our master, but it has few drawbacks like 

- history gets more complicated
- There is an extra change when 2 branches are merged

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781865/image_4_it86mf.png)

What we really want our history to look is like this 

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781866/image_5_dgoquk.png)

Thats where rebase comes in. 

```bash
git rebase <base-branch>
# If conflict occurs then ->
git rebase --continue
```

## Rebase in Action

You have a `feature1` branch based on an old `master` branch. Before merging, you **want to update it to the latest `master` changes**.

```bash
git checkout feature1
git rebase master  # Rebase feature1 onto the latest master

# After resolving the conflict
git add .
git rebase --continue
```

After our rebase this is how our codebase looks - 

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741781866/image_6_o34pmp.png)

Now changes are in one line and we can merge feature1 branch into master branch ( as master is still behind ) 

```bash
git checkout master
git merge feature1
git log --all --graph --oneline
```

`Note` - You can see Fast-Forward in terminal, that means there arent any new changes that need to be made so master branch pointer moves to HEAD.
