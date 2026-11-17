
import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const algo01RunningSum: AlgorithmDefinition = {
  id: '01-running-sum',
  title: 'Running Sum of 1D Array',
  category: 'Arrays',
  description:
    'Calculate the running sum by adding each element to the previous running sum. The input array is modified in-place, producing the prefix sum at every index.',

  visualizationTypes: ['array'],

  defaultInputs: {
    nums: [1, 2, 3, 4],
  },

  // IMPORTANT: Use the exact input types supported by types.ts
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

  generateSteps(inputs): ExecutionStep[] {
    const builder = new StepBuilder();

    if (!Array.isArray(inputs.nums)) {
      throw new Error('nums must be a valid number array.');
    }

    const nums: number[] = [...inputs.nums];
    const n = nums.length;

    // Step 1: Initial array
    builder.step({
      title: 'Initialize Array',
      description: `Start with the input array [${nums.join(', ')}]. We will calculate the running sum in-place.`,
      codeLine: 'int[] nums = new int[]{1,2,3,4};',
      variables: {
        length: n,
      },
      array: {
        values: [...nums],
        highlights: [],
      },
    });

    // Step 2: Begin traversal
    builder.step({
      title: 'Start Traversal',
      description:
        'Start from index 1. The first element remains unchanged because its running sum is already itself.',
      codeLine: 'for(int i=1;i<nums.length;++i){',
      variables: {
        i: 1,
        length: n,
      },
      array: {
        values: [...nums],
        pointers: {
          i: n > 1 ? 1 : 0,
        },
        highlights: n > 1 ? [1] : [0],
      },
    });

    // Step 3: Calculate running sum
    for (let i = 1; i < n; i++) {
      const currentValue = nums[i];
      const previousSum = nums[i - 1];

      builder.step({
        title: `Calculate Index ${i}`,
        description:
          `Read the current value (${currentValue}) and the previous running sum (${previousSum}). Add them together.`,
        codeLine: 'nums[i] = nums[i] + nums[i-1];',
        variables: {
          i,
          currentValue,
          previousSum,
          sum: currentValue + previousSum,
        },
        array: {
          values: [...nums],
          pointers: {
            i: {
              index: i,
              color: 'blue',
            },
            previous: {
              index: i - 1,
              color: 'purple',
            },
          },
          highlights: [
            { index: i, state: 'current' },
            { index: i - 1, state: 'compare' },
          ],
        },
      });

      // Execute the actual operation
      nums[i] = nums[i] + nums[i - 1];

      builder.step({
        title: `Update Index ${i}`,
        description:
          `The value at index ${i} is now ${nums[i]}. This represents the sum of all elements from index 0 through ${i}.`,
        codeLine: 'nums[i] = nums[i] + nums[i-1];',
        variables: {
          i,
          updatedValue: nums[i],
          runningSum: nums[i],
        },
        array: {
          values: [...nums],
          pointers: {
            i: {
              index: i,
              color: 'emerald',
            },
          },
          highlights: [
            { index: i, state: 'found' },
          ],
        },
      });
    }

    // Final result
    builder.step({
      title: 'Running Sum Completed',
      description:
        `Every element now contains its running sum. The final result is [${nums.join(', ')}].`,
      codeLine: 'System.out.println(Arrays.toString(nums));',
      variables: {
        length: n,
        result: `[${nums.join(', ')}]`,
      },
      array: {
        values: [...nums],
        highlights: nums.map((_, index) => ({
          index,
          state: 'match' as const,
        })),
      },
    });

    return builder.build();
  },
};

export default algo01RunningSum;
