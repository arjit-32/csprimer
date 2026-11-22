export type VisualizationType =
  | 'array'
  | 'hashmap'
  | 'set'
  | 'linkedlist'
  | 'stack'
  | 'queue'
  | 'deque'
  | 'tree'
  | 'graph'
  | 'heap'
  | 'dptable';

export interface Pointer {
  name: string;
  index: number;
  color?: string; // e.g. 'blue' | 'purple' | 'amber' | 'emerald' | 'red'
  label?: string;
  position?: 'top' | 'bottom';
}

export interface ArrayHighlight {
  index: number;
  state: 'current' | 'match' | 'compare' | 'visited' | 'window' | 'found';
  label?: string;
}

export interface ArrayWindow {
  start: number;
  end: number;
  badge?: string | number; // e.g. "sum = 12", "12", "len = 3"
  value?: string | number; // alias for badge
  label?: string;
}

export interface ArrayState {
  values: (number | string)[];
  pointers?: Pointer[];
  highlights?: ArrayHighlight[];
  window?: ArrayWindow;
  label?: string;
}

export interface HashMapEntry {
  key: string | number;
  value: any;
  state?: 'default' | 'added' | 'queried' | 'match';
}

export interface HashMapState {
  entries: HashMapEntry[];
  searchKey?: string | number | null;
  searchResult?: 'found' | 'not-found' | 'searching' | null;
  label?: string;
}

export interface SetElement {
  value: string | number;
  state?: 'default' | 'added' | 'queried' | 'match' | 'removed';
}

export interface SetState {
  elements: (string | number | SetElement)[];
  searchElement?: string | number | null;
  searchResult?: 'found' | 'not-found' | 'searching' | null;
  label?: string;
}

export interface LinkedListNode {
  id: string | number;
  value: any;
  nextId: string | number | null;
  state?: 'default' | 'active' | 'prev' | 'curr' | 'next' | 'modified' | 'reversed';
  pointerLabel?: string;
}

export interface LinkedListState {
  nodes: LinkedListNode[];
  headId: string | number | null;
  pointers?: { name: string; nodeId: string | number | null; color?: string }[];
  label?: string;
}

export interface StackQueueState {
  items: any[];
  topIndex?: number;
  action?: 'push' | 'pop' | 'peek' | 'enqueue' | 'dequeue';
  activeItem?: any;
  label?: string;
}

export interface DequeState {
  items: any[];
  action?: 'addFirst' | 'addLast' | 'removeFirst' | 'removeLast' | 'peekFirst' | 'peekLast';
  activeItem?: any;
  label?: string;
}

export interface TreeNode {
  id: string;
  value: any;
  left?: string | null;
  right?: string | null;
  state?: 'default' | 'current' | 'visited' | 'target' | 'path';
}

export interface TreeState {
  nodes: TreeNode[];
  rootId: string;
  label?: string;
}

export interface GraphNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
  state?: 'default' | 'active' | 'visited';
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number | string;
  directed?: boolean;
  state?: 'default' | 'active' | 'visited';
}

export interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  label?: string;
}

export interface HeapState {
  type: 'min' | 'max';
  values: number[];
  activeIndices?: number[];
  label?: string;
}

export interface DPTableCellHighlight {
  row: number;
  col: number;
  state?: 'dependency' | 'calculated' | 'match';
}

export interface DPTableState {
  rowHeaders?: (string | number)[];
  colHeaders?: (string | number)[];
  grid: (number | string | null)[][];
  activeCell?: { row: number; col: number };
  highlightCells?: DPTableCellHighlight[];
  formula?: string;
  label?: string;
}

export interface ExecutionStep {
  stepNumber: number;
  title?: string;
  description?: string;
  codeLine?: string; // Idiomatic Java code line
  variables?: Record<string, any>;
  array?: ArrayState | ArrayState[];
  arrays?: ArrayState[]; // Explicit multiple arrays support
  hashmap?: HashMapState;
  set?: SetState;
  linkedList?: LinkedListState;
  stack?: StackQueueState;
  queue?: StackQueueState;
  deque?: DequeState;
  tree?: TreeState;
  graph?: GraphState;
  heap?: HeapState;
  dpTable?: DPTableState;
}

export interface InputSchema {
  name: string;
  label: string;
  type: 'number' | 'string' | 'number-array' | 'string-array';
  defaultValue: any;
  placeholder?: string;
  description?: string;
}

export interface AlgorithmDefinition {
  id: string;
  title: string;
  category?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  description?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  visualizationTypes: VisualizationType[];
  defaultInputs: Record<string, any>;
  inputSchema: InputSchema[];
  generateSteps: (inputs: Record<string, any>) => ExecutionStep[];
}

