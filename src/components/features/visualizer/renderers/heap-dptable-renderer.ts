import type { HeapState, DPTableState } from '../../../../problems/algorithms/types';

export function renderHeap(state: HeapState): string {
  const { values = [], type = 'min', activeIndices = [], label } = state;

  const resolvedLabel = label || `${type === 'min' ? 'Min-Heap' : 'Max-Heap'} (Binary Heap)`;

  // Array view
  const arrayCells = values
    .map((val, idx) => {
      const isActive = activeIndices.includes(idx);
      return `
        <div class="flex flex-col items-center min-w-[48px]">
          <div class="w-12 h-12 flex items-center justify-center rounded-xl border-2 font-mono font-bold text-sm shadow-xs transition-all ${
            isActive
              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 ring-2 ring-amber-400'
              : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252526] text-gray-800 dark:text-gray-200'
          }">
            ${val}
          </div>
          <span class="mt-1 text-[11px] font-mono text-gray-400 dark:text-gray-500">[${idx}]</span>
        </div>
      `;
    })
    .join('');

  // Tree representation SVG (up to 7 nodes: root, 2 children, 4 grandchildren)
  const width = 360;
  const height = 150;
  const positions = [
    { x: 180, y: 25 },
    { x: 90, y: 75 },
    { x: 270, y: 75 },
    { x: 45, y: 125 },
    { x: 135, y: 125 },
    { x: 225, y: 125 },
    { x: 315, y: 125 },
  ];

  let treeLines = '';
  let treeNodes = '';

  for (let i = 0; i < Math.min(values.length, 7); i++) {
    const pos = positions[i];
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    if (leftChild < values.length && leftChild < 7) {
      const lPos = positions[leftChild];
      treeLines += `<line x1="${pos.x}" y1="${pos.y}" x2="${lPos.x}" y2="${lPos.y}" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-700" />`;
    }
    if (rightChild < values.length && rightChild < 7) {
      const rPos = positions[rightChild];
      treeLines += `<line x1="${pos.x}" y1="${pos.y}" x2="${rPos.x}" y2="${rPos.y}" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-700" />`;
    }

    const isActive = activeIndices.includes(i);
    treeNodes += `
      <g>
        <circle cx="${pos.x}" cy="${pos.y}" r="15" class="${
          isActive
            ? 'fill-amber-500 stroke-amber-600'
            : 'fill-white dark:fill-[#252526] stroke-gray-300 dark:stroke-gray-700'
        }" stroke-width="2" />
        <text x="${pos.x}" y="${pos.y}" text-anchor="middle" dominant-baseline="central" class="${
          isActive ? 'fill-white font-bold' : 'fill-gray-800 dark:fill-gray-200'
        } text-xs font-mono font-semibold select-none">
          ${values[i]}
        </text>
      </g>
    `;
  }

  return `
    <div class="heap-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          ${resolvedLabel}
        </div>
        <span class="text-[11px] font-mono text-gray-400">Size: ${values.length}</span>
      </div>
      <div class="flex flex-col md:flex-row items-center gap-4 justify-around">
        <div class="flex flex-col items-center">
          <span class="text-[10px] font-mono uppercase text-gray-400 mb-1">Heap Array</span>
          <div class="flex items-center gap-2 overflow-x-auto py-2 px-1 max-w-full custom-scrollbar">
            ${arrayCells}
          </div>
        </div>
        ${
          values.length > 0
            ? `<div class="flex flex-col items-center">
                <span class="text-[10px] font-mono uppercase text-gray-400 mb-1">Tree Structure</span>
                <svg viewBox="0 0 ${width} ${height}" class="w-full max-w-[280px] h-auto overflow-visible">
                  ${treeLines}
                  ${treeNodes}
                </svg>
              </div>`
            : ''
        }
      </div>
    </div>
  `;
}

