---
title: Git Basic Workflow
meta_title: Git Basic Workflow | CS Primer
description: Learn the fundamental Git workflow, including creating repositories, staging changes, committing, and managing branches. A must-read guide for developers in 2025.
author: Arjit Sharma
series: ["git"]
categories: ["System-Design"]
draft: false
year: 2025
---


## Initializing a Git Repo

Before using Git, we need to initialize a repository. This creates a `.git` folder, which acts as Git's database for tracking changes.

```bash
mkdir test_proj 
cd test_proj
git init
```

## Adding Files to a Repository

```bash
touch index.txt # Create a new file ( Couldve done in VScode )
git add index.txt # Tells git to start tracking files in local index

# To add multiple files at once, This stages all modified and new files in the project.
# git add .
```

This adds `index.txt` to the **staging area**, preparing it for a commit.

## Checking the Repo

Before committing, it's useful to check what files are being tracked and their current state.

```bash
git log # To see logs of what you commited
git status # Check a repo's status
```

## Commiting Changes

Once files are staged, we commit them to Git’s repository. Each commit is a **snapshot** of the project at a certain point. The `-m` flag allows us to write a commit message describing the changes.

```bash
git commit -m "Initial Commit"

# Simultaneuosly Add and commit with message, helps in skipping the (git add .) step
# git commit -a -m "Another message" 
```

## Viewing Changes

Before committing, we may want to see what modifications have been made.

```bash
git diff
```

This compares the working directory with the last commit, showing **unstaged** changes.

For **staged** changes (those added with `git add` but not yet committed):

```bash
git diff --staged
```
