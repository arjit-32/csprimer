import type {
  ExecutionStep,
  ArrayState,
  Pointer,
  ArrayHighlight,
  ArrayWindow,
  HashMapState,
  HashMapEntry,
  SetState,
  SetElement,
  LinkedListState,
  LinkedListNode,
  StackQueueState,
  DequeState,
  TreeState,
  GraphState,
  HeapState,
  DPTableState,
  DPTableCellHighlight,
} from './types';

export type PointerShorthand =
  | Record<string, number | { index: number; color?: string; label?: string; position?: 'top' | 'bottom' }>
  | Pointer[];

export type HighlightShorthand =
  | (number | { index: number; state?: ArrayHighlight['state']; label?: string })[]
  | Record<number, ArrayHighlight['state']>;

export type WindowShorthand =
  | [number, number]
  | [number, number, string | number]
  | ArrayWindow;

export interface SimpleArrayConfig {
  values: (number | string)[];
  pointers?: PointerShorthand;
  highlights?: HighlightShorthand;
  window?: WindowShorthand;
  label?: string;
}

export type ArrayInputShorthand = (number | string)[] | SimpleArrayConfig;

export type HashMapInputShorthand =
  | Map<string | number, any>
  | Record<string | number, any>
  | [string | number, any][]
  | HashMapState;

export type StackQueueInputShorthand = any[] | StackQueueState;

export interface DPTableInputShorthand {
  grid: (number | string | null)[][] | (number | string | null)[];
  active?: [number, number] | number | { row: number; col: number };
  highlights?: ([number, number] | number | { row: number; col: number; state?: DPTableCellHighlight['state'] })[];
  formula?: string;
  rowHeaders?: (string | number)[];
  colHeaders?: (string | number)[];
  label?: string;
}

export interface StepConfig {
  title?: string;
  description: string;
  codeLine?: string; // Standard Java code
  variables?: Record<string, any>;
  array?: ArrayInputShorthand | SimpleArrayConfig[];
  arrays?: ArrayInputShorthand[]; // Explicit multi-array support
  hashmap?: HashMapInputShorthand;
  searchKey?: string | number | null;
  searchResult?: 'found' | 'not-found' | 'searching' | null;
  set?: SetState | (string | number)[] | Set<string | number>;
  searchElement?: string | number | null;
  linkedList?: LinkedListState | LinkedListNode[];
  stack?: StackQueueInputShorthand;
  queue?: StackQueueInputShorthand;
  deque?: DequeState | any[];
  tree?: TreeState;
  graph?: GraphState;
  heap?: HeapState;
  dpTable?: DPTableInputShorthand | DPTableState;
}

/**
 * StepBuilder: Fluent, high-level execution step generator for Java DSA algorithm visualizers.
 * Supports single and multiple arrays, sliding windows with value badges, pointers, and automated step numbering.
 */
export class StepBuilder {
  private steps: ExecutionStep[] = [];
  private colorPalette: string[] = ['blue', 'emerald', 'purple', 'amber', 'rose', 'cyan'];