export function renderDPTable(state: DPTableState): string {
  const {
    grid = [],
    rowHeaders = [],
    colHeaders = [],
    activeCell,
    highlightCells = [],
    formula,
    label = 'Dynamic Programming Table',
  } = state;

  const isCellActive = (r: number, c: number): boolean => {
    return activeCell !== undefined && activeCell.row === r && activeCell.col === c;
  };

  const getCellHighlight = (r: number, c: number): string | null => {
    const hl = highlightCells.find((h) => h.row === r && h.col === c);
    return hl?.state || null;
  };

  const formulaBadge = formula
    ? `
      <div class="mb-3 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-800 dark:text-blue-300 flex items-center gap-2">
        <svg class="w-4 h-4 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
        <span class="font-bold">Transition:</span>
        <span class="overflow-x-auto">${formula}</span>
      </div>
    `
    : '';

  // Render Table Grid
  const headerHtml =
    colHeaders.length > 0
      ? `
      <tr>
        ${rowHeaders.length > 0 ? `<th class="p-2.5 text-xs font-mono font-semibold text-gray-400 bg-gray-100 dark:bg-[#252526] border border-gray-200 dark:border-gray-700"></th>` : ''}
        ${colHeaders
          .map(
            (col) => `
          <th class="p-2.5 text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#252526] border border-gray-200 dark:border-gray-700 whitespace-nowrap">
            ${col}
          </th>
        `
          )
          .join('')}
      </tr>
    `
      : '';

  const rowsHtml = grid
    .map((row, rIdx) => {
      const rowHeader = rowHeaders[rIdx] !== undefined ? rowHeaders[rIdx] : '';
      const cells = row
        .map((cellVal, cIdx) => {
          const active = isCellActive(rIdx, cIdx);
          const highlightState = getCellHighlight(rIdx, cIdx);

          let cellClass =
            'bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700';

          if (active) {
            cellClass =
              'bg-blue-100 dark:bg-blue-950/70 border-2 border-blue-500 text-blue-800 dark:text-blue-200 ring-2 ring-blue-400/50 font-bold scale-105 shadow-md';
          } else if (highlightState === 'dependency') {
            cellClass =
              'bg-amber-100 dark:bg-amber-950/70 border-2 border-amber-500 text-amber-800 dark:text-amber-200 font-bold ring-1 ring-amber-400/50';
          } else if (highlightState === 'calculated') {
            cellClass =
              'bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
          } else if (highlightState === 'match') {
            cellClass =
              'bg-indigo-100 dark:bg-indigo-950/70 border-2 border-indigo-500 text-indigo-800 dark:text-indigo-200 font-bold ring-2 ring-indigo-400/50 scale-105';
          }

          const displayVal = cellVal !== null && cellVal !== undefined ? cellVal : '-';

          return `
            <td class="p-2.5 min-w-[56px] text-center font-mono text-sm border transition-all duration-200 ${cellClass}">
              ${displayVal}
            </td>
          `;
        })
        .join('');

      return `
        <tr>
          ${
            rowHeaders.length > 0
              ? `<td class="p-2.5 text-xs font-mono font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-[#252526] border border-gray-200 dark:border-gray-700 whitespace-nowrap">${rowHeader}</td>`
              : ''
          }
          ${cells}
        </tr>
      `;
    })
    .join('');

  return `
    <div class="dptable-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          ${label}
        </div>
        <div class="flex items-center gap-3 text-[10px] font-mono text-gray-400">
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-amber-500"></span> Dependency</span>
          <span class="flex items-center gap-1"><span class="w-2 h-2 rounded bg-blue-500"></span> Computing</span>
        </div>
      </div>
      ${formulaBadge}
      <div class="w-full overflow-x-auto custom-scrollbar flex justify-center py-2">
        <table class="border-collapse rounded-xl overflow-hidden shadow-xs">
          ${headerHtml}
          ${rowsHtml}
        </table>
      </div>
    </div>
  `;
}

