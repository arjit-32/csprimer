---
title: Reflog in Git
meta_title: Git Reflog | CS Primer
description: Learn how to use Git reflog to recover lost commits and navigate your Git history in 2025. A powerful tool for managing your Git repository.
author: Arjit Sharma
series: ["git"]
categories: ["System-Design"]
draft: false
year: 2025
---

Reflog stands for Reference Log, it is like a hidden  "undo history”. Lets say you remove the last commit or mess with history, git still keeps track of them for some time.

```bash
git checkout HEAD^ // refers to parent commit of current HEAD, move back 1 commit
git branch -f master // Force creation of new branch master, reset master branch to previous commit 
git checkout master // Switch working directly to newly created master branch
git log
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741781683/Untitled_11_iqzpnv.png)

Reflog records all movements of branches in the repository. It is a history of changes made to the HEAD. It contains reference to the state of repo at various points, even if those points are no longer reachable within the repo.

```bash
git reflog
git reset --hard 9223a7a # Check the commit you want to restore
```

