import type { GitStep, GitStageState, GitFile, GitCommit } from './types';

/**
 * Renders an interactive, visually rich Git commit DAG timeline.
 * Features:
 * - Left-to-right topological timeline axis with "Past -> Present" guidance
 * - Dedicated horizontal branch swimlanes with track labels & guidelines
 * - Directed SVG bezier edges with clear arrowheads
 * - GitHub-style compound reference badges (e.g. [HEAD -> main], [v1.0])
 * - Glowing commit nodes with labels, commit SHAs, and messages
 */
export function renderCommitGraph(step: GitStep): string {
  const commits = step.commits || [];
  if (commits.length === 0) {
    return `
      <div class="py-12 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 text-xs italic gap-1">
        <svg class="w-8 h-8 opacity-40 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
        <span>Repository initialized & empty. No commits recorded yet.</span>
      </div>
    `;
  }

  const branches = step.branches || [];
  const head = step.head;

  // 1. Assign branch swimlane indices
  const branchLanes: Record<string, number> = { main: 0, master: 0 };
  let nextLane = 1;

  commits.forEach((c) => {
    const b = c.branch || 'main';
    if (branchLanes[b] === undefined) {
      branchLanes[b] = nextLane++;
    }
  });

  // Track colors for swimlanes
  const laneColors: Record<number, { border: string; bg: string; text: string; stroke: string; dot: string }> = {
    0: { border: 'border-blue-400 dark:border-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', stroke: '#3b82f6', dot: 'bg-blue-500' },
    1: { border: 'border-emerald-400 dark:border-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', stroke: '#10b981', dot: 'bg-emerald-500' },
    2: { border: 'border-purple-400 dark:border-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-300', stroke: '#8b5cf6', dot: 'bg-purple-500' },
    3: { border: 'border-amber-400 dark:border-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', stroke: '#f59e0b', dot: 'bg-amber-500' },
  };

  // 2. Compute topological column for each commit
  const colMap = new Map<string, number>();
  commits.forEach((c) => {
    let maxParentCol = -1;
    c.parents.forEach((pid) => {
      if (colMap.has(pid)) {
        maxParentCol = Math.max(maxParentCol, colMap.get(pid)!);
      }
    });
    colMap.set(c.id, maxParentCol + 1);
  });

  // Prevent overlap on same (lane, col)
  const occupied = new Set<string>();
  commits.forEach((c) => {
    const lane = branchLanes[c.branch || 'main'] || 0;
    let col = colMap.get(c.id) || 0;
    while (occupied.has(`${lane}-${col}`)) {
      col++;
    }
    occupied.add(`${lane}-${col}`);
    colMap.set(c.id, col);
  });

  let maxCol = 0;
  colMap.forEach((col) => {
    maxCol = Math.max(maxCol, col);
  });

  const xSpacing = 110;
  const startX = 130; // space on left for swimlane badges
  const ySpacing = 85;
  const startY = 65;

  const coords = new Map<string, { x: number; y: number }>();
  commits.forEach((c) => {
    const lane = branchLanes[c.branch || 'main'] || 0;
    const col = colMap.get(c.id) || 0;
    coords.set(c.id, { x: startX + col * xSpacing, y: startY + lane * ySpacing });
  });

  const totalWidth = Math.max(460, startX + (maxCol + 1) * xSpacing + 50);
  const totalLanes = Math.max(1, nextLane);
  const totalHeight = Math.max(150, startY + totalLanes * ySpacing + 35);

  // 3. Render Swimlane Guidelines and Labels
  let swimlanesHtml = '';
  let swimlaneSvgLines = '';

  Object.entries(branchLanes).forEach(([bName, laneIdx]) => {
    // Only render if a commit or branch actually uses this lane
    const isUsed = commits.some((c) => (c.branch || 'main') === bName) || branches.some((b) => b.name === bName);
    if (!isUsed && laneIdx > 0) return;

    const y = startY + laneIdx * ySpacing;
    const colorStyle = laneColors[laneIdx % 4];

    // Horizontal timeline guideline
    swimlaneSvgLines += `
      <line x1="${startX - 25}" y1="${y}" x2="${totalWidth - 30}" y2="${y}" stroke="currentColor" stroke-dasharray="4 4" class="text-gray-200 dark:text-gray-800" stroke-width="1.5" />
    `;

    // Left track badge
    swimlanesHtml += `
      <div class="absolute left-2.5 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-md border ${colorStyle.border} ${colorStyle.bg} ${colorStyle.text} text-[10px] font-mono font-bold shadow-xs select-none" style="top: ${y}px;">
        <span class="w-2 h-2 rounded-full ${colorStyle.dot}"></span>
        <span class="truncate max-w-[85px]">${bName}</span>
      </div>
    `;
  });

  // 4. Render Directed SVG Connection Lines
  let svgPaths = '';
  commits.forEach((child) => {
    const childPos = coords.get(child.id);
    if (!childPos) return;

    child.parents.forEach((parentId) => {
      const parentPos = coords.get(parentId);
      if (!parentPos) return;

      const isOrphan = child.status === 'orphaned';
      const isMerge = child.isMerge;
      const strokeClass = isOrphan ? 'text-gray-400 stroke-dashed' : isMerge ? 'text-purple-500' : 'text-slate-400 dark:text-slate-500';
      const strokeDash = isOrphan ? 'stroke-dasharray="4 4"' : '';
      const marker = isMerge ? 'url(#arrow-merge)' : 'url(#arrow-default)';

      // Circle radius is 18px, leave space so arrowhead touches outer boundary
      const r = 18;

      if (parentPos.y === childPos.y) {
        // Same lane horizontal arrow
        svgPaths += `
          <line x1="${parentPos.x + r}" y1="${parentPos.y}" x2="${childPos.x - r - 2}" y2="${childPos.y}" stroke="currentColor" class="${strokeClass}" stroke-width="2.5" ${strokeDash} marker-end="${marker}" />
        `;
      } else {
        // Curve between different lanes (branch fork or merge)
        const x1 = parentPos.x + r;
        const y1 = parentPos.y;
        const x2 = childPos.x - r - 2;
        const y2 = childPos.y;
        const midX = (x1 + x2) / 2;

        svgPaths += `
          <path d="M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}" fill="none" stroke="currentColor" class="${strokeClass}" stroke-width="2.5" ${strokeDash} marker-end="${marker}" />
        `;
      }
    });
  });

  // 5. Render Nodes, Branch Tags, and HEAD Pointers
  let nodesHtml = '';
  commits.forEach((c) => {
    const pos = coords.get(c.id);
    if (!pos) return;

    let nodeColor = 'bg-blue-600 border-blue-700 text-white shadow-blue-500/20';
    let ringClass = '';
    let opacity = '1';

    if (c.status === 'created') {
      nodeColor = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/30';
      ringClass = 'ring-4 ring-emerald-400/40 animate-pulse';
    } else if (c.status === 'highlight') {
      nodeColor = 'bg-[#FE6019] border-orange-600 text-white shadow-orange-500/30';
      ringClass = 'ring-4 ring-orange-400/40';
    } else if (c.status === 'orphaned') {
      nodeColor = 'bg-gray-400 border-dashed border-2 border-gray-500 text-gray-100';
      opacity = '0.5';
    } else if (c.status === 'good') {
      nodeColor = 'bg-emerald-600 border-emerald-700 text-white';
    } else if (c.status === 'bad') {
      nodeColor = 'bg-rose-600 border-rose-700 text-white';
    } else if (c.isMerge) {
      nodeColor = 'bg-purple-600 border-purple-700 text-white shadow-purple-500/30';
      ringClass = 'ring-2 ring-purple-400/50';
    }

    // Branch references pointing to this commit
    const pointingBranches = branches.filter((b) => b.targetCommitId === c.id);

    // Build Reference Badges (HEAD -> branch, standalone branch, detached HEAD)
    let pointerHtml = '';
    const badgeItems: string[] = [];

    // Detached HEAD pointing directly to commit
    if (head && head.isDetached && head.target === c.id) {
      badgeItems.push(`
        <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500 text-white shadow-xs border border-amber-600">
          <span>⚠️ HEAD</span>
          <span class="text-[8px] opacity-80">(detached)</span>
        </span>
      `);
    }

    pointingBranches.forEach((b) => {
      const isHeadTarget = head && !head.isDetached && head.target === b.name;

      if (isHeadTarget) {
        // Compound HEAD -> branch badge
        badgeItems.push(`
          <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#1e293b] text-white shadow-xs border border-slate-700">
            <span class="bg-[#FE6019] text-white px-1 py-0.2 rounded text-[8px] font-extrabold">HEAD</span>
            <span class="text-gray-400">→</span>
            <span class="text-blue-400 font-semibold">${b.name}</span>
          </span>
        `);
      } else {
        const isRemote = b.isRemote || b.name.startsWith('origin/');
        const badgeColor = isRemote
          ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800'
          : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800';

        badgeItems.push(`
          <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border ${badgeColor} shadow-xs">
            ${b.name}
          </span>
        `);
      }
    });

    if (c.tags) {
      c.tags.forEach((tag) => {
        badgeItems.push(`
          <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-yellow-100 text-yellow-800 border border-yellow-300 shadow-xs">
            🏷️ ${tag}
          </span>
        `);
      });
    }

    if (badgeItems.length > 0) {
      pointerHtml = `
        <div class="absolute -top-[30px] flex flex-col items-center pointer-events-none z-10 whitespace-nowrap">
          <div class="flex items-center gap-1">${badgeItems.join('')}</div>
          <svg class="w-2.5 h-2.5 text-gray-500 dark:text-gray-400 -mt-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21l-10-14h20z" />
          </svg>
        </div>
      `;
    }

    nodesHtml += `
      <div class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-default" style="left: ${pos.x}px; top: ${pos.y}px; opacity: ${opacity};">
        ${pointerHtml}

        <!-- Commit Node Circle -->
        <div class="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-md border-2 ${nodeColor} ${ringClass} transition-transform group-hover:scale-110" title="${c.message} (${c.id})">
          ${c.label || c.id.slice(0, 3)}
        </div>

        <!-- Commit Metadata Below -->
        <div class="absolute top-[22px] pt-1 flex flex-col items-center text-center pointer-events-none whitespace-nowrap">
          <span class="text-[9px] font-mono font-semibold text-gray-400 dark:text-gray-500">#${c.id.slice(0, 6)}</span>
          <span class="text-[10px] text-gray-700 dark:text-gray-300 max-w-[100px] truncate font-medium">${c.message}</span>
        </div>
      </div>
    `;
  });

  return `
    <div class="w-full overflow-x-auto select-none">
      <!-- Canvas Area -->
      <div class="relative mx-auto py-6" style="min-width: ${totalWidth}px; height: ${totalHeight}px;">
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker id="arrow-default" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
            </marker>
            <marker id="arrow-merge" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#8b5cf6" />
            </marker>
          </defs>
          ${swimlaneSvgLines}
          ${svgPaths}
        </svg>

        ${swimlanesHtml}
        ${nodesHtml}
      </div>
    </div>
  `;
}

/**
 * Renders the 3 Stages of Git Content:
 * 1. Working Tree (Uncommitted on disk)
 * 2. Staging Area (Index)
 * 3. Git Repository (Permanent snapshot)
 * Features visual transition flow arrows and color-coded status badges.
 */
export function renderStages(stages?: GitStageState): string {
  if (!stages) return '';

  const working = stages.workingTree || [];
  const staging = stages.stagingArea || [];
  const repo = stages.repository || [];

  function renderFileList(files: GitFile[], placeholder: string, isWorking: boolean) {
    if (files.length === 0) {
      return `
        <div class="py-5 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 text-xs italic">
          <span>✓ ${placeholder}</span>
        </div>
      `;
    }

    return files
      .map((f) => {
        let badge = 'bg-gray-100 text-gray-600 border-gray-200';
        let statusLabel = f.status;
        let icon = '📄';

        if (f.status === 'untracked') {
          badge = 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800';
          statusLabel = 'untracked';
        } else if (f.status === 'modified') {
          badge = 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800';
          statusLabel = 'modified';
        } else if (f.status === 'staged') {
          badge = 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
          statusLabel = 'staged';
          icon = '📦';
        }

        return `
          <div class="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#222222] border border-gray-200 dark:border-gray-700/80 text-xs shadow-2xs">
            <span class="flex items-center gap-1.5 font-mono text-gray-800 dark:text-gray-200 font-medium">
              <span>${icon}</span>
              <span>${f.name}</span>
            </span>
            <span class="text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase font-bold ${badge}">
              ${statusLabel}
            </span>
          </div>
        `;
      })
      .join('');
  }

  function renderRepoList(commits: string[]) {
    if (commits.length === 0) {
      return `
        <div class="py-5 flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500 text-xs italic">
          <span>No commit snapshots yet</span>
        </div>
      `;
    }

    return commits
      .map(
        (c) => `
        <div class="px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#222222] border border-blue-200 dark:border-blue-900/60 text-xs font-mono text-blue-600 dark:text-blue-400 flex items-center justify-between shadow-2xs">
          <span class="flex items-center gap-1.5 font-bold">
            <span>🏛️</span>
            <span>${c}</span>
          </span>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#FE6019] text-white font-extrabold shadow-xs">
            HEAD
          </span>
        </div>
      `
      )
      .join('');
  }

  return `
    <div class="flex flex-col gap-3">
      <!-- 3 Columns Pipeline Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50/70 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800">
        <!-- 1. Working Tree -->
        <div class="flex flex-col rounded-lg border border-amber-200/80 dark:border-amber-900/40 bg-white/80 dark:bg-[#202020] p-3 shadow-2xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
              <span>💻</span> Working Tree
            </span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">Disk Files</span>
          </div>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-2">Active workspace where files are created & edited.</p>
          <div class="flex flex-col gap-1.5 flex-1">${renderFileList(working, 'Working tree clean', true)}</div>
        </div>

        <!-- 2. Staging Area -->
        <div class="flex flex-col rounded-lg border border-emerald-200/80 dark:border-emerald-900/40 bg-white/80 dark:bg-[#202020] p-3 shadow-2xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-1.5">
              <span>📦</span> Staging Area
            </span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Index</span>
          </div>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-2">Prepared files staged via <code class="text-emerald-600 font-mono">git add</code>.</p>
          <div class="flex flex-col gap-1.5 flex-1">${renderFileList(staging, 'No files staged', false)}</div>
        </div>

        <!-- 3. Git Repository -->
        <div class="flex flex-col rounded-lg border border-blue-200/80 dark:border-blue-900/40 bg-white/80 dark:bg-[#202020] p-3 shadow-2xs">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-blue-800 dark:text-blue-200 flex items-center gap-1.5">
              <span>🏛️</span> Git Repository
            </span>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">.git / HEAD</span>
          </div>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-2">Immutable snapshots created via <code class="text-blue-600 font-mono">git commit</code>.</p>
          <div class="flex flex-col gap-1.5 flex-1">${renderRepoList(repo)}</div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders specialized visualizers for Reset, Bisect, Remotes, PR Flow, Squash, and Submodules.
 */
export function renderSpecial(step: GitStep): string {
  const mode = step.customView;
  if (!mode || mode === 'graph' || mode === 'stages') return '';

  // 1. Reset Matrix Mode
  if (mode === 'matrix') {
    const currentMode = step.metadata?.mode || 'soft';
    return `
      <div class="flex flex-col gap-3">
        <!-- Visual Comparison Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <!-- Soft -->
          <div class="p-3 rounded-xl border ${currentMode === 'soft' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-400/40' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1f1f1f] opacity-60'}">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">--soft</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">Safest</span>
            </div>
            <ul class="text-[11px] space-y-1 text-gray-600 dark:text-gray-300">
              <li>⏪ <strong>HEAD</strong>: Rewinds commit</li>
              <li>✅ <strong>Staging (Index)</strong>: Kept staged</li>
              <li>✅ <strong>Working Tree</strong>: Untouched</li>
            </ul>
          </div>

          <!-- Mixed -->
          <div class="p-3 rounded-xl border ${currentMode === 'mixed' ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-400/40' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1f1f1f] opacity-60'}">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">--mixed (Default)</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Standard</span>
            </div>
            <ul class="text-[11px] space-y-1 text-gray-600 dark:text-gray-300">
              <li>⏪ <strong>HEAD</strong>: Rewinds commit</li>
              <li>⚠️ <strong>Staging (Index)</strong>: Unstaged</li>
              <li>✅ <strong>Working Tree</strong>: Kept on disk</li>
            </ul>
          </div>

          <!-- Hard -->
          <div class="p-3 rounded-xl border ${currentMode === 'hard' ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-400/40' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1f1f1f] opacity-60'}">
            <div class="flex items-center justify-between mb-1.5">
              <span class="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">--hard</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">Destructive</span>
            </div>
            <ul class="text-[11px] space-y-1 text-gray-600 dark:text-gray-300">
              <li>⏪ <strong>HEAD</strong>: Rewinds commit</li>
              <li>❌ <strong>Staging (Index)</strong>: Cleared</li>
              <li>❌ <strong>Working Tree</strong>: Wiped permanently</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Bisect Binary Search Mode
  if (mode === 'bisect') {
    const range = step.metadata?.range || [0, 5];
    const commits = step.metadata?.commits || [];
    const mid = step.metadata?.mid;

    return `
      <div class="flex flex-col gap-3 p-4 bg-gray-50/70 dark:bg-[#1c1c1c] rounded-xl border border-gray-200 dark:border-gray-800">
        <!-- Status Header -->
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="flex items-center gap-1.5 font-bold text-gray-700 dark:text-gray-300">
            <span>🎯 Active Search Window:</span>
            <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">[ #${range[0]} ... #${range[1]} ]</span>
          </span>
          <span class="text-gray-500 text-[11px]">Binary Search Progress</span>
        </div>

        <!-- Commit Timeline Strip -->
        <div class="flex items-center justify-between gap-1 overflow-x-auto py-3 px-1 select-none">
          ${commits
            .map((c: any, i: number) => {
              const inRange = i >= range[0] && i <= range[1];
              const isMid = i === mid;
              let borderStyle = inRange ? 'border-blue-400 dark:border-blue-600 ring-2 ring-blue-300/30' : 'border-gray-200 dark:border-gray-800 opacity-35';
              let badge = '<span class="text-[8px] font-mono text-gray-400">UNTESTED</span>';
              let nodeBg = 'bg-white dark:bg-[#252525]';

              if (c.verdict === 'good') {
                badge = '<span class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">✓ GOOD</span>';
                nodeBg = 'bg-emerald-50 dark:bg-emerald-950/40';
                borderStyle = 'border-emerald-500';
              } else if (c.verdict === 'bad') {
                badge = '<span class="text-[9px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-0.5">✗ BAD</span>';
                nodeBg = 'bg-rose-50 dark:bg-rose-950/40';
                borderStyle = 'border-rose-500';
              } else if (isMid) {
                badge = '<span class="text-[9px] font-bold text-[#FE6019] animate-pulse flex items-center gap-0.5">🔍 TESTING</span>';
                nodeBg = 'bg-orange-50 dark:bg-orange-950/40';
                borderStyle = 'border-orange-500 ring-4 ring-orange-300/40';
              }

              return `
                <div class="flex flex-col items-center gap-1 min-w-[76px] p-2 rounded-xl border ${borderStyle} ${nodeBg} text-xs shadow-2xs transition-transform">
                  <span class="text-[9px] font-mono text-gray-400">Step #${i}</span>
                  <span class="font-mono font-bold text-gray-800 dark:text-gray-200">${c.hash}</span>
                  ${badge}
                </div>
              `;
            })
            .join('<div class="h-0.5 w-3 bg-gray-300 dark:bg-gray-700 shrink-0"></div>')}
        </div>

        <div class="text-[11px] text-gray-500 dark:text-gray-400 bg-white dark:bg-[#222222] p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span>Testing commit <strong>${commits[mid]?.hash || 'N/A'}</strong>. If tests pass, search right half; if tests fail, search left half.</span>
          <span class="font-mono text-[10px] text-emerald-600 font-bold">O(log N)</span>
        </div>
      </div>
    `;
  }

  // 3. Remotes Synchronization Mode (Fetch, Pull, Push)
  if (mode === 'remotes') {
    const remote = step.metadata?.remote || [];
    const tracking = step.metadata?.tracking || [];
    const local = step.metadata?.local || [];

    return `
      <div class="flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50/70 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800">
          <!-- 1. Remote GitHub -->
          <div class="flex flex-col rounded-lg border border-purple-200 dark:border-purple-900 bg-white dark:bg-[#222222] p-3 shadow-2xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <span>☁️</span> Remote (origin)
              </span>
              <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">GitHub Server</span>
            </div>
            <div class="flex flex-col gap-1.5 font-mono text-xs">
              ${remote.map((c: string) => `<div class="p-1.5 rounded-md bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200">${c}</div>`).join('')}
            </div>
          </div>

          <!-- 2. Local Tracking -->
          <div class="flex flex-col rounded-lg border border-blue-200 dark:border-blue-900 bg-white dark:bg-[#222222] p-3 shadow-2xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                <span>📥</span> Tracking (origin/main)
              </span>
              <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">Local Cache</span>
            </div>
            <div class="flex flex-col gap-1.5 font-mono text-xs">
              ${tracking.map((c: string) => `<div class="p-1.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">${c}</div>`).join('')}
            </div>
          </div>

          <!-- 3. Local Workspace -->
          <div class="flex flex-col rounded-lg border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-[#222222] p-3 shadow-2xs">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <span>💻</span> Local Branch (main)
              </span>
              <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">Working Tree</span>
            </div>
            <div class="flex flex-col gap-1.5 font-mono text-xs">
              ${local.map((c: string) => `<div class="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">${c}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. PR Collaboration Flow Mode
  if (mode === 'flow') {
    const active = step.metadata?.activeStage || 1;
    const stages = [
      { n: 1, label: '1. Fork / Clone', icon: '🍴' },
      { n: 2, label: '2. Feature Branch', icon: '🌿' },
      { n: 3, label: '3. Push Branch', icon: '📤' },
      { n: 4, label: '4. Open PR & Review', icon: '🔀' },
      { n: 5, label: '5. Merge & Deploy', icon: '🎉' },
    ];

    return `
      <div class="flex items-center justify-between gap-2 p-4 bg-gray-50/70 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto text-xs select-none">
        ${stages
          .map((s) => {
            const isCurr = s.n === active;
            const isDone = s.n < active;
            const cls = isCurr
              ? 'bg-[#FE6019] text-white font-bold ring-4 ring-orange-300/40 shadow-xs'
              : isDone
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-white dark:bg-[#252525] text-gray-400 border border-gray-200 dark:border-gray-700 opacity-60';

            return `
              <div class="flex items-center gap-1.5 px-3 py-2 rounded-lg ${cls} whitespace-nowrap">
                <span>${s.icon}</span>
                <span>${s.label}</span>
              </div>
            `;
          })
          .join('<span class="text-gray-400 font-bold">→</span>')}
      </div>
    `;
  }

  // 5. Squash Rebase Mode
  if (mode === 'squash') {
    const list = step.metadata?.todoList || [];
    return `
      <div class="flex flex-col gap-3">
        <div class="p-4 bg-gray-950 rounded-xl border border-gray-800 text-xs font-mono text-gray-200 flex flex-col gap-2">
          <div class="flex items-center justify-between border-b border-gray-800 pb-2 text-[10px] text-gray-400 uppercase tracking-wider">
            <span>Interactive Rebase Todo Sheet (git rebase -i HEAD~3)</span>
            <span class="text-emerald-400">Auto-generated editor</span>
          </div>
          <div class="flex flex-col gap-1.5">
            ${list
              .map(
                (item: any) => `
              <div class="flex items-center gap-2.5 p-2 rounded-md bg-gray-900 border border-gray-800">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.action === 'pick' ? 'bg-blue-900/60 text-blue-400 border border-blue-700' : 'bg-amber-900/60 text-amber-400 border border-amber-700'}">
                  ${item.action}
                </span>
                <span class="text-gray-400">${item.hash}</span>
                <span class="text-gray-200 truncate flex-1 font-medium">${item.message}</span>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
          <span>💡 <strong>Result</strong>: The first commit is kept with <code class="font-bold">pick</code>; subsequent commits marked with <code class="font-bold">squash</code> are melded into it with a unified message.</span>
        </div>
      </div>
    `;
  }

  // 6. Submodule Architecture Mode
  if (mode === 'submodule') {
    const subHash = step.metadata?.subHash || 'f9e8d7';
    return `
      <div class="p-4 bg-gray-50/70 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-around gap-4 text-xs">
        <!-- Parent Repo -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#252525] border border-blue-200 dark:border-blue-900 flex flex-col gap-1 w-full md:w-auto shadow-2xs">
          <span class="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <span>📦</span> Parent Repository (main-project)
          </span>
          <span class="font-mono text-gray-500 text-[11px]">.gitmodules config file</span>
          <span class="font-mono text-gray-700 dark:text-gray-300 text-[11px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-1">path = libs/shared-ui</span>
        </div>

        <!-- Connection -->
        <div class="flex flex-col items-center text-center">
          <span class="text-gray-400 font-mono text-[10px]">Gitlink Pointer</span>
          <span class="text-[#FE6019] text-base font-bold">──────▶</span>
          <span class="font-mono text-[9px] text-gray-500">tracks exact SHA</span>
        </div>

        <!-- Child Submodule -->
        <div class="p-3.5 rounded-xl bg-white dark:bg-[#252525] border border-purple-200 dark:border-purple-900 flex flex-col gap-1 w-full md:w-auto shadow-2xs">
          <span class="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
            <span>🌐</span> Submodule Repo (shared-ui.git)
          </span>
          <span class="font-mono text-gray-500 text-[11px]">Pinned commit revision</span>
          <span class="font-mono text-purple-700 dark:text-purple-300 text-[11px] font-bold bg-purple-50 dark:bg-purple-950 px-2 py-1 rounded mt-1">commit #${subHash}</span>
        </div>
      </div>
    `;
  }

  return '';
}
