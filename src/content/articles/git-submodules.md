---
title: Git Submodules
author: Arjit Sharma
meta_title: Git Submodules | CS Primer
description: Learn about submodules in Git and how to include other repositories in your project.
series: ["git"]
categories: ["System-Design"]
featured: false
draft: false
---


## What Are Git Submodules?

A **Git submodule** is a repository inside another repository. It allows you to **include external projects** in your repo while keeping them separate.
It becomes quite useful as it keep’s external repo’s history seperate from your main project and can freeze a dependency at a specific version.

```bash
git submodule add <url>
```

This will create a `.gitmodules` file that tracks submodules in your project.

## Cloning Repository with Submodules

```bash
git clone --recurse-submodules <repo-url>
```