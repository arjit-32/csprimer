export interface GitCommit {
  id: string; // e.g. "c1", "c2"
  label: string; // e.g. "C1"
  message: string;
  parents: string[];
  branch?: string;
  tags?: string[];
  status?: 'default' | 'created' | 'orphaned' | 'good' | 'bad' | 'highlight';
  isMerge?: boolean;
}

export interface GitBranch {
  name: string; // e.g. "main", "feature", "origin/main"
  targetCommitId: string;
  isRemote?: boolean;
}

export interface GitFile {
  name: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
}

export interface GitStageState {
  workingTree?: GitFile[];
  stagingArea?: GitFile[];
  repository?: string[];
}

export interface GitStep {
  title: string;
  command?: string;
  description: string;
  commits?: GitCommit[];
  branches?: GitBranch[];
  head?: {
    target: string; // branch name or commit id
    isDetached?: boolean;
  };
  stages?: GitStageState;
  customView?: 'graph' | 'stages' | 'matrix' | 'bisect' | 'remotes' | 'flow' | 'submodule' | 'squash';
  metadata?: Record<string, any>;
}

export interface GitScenario {
  id: string;
  title: string;
  defaultView?: 'graph' | 'stages' | 'matrix' | 'bisect' | 'remotes' | 'flow' | 'submodule' | 'squash';
  steps: GitStep[];
}
