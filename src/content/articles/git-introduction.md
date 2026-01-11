---
title: Introduction to Git
meta_title: Introduction to Git | CS Primer
description: Understand the basics of Git, the distributed version control system, and learn why it’s essential for modern development workflows. Perfect for beginners in 2025.
author: Arjit Sharma
series: ["git"]
categories: ["System-Design"]
draft: false
year: 2025
---

## Source or Version Control

Source control, helps track and coordinate changes in a codebase, especially when multiple developers are working on the same project.

Earlier systems like CVS and SVN used a centralized architecture, where a single central repository held the complete history of the code.

Git is fundamentally different because of its distributed architecture (No central repo). Every developer maintains their own local repository, they can pull changes from, or push changes to other repositories. Note that teams often use a shared remote repository to coordinate changes.


## Phases of Git Content

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741776562/image_wem8sa.png)

Git organizes files into three main phases:

1. **Working Directory** – The local project folder where files are modified.
2. **Staging Area** – A temporary area where changes are added before committing.
3. **Git Repository** – The permanent storage where committed changes are recorded.


## Series of Changes

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741776562/image_1_zzoyef.png)

Git records changes through commits, each representing a snapshot of the codebase. This creates a clear and traceable history

For example, in the diagram above:

- Commit **C** depends on commit **B**
- Commit **B** depends on commit **A**

This ensures a **linear and traceable** history of changes.


## Branches in Git

![image.png](https://res.cloudinary.com/dwa6rcttw/image/upload/v1741776562/image_2_wxtdmo.png)

A branch allows developers to work on different versions of the project simultaneously. Instead of modifying the main codebase directly, changes can be made in a separate branch and later merged.

In the diagram:

- The **main branch** contains commits A → B → C → D → E.
- The **experimental branch** diverges at commit C (it does not contain D and E’s changes, similarly master branch remains unaffected by F’s changes)


## What is Github ?

It is a remote hosting service which is generally being used by people as a **centralized** upstream repository. Developers push their changes to Github and pull updates from it. (Quite counterintuitive to being distributed right ?? )

## How is Git different to other Version Control Systems ?

- Branching takes O(1) time while in CVS and SVN it takes O(n).
- Git stores changes as snapshots of the entire project, rather than tracking file-by-file diffs like some older systems.
- Changes are marked with Hash numbers( Ex- `a1b2c3d4`) instead of version number thus ensuring security.