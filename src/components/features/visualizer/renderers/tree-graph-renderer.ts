import type { TreeState, GraphState, TreeNode } from '../../../../problems/algorithms/types';

export function renderTree(state: TreeState): string {
  const { nodes = [], rootId, label = 'Binary Tree' } = state;

  if (nodes.length === 0) {
    return `<div class="p-6 text-center text-xs font-mono text-gray-400">Empty Tree</div>`;
  }

  const nodeMap = new Map<string, TreeNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  // Compute (x, y) coordinates for binary tree
  const coords = new Map<string, { x: number; y: number }>();
  const width = 460;
  const height = 220;

  function assignPositions(id: string, x: number, y: number, spread: number) {
    coords.set(id, { x, y });
    const node = nodeMap.get(id);
    if (!node) return;

    if (node.left && nodeMap.has(node.left)) {
      assignPositions(node.left, x - spread, y + 65, spread / 2);
    }
    if (node.right && nodeMap.has(node.right)) {
      assignPositions(node.right, x + spread, y + 65, spread / 2);
    }
  }

  if (rootId && nodeMap.has(rootId)) {
    assignPositions(rootId, width / 2, 40, width / 4.2);
  } else if (nodes.length > 0) {
    assignPositions(nodes[0].id, width / 2, 40, width / 4.2);
  }

  // Generate SVG lines
  let linesSvg = '';
  nodes.forEach((node) => {
    const parentPos = coords.get(node.id);
    if (!parentPos) return;

    if (node.left && coords.has(node.left)) {
      const leftPos = coords.get(node.left)!;
      linesSvg += `<line x1="${parentPos.x}" y1="${parentPos.y}" x2="${leftPos.x}" y2="${leftPos.y}" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-700" />`;
    }
    if (node.right && coords.has(node.right)) {
      const rightPos = coords.get(node.right)!;
      linesSvg += `<line x1="${parentPos.x}" y1="${parentPos.y}" x2="${rightPos.x}" y2="${rightPos.y}" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-700" />`;
    }
  });

  // Generate SVG nodes
  let nodesSvg = '';
  nodes.forEach((node) => {
    const pos = coords.get(node.id) || { x: width / 2, y: 40 };

    let fillClass = 'fill-white dark:fill-[#252526] stroke-gray-400 dark:stroke-gray-600';
    let textClass = 'fill-gray-800 dark:fill-gray-200';

    if (node.state === 'current') {
      fillClass = 'fill-blue-500 stroke-blue-600 ring-2';
      textClass = 'fill-white font-bold';
    } else if (node.state === 'visited') {
      fillClass = 'fill-emerald-500 stroke-emerald-600';
      textClass = 'fill-white font-bold';
    } else if (node.state === 'target') {
      fillClass = 'fill-amber-500 stroke-amber-600';
      textClass = 'fill-white font-bold';
    }

    nodesSvg += `
      <g class="cursor-pointer transition-all duration-300">
        <circle cx="${pos.x}" cy="${pos.y}" r="18" class="${fillClass}" stroke-width="2.5" />
        <text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" class="${textClass} text-xs font-mono select-none">
          ${node.value}
        </text>
      </g>
    `;
  });

  return `
    <div class="tree-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          ${label}
        </div>
        <div class="flex items-center gap-3 text-[10px] font-mono text-gray-400">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-blue-500"></span> Active</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Visited</span>
        </div>
      </div>
      <div class="w-full overflow-x-auto flex justify-center py-2">
        <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[460px] h-auto overflow-visible">
          ${linesSvg}
          ${nodesSvg}
        </svg>
      </div>
    </div>
  `;
}

export function renderGraph(state: GraphState): string {
  const { nodes = [], edges = [], label = 'Graph Network' } = state;

  const width = 460;
  const height = 240;

  // If node coordinates not provided, arrange in a circle
  const coords = new Map<string, { x: number; y: number }>();
  const radius = Math.min(width, height) * 0.36;
  const centerX = width / 2;
  const centerY = height / 2;

  nodes.forEach((node, idx) => {
    if (node.x !== undefined && node.y !== undefined) {
      coords.set(node.id, { x: node.x, y: node.y });
    } else {
      const angle = (idx / nodes.length) * 2 * Math.PI - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      coords.set(node.id, { x, y });
    }
  });

  let edgesSvg = '';
  edges.forEach((edge) => {
    const fromPos = coords.get(edge.from);
    const toPos = coords.get(edge.to);
    if (!fromPos || !toPos) return;

    const strokeClass = edge.state === 'active'
      ? 'text-blue-500 stroke-blue-500'
      : edge.state === 'visited'
      ? 'text-emerald-500 stroke-emerald-500'
      : 'text-gray-300 dark:text-gray-700 stroke-gray-300 dark:stroke-gray-700';

    const midX = (fromPos.x + toPos.x) / 2;
    const midY = (fromPos.y + toPos.y) / 2;

    edgesSvg += `
      <g>
        <line x1="${fromPos.x}" y1="${fromPos.y}" x2="${toPos.x}" y2="${toPos.y}" stroke="currentColor" stroke-width="2" class="${strokeClass}" />
        ${
          edge.weight !== undefined
            ? `<circle cx="${midX}" cy="${midY}" r="9" class="fill-white dark:fill-[#1e1e1e] stroke-gray-200 dark:stroke-gray-700" stroke-width="1" />
               <text x="${midX}" y="${midY}" text-anchor="middle" dominant-baseline="central" class="text-[9px] font-mono font-bold fill-gray-600 dark:fill-gray-400 select-none">${edge.weight}</text>`
            : ''
        }
      </g>
    `;
  });

  let nodesSvg = '';
  nodes.forEach((node) => {
    const pos = coords.get(node.id) || { x: centerX, y: centerY };

    let fillClass = 'fill-white dark:fill-[#252526] stroke-gray-400 dark:stroke-gray-600';
    let textClass = 'fill-gray-800 dark:fill-gray-200';

    if (node.state === 'active') {
      fillClass = 'fill-blue-500 stroke-blue-600';
      textClass = 'fill-white font-bold';
    } else if (node.state === 'visited') {
      fillClass = 'fill-emerald-500 stroke-emerald-600';
      textClass = 'fill-white font-bold';
    }

    nodesSvg += `
      <g class="cursor-pointer transition-all duration-300">
        <circle cx="${pos.x}" cy="${pos.y}" r="17" class="${fillClass}" stroke-width="2" />
        <text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" class="${textClass} text-xs font-mono font-bold select-none">
          ${node.label || node.id}
        </text>
      </g>
    `;
  });

  return `
    <div class="graph-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-violet-500"></span>
          ${label}
        </div>
        <span class="text-[11px] font-mono text-gray-400">Vertices: ${nodes.length} | Edges: ${edges.length}</span>
      </div>
      <div class="w-full overflow-x-auto flex justify-center py-2">
        <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[460px] h-auto overflow-visible">
          ${edgesSvg}
          ${nodesSvg}
        </svg>
      </div>
    </div>
  `;
}

