import type { LinkedListState, LinkedListNode } from '../../../../problems/algorithms/types';

export function renderLinkedList(state: LinkedListState): string {
  const { nodes = [], headId, pointers = [], label = 'Singly Linked List' } = state;

  const pointerColorMap: Record<string, string> = {
    purple: 'bg-purple-500 text-white',
    blue: 'bg-blue-500 text-white',
    amber: 'bg-amber-500 text-white',
    emerald: 'bg-emerald-500 text-white',
    red: 'bg-rose-500 text-white',
  };

  const getPointersForNode = (nodeId: string | number | null) => {
    return pointers.filter((p) => p.nodeId === nodeId);
  };

  const nullPointers = getPointersForNode(null);

  const nodeMap = new Map<string | number, LinkedListNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const renderedNodesHtml = nodes
    .map((node, index) => {
      const nodePointers = getPointersForNode(node.id);
      const isHead = node.id === headId;

      let borderStyle = 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526]';
      if (node.state === 'curr') {
        borderStyle = 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 ring-2 ring-blue-400/50 scale-105';
      } else if (node.state === 'prev') {
        borderStyle = 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 ring-2 ring-purple-400/50';
      } else if (node.state === 'next') {
        borderStyle = 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 ring-2 ring-amber-400/50';
      } else if (node.state === 'reversed') {
        borderStyle = 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 ring-1 ring-indigo-400';
      } else if (node.state === 'active') {
        borderStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-400/50';
      }

      // Pointer badges atop node
      const pointersBadgeHtml = nodePointers.length > 0
        ? `<div class="flex flex-col items-center gap-1 mb-2">
            ${nodePointers
              .map(
                (p) => `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow-sm ${
                  pointerColorMap[p.color || 'blue'] || pointerColorMap.blue
                }">${p.name}</span>`
              )
              .join('')}
            <svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 13 12 18 17 13"></polyline><line x1="12" y1="6" x2="12" y2="18"></line></svg>
          </div>`
        : `<div class="h-8"></div>`;

      // Next connector representation
      // If nextId is backward: node.nextId < node.id, show backward arrow
      const isReversedPointer = node.nextId !== null && Number(node.nextId) < Number(node.id);
      const pointsToNull = node.nextId === null;

      let arrowHtml = '';
      if (isReversedPointer) {
        arrowHtml = `
          <div class="flex flex-col items-center justify-center px-1 text-purple-600 dark:text-purple-400" title="Points backward to prev">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span class="text-[9px] font-mono font-bold">prev</span>
          </div>
        `;
      } else if (pointsToNull) {
        arrowHtml = `
          <div class="flex items-center gap-1 px-1">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-200 dark:bg-[#2d2d2d] text-gray-500 dark:text-gray-400">null</span>
          </div>
        `;
      } else {
        arrowHtml = `
          <div class="flex items-center px-1">
            <svg class="w-6 h-6 text-gray-400 dark:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"></line><polyline points="14 6 20 12 14 18"></polyline></svg>
          </div>
        `;
      }

      return `
        <div class="flex items-center shrink-0">
          <div class="flex flex-col items-center">
            ${pointersBadgeHtml}
            <div class="flex items-center rounded-xl border-2 shadow-sm overflow-hidden transition-all duration-300 ${borderStyle}">
              <!-- Value partition -->
              <div class="px-3.5 py-2.5 min-w-[46px] text-center font-mono font-bold text-base text-gray-800 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700">
                ${node.value}
              </div>
              <!-- Next pointer partition -->
              <div class="px-2.5 py-2.5 bg-gray-50 dark:bg-[#1f1f1f] text-gray-400 flex items-center justify-center" title="Next pointer -> ${node.nextId !== null ? node.nextId : 'null'}">
                <span class="w-2 h-2 rounded-full ${node.nextId !== null ? 'bg-blue-500' : 'bg-gray-400'}"></span>
              </div>
            </div>
            <div class="mt-1 flex items-center gap-1 text-[11px] font-mono text-gray-400">
              ${isHead ? `<span class="text-emerald-500 font-bold text-[10px] uppercase">Head</span> • ` : ''}
              <span>Node(${node.value})</span>
            </div>
          </div>
          ${arrowHtml}
        </div>
      `;
    })
    .join('');

  // Floating null pointer indicator if null has pointers (like prev = null or curr = null)
  const nullPointersBadge = nullPointers.length > 0
    ? `
      <div class="flex flex-col items-center shrink-0 ml-2">
        <div class="flex flex-col items-center gap-1 mb-2">
          ${nullPointers
            .map(
              (p) => `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase shadow-sm ${
                pointerColorMap[p.color || 'purple'] || pointerColorMap.purple
              }">${p.name}</span>`
            )
            .join('')}
          <svg class="w-3.5 h-3.5 text-purple-500 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="7 13 12 18 17 13"></polyline><line x1="12" y1="6" x2="12" y2="18"></line></svg>
        </div>
        <div class="px-3 py-2 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#2d2d2d] text-gray-500 font-mono text-xs font-semibold">
          null
        </div>
        <span class="mt-1 text-[11px] font-mono text-gray-400">ground</span>
      </div>
    `
    : '';

  return `
    <div class="linkedlist-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
          ${label}
        </div>
        <span class="text-[11px] font-mono text-gray-400">Total Nodes: ${nodes.length}</span>
      </div>
      <div class="flex items-start justify-center gap-2 overflow-x-auto py-2 px-3 custom-scrollbar min-h-[120px]">
        ${nullPointersBadge}
        ${renderedNodesHtml}
      </div>
    </div>
  `;
}

