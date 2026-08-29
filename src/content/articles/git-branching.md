---
title: Branching in Git
meta_title: Branching in Git | CS Primer
description: Learn how to create, manage, and merge branches in Git to work on features without affecting the main codebase. Essential for modern development teams in 2025.
author: Arjit Sharma
series: git
categories: ["Extras"]
draft: false
year: 2025
---

Branching allows developers to work on new features or fixes **without affecting the main branch**.

```bash
// Setting up a project
mkdir project
cd project
git init
echo newfile > file
git add file
git commit -m "new file added"
git log
```

## Creating a new branch

```bash
git branch newfeature
git status
git branch # To view all branches
```

## Switching branches

```bash
git checkout newfeature 
```

## Visualizing Branches & Commits

```bash
git log --decorate --graph --oneline --all
```

*Note - The `HEAD` is where Git is pointed at right now in your repository, and the branch is where that branch reference is pointed to.*

## **Detached Head**

*Reference* - https://youtu.be/GN36mrrM12k?si=4zgxsh094rcw6wfF

Normally, `HEAD` points to a branch but it can also point to a **specific commit**, making it "detached”

Lets take a example - 

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778037/Untitled_2_ble9ha.png)

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778036/Untitled_1_eqbxou.png)

```bash
git checkout d6afca4 # HEAD being detached
```

Make changes to a file and commit it

```bash
git add .
git commit -m "Changes made on Detached Head"
```

Check the Changes 

```bash
git log --graph --oneline --all
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778036/Untitled_4_v2i2jm.png)

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741778036/Untitled_3_ikyjza.png)

We can go back to master leaving this commits not connected to a branch behind and they may get deleted

```bash
git checkout master
```

## Deleting a branch

```bash
git branch -d newfeature  # Only deletes if merged
git branch -D newfeature  # Force delete (even if unmerged)

git push origin --delete newfeature # Deleting a remote branch
```

## Tags

They point to particular commits and just used as fixed labels on commits.

```bash
git tag v1 # Tags current commit as v1
```

