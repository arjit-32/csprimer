import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const binarySearch: AlgorithmDefinition = {
  id: 'binary-search',
  title: 'Binary Search (Pointers & Complete Search Window)',
  category: 'Searching',
  description:
    'Demonstrates halving the search space using low, mid, and high pointers along with an active subarray window bounding the candidate range.',
  visualizationTypes: ['array'],
  defaultInputs: {
    nums: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
    target: 23,
  },
  inputSchema: [
    {
      name: 'nums',
      label: 'Sorted Array (comma-separated)',
      type: 'number-array',
      defaultValue: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
      placeholder: '2, 5, 8, 12, 16, 23, 38, 56, 72, 91',
      description: 'Ascending sorted array',
    },
    {
      name: 'target',
      label: 'Target Value',
      type: 'number',
      defaultValue: 23,
      placeholder: '23',
      description: 'Number to search for',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map(Number).filter((n) => !isNaN(n))
      : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const target = Number(inputs.target ?? 23);

    const builder = new StepBuilder();
    let low = 0;
    let high = nums.length - 1;

    builder.step({
      title: 'Initialize Search Space',
      description: `Target is ${target}. The search interval is initially the entire array [0..${high}].`,
      codeLine: 'int low = 0, high = nums.length - 1;',
      variables: { low, high, target },
      array: {
        values: [...nums],
        pointers: { low, high },
        window: [low, high],
        label: 'nums[]',
      },
    });

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = nums[mid];

      builder.step({
        title: `Calculate Midpoint: mid = ${mid} (nums[mid] = ${midVal})`,
        description: `Inspect middle element at index ${mid}. Compare nums[${mid}] with target ${target}.`,
        codeLine: 'int mid = low + (high - low) / 2;',
        variables: { low, mid, high, 'nums[mid]': midVal, target },
        array: {
          values: [...nums],
          pointers: { low, mid, high },
          highlights: [{ index: mid, state: 'current' }],
          window: [low, high],
          label: 'nums[]',
        },
      });

      if (midVal === target) {
        builder.step({
          title: `Target Found at Index ${mid}!`,
          description: `nums[${mid}] == ${target}. Binary search succeeds.`,
          codeLine: 'if (nums[mid] == target) return mid;',
          variables: { mid, target, status: 'FOUND' },
          array: {
            values: [...nums],
            pointers: { mid },
            highlights: [{ index: mid, state: 'match' }],
            label: 'nums[]',
          },
        });
        return builder.build();
      } else if (midVal < target) {
        builder.step({
          title: `nums[mid] = ${midVal} < ${target}: Narrow to Right Half`,
          description: `Target must lie to the right of index ${mid}. Advance low to ${mid + 1}.`,
          codeLine: 'low = mid + 1;',
          variables: { low: mid + 1, mid, high, target },
          array: {
            values: [...nums],
            pointers: { low: mid + 1, high },
            window: [mid + 1, high],
            label: 'nums[]',
          },
        });
        low = mid + 1;
      } else {
        builder.step({
          title: `nums[mid] = ${midVal} > ${target}: Narrow to Left Half`,
          description: `Target must lie to the left of index ${mid}. Decrement high to ${mid - 1}.`,
          codeLine: 'high = mid - 1;',
          variables: { low, mid, high: mid - 1, target },
          array: {
            values: [...nums],
            pointers: { low, high: mid - 1 },
            window: [low, Math.max(low, mid - 1)],
            label: 'nums[]',
          },
        });
        high = mid - 1;
      }
    }

    builder.step({
      title: 'Target Not Found',
      description: `Search interval exhausted (low > high). Target ${target} does not exist in array.`,
      codeLine: 'return -1;',
      variables: { low, high, target, status: 'NOT FOUND' },
      array: { values: [...nums], label: 'nums[]' },
    });

    return builder.build();
  },
};

export default binarySearch;

