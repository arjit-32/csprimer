import type { GitScenario } from './types';

export const gitScenarios: Record<string, GitScenario> = {
  // 1. Introduction: 3 Phases & Branching
  'intro-phases': {
    id: 'intro-phases',
    title: 'Three Phases of Git Content',
    defaultView: 'stages',
    steps: [
      {
        title: 'Working Tree: Modify Files',
        command: 'echo "hello git" > app.js',
        description: 'Files are edited in your local project workspace. Git detects modifications but has not recorded them yet.',
        stages: {
          workingTree: [
            { name: 'app.js', status: 'untracked' },
            { name: 'style.css', status: 'untracked' },
          ],
          stagingArea: [],
          repository: [],
        },
      },
      {
        title: 'Staging Area: Prepare Commit',
        command: 'git add app.js style.css',
        description: 'git add copies the files to the Staging Area (the Index) to prepare them for the next commit snapshot.',
        stages: {
          workingTree: [],
          stagingArea: [
            { name: 'app.js', status: 'staged' },
            { name: 'style.css', status: 'staged' },
          ],
          repository: [],
        },
      },
      {
        title: 'Git Repository: Permanent Snapshot',
        command: 'git commit -m "Scaffold project"',
        description: 'git commit freezes staged files into an immutable commit snapshot with an author, timestamp, and SHA hash.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1a2b3 (Scaffold project)'],
        },
        commits: [{ id: 'c1a2b3', label: 'C1', message: 'Scaffold project', parents: [], branch: 'main', status: 'created' }],
        branches: [{ name: 'main', targetCommitId: 'c1a2b3' }],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  'intro-branches': {
    id: 'intro-branches',
    title: 'Branches: Parallel Workflows',
    defaultView: 'graph',
    steps: [
      {
        title: 'Linear Main History',
        command: 'git log --oneline',
        description: 'Production commits A → B → C on the main branch form a linear historical chain.',
        commits: [
          { id: 'c1', label: 'A', message: 'Initial commit', parents: [], branch: 'main' },
          { id: 'c2', label: 'B', message: 'Add layout', parents: ['c1'], branch: 'main' },
          { id: 'c3', label: 'C', message: 'Add API service', parents: ['c2'], branch: 'main' },
        ],
        branches: [{ name: 'main', targetCommitId: 'c3' }],
        head: { target: 'main', isDetached: false },
      },
      {
        title: 'Create and Switch to Experimental Branch',
        command: 'git checkout -b experimental',
        description: 'A new branch pointer named "experimental" is created at commit C, and HEAD switches to it.',
        commits: [
          { id: 'c1', label: 'A', message: 'Initial commit', parents: [], branch: 'main' },
          { id: 'c2', label: 'B', message: 'Add layout', parents: ['c1'], branch: 'main' },
          { id: 'c3', label: 'C', message: 'Add API service', parents: ['c2'], branch: 'main' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'c3' },
          { name: 'experimental', targetCommitId: 'c3' },
        ],
        head: { target: 'experimental', isDetached: false },
      },
      {
        title: 'Branches Progress Independently',
        command: 'git commit -m "Try new UI engine"',
        description: 'Commits D and E advance main, while commit F is created on experimental in complete isolation.',
        commits: [
          { id: 'c1', label: 'A', message: 'Initial commit', parents: [], branch: 'main' },
          { id: 'c2', label: 'B', message: 'Add layout', parents: ['c1'], branch: 'main' },
          { id: 'c3', label: 'C', message: 'Add API service', parents: ['c2'], branch: 'main' },
          { id: 'c4', label: 'D', message: 'Fix billing bug', parents: ['c3'], branch: 'main' },
          { id: 'c5', label: 'E', message: 'Release v1.1 patch', parents: ['c4'], branch: 'main' },
          { id: 'c6', label: 'F', message: 'Try new UI engine', parents: ['c3'], branch: 'experimental', status: 'created' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'c5' },
          { name: 'experimental', targetCommitId: 'c6' },
        ],
        head: { target: 'experimental', isDetached: false },
      },
    ],
  },

  // 2. Basic Workflow
  'basic-workflow': {
    id: 'basic-workflow',
    title: 'Git Basic Workflow',
    defaultView: 'stages',
    steps: [
      {
        title: 'Initialize Repository',
        command: 'git init',
        description: 'Creates a new Git repository and sets up the internal .git database for tracking files.',
        stages: { workingTree: [], stagingArea: [], repository: [] },
      },
      {
        title: 'Modify File on Disk',
        command: 'touch index.txt && echo "v1" > index.txt',
        description: 'A new file index.txt is created in the working tree. Git marks it as untracked.',
        stages: {
          workingTree: [{ name: 'index.txt', status: 'untracked' }],
          stagingArea: [],
          repository: [],
        },
      },
      {
        title: 'Stage the File',
        command: 'git add index.txt',
        description: 'The file is added to the Staging Area, registering its content snapshot in the index.',
        stages: {
          workingTree: [],
          stagingArea: [{ name: 'index.txt', status: 'staged' }],
          repository: [],
        },
      },
      {
        title: 'Commit the Snapshot',
        command: 'git commit -m "Initial Commit"',
        description: 'Creates a permanent commit object C1 with the staged content. The index is now clean.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1a2b3 (Initial Commit)'],
        },
        commits: [{ id: 'c1a2b3', label: 'C1', message: 'Initial Commit', parents: [], branch: 'main', status: 'created' }],
        branches: [{ name: 'main', targetCommitId: 'c1a2b3' }],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  'diff-stages': {
    id: 'diff-stages',
    title: 'Inspecting Changes: git diff vs git diff --staged',
    defaultView: 'stages',
    steps: [
      {
        title: 'Edit Tracked File on Disk',
        command: 'echo "hello second line" >> index.txt',
        description: 'index.txt is modified in the working tree. Git detects unstaged changes on disk.',
        stages: {
          workingTree: [{ name: 'index.txt', status: 'modified' }],
          stagingArea: [],
          repository: ['c1a2b3 (Initial Commit)'],
        },
      },
      {
        title: 'Inspect Unstaged Changes',
        command: 'git diff',
        description: 'git diff compares your working directory with the staging area (showing what was edited but not yet staged).',
        stages: {
          workingTree: [{ name: 'index.txt', status: 'modified' }],
          stagingArea: [],
          repository: ['c1a2b3 (Initial Commit)'],
        },
      },
      {
        title: 'Stage the Modifications',
        command: 'git add index.txt',
        description: 'The updated file is staged. git diff now returns empty because the working tree and staging area are identical.',
        stages: {
          workingTree: [],
          stagingArea: [{ name: 'index.txt', status: 'staged' }],
          repository: ['c1a2b3 (Initial Commit)'],
        },
      },
      {
        title: 'Inspect Staged Changes',
        command: 'git diff --staged',
        description: 'git diff --staged (or --cached) compares the staging area with the repository snapshot (showing what will be in your next commit).',
        stages: {
          workingTree: [],
          stagingArea: [{ name: 'index.txt', status: 'staged' }],
          repository: ['c1a2b3 (Initial Commit)'],
        },
      },
      {
        title: 'Commit the Staged Snapshot',
        command: 'git commit -m "Add second line"',
        description: 'A new commit C2 is recorded. The staging area is cleared and your repository advances.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1a2b3 (Initial Commit)', 'c2b3c4 (Add second line)'],
        },
        commits: [
          { id: 'c1a2b3', label: 'C1', message: 'Initial Commit', parents: [], branch: 'main' },
          { id: 'c2b3c4', label: 'C2', message: 'Add second line', parents: ['c1a2b3'], branch: 'main', status: 'created' },
        ],
        branches: [{ name: 'main', targetCommitId: 'c2b3c4' }],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  'gitignore': {
    id: 'gitignore',
    title: 'Ignoring Files with .gitignore',
    defaultView: 'stages',
    steps: [
      {
        title: 'Sensitive or Temporary Files on Disk',
        command: 'echo "API_KEY=xyz" > .env && touch app.js',
        description: 'Working tree contains private secrets (.env) and source files (app.js). Unignored secrets could leak to public remotes!',
        stages: {
          workingTree: [
            { name: '.env', status: 'untracked' },
            { name: 'app.js', status: 'untracked' },
          ],
          stagingArea: [],
          repository: [],
        },
      },
      {
        title: 'Define Ignored Patterns in .gitignore',
        command: 'echo ".env" > .gitignore',
        description: 'Git reads .gitignore and automatically excludes matching files from git status and git add.',
        stages: {
          workingTree: [
            { name: '.gitignore', status: 'untracked' },
            { name: 'app.js', status: 'untracked' },
          ],
          stagingArea: [],
          repository: [],
        },
      },
      {
        title: 'Stage and Commit Safe Files Only',
        command: 'git add . && git commit -m "chore: setup repo and .gitignore"',
        description: 'Only .gitignore and app.js are committed. Sensitive .env remains safely uncommitted on disk.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1a2b3 (chore: setup repo with .gitignore)'],
        },
        commits: [{ id: 'c1a2b3', label: 'C1', message: 'Setup repo with .gitignore', parents: [], branch: 'main', status: 'created' }],
        branches: [{ name: 'main', targetCommitId: 'c1a2b3' }],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  // 3. Cloning
  'cloning': {
    id: 'cloning',
    title: 'Repository Cloning',
    defaultView: 'graph',
    steps: [
      {
        title: 'Remote Repository on GitHub',
        command: 'git ls-remote https://github.com/arjit-32/highlight-hero',
        description: 'The remote repository on GitHub contains commit history C1 → C2 → C3 on remote branch origin/main.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Project scaffold', parents: [], branch: 'main' },
          { id: 'c2', label: 'C2', message: 'Add syntax highlighter', parents: ['c1'], branch: 'main' },
          { id: 'c3', label: 'C3', message: 'Export themes package', parents: ['c2'], branch: 'main' },
        ],
        branches: [{ name: 'origin/main', targetCommitId: 'c3', isRemote: true }],
        head: { target: 'origin/main', isDetached: false },
      },
      {
        title: 'Cloned Local Repository',
        command: 'git clone https://github.com/arjit-32/highlight-hero',
        description: 'Git copies all commits locally, sets up remote tracking branch origin/main, and checks out local main.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Project scaffold', parents: [], branch: 'main' },
          { id: 'c2', label: 'C2', message: 'Add syntax highlighter', parents: ['c1'], branch: 'main' },
          { id: 'c3', label: 'C3', message: 'Export themes package', parents: ['c2'], branch: 'main' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'c3' },
          { name: 'origin/main', targetCommitId: 'c3', isRemote: true },
        ],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  // 4. Branching & Detached HEAD
  'branching': {
    id: 'branching',
    title: 'Branch Creation & Switching',
    defaultView: 'graph',
    steps: [
      {
        title: 'Initial Commit on master',
        command: 'git status',
        description: 'Repository currently has commit C1 with master and HEAD pointing to C1.',
        commits: [{ id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' }],
        branches: [{ name: 'master', targetCommitId: 'c1' }],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Create Branch newfeature',
        command: 'git branch newfeature',
        description: 'A new branch pointer named "newfeature" is created at C1. HEAD remains on master.',
        commits: [{ id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' }],
        branches: [
          { name: 'master', targetCommitId: 'c1' },
          { name: 'newfeature', targetCommitId: 'c1' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Switch to newfeature Branch',
        command: 'git checkout newfeature',
        description: 'HEAD moves to point to "newfeature". Future commits will advance newfeature.',
        commits: [{ id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' }],
        branches: [
          { name: 'master', targetCommitId: 'c1' },
          { name: 'newfeature', targetCommitId: 'c1' },
        ],
        head: { target: 'newfeature', isDetached: false },
      },
      {
        title: 'Commit on newfeature Branch',
        command: 'git commit -m "Implement feature logic"',
        description: 'New commit C2 is created. newfeature advances to C2 while master remains at C1.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Implement feature logic', parents: ['c1'], branch: 'newfeature', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c1' },
          { name: 'newfeature', targetCommitId: 'c2' },
        ],
        head: { target: 'newfeature', isDetached: false },
      },
    ],
  },

  'detached-head': {
    id: 'detached-head',
    title: 'Detached HEAD State',
    defaultView: 'graph',
    steps: [
      {
        title: 'Attached HEAD on master',
        command: 'git log --oneline',
        description: 'Normal state: HEAD points to the master branch pointer, which points to commit C3.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Database schema', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Auth middleware', parents: ['c2'], branch: 'master' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Checkout Specific Commit Directly',
        command: 'git checkout c2',
        description: 'HEAD is now detached: it points directly to commit hash c2 rather than a branch name.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Database schema', parents: ['c1'], branch: 'master', status: 'highlight' },
          { id: 'c3', label: 'C3', message: 'Auth middleware', parents: ['c2'], branch: 'master' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'c2', isDetached: true },
      },
      {
        title: 'Commit While Detached',
        command: 'git commit -m "Experimental test"',
        description: 'Commit C4 is created and HEAD points to it, but NO branch points to C4.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Database schema', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Auth middleware', parents: ['c2'], branch: 'master' },
          { id: 'c4', label: 'C4', message: 'Experimental test', parents: ['c2'], branch: 'detached', status: 'created' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'c4', isDetached: true },
      },
      {
        title: 'Switching Back Leaves Commit Orphaned',
        command: 'git checkout master',
        description: 'HEAD returns to master. Commit C4 is now an unreferenced orphan commit.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Database schema', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Auth middleware', parents: ['c2'], branch: 'master' },
          { id: 'c4', label: 'C4', message: 'Experimental test (orphaned)', parents: ['c2'], branch: 'detached', status: 'orphaned' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  'branch-delete': {
    id: 'branch-delete',
    title: 'Deleting a Merged Branch',
    defaultView: 'graph',
    steps: [
      {
        title: 'Feature Merged into Master',
        command: 'git branch --merged',
        description: 'Feature work has been merged into master. Both master and feature point to commit C3.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base setup', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Feature work', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Merge feature into master', parents: ['c2'], branch: 'master' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c3' },
          { name: 'feature', targetCommitId: 'c3' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Delete Pointer with git branch -d',
        command: 'git branch -d feature',
        description: 'Git deletes only the lightweight "feature" pointer file. All commits remain safely preserved in master!',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base setup', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Feature work', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Merge feature into master', parents: ['c2'], branch: 'master', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c3' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  // 5. Merging & Cherry Pick
  'merge-fast-forward': {
    id: 'merge-fast-forward',
    title: 'Fast-Forward Merge',
    defaultView: 'graph',
    steps: [
      {
        title: 'Linear Extension Before Merge',
        command: 'git log --oneline --graph',
        description: 'Master is at C1. Feature has C2 and C3. Master has no divergent commits since branching.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Payment gateway API', parents: ['c1'], branch: 'feature' },
          { id: 'c3', label: 'C3', message: 'Checkout tests', parents: ['c2'], branch: 'feature' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c1' },
          { name: 'feature', targetCommitId: 'c3' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Pointer Advances to Feature Tip',
        command: 'git merge feature',
        description: 'Git fast-forwards master directly to C3 without needing an extra merge commit.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial base setup', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Payment gateway API', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Checkout tests', parents: ['c2'], branch: 'master', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c3' },
          { name: 'feature', targetCommitId: 'c3' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  'merge-3way': {
    id: 'merge-3way',
    title: '3-Way Recursive Merge',
    defaultView: 'graph',
    steps: [
      {
        title: 'Divergent Branch Histories',
        command: 'git log --oneline --graph',
        description: 'Both master (C2) and experimental (F1, F2) have progressed independently from common ancestor C1.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Common ancestor', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'User settings', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'Dark mode', parents: ['c1'], branch: 'experimental' },
          { id: 'f2', label: 'F2', message: 'Theme tokens', parents: ['f1'], branch: 'experimental' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'experimental', targetCommitId: 'f2' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'New Merge Commit Created',
        command: 'git merge experimental',
        description: 'Git generates merge commit M with two parents (C2 and F2) combining both histories.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Common ancestor', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'User settings', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'Dark mode', parents: ['c1'], branch: 'experimental' },
          { id: 'f2', label: 'F2', message: 'Theme tokens', parents: ['f1'], branch: 'experimental' },
          { id: 'm1', label: 'M', message: 'Merge experimental', parents: ['c2', 'f2'], branch: 'master', isMerge: true, status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'm1' },
          { name: 'experimental', targetCommitId: 'f2' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  'cherry-pick': {
    id: 'cherry-pick',
    title: 'Cherry-Picking Commits',
    defaultView: 'graph',
    steps: [
      {
        title: 'Select Commit to Copy',
        command: 'git log feature --oneline',
        description: 'Feature branch has commits F1 and F2. You want only the bugfix in F2 on master right now.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base app', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Billing update', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'WIP redesign', parents: ['c1'], branch: 'feature' },
          { id: 'f2', label: 'F2', message: 'Fix memory leak (Target)', parents: ['f1'], branch: 'feature', status: 'highlight' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'feature', targetCommitId: 'f2' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Apply Commit to master',
        command: 'git cherry-pick f2',
        description: 'Git creates new commit F2\' on master with the changes from F2 but parented to C2.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base app', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Billing update', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'WIP redesign', parents: ['c1'], branch: 'feature' },
          { id: 'f2', label: 'F2', message: 'Fix memory leak', parents: ['f1'], branch: 'feature' },
          { id: 'f2p', label: "F2'", message: 'Fix memory leak (Copy)', parents: ['c2'], branch: 'master', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'f2p' },
          { name: 'feature', targetCommitId: 'f2' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  'merge-conflict': {
    id: 'merge-conflict',
    title: 'Resolving Merge Conflicts',
    defaultView: 'graph',
    steps: [
      {
        title: 'Conflicting Parallel Commits',
        command: 'git log --graph --oneline --all',
        description: 'Both master (commit C2) and experimental (commit F1) modified the same lines in file.txt.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial file.txt', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master edited line 5', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'Experimental edited line 5', parents: ['c1'], branch: 'experimental' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'experimental', targetCommitId: 'f1' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Conflict Detected on Merge',
        command: 'git merge experimental',
        description: 'CONFLICT (content): Merge conflict in file.txt. Automatic merge failed; fix conflicts and then commit the result.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial file.txt', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master edited line 5', parents: ['c1'], branch: 'master', status: 'bad' },
          { id: 'f1', label: 'F1', message: 'Experimental edited line 5', parents: ['c1'], branch: 'experimental', status: 'bad' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'experimental', targetCommitId: 'f1' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Resolve Conflict Markers in Code',
        command: 'git add file.txt',
        description: 'You edit file.txt, remove conflict markers (<<<<<<<, =======, >>>>>>>), choose the desired code, and stage it.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial file.txt', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master edited line 5', parents: ['c1'], branch: 'master', status: 'good' },
          { id: 'f1', label: 'F1', message: 'Experimental edited line 5', parents: ['c1'], branch: 'experimental', status: 'good' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'experimental', targetCommitId: 'f1' },
        ],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Finalize Merge Commit',
        command: 'git commit -m "Merge branch experimental (resolved)"',
        description: 'New merge commit M1 combines both branches. Master pointer advances to M1.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Initial file.txt', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master edited line 5', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'Experimental edited line 5', parents: ['c1'], branch: 'experimental' },
          { id: 'm1', label: 'M1', message: 'Merge experimental into master', parents: ['c2', 'f1'], branch: 'master', isMerge: true, status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'm1' },
          { name: 'experimental', targetCommitId: 'f1' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  // 6. Stashing
  'stashing': {
    id: 'stashing',
    title: 'Git Stashing',
    defaultView: 'stages',
    steps: [
      {
        title: 'Dirty Working Tree Interruption',
        command: 'git status',
        description: 'You have unfinished edits in app.js and new-form.html when an urgent task arrives.',
        stages: {
          workingTree: [
            { name: 'app.js', status: 'modified' },
            { name: 'new-form.html', status: 'untracked' },
          ],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
      {
        title: 'Shelve Changes to Stash',
        command: 'git stash -u -m "WIP auth"',
        description: 'git stash saves uncommitted edits to the stash stack and restores a clean working tree.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
      {
        title: 'Pop Stash to Resume',
        command: 'git stash pop',
        description: 'After handling the interruption, git stash pop restores your uncommitted edits back to your working tree.',
        stages: {
          workingTree: [
            { name: 'app.js', status: 'modified' },
            { name: 'new-form.html', status: 'untracked' },
          ],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
    ],
  },

  'stash-stack': {
    id: 'stash-stack',
    title: 'Managing Multiple Stashes (LIFO Stack)',
    defaultView: 'stages',
    steps: [
      {
        title: 'Save First Feature to Stash',
        command: 'git stash save "WIP auth"',
        description: 'First set of unfinished edits is saved to stash@{0}. Working directory is clean.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
      {
        title: 'Save Second Feature to Stash',
        command: 'git stash save "WIP payment"',
        description: 'Payment edits become stash@{0}. Previous auth stash moves down to stash@{1} in the LIFO stack.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
      {
        title: 'List All Stashes',
        command: 'git stash list',
        description: 'Shows the complete stack: stash@{0}: WIP payment, stash@{1}: WIP auth.',
        stages: {
          workingTree: [],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
      {
        title: 'Pop the Top Stash',
        command: 'git stash pop',
        description: 'Pops stash@{0} (payment edits) back onto disk and removes it. Auth stash now becomes stash@{0}.',
        stages: {
          workingTree: [{ name: 'payment.js', status: 'modified' }],
          stagingArea: [],
          repository: ['c1 (v1.0 release)'],
        },
      },
    ],
  },

  // 7. Reset & Revert
  'reset-modes': {
    id: 'reset-modes',
    title: 'Git Reset Comparison Matrix',
    defaultView: 'matrix',
    steps: [
      {
        title: 'Soft Reset (--soft)',
        command: 'git reset --soft HEAD~1',
        description: 'Moves HEAD back 1 commit. Changes remain safely preserved in the Staging Area (Index).',
        customView: 'matrix',
        metadata: { mode: 'soft' },
      },
      {
        title: 'Mixed Reset (--mixed - Default)',
        command: 'git reset --mixed HEAD~1',
        description: 'Moves HEAD back 1 commit and unstages changes. Modified files remain on disk in working tree.',
        customView: 'matrix',
        metadata: { mode: 'mixed' },
      },
      {
        title: 'Hard Reset (--hard)',
        command: 'git reset --hard HEAD~1',
        description: 'Moves HEAD back 1 commit and overwrites working tree and index. Uncommitted changes are permanently lost.',
        customView: 'matrix',
        metadata: { mode: 'hard' },
      },
    ],
  },

  'reset-revert': {
    id: 'reset-revert',
    title: 'Git Revert: Safe Public Undo',
    defaultView: 'graph',
    steps: [
      {
        title: 'Commit Pushed to Shared Remote',
        command: 'git log --oneline',
        description: 'Commit C2 has a bug but is already pushed to GitHub. Running reset --hard would rewrite public history.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Stable release', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Broken discount logic (Pushed)', parents: ['c1'], branch: 'master', status: 'bad' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c2' }],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Append Inverse Commit with git revert',
        command: 'git revert c2',
        description: 'Git creates new commit C3 containing the inverse diff of C2, safely undoing the change without rewriting history.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Stable release', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Broken discount logic', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Revert "Broken discount logic"', parents: ['c2'], branch: 'master', status: 'good' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  // 8. Reflog
  'reflog': {
    id: 'reflog',
    title: 'Git Reflog Safety Net',
    defaultView: 'graph',
    steps: [
      {
        title: 'Normal History with Commits C1..C3',
        command: 'git log --oneline',
        description: 'C3 contains your feature work. Both git log and the internal reflog show HEAD at C3.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Setup app', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Add models', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Add controllers', parents: ['c2'], branch: 'master' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Accidental Reset Leaves C3 Orphaned',
        command: 'git reset --hard HEAD~1',
        description: 'Master moves back to C2. C3 disappears from git log, but its hash remains recorded in git reflog!',
        commits: [
          { id: 'c1', label: 'C1', message: 'Setup app', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Add models', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Add controllers (Lost)', parents: ['c2'], branch: 'master', status: 'orphaned' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c2' }],
        head: { target: 'master', isDetached: false },
      },
      {
        title: 'Resurrect Commit Using Reflog Reference',
        command: 'git reset --hard HEAD@{1}',
        description: 'Using the reflog pointer, master moves right back to C3. Your work is completely restored!',
        commits: [
          { id: 'c1', label: 'C1', message: 'Setup app', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Add models', parents: ['c1'], branch: 'master' },
          { id: 'c3', label: 'C3', message: 'Add controllers (Restored)', parents: ['c2'], branch: 'master', status: 'created' },
        ],
        branches: [{ name: 'master', targetCommitId: 'c3' }],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  // 9. Rebase
  'rebase': {
    id: 'rebase',
    title: 'Git Rebase: Linear History',
    defaultView: 'graph',
    steps: [
      {
        title: 'Divergent Feature and Master Branches',
        command: 'git log --graph --oneline',
        description: 'Feature branched from C1 with commits F1 and F2. Meanwhile, master progressed to C2.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master patch', parents: ['c1'], branch: 'master' },
          { id: 'f1', label: 'F1', message: 'Feature step 1', parents: ['c1'], branch: 'feature' },
          { id: 'f2', label: 'F2', message: 'Feature step 2', parents: ['f1'], branch: 'feature' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'feature', targetCommitId: 'f2' },
        ],
        head: { target: 'feature', isDetached: false },
      },
      {
        title: 'Replay Feature Commits on Master Tip',
        command: 'git rebase master',
        description: 'Git lifts F1 and F2 and replays them sequentially onto C2 as new commits F1\' and F2\'.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master patch', parents: ['c1'], branch: 'master' },
          { id: 'f1p', label: "F1'", message: 'Feature step 1', parents: ['c2'], branch: 'feature' },
          { id: 'f2p', label: "F2'", message: 'Feature step 2', parents: ['f1p'], branch: 'feature', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'c2' },
          { name: 'feature', targetCommitId: 'f2p' },
        ],
        head: { target: 'feature', isDetached: false },
      },
      {
        title: 'Fast-Forward Master to Linear Tip',
        command: 'git checkout master && git merge feature',
        description: 'History is now completely linear. Master fast-forwards to F2\' without a merge commit.',
        commits: [
          { id: 'c1', label: 'C1', message: 'Base commit', parents: [], branch: 'master' },
          { id: 'c2', label: 'C2', message: 'Master patch', parents: ['c1'], branch: 'master' },
          { id: 'f1p', label: "F1'", message: 'Feature step 1', parents: ['c2'], branch: 'master' },
          { id: 'f2p', label: "F2'", message: 'Feature step 2', parents: ['f1p'], branch: 'master', status: 'created' },
        ],
        branches: [
          { name: 'master', targetCommitId: 'f2p' },
          { name: 'feature', targetCommitId: 'f2p' },
        ],
        head: { target: 'master', isDetached: false },
      },
    ],
  },

  // 10. Squash
  'squash': {
    id: 'squash',
    title: 'Squashing Commits with Interactive Rebase',
    defaultView: 'squash',
    steps: [
      {
        title: 'Messy Incremental WIP Commits',
        command: 'git log -n 3 --oneline',
        description: 'Feature branch has 3 noisy commits: "wip auth", "fix typo in token", and "forgot semicolon".',
        customView: 'squash',
        metadata: {
          todoList: [
            { action: 'pick', hash: 'f2b2b2', message: 'wip auth' },
            { action: 'pick', hash: 'f3c3c3', message: 'fix typo in token' },
            { action: 'pick', hash: 'f4d4d4', message: 'forgot semicolon' },
          ],
        },
      },
      {
        title: 'Configure Interactive Rebase Sheet',
        command: 'git rebase -i HEAD~3',
        description: 'Keep the first commit as "pick" and change subsequent lines to "squash" (or "s").',
        customView: 'squash',
        metadata: {
          todoList: [
            { action: 'pick', hash: 'f2b2b2', message: 'wip auth' },
            { action: 'squash', hash: 'f3c3c3', message: 'fix typo in token' },
            { action: 'squash', hash: 'f4d4d4', message: 'forgot semicolon' },
          ],
        },
      },
      {
        title: 'Combined Atomic Commit Created',
        command: 'git rebase --continue',
        description: 'All 3 commits are melded into 1 single clean commit: "Implement JWT Authentication".',
        customView: 'squash',
        metadata: {
          todoList: [
            { action: 'pick', hash: 's10001', message: 'Implement JWT Authentication (Combined)' },
          ],
        },
      },
    ],
  },

  // 11. Bisect
  'bisect': {
    id: 'bisect',
    title: 'Git Bisect: Binary Search Debugging',
    defaultView: 'bisect',
    steps: [
      {
        title: 'Mark Endpoints: Known Good and Bad',
        command: 'git bisect start && git bisect bad HEAD && git bisect good c1',
        description: 'Commit #0 works; commit #5 is broken. Git initiates binary search over the range [0..5].',
        customView: 'bisect',
        metadata: {
          range: [0, 5],
          mid: 2,
          commits: [
            { hash: 'c1', verdict: 'good' },
            { hash: 'c2', verdict: null },
            { hash: 'c3', verdict: null },
            { hash: 'c4', verdict: null },
            { hash: 'c5', verdict: null },
            { hash: 'c6', verdict: 'bad' },
          ],
        },
      },
      {
        title: 'Test Midpoint Commit #2 (Failed)',
        command: 'git bisect bad',
        description: 'Git checked out #2. Tests failed, so the bug was introduced at or before commit #2 (range [0..2]).',
        customView: 'bisect',
        metadata: {
          range: [0, 2],
          mid: 1,
          commits: [
            { hash: 'c1', verdict: 'good' },
            { hash: 'c2', verdict: null },
            { hash: 'c3', verdict: 'bad' },
            { hash: 'c4', verdict: null },
            { hash: 'c5', verdict: null },
            { hash: 'c6', verdict: 'bad' },
          ],
        },
      },
      {
        title: 'Test Midpoint Commit #1 (Passed) → Culprit Isolated!',
        command: 'git bisect good',
        description: 'Commit #1 passed. Git concludes: commit #2 (c3) is the exact commit that introduced the bug!',
        customView: 'bisect',
        metadata: {
          range: [1, 2],
          mid: 2,
          commits: [
            { hash: 'c1', verdict: 'good' },
            { hash: 'c2', verdict: 'good' },
            { hash: 'c3', verdict: 'bad' },
            { hash: 'c4', verdict: null },
            { hash: 'c5', verdict: null },
            { hash: 'c6', verdict: 'bad' },
          ],
        },
      },
      {
        title: 'Exit Bisect and Return to Branch',
        command: 'git bisect reset',
        description: 'Now that the buggy commit is identified, git bisect reset returns your working tree and HEAD to your original branch.',
        customView: 'bisect',
        metadata: {
          range: [1, 2],
          mid: 2,
          commits: [
            { hash: 'c1', verdict: 'good' },
            { hash: 'c2', verdict: 'good' },
            { hash: 'c3', verdict: 'bad' },
            { hash: 'c4', verdict: null },
            { hash: 'c5', verdict: null },
            { hash: 'c6', verdict: 'bad' },
          ],
        },
      },
    ],
  },

  // 12. Fetch, Pull, Push
  'fetch-pull-push': {
    id: 'fetch-pull-push',
    title: 'Remote Synchronization: Fetch vs Pull vs Push',
    defaultView: 'remotes',
    steps: [
      {
        title: 'All Tiers in Sync at Commit C1',
        command: 'git status',
        description: 'Remote (GitHub), Local Tracking (origin/main), and Local Branch (main) all match.',
        customView: 'remotes',
        metadata: {
          remote: ['C1 (Initial commit)'],
          tracking: ['C1 (Initial commit)'],
          local: ['C1 (Initial commit)'],
        },
      },
      {
        title: 'Teammate Pushes C2 to Remote',
        command: '# Teammate pushed C2 to GitHub',
        description: 'Remote GitHub has C2. Local machine does not know yet until you fetch.',
        customView: 'remotes',
        metadata: {
          remote: ['C1', 'C2 (Teammate commit)'],
          tracking: ['C1'],
          local: ['C1'],
        },
      },
      {
        title: 'git fetch Updates Local Tracking Only',
        command: 'git fetch origin',
        description: 'Downloads C2 into local tracking cache (origin/main). Local workspace is untouched.',
        customView: 'remotes',
        metadata: {
          remote: ['C1', 'C2 (Teammate commit)'],
          tracking: ['C1', 'C2 (Teammate commit)'],
          local: ['C1'],
        },
      },
      {
        title: 'git merge or git pull Merges into Local Branch',
        command: 'git merge origin/main # (or git pull)',
        description: 'Merges tracking cache into local branch. Local branch advances to C2.',
        customView: 'remotes',
        metadata: {
          remote: ['C1', 'C2'],
          tracking: ['C1', 'C2'],
          local: ['C1', 'C2'],
        },
      },
    ],
  },

  // 13. Pull Requests
  'pull-requests': {
    id: 'pull-requests',
    title: 'GitHub Collaboration Flow',
    defaultView: 'flow',
    steps: [
      {
        title: '1. Fork Upstream Repository',
        command: '# Click "Fork" on GitHub',
        description: 'Creates a server-side copy of the project under your personal GitHub account.',
        customView: 'flow',
        metadata: { activeStage: 1 },
      },
      {
        title: '2. Clone & Branch',
        command: 'git checkout -b feature-darkmode',
        description: 'Clone your personal fork locally and create a dedicated feature branch.',
        customView: 'flow',
        metadata: { activeStage: 2 },
      },
      {
        title: '3. Commit & Push to Fork',
        command: 'git push origin feature-darkmode',
        description: 'Commit your tested changes and push the branch to your fork on GitHub.',
        customView: 'flow',
        metadata: { activeStage: 3 },
      },
      {
        title: '4. Open Pull Request on GitHub',
        command: '# Click "Compare & pull request"',
        description: 'Propose merging your feature branch into the upstream repository main branch.',
        customView: 'flow',
        metadata: { activeStage: 4 },
      },
      {
        title: '5. Review and Merge',
        command: '# Maintainers review & merge',
        description: 'Maintainers review code, automated tests pass, and your PR is merged into main!',
        customView: 'flow',
        metadata: { activeStage: 5 },
      },
    ],
  },

  'pr-merge-strategies': {
    id: 'pr-merge-strategies',
    title: 'Pull Request Merge Strategies',
    defaultView: 'graph',
    steps: [
      {
        title: 'Feature Branch PR Diverged from Main',
        command: 'git log --graph --oneline',
        description: 'The feature branch has commits F1 and F2, while main has progressed with M2.',
        commits: [
          { id: 'm1', label: 'M1', message: 'Initial base', parents: [], branch: 'main' },
          { id: 'm2', label: 'M2', message: 'Production updates', parents: ['m1'], branch: 'main' },
          { id: 'f1', label: 'F1', message: 'Feature step 1', parents: ['m1'], branch: 'feature' },
          { id: 'f2', label: 'F2', message: 'Feature step 2', parents: ['f1'], branch: 'feature' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'm2' },
          { name: 'feature', targetCommitId: 'f2' },
        ],
        head: { target: 'main', isDetached: false },
      },
      {
        title: 'Strategy 1: Create a Merge Commit',
        command: '# GitHub: "Create a merge commit"',
        description: 'Preserves complete branch history with a two-parent merge commit joining both branches.',
        commits: [
          { id: 'm1', label: 'M1', message: 'Initial base', parents: [], branch: 'main' },
          { id: 'm2', label: 'M2', message: 'Production updates', parents: ['m1'], branch: 'main' },
          { id: 'f1', label: 'F1', message: 'Feature step 1', parents: ['m1'], branch: 'feature' },
          { id: 'f2', label: 'F2', message: 'Feature step 2', parents: ['f1'], branch: 'feature' },
          { id: 'mc', label: 'Merge', message: 'Merge pull request #42', parents: ['m2', 'f2'], branch: 'main', isMerge: true, status: 'created' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'mc' },
        ],
        head: { target: 'main', isDetached: false },
      },
      {
        title: 'Strategy 2: Squash and Merge',
        command: '# GitHub: "Squash and merge"',
        description: 'Condenses F1 and F2 into a single atomic commit on main, discarding noisy intermediate commits.',
        commits: [
          { id: 'm1', label: 'M1', message: 'Initial base', parents: [], branch: 'main' },
          { id: 'm2', label: 'M2', message: 'Production updates', parents: ['m1'], branch: 'main' },
          { id: 'sq', label: 'PR #42', message: 'feat: add user profile (#42)', parents: ['m2'], branch: 'main', status: 'created' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'sq' },
        ],
        head: { target: 'main', isDetached: false },
      },
      {
        title: 'Strategy 3: Rebase and Merge',
        command: '# GitHub: "Rebase and merge"',
        description: 'Replays individual feature commits F1 and F2 directly onto main without creating a merge commit.',
        commits: [
          { id: 'm1', label: 'M1', message: 'Initial base', parents: [], branch: 'main' },
          { id: 'm2', label: 'M2', message: 'Production updates', parents: ['m1'], branch: 'main' },
          { id: 'f1r', label: "F1'", message: 'Feature step 1', parents: ['m2'], branch: 'main' },
          { id: 'f2r', label: "F2'", message: 'Feature step 2', parents: ['f1r'], branch: 'main', status: 'created' },
        ],
        branches: [
          { name: 'main', targetCommitId: 'f2r' },
        ],
        head: { target: 'main', isDetached: false },
      },
    ],
  },

  // 14. Submodules
  'submodules': {
    id: 'submodules',
    title: 'Git Submodules: Pinned Dependencies',
    defaultView: 'submodule',
    steps: [
      {
        title: 'Embed External Project via git submodule add',
        command: 'git submodule add https://github.com/org/shared-ui.git lib/shared-ui',
        description: 'Clones the external repo into lib/shared-ui and creates .gitmodules mapping file.',
        customView: 'submodule',
        metadata: { subHash: 'f9e8d7' },
      },
      {
        title: 'Parent Project Records Exact Commit SHA',
        command: 'git commit -am "feat: pin shared-ui submodule"',
        description: 'The parent repository records a special gitlink pointer tracking the exact commit SHA f9e8d7.',
        customView: 'submodule',
        metadata: { subHash: 'f9e8d7' },
      },
    ],
  },
};

export function getGitScenario(id: string): GitScenario | undefined {
  return gitScenarios[id];
}
