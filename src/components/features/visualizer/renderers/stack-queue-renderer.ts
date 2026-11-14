import type { StackQueueState, DequeState } from '../../../../problems/algorithms/types';

export function renderStack(state: StackQueueState): string {
  const { items = [], topIndex, action, activeItem, label = 'Stack (LIFO)' } = state;

  const actionBadge = action
    ? `<div class="mb-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-between ${
        action === 'push'
          ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          : action === 'pop'
          ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          : 'bg-gray-100 dark:bg-[#2d2d2d] text-gray-700 dark:text-gray-300'
      }">
        <span class="uppercase tracking-wider">Action: ${action.toUpperCase()}</span>
        ${activeItem !== undefined ? `<span>Item: '${activeItem}'</span>` : ''}
      </div>`
    : '';

  // Stack elements (rendered top-to-bottom)
  const reversedItems = [...items].reverse();

  const elementsHtml =
    reversedItems.length === 0
      ? `<div class="h-32 flex items-center justify-center text-xs font-mono text-gray-400 italic">Stack is Empty</div>`
      : `
      <div class="flex flex-col gap-1.5 w-full max-w-[200px] mx-auto">
        ${reversedItems
          .map((item, revIdx) => {
            const originalIdx = items.length - 1 - revIdx;
            const isTop = originalIdx === (topIndex ?? items.length - 1);
            return `
              <div class="flex items-center gap-2">
                <div class="flex-1 py-2 px-3 rounded-lg border-2 text-center font-mono font-bold text-sm transition-all shadow-xs ${
                  isTop
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 ring-2 ring-blue-400/40 scale-102'
                    : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-800 dark:text-gray-200'
                }">
                  ${item}
                </div>
                ${
                  isTop
                    ? `<span class="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500 text-white uppercase tracking-wider">TOP</span>`
                    : `<span class="w-10"></span>`
                }
              </div>
            `;
          })
          .join('')}
      </div>
    `;

  return `
    <div class="stack-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          ${label}
        </div>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400">
          Depth: ${items.length}
        </span>
      </div>
      ${actionBadge}
      <div class="p-3 bg-white dark:bg-[#1f1f1f] border-x-2 border-b-2 border-t-0 border-gray-300 dark:border-gray-700 rounded-b-xl min-h-[140px] flex flex-col justify-end">
        ${elementsHtml}
      </div>
    </div>
  `;
}

export function renderQueue(state: StackQueueState): string {
  const { items = [], action, activeItem, label = 'Queue (FIFO)' } = state;

  const actionBadge = action
    ? `<div class="mb-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-between ${
        action === 'enqueue'
          ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          : action === 'dequeue'
          ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          : 'bg-gray-100 dark:bg-[#2d2d2d] text-gray-700 dark:text-gray-300'
      }">
        <span class="uppercase tracking-wider">Action: ${action.toUpperCase()}</span>
        ${activeItem !== undefined ? `<span>Item: '${activeItem}'</span>` : ''}
      </div>`
    : '';

  const elementsHtml =
    items.length === 0
      ? `<div class="py-6 text-center text-xs font-mono text-gray-400 italic">Queue is Empty</div>`
      : `
      <div class="flex items-center gap-2 overflow-x-auto py-2 custom-scrollbar justify-center">
        <div class="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Front (Out)
        </div>
        ${items
          .map(
            (item, idx) => `
            <div class="min-w-[48px] h-12 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-sm shadow-xs ${
              idx === 0
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200'
                : idx === items.length - 1
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-800 dark:text-gray-200'
            }">
              ${item}
            </div>
          `
          )
          .join('')}
        <div class="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
          Back (In)
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </div>
    `;

  return `
    <div class="queue-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-cyan-500"></span>
          ${label}
        </div>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400">
          Length: ${items.length}
        </span>
      </div>
      ${actionBadge}
      <div class="p-3 bg-white dark:bg-[#1f1f1f] border-y-2 border-gray-300 dark:border-gray-700 rounded-xl min-h-[90px] flex items-center justify-center">
        ${elementsHtml}
      </div>
    </div>
  `;
}

export function renderDeque(state: DequeState): string {
  const { items = [], action, activeItem, label = 'Double-Ended Queue (Deque)' } = state;

  const actionBadge = action
    ? `<div class="mb-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center justify-between ${
        action.startsWith('add')
          ? 'bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          : action.startsWith('remove')
          ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          : 'bg-gray-100 dark:bg-[#2d2d2d] text-gray-700 dark:text-gray-300'
      }">
        <span class="uppercase tracking-wider">Deque Op: ${action}</span>
        ${activeItem !== undefined ? `<span>Item: '${activeItem}'</span>` : ''}
      </div>`
    : '';

  const elementsHtml =
    items.length === 0
      ? `<div class="py-6 text-center text-xs font-mono text-gray-400 italic">Deque is Empty</div>`
      : `
      <div class="flex items-center gap-2 overflow-x-auto py-2 custom-scrollbar justify-center">
        <div class="flex flex-col items-center gap-0.5 shrink-0 px-2">
          <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Front
          </span>
          <span class="text-[9px] font-mono text-gray-400 dark:text-gray-500">addFirst / removeFirst</span>
        </div>
        ${items
          .map(
            (item, idx) => `
            <div class="min-w-[48px] h-12 flex items-center justify-center rounded-lg border-2 font-mono font-bold text-sm shadow-xs ${
              idx === 0
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 ring-1 ring-emerald-400/40'
                : idx === items.length - 1
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 ring-1 ring-blue-400/40'
                : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-800 dark:text-gray-200'
            }">
              ${item}
            </div>
          `
          )
          .join('')}
        <div class="flex flex-col items-center gap-0.5 shrink-0 px-2">
          <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
            Back / Rear
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span class="text-[9px] font-mono text-gray-400 dark:text-gray-500">addLast / removeLast</span>
        </div>
      </div>
    `;

  return `
    <div class="deque-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-teal-500"></span>
          ${label}
        </div>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400">
          Size: ${items.length}
        </span>
      </div>
      ${actionBadge}
      <div class="p-3 bg-white dark:bg-[#1f1f1f] border-x-2 border-y-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl min-h-[90px] flex items-center justify-center">
        ${elementsHtml}
      </div>
    </div>
  `;
}