  /**
   * Adds a new execution step with automatic step numbering and shorthand normalization.
   */
  addStep(config: StepConfig): this {
    const stepNumber = this.steps.length;

    const step: ExecutionStep = {
      stepNumber,
      title: config.title || `Step ${stepNumber}`,
      description: config.description,
      codeLine: config.codeLine,
      variables: config.variables ? { ...config.variables } : undefined,
    };

    if (config.arrays) {
      step.arrays = config.arrays.map((a) => this.normalizeSingleArray(a));
    } else if (config.array) {
      if (
        Array.isArray(config.array) &&
        config.array.length > 0 &&
        typeof config.array[0] === 'object' &&
        config.array[0] !== null &&
        'values' in (config.array[0] as any)
      ) {
        step.arrays = (config.array as SimpleArrayConfig[]).map((a) => this.normalizeSingleArray(a));
      } else {
        step.array = this.normalizeSingleArray(config.array as ArrayInputShorthand);
      }
    }

    if (config.hashmap) {
      step.hashmap = this.normalizeHashMap(config.hashmap, config.searchKey, config.searchResult);
    }

    if (config.set) {
      step.set = this.normalizeSet(config.set, config.searchElement, config.searchResult);
    }

    if (config.linkedList) {
      step.linkedList = this.normalizeLinkedList(config.linkedList);
    }

    if (config.stack) {
      step.stack = this.normalizeStackQueue(config.stack);
    }

    if (config.queue) {
      step.queue = this.normalizeStackQueue(config.queue);
    }

    if (config.deque) {
      step.deque = Array.isArray(config.deque) ? { items: [...config.deque] } : config.deque;
    }

    if (config.dpTable) {
      step.dpTable = this.normalizeDPTable(config.dpTable);
    }

    if (config.tree) step.tree = config.tree;
    if (config.graph) step.graph = config.graph;
    if (config.heap) step.heap = config.heap;

    this.steps.push(step);
    return this;
  }

  /**
   * Alias for addStep
   */
  step(config: StepConfig): this {
    return this.addStep(config);
  }

  /**
   * Returns the final array of ExecutionSteps ready for AlgoVisualizer.
   */
  build(): ExecutionStep[] {
    return [...this.steps];
  }

  // --- Internal Shorthand Normalizers ---

  private normalizeSingleArray(input: ArrayInputShorthand): ArrayState {
    if (Array.isArray(input)) {
      return { values: [...input], pointers: [], highlights: [] };
    }

    const values = [...(input.values || [])];
    const pointers: Pointer[] = [];

    if (input.pointers) {
      if (Array.isArray(input.pointers)) {
        pointers.push(...input.pointers);
      } else {
        let colorIdx = 0;
        for (const [name, val] of Object.entries(input.pointers)) {
          if (typeof val === 'number') {
            pointers.push({
              name,
              index: val,
              color: this.colorPalette[colorIdx % this.colorPalette.length],
            });
          } else if (val && typeof val === 'object') {
            pointers.push({
              name,
              index: val.index,
              color: val.color || this.colorPalette[colorIdx % this.colorPalette.length],
              label: val.label,
              position: val.position,
            });
          }
          colorIdx++;
        }
      }
    }

    const highlights: ArrayHighlight[] = [];
    if (input.highlights) {
      if (Array.isArray(input.highlights)) {
        input.highlights.forEach((h) => {
          if (typeof h === 'number') {
            highlights.push({ index: h, state: 'current' });
          } else if (h && typeof h === 'object') {
            highlights.push({
              index: h.index,
              state: h.state || 'current',
              label: h.label,
            });
          }
        });
      } else {
        for (const [idxStr, state] of Object.entries(input.highlights)) {
          highlights.push({
            index: Number(idxStr),
            state: state as ArrayHighlight['state'],
          });
        }
      }
    }

    let window: ArrayWindow | undefined;
    if (input.window) {
      if (Array.isArray(input.window)) {
        window = {
          start: input.window[0],
          end: input.window[1],
        };
      } else {
        window = {
          start: input.window.start,
          end: input.window.end,
        };
      }
    }

    return {
      values,
      pointers,
      highlights,
      window,
      label: input.label,
    };
  }

