import type { HashMapState, SetState, SetElement } from '../../../../problems/algorithms/types';

export function renderHashMap(state: HashMapState): string {
  const { entries = [], searchKey, searchResult, label = 'Hash Map: seen' } = state;

  let queryBanner = '';
  if (searchKey !== null && searchKey !== undefined) {
    if (searchResult === 'searching') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-amber-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            Querying key: <strong>${searchKey}</strong>
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold">Searching...</span>
        </div>
      `;
    } else if (searchResult === 'found') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Key <strong>${searchKey}</strong> found in map!
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-800 dark:text-emerald-200">Match</span>
        </div>
      `;
    } else if (searchResult === 'not-found') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-400 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line></svg>
            Key <strong>${searchKey}</strong> not found
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold">Miss</span>
        </div>
      `;
    }
  }

  const entriesHtml =
    entries.length === 0
      ? `<div class="py-6 text-center text-xs font-mono text-gray-400 dark:text-gray-500 italic">Map is currently empty { }</div>`
      : `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        ${entries
          .map((entry) => {
            let cardClass =
              'bg-white dark:bg-[#252526] border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
            let badge = '';

            if (entry.state === 'match') {
              cardClass =
                'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-400/50 scale-105';
              badge = `<span class="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Match</span>`;
            } else if (entry.state === 'added') {
              cardClass =
                'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-800 dark:text-blue-200 ring-1 ring-blue-400/40';
              badge = `<span class="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase">New</span>`;
            } else if (entry.state === 'queried') {
              cardClass =
                'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-800 dark:text-amber-200 ring-1 ring-amber-400/40';
              badge = `<span class="text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase">Queried</span>`;
            }

            return `
              <div class="flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 shadow-xs ${cardClass}">
                <div class="flex flex-col">
                  <span class="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase">Key</span>
                  <span class="text-sm font-mono font-bold">${entry.key}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  <div class="flex flex-col items-end">
                    <span class="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase">Val</span>
                    <span class="text-sm font-mono font-semibold">${entry.value}</span>
                  </div>
                </div>
                ${badge}
              </div>
            `;
          })
          .join('')}
      </div>
    `;

  return `
    <div class="hashmap-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          ${label}
        </div>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400">
          Size: ${entries.length}
        </span>
      </div>
      ${queryBanner}
      ${entriesHtml}
    </div>
  `;
}

export function renderSet(state: SetState): string {
  const { elements = [], searchElement, searchResult, label = 'Set: unique elements' } = state;

  let queryBanner = '';
  if (searchElement !== null && searchElement !== undefined) {
    if (searchResult === 'searching') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-700 dark:text-amber-300 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-amber-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            Checking: contains(<strong>${searchElement}</strong>)
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold">Testing...</span>
        </div>
      `;
    } else if (searchResult === 'found') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-mono text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Element <strong>${searchElement}</strong> is present in Set!
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-800 dark:text-emerald-200">Exists</span>
        </div>
      `;
    } else if (searchResult === 'not-found') {
      queryBanner = `
        <div class="mb-3 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-400 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line></svg>
            Element <strong>${searchElement}</strong> not in Set
          </span>
          <span class="text-[11px] uppercase tracking-wider font-semibold">Not Found</span>
        </div>
      `;
    }
  }

  const elementsHtml =
    elements.length === 0
      ? `<div class="py-6 text-center text-xs font-mono text-gray-400 dark:text-gray-500 italic">Set is empty { }</div>`
      : `
      <div class="flex items-center gap-2 p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-dashed border-emerald-500/30 rounded-xl">
        <span class="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 select-none">{</span>
        <div class="flex flex-wrap gap-2 items-center flex-1">
          ${elements
            .map((item) => {
              const val = typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
              const state = typeof item === 'object' && item !== null && 'state' in item ? item.state : 'default';

              let pillClass =
                'bg-white dark:bg-[#252526] border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200';
              let tag = `<span class="text-emerald-600 dark:text-emerald-400 font-bold select-none text-[11px]">∈</span>`;

              if (state === 'match') {
                pillClass =
                  'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-400/50 scale-105';
                tag = `<span class="text-emerald-600 dark:text-emerald-400 font-bold select-none text-[11px]">✓</span>`;
              } else if (state === 'added') {
                pillClass =
                  'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-800 dark:text-blue-200 ring-1 ring-blue-400/40';
              } else if (state === 'queried') {
                pillClass =
                  'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-800 dark:text-amber-200 ring-1 ring-amber-400/40';
              } else if (state === 'removed') {
                pillClass =
                  'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300 opacity-60 line-through';
              }

              return `
                <div class="px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-all duration-200 ${pillClass}">
                  ${tag}
                  <span>${val}</span>
                </div>
              `;
            })
            .join('')}
        </div>
        <span class="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 select-none">}</span>
      </div>
    `;

  return `
    <div class="set-visualizer w-full p-4 bg-gray-50/70 dark:bg-[#1a1a1a]/60 rounded-xl border border-gray-200 dark:border-gray-800">
      <div class="flex items-center justify-between mb-3">
        <div class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
          ${label}
        </div>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-gray-200 dark:bg-[#2d2d2d] text-gray-600 dark:text-gray-400">
          Size: ${elements.length}
        </span>
      </div>
      ${queryBanner}
      ${elementsHtml}
    </div>
  `;
}

