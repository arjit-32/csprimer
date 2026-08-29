---
title: Fetch, Pull & Push in Git
meta_title: Fetch, Pull & Push in Git | CS Primer
description: Master the essential Git commands – fetch, pull, and push – to keep your local and remote repositories synchronized and up to date in 2025.
author: Arjit Sharma
series: git
categories: ["Extras"]
draft: false
year: 2025
---

## Understanding Remote Repositories

When working with Git, we often deal with **remote repositories** (repos stored on GitHub, GitLab, etc.). The three key actions when working with remotes are:

1. **Fetching** → Get the latest changes from the remote repo **without applying them** to your working directory.
2. **Pulling** → Get the latest changes **and apply them** immediately (fetch + merge).
3. **Pushing** → Send your local changes to the remote repo.

## Setting up

```bash
mkdir project
cd project
git init
echo 'hello first time' > file
git add file 
git commit -am file
cd ..
git clone project cloned_project
```

Now, we have two directories:

- `project` (the original repository)
- `cloned_project` (a clone of the original repository)

In our set up we cloned a repo, the content of both repo will be same but if we check the config of both them we will understand the difference.

```bash
cat clone_project/.git/config
cat project/.git/config
```

Cloned repo has remote called origin

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782659/Untitled_16_fgffmz.png)

## **Checking Remote Repositories**

A cloned repository automatically sets up a remote connection.

```bash
cd cloned_project
git remote -v
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782661/Untitled_17_hdojya.png)

This shows `origin`, which points to the original repository.

## 1. Fetching (Getting Changes but NOT Applying Them)

Command `git fetch` gets latest changes from remote repo and copies them into local repo, updating local repo of any branches that have been changed

Lets say some changes were made on remote, in order to fetch them 

```bash
# Make some changes in remote
cd ../project
echo 'Another line added' >> file

# Fetch changes in the cloned repository
cd ../cloned_project
git fetch origin master # Only fetch changes on master branch

# Verify that changes have been fetched but not applied
git log --oneline --graph

# Merge the fetched changes into local branch
git merge origin master
```

NOTE - These changes are not applied to your local yet. They are made into branches.

```bash
git log --oneline --graph # See for yourself that no change is applied
git branch --all 
```

![Untitled](https://res.cloudinary.com/dwa6rcttw/image/upload/f_auto,q_auto,w_800/v1741782660/Untitled_18_kzee2f.png)

Applying remote changes to local

```bash
git merge origin master
```

## 2. Pulling (Fetching + Merging in One Step)

Instead of doing `fetch` and `merge` separately, you can **pull** changes in one command

```bash
git pull origin master
```

## 3. Pushing Code

Lets say we create a feature branch in the clone and have to push it to remote repository. 

```bash
cd cloned_project
git checkout -b feature
echo 'Added new feature' >> file
git commit -am 'Feature added'
```

```bash
git push origin feature 

# In case of just code changes
# git pull --rebase # To get other people's changes
# git push # Push your changes to Remote
```

Now, the `feature` branch is available in the remote repository for others to access.

