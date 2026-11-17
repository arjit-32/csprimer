import type { AlgorithmDefinition, ExecutionStep, LinkedListNode } from './types';

export const sampleLinkedList: AlgorithmDefinition = {
  id: 'sample-linked-list',
  title: 'Sample: Singly Linked List',
  category: 'Linked List',
  difficulty: 'Easy',
  description:
    'Reverse a singly linked list in-place by redirecting each node next pointer backwards using three pointers: prev, curr, and next.',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  visualizationTypes: ['linkedlist'],
  defaultInputs: {
    values: [1, 2, 3, 4, 5],
  },
  inputSchema: [
    {
      name: 'values',
      label: 'Node Values (separated by commas)',
      type: 'number-array',
      defaultValue: [1, 2, 3, 4, 5],
      placeholder: '1, 2, 3, 4, 5',
      description: 'The values in the singly linked list',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawValues = inputs.values;
    const values: any[] = Array.isArray(rawValues)
      ? rawValues
      : String(rawValues || '1, 2, 3, 4, 5')
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean);

    const safeValues = values.length > 0 ? values : [1, 2, 3, 4, 5];
    const n = safeValues.length;

    // Node id convention: 0, 1, ..., n-1
    // Initial pointers: node 0 -> node 1 -> ... -> node n-1 -> null
    const initialNodes: LinkedListNode[] = safeValues.map((val, idx) => ({
      id: idx,
      value: val,
      nextId: idx + 1 < n ? idx + 1 : null,
      state: 'default',
    }));

    // Clone helper
    const cloneNodes = (currentList: LinkedListNode[]): LinkedListNode[] =>
      currentList.map((node) => ({ ...node }));

    const steps: ExecutionStep[] = [];
    let currentNodes = cloneNodes(initialNodes);

    // Step 0: Initial State
    steps.push({
      stepNumber: 0,
      title: 'Initialize Pointers',
      description: `Original list has ${n} nodes. Initialize prev = null and curr = head (Node ${safeValues[0]}).`,
      codeLine: 'ListNode prev = null;\nListNode curr = head;',
      variables: {
        prev: 'null',
        curr: `Node(${safeValues[0]})`,
        next: 'null',
      },
      linkedList: {
        nodes: cloneNodes(currentNodes),
        headId: 0,
        pointers: [
          { name: 'prev', nodeId: null, color: 'purple' },
          { name: 'curr', nodeId: 0, color: 'blue' },
        ],
        label: 'Singly Linked List',
      },
    });

    let prevId: number | null = null;
    let currId: number | null = 0;

    while (currId !== null) {
      const currVal = safeValues[currId];
      const rawNext = currentNodes.find((nd) => nd.id === currId)?.nextId ?? null;
      const nextId: number | null = rawNext !== null ? Number(rawNext) : null;
      const nextVal = nextId !== null ? safeValues[nextId] : 'null';

      // Step A: Save next node
      const nodesA = cloneNodes(currentNodes);
      nodesA.forEach((node) => {
        if (node.id === currId) node.state = 'curr';
        else if (node.id === prevId) node.state = 'prev';
        else if (node.id === nextId) node.state = 'next';
        else node.state = 'default';
      });

      steps.push({
        stepNumber: steps.length,
        title: `Save Next Reference: next = curr.next`,
        description: `Before reversing curr's link, save next = curr.next (Node ${nextVal}) so the rest of the list is not lost.`,
        codeLine: 'ListNode next = curr.next;',
        variables: {
          prev: prevId !== null ? `Node(${safeValues[prevId]})` : 'null',
          curr: `Node(${currVal})`,
          next: nextId !== null ? `Node(${nextVal})` : 'null',
        },
        linkedList: {
          nodes: nodesA,
          headId: 0,
          pointers: [
            { name: 'prev', nodeId: prevId, color: 'purple' },
            { name: 'curr', nodeId: currId, color: 'blue' },
            { name: 'next', nodeId: nextId, color: 'amber' },
          ],
          label: 'Linked List (Next Pointer Saved)',
        },
      });

      // Step B: Reverse link: curr.next = prev
      const nodesB = cloneNodes(currentNodes);
      const targetNode = nodesB.find((nd) => nd.id === currId);
      if (targetNode) {
        targetNode.nextId = prevId;
        targetNode.state = 'reversed';
      }
      currentNodes = cloneNodes(nodesB);

      steps.push({
        stepNumber: steps.length,
        title: `Reverse Pointer: curr.next = prev`,
        description: `Set curr.next = prev. Node(${currVal})'s pointer is now redirected backward to ${
          prevId !== null ? `Node(${safeValues[prevId]})` : 'null'
        }.`,
        codeLine: 'curr.next = prev;',
        variables: {
          'Redirected Link': `Node(${currVal}) -> ${
            prevId !== null ? `Node(${safeValues[prevId]})` : 'null'
          }`,
          prev: prevId !== null ? `Node(${safeValues[prevId]})` : 'null',
          curr: `Node(${currVal})`,
          next: nextId !== null ? `Node(${nextVal})` : 'null',
        },
        linkedList: {
          nodes: cloneNodes(currentNodes),
          headId: 0,
          pointers: [
            { name: 'prev', nodeId: prevId, color: 'purple' },
            { name: 'curr', nodeId: currId, color: 'blue' },
            { name: 'next', nodeId: nextId, color: 'amber' },
          ],
          label: 'Linked List (Link Reversed)',
        },
      });

      // Step C: Advance prev = curr
      prevId = currId;
      const nodesC = cloneNodes(currentNodes);
      nodesC.forEach((node) => {
        if (node.id === prevId) node.state = 'prev';
      });

      steps.push({
        stepNumber: steps.length,
        title: `Advance prev: prev = curr`,
        description: `Advance prev pointer forward to curr (Node ${currVal}). prev now marks the head of the reversed portion.`,
        codeLine: 'prev = curr;',
        variables: {
          prev: `Node(${currVal})`,
          curr: `Node(${currVal})`,
          next: nextId !== null ? `Node(${nextVal})` : 'null',
        },
        linkedList: {
          nodes: nodesC,
          headId: 0,
          pointers: [
            { name: 'prev', nodeId: prevId, color: 'purple' },
            { name: 'curr', nodeId: currId, color: 'blue' },
            { name: 'next', nodeId: nextId, color: 'amber' },
          ],
          label: 'Linked List (prev Advanced)',
        },
      });

      // Step D: Advance curr = next
      currId = nextId;
      const nodesD = cloneNodes(currentNodes);
      nodesD.forEach((node) => {
        if (node.id === prevId) node.state = 'prev';
        else if (node.id === currId) node.state = 'curr';
      });

      steps.push({
        stepNumber: steps.length,
        title: `Advance curr: curr = next`,
        description: `Advance curr pointer forward to next (${
          currId !== null ? `Node ${safeValues[currId]}` : 'null'
        }).`,
        codeLine: 'curr = next;',
        variables: {
          prev: prevId !== null ? `Node(${safeValues[prevId]})` : 'null',
          curr: currId !== null ? `Node(${safeValues[currId]})` : 'null',
        },
        linkedList: {
          nodes: nodesD,
          headId: prevId,
          pointers: [
            { name: 'prev', nodeId: prevId, color: 'purple' },
            { name: 'curr', nodeId: currId, color: 'blue' },
          ],
          label: 'Linked List (curr Advanced)',
        },
      });
    }

    // Step Final: Complete
    const finalNodes = cloneNodes(currentNodes);
    finalNodes.forEach((node) => {
      node.state = 'active';
    });

    const reversedValues: any[] = [];
    let tracer: number | null = prevId;
    const visited = new Set<number>();
    while (tracer !== null && !visited.has(tracer)) {
      visited.add(tracer);
      reversedValues.push(safeValues[tracer]);
      const rawTracerNext = finalNodes.find((nd) => nd.id === tracer)?.nextId ?? null;
      tracer = rawTracerNext !== null ? Number(rawTracerNext) : null;
    }

    steps.push({
      stepNumber: steps.length,
      title: 'Reversal Complete!',
      description: `curr is null, so the entire list is reversed. Return prev (Node ${
        prevId !== null ? safeValues[prevId] : 'null'
      }) as the new head. Reversed list: ${reversedValues.join(' -> ')} -> null.`,
      codeLine: 'return prev; // New head',
      variables: {
        'New Head': prevId !== null ? `Node(${safeValues[prevId]})` : 'null',
        'Reversed Order': `${reversedValues.join(' -> ')} -> null`,
        status: 'Complete',
      },
      linkedList: {
        nodes: finalNodes,
        headId: prevId,
        pointers: [{ name: 'new head', nodeId: prevId, color: 'emerald' }],
        label: 'Reversed Singly Linked List',
      },
    });

    return steps;
  },
};

export default sampleLinkedList;

