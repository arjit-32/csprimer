import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const algo01RunningSum: AlgorithmDefinition = {
  id: '01-running-sum',
  title: 'Running Sum of 1D Array',
  category: 'Arrays',
  description: 'Calculates the running sum by adding each element to the previous running sum in-place.',
  visualizationTypes: ['array'],
  defaultInputs: {
    nums: [1, 2, 3, 4],
  },
  inputSchema: [
    {
      name: 'nums',
      label: 'Input Array',
      type: 'number-array',
      defaultValue: [1, 2, 3, 4],
      placeholder: '1, 2, 3, 4',
      description: 'Enter numbers separated by commas.',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map(Number).filter((n) => !isNaN(n))
      : [1, 2, 3, 4];

    const builder = new StepBuilder();

    if (nums.length === 0) {
      builder.step({
        title: 'Empty Array',
        description: 'Input array is empty. Running sum is empty.',
        array: { values: [] },
      });
      return builder.build();
    }

    const arr = [...nums];

    // Step 0: Initial State
    builder.step({
      title: 'Initial Array State',
      description: `Array initialized with ${arr.length} elements. In-place running sum starts with index 0 staying as ${arr[0]}.`,
      codeLine: 'int[] nums = {...};',
      variables: { length: arr.length, 'nums[0]': arr[0] },
      array: {
        values: [...arr],
        pointers: { i: 0 },
        highlights: [{ index: 0, state: 'current' }],
        label: 'nums[]',
      },
    });

    for (let i = 1; i < arr.length; i++) {
      const prevVal = arr[i - 1];
      const currVal = arr[i];
      const sum = prevVal + currVal;

      // Inspect & Compute
      builder.step({
        title: `Compute Running Sum at Index ${i}`,
        description: `Add previous running sum nums[${i - 1}] (${prevVal}) to current element nums[${i}] (${currVal}). Result = ${sum}.`,
        codeLine: 'nums[i] = nums[i] + nums[i - 1];',
        variables: { i, 'nums[i-1]': prevVal, 'nums[i]': currVal, sum },
        array: {
          values: [...arr],
          pointers: { i, 'i-1': i - 1 },
          highlights: [
            { index: i, state: 'current' },
            { index: i - 1, state: 'compare' },
          ],
          label: 'nums[]',
        },
      });

      // Update in-place
      arr[i] = sum;

      builder.step({
        title: `Updated nums[${i}] = ${sum}`,
        description: `nums[${i}] is now updated in-place to ${sum}.`,
        codeLine: 'nums[i] = nums[i] + nums[i - 1];',
        variables: { i, 'nums[i]': arr[i] },
        array: {
          values: [...arr],
          pointers: { i },
          highlights: [{ index: i, state: 'match' }],
          label: 'nums[]',
        },
      });
    }

    // Final Completion Step
    builder.step({
      title: 'Running Sum Complete',
      description: `In-place running sum completed: [${arr.join(', ')}].`,
      codeLine: 'return nums;',
      variables: { result: `[${arr.join(', ')}]` },
      array: {
        values: [...arr],
        highlights: arr.map((_, idx) => ({ index: idx, state: 'match' })),
        label: 'nums[] (Final Result)',
      },
    });

    return builder.build();
  },
};

export default algo01RunningSum;
