---
title: Reset in Git
meta_title: Understanding Git Reset | CS Primer
description: Dive into the powerful Git reset command to undo changes and manage your commit history in 2025. A must-know for every developer working with version control.
author: Arjit Sharma
series: git
categories: ["Extras"]
draft: false
year: 2025
---

Git provides a powerful **reset** command that allows you to undo changes at different levels.

## Scenario 1 - Undo Unstaged Changes

If you modified a file but haven’t added it to staging yet, you can **revert it to its last committed state**

```bash
git checkout -- filename
```

## Scenario 2 - Undo Staged Changes

If you used `git add`  but have’nt committed yet, you can unstage the changes.

```bash
git reset filename
```

To unstage everything 

```bash
git reset 
```

## Scenario 3 - Undo last Commit (local)

### Soft Reset (keep changes staged)

If you committed something by mistake but haven’t pushed yet.

```bash
git reset --soft HEAD~1 # HEAD~1 means One commit before HEAD
```

### Mixed Reset (unstage changes, keep files)

```bash
git reset --mixed HEAD~1
```

### Hard Reset (delete everything)

This deletes all changes and resets the repo to the last commit!

```bash
git reset --hard HEAD~1
```

**Note** - In order to reset a specific commit just use hash instead of HEAD~1 

```bash
git reset --hard <commit-id>
```

## Scenario 4 - Undo a Commit (After pushing to remote)

### Revert the Commit (safe)

This creates a new commit that undoes previous commit.

```bash
git revert <commit-hash>
```

### Hard Reset

Completely erases the commit from history

```bash
git reset --hard <commit-hash> 
git push --force
```

## Scenario 5 - Undo a Merge (If you merged the wrong branch)

### If you haven’t pushed yet

```bash
git reset --hard HEAD~1
```

### If You Already Pushed the Merge

A **new commit** is created that undoes the merge.

```bash
git revert -m 1 <merge-commit-hash>
```