  private normalizeHashMap(
    input: HashMapInputShorthand,
    searchKey?: string | number | null,
    searchResult?: 'found' | 'not-found' | 'searching' | null
  ): HashMapState {
    if ('entries' in input && Array.isArray((input as any).entries)) {
      return {
        ...(input as HashMapState),
        searchKey: searchKey !== undefined ? searchKey : (input as HashMapState).searchKey,
        searchResult: searchResult !== undefined ? searchResult : (input as HashMapState).searchResult,
      };
    }

    const entries: HashMapEntry[] = [];

    if (input instanceof Map) {
      for (const [k, v] of input.entries()) {
        entries.push({ key: k, value: v, state: k === searchKey ? 'match' : 'default' });
      }
    } else if (Array.isArray(input)) {
      for (const [k, v] of input) {
        entries.push({ key: k, value: v, state: k === searchKey ? 'match' : 'default' });
      }
    } else if (input && typeof input === 'object') {
      for (const [k, v] of Object.entries(input)) {
        entries.push({ key: k, value: v, state: k === String(searchKey) ? 'match' : 'default' });
      }
    }

    return {
      entries,
      searchKey,
      searchResult,
    };
  }

  private normalizeSet(
    input: SetState | (string | number)[] | Set<string | number>,
    searchElement?: string | number | null,
    searchResult?: 'found' | 'not-found' | 'searching' | null
  ): SetState {
    if ('elements' in (input as any) && Array.isArray((input as any).elements)) {
      return {
        ...(input as SetState),
        searchElement: searchElement !== undefined ? searchElement : (input as SetState).searchElement,
        searchResult: searchResult !== undefined ? searchResult : (input as SetState).searchResult,
      };
    }

    const rawList: (string | number)[] =
      input instanceof Set
        ? Array.from(input)
        : Array.isArray(input)
        ? input
        : [];

    const elements: SetElement[] = rawList.map((val) => ({
      value: val,
      state: val === searchElement ? 'match' : 'default',
    }));

    return {
      elements,
      searchElement,
      searchResult,
    };
  }

  private normalizeLinkedList(input: LinkedListState | LinkedListNode[]): LinkedListState {
    if (Array.isArray(input)) {
      const headId = input.length > 0 ? input[0].id : null;
      return { nodes: [...input], headId };
    }
    return input;
  }

  private normalizeStackQueue(input: StackQueueInputShorthand): StackQueueState {
    if (Array.isArray(input)) {
      return { items: [...input], topIndex: input.length - 1 };
    }
    return input;
  }

  private normalizeDPTable(input: DPTableInputShorthand | DPTableState): DPTableState {
    if ('grid' in input && Array.isArray(input.grid)) {
      let grid: (number | string | null)[][];
      if (input.grid.length > 0 && !Array.isArray(input.grid[0])) {
        grid = [input.grid as (number | string | null)[]];
      } else {
        grid = (input.grid as (number | string | null)[][]).map((row) => (Array.isArray(row) ? [...row] : [row]));
      }

      let activeCell: { row: number; col: number } | undefined;
      const rawActive = (input as DPTableInputShorthand).active;
      if (rawActive !== undefined) {
        if (typeof rawActive === 'number') {
          activeCell = { row: 0, col: rawActive };
        } else if (Array.isArray(rawActive)) {
          activeCell = { row: rawActive[0], col: rawActive[1] };
        } else if (typeof rawActive === 'object' && 'row' in rawActive) {
          activeCell = rawActive;
        }
      }

      const highlightCells: DPTableCellHighlight[] = [];
      const rawHighlights = (input as DPTableInputShorthand).highlights;
      if (Array.isArray(rawHighlights)) {
        for (const h of rawHighlights) {
          if (typeof h === 'number') {
            highlightCells.push({ row: 0, col: h, state: 'dependency' });
          } else if (Array.isArray(h)) {
            highlightCells.push({ row: h[0], col: h[1], state: 'dependency' });
          } else if (typeof h === 'object') {
            highlightCells.push({
              row: h.row,
              col: h.col,
              state: h.state || 'dependency',
            });
          }
        }
      }

      return {
        grid,
        activeCell: activeCell || (input as DPTableState).activeCell,
        highlightCells: highlightCells.length > 0 ? highlightCells : (input as DPTableState).highlightCells,
        formula: input.formula,
        rowHeaders: input.rowHeaders,
        colHeaders: input.colHeaders,
        label: input.label,
      };
    }
    return input as DPTableState;
  }
}
