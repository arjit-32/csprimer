---
title: Pull Requests and GitHub Workflow
meta_title: Understanding Pull Requests and GitHub Workflow | CS Primer
description: Learn how to create, review, and manage pull requests on GitHub. Master the GitHub workflow to collaborate effectively with other developers in 2025.
author: Arjit Sharma
series: ["git"]
categories: ["Extras"]
draft: false
year: 2025
---

A **Pull Request (PR)** is a way for developers to notify repository maintainers about changes they have made in a branch, suggesting that those changes should be merged into the main codebase.

It is a structured way to propose, review, and merge changes in a collaborative Git workflow, functioning like a managed push and pull process for code contributions.

*Note - Pull Requests Are Not Core Git but heavily used in platforms like Github, GitLab etc*

## The standard GitHub Workflow is:

1. **Fork the repository (if needed)**
    
    If you don’t have write access to the original repository, you first need to **fork** it to your GitHub account.
    
2. **Clone the repository**
    
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```
    
3. **Create a new branch for your changes**
    
    ```bash
    git checkout -b feature-branch
    ```
    
4. **Make changes and commit them**
    
    ```bash
    git add .
    git commit -m "Added new feature"
    ```
    
5. **Push the changes to your remote repository**
    
    ```bash
    git push origin feature-branch
    ```
    
6. **Open a Pull Request on GitHub**
    
    After that developers/maintainers will discuss and if they find everything to be okay, they will merge it.
    
    ```bash
    git checkout main
    git merge feature-branch
    ```
