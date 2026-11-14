import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const slidingWindowMaximum: AlgorithmDefinition = {
  id: 'sliding-window-maximum',
  title: 'Array + Double Queue (Monotonic Deque)',
  category: 'Deques & Sliding Window',
  description:
    'Couples an Array and a Double-Ended Queue (Deque) to maintain a monotonic window maximum in O(N) time.',
  visualizationTypes: ['array', 'deque'],
  defaultInputs: {
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    k: 3,
  },
  inputSchema: [
    {
      name: 'nums',
      label: 'Array (comma-separated)',
      type: 'number-array',
      defaultValue: [1, 3, -1, -3, 5, 3, 6, 7],
      placeholder: '1, 3, -1, -3, 5, 3, 6, 7',
      description: 'Input numbers array',
    },
    {
      name: 'k',
      label: 'Window Size (k)',
      type: 'number',
      defaultValue: 3,
      placeholder: '3',
      description: 'Sliding window width',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map(Number).filter((n) => !isNaN(n))
      : [1, 3, -1, -3, 5, 3, 6, 7];
    const k = Math.max(1, Math.min(nums.length, Number(inputs.k ?? 3)));

    const builder = new StepBuilder();
    const deque: number[] = []; // stores indices
    const result: number[] = [];

    // Initial state
    builder.step({
      title: 'Initialize Array + Deque Combination',
      description: `Target window size k = ${k}. Deque maintains indices of candidates in strictly decreasing order of value.`,
      codeLine: 'Deque<Integer> deque = new ArrayDeque<>();',
      variables: { k, dequeSize: 0 },
      array: {
        values: [...nums],
        pointers: { i: 0 },
        label: 'nums[]',
      },
      deque: {
        items: [],
      },
    });

    for (let i = 0; i < nums.length; i++) {
      // 1. Remove indices outside window [i - k + 1, i]
      if (deque.length > 0 && deque[0] < i - k + 1) {
        const expired = deque.shift()!;
        builder.step({
          title: `deque.removeFirst(): Index ${expired} Expired`,
          description: `Index ${expired} is outside the active window [${i - k + 1}..${i}]. Evict from front.`,
          codeLine: 'if (!deque.isEmpty() && deque.peekFirst() < i - k + 1) deque.pollFirst();',
          variables: { i, expiredIndex: expired, 'deque.size()': deque.length },
          array: {
            values: [...nums],
            pointers: { i },
            window: [Math.max(0, i - k + 1), i],
            label: 'nums[]',
          },
          deque: {
            items: deque.map((idx) => `idx ${idx} (${nums[idx]})`),
            action: 'removeFirst',
          },
        });
      }

      // 2. Remove smaller elements from back
      while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
        const smaller = deque.pop()!;
        builder.step({
          title: `deque.removeLast(): Monotonic Violation`,
          description: `nums[${smaller}] = ${nums[smaller]} is smaller than current nums[${i}] = ${nums[i]}. Pop from back.`,
          codeLine: 'while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();',
          variables: { i, poppedIndex: smaller, currentVal: nums[i] },
          array: {
            values: [...nums],
            pointers: { i },
            highlights: [{ index: i, state: 'current' }, { index: smaller, state: 'compare' }],
            window: [Math.max(0, i - k + 1), i],
            label: 'nums[]',
          },
          deque: {
            items: deque.map((idx) => `idx ${idx} (${nums[idx]})`),
            action: 'removeLast',
          },
        });
      }

      // 3. Add current element to back
      deque.push(i);
      builder.step({
        title: `deque.addLast(${i}): Enqueue Candidate`,
        description: `Push index ${i} (value ${nums[i]}) into back of deque. Current window max is front: ${nums[deque[0]]}.`,
        codeLine: 'deque.offerLast(i);',
        variables: { i, currentVal: nums[i], windowMax: nums[deque[0]] },
        array: {
          values: [...nums],
          pointers: { i },
          window: [Math.max(0, i - k + 1), i],
          label: 'nums[]',
        },
        deque: {
          items: deque.map((idx) => `idx ${idx} (${nums[idx]})`),
          action: 'addLast',
        },
      });

      // 4. Record result once first full window is reached
      if (i >= k - 1) {
        result.push(nums[deque[0]]);
        builder.step({
          title: `Record Window Maximum: ${nums[deque[0]]}`,
          description: `Window [${i - k + 1}..${i}] max is at front of deque: nums[${deque[0]}] = ${nums[deque[0]]}.`,
          codeLine: 'result[i - k + 1] = nums[deque.peekFirst()];',
          variables: {
            window: `[${i - k + 1}..${i}]`,
            max: nums[deque[0]],
            results: [...result],
          },
          array: {
            values: [...nums],
            pointers: { max: deque[0] },
            highlights: [{ index: deque[0], state: 'match' }],
            window: [i - k + 1, i],
            label: 'nums[]',
          },
          deque: {
            items: deque.map((idx) => `idx ${idx} (${nums[idx]})`),
          },
        });
      }
    }

    return builder.build();
  },
};

export default slidingWindowMaximum;

