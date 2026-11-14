import type { ArrayState, Pointer, ArrayHighlight } from '../../../../problems/algorithms/types';

export function renderArray(state: ArrayState | ArrayState[]): string {
  if (Array.isArray(state)) {
    return `
      <div class="flex flex-col gap-4 w-full">
        ${state.map((s, idx) => renderSingleArray(s, idx)).join('')}
      </div>
    `;
  }
  return renderSingleArray(state, 0);
}

function renderSingleArray(state: ArrayState, arrayIndex: number = 0): string {
  const { values = [], pointers = [], highlights = [], window, label } = state;

  const pointerColorMap: Record<string, string> = {
    blue: 'bg-blue-600 text-white',
    purple: 'bg-purple-600 text-white',
    amber: 'bg-amber-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    red: 'bg-rose-600 text-white',
    cyan: 'bg-cyan-600 text-white',
  };

  const getPointersForIndex = (idx: number): Pointer[] => {
    return pointers.filter((p) => p.index === idx);
  };

  const getHighlightForIndex = (idx: number): ArrayHighlight | undefined => {
    return highlights.find((h) => h.index === idx);
  };

  const highlightClass = (h?: ArrayHighlight): string => {
    if (!h) return '';
    switch (h.state) {
      case 'current':
        return 'bg-blue-100 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 font-bold ring-2 ring-blue-400/50 scale-105 z-10';
      case 'match':
      case 'found':
        return 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-400/50 scale-105 z-10';
      case 'compare':
        return 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 text-amber-700 dark:text-amber-300 font-bold ring-2 ring-amber-400/50 z-10';
      case 'visited':
        return 'bg-gray-100 dark:bg-[#2d2d2d] border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400';
      default:
        return '';
    }
  };

  const cellsHtml = values
    .map((val, idx) => {
      const idxPointers = getPointersForIndex(idx);
      const highlight = getHighlightForIndex(idx);
      const isInsideWindow = window ? idx >= window.start && idx <= window.end : false;
      const isWindowStart = window && idx === window.start;
      const isWindowEnd = window && idx === window.end;

      // Pointers section above each element
      const pointersHtml =
        idxPointers.length > 0
          ? `<div class="flex flex-col items-center gap-0.5 mb-1.5 transition-all">
              ${idxPointers
                .map(
                  (p) =>
                    `<span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider shadow-xs ${
                      pointerColorMap[p.color || 'blue'] || pointerColorMap.blue
                    }">${p.name}</span>`
                )
                .join('')}
              <svg class="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            </div>`
          : `<div class="h-8"></div>`;

      // Window visual framing: continuous border and subtle background tint across window elements
      let cellBorderClasses = 'border-2 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-800 dark:text-gray-200';
      
      if (highlight) {
        cellBorderClasses = `border-2 rounded-xl ${highlightClass(highlight)}`;
      } else if (isInsideWindow) {
        // Connected window frame
        const leftRadius = isWindowStart ? 'rounded-l-xl' : 'rounded-l-none';
        const rightRadius = isWindowEnd ? 'rounded-r-xl' : 'rounded-r-none';
        const leftBorder = isWindowStart ? 'border-l-2' : 'border-l-0';
        const rightBorder = isWindowEnd ? 'border-r-2' : 'border-r-0';

        cellBorderClasses = `border-y-2 ${leftBorder} ${rightBorder} ${leftRadius} ${rightRadius} border-indigo-500 dark:border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold`;
      }

      return `
        <div class="flex flex-col items-center min-w-[50px] relative">
          ${pointersHtml}
          <div class="relative w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center transition-all duration-200 shadow-xs ${cellBorderClasses}">
            <span class="text-base font-mono font-semibold select-none">${val}</span>
          </div>
          <span class="mt-1.5 text-[11px] font-mono text-gray-400 dark:text-gray-500">[${idx}]</span>
        </div>
      `;
    })
    .join('');

  // Clean, visual window bracket bar underneath if a window is active (no text/labels in window)
  const windowBracketHtml = window
    ? `
      <div class="mt-2.5 flex items-center justify-center">
        <div class="flex items-center gap-1.5 text-xs font-mono text-indigo-600 dark:text-indigo-400">
          <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span>Window: [${window.start}..${window.end}]</span>
        </div>
      </div>
    `
    : '';

  const defaultDotColors = ['bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500'];
  const dotColor = defaultDotColors[arrayIndex % defaultDotColors.length];

  return `
    <div class="array-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      ${
        label
          ? `<div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${dotColor}"></span>
              ${label}
            </div>`
          : ''
      }
      <div class="flex items-start justify-center gap-1.5 overflow-x-auto py-2 px-3 custom-scrollbar min-h-[105px]">
        ${cellsHtml}
      </div>
      ${windowBracketHtml}
    </div>
  `;
}
