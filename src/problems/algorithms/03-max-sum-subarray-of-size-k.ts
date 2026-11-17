import { StepBuilder } from './builder';
import type { AlgorithmDefinition } from './types';

export const algo03MaxSumSubarrayOfSizeK: AlgorithmDefinition = {
  id: '03-max-sum-subarray-of-size-k',
  title: 'Maximum Sum Subarray of Size K',
  category: 'Sliding Window',
  difficulty: 'Easy',

  description:
    'Find the maximum sum of any contiguous subarray of size K using the sliding window technique.',

  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',

  visualizationTypes: ['array'],

  defaultInputs: {
    nums: [1, 4, 3, 10, 23, 3, 1, 0, 20],
    k: 4,
  },

  inputSchema: [
    {
      name: 'nums',
      label: 'Array',
      type: 'number-array',
      defaultValue: [1, 4, 3, 10, 23, 3, 1, 0, 20],
      placeholder: '1, 4, 3, 10, 23, 3, 1, 0, 20',
    },
    {
      name: 'k',
      label: 'Window Size (K)',
      type: 'number',
      defaultValue: 4,
    },
  ],

  generateSteps(inputs) {
    const nums = inputs.nums as number[];
    const k = Number(inputs.k);

    const builder = new StepBuilder();

    const n = nums.length;
    let windowStart = 0;
    let sum = 0;
    let maxSum = 0;

    const code = {
      initialize: 'int windowStart = 0, sum = 0, maxSum = 0;',
      add: 'sum += nums[windowEnd];',
      check: 'if ((windowEnd - windowStart + 1) == k)',
      update: 'maxSum = Math.max(maxSum, sum);',
      remove: 'sum -= nums[windowStart];',
      slide: 'windowStart += 1;',
      output: 'System.out.println(maxSum);',
    };

    const makeVariables = (windowEnd: number) => ({
      windowStart,
      windowEnd,
      sum,
      maxSum,
      k,
    });

    const addStep = (
      title: string,
      description: string,
      codeLine: string,
      windowEnd: number,
      options: {
        highlight?: number;
        window?: boolean;
      } = {},
    ) => {
      const highlights: { index: number; state: 'current' }[] =
        options.highlight !== undefined
          ? [{ index: options.highlight, state: 'current' as const }]
          : [];

      builder.step({
        title,
        description,
        codeLine,
        variables: makeVariables(windowEnd),
        array: {
          values: nums,
          pointers: {
            windowStart,
            windowEnd,
          },
          highlights,
          window:
            options.window && windowEnd >= windowStart
              ? {
                  start: windowStart,
                  end: windowEnd,
                  label: `Window (size ${windowEnd - windowStart + 1})`,
                }
              : undefined,
        },
      });
    };

    builder.step({
      title: 'Initialize Sliding Window',
      description: `We need to find the maximum sum of a contiguous subarray of size ${k}. Initialize windowStart, sum, and maxSum to 0.`,
      codeLine: code.initialize,
      variables: {
        windowStart,
        windowEnd: -1,
        sum,
        maxSum,
        k,
      },
      array: {
        values: nums,
        pointers: {
          windowStart: 0,
        },
      },
    });

    if (k <= 0 || k > n || !Number.isInteger(k)) {
      builder.step({
        title: 'Invalid Window Size',
        description: `The window size must be an integer between 1 and ${n}. No valid subarray can be formed.`,
        codeLine: code.initialize,
        variables: {
          windowStart,
          windowEnd: -1,
          sum,
          maxSum,
          k,
        },
        array: {
          values: nums,
        },
      });

      return builder.build();
    }

    for (let windowEnd = 0; windowEnd < n; windowEnd++) {
      // Add the current element to the window.
      sum += nums[windowEnd];

      addStep(
        'Add Current Element',
        `Add nums[${windowEnd}] = ${nums[windowEnd]} to the running sum. Current sum = ${sum}.`,
        code.add,
        windowEnd,
        {
          highlight: windowEnd,
          window: true,
        },
      );

      // Check whether the window has reached size K.
      const currentWindowSize = windowEnd - windowStart + 1;

      if (currentWindowSize === k) {
        addStep(
          'Window Reached Size K',
          `The current window contains exactly ${k} elements. Its sum is ${sum}.`,
          code.check,
          windowEnd,
          {
            highlight: windowEnd,
            window: true,
          },
        );

        // Update maximum sum.
        const previousMax = maxSum;
        maxSum = Math.max(maxSum, sum);

        builder.step({
          title: maxSum > previousMax ? 'New Maximum Found!' : 'Maximum Unchanged',
          description:
            maxSum > previousMax
              ? `The current window sum (${sum}) is greater than the previous maximum (${previousMax}). Update maxSum to ${maxSum}.`
              : `The current window sum (${sum}) does not exceed the maximum (${maxSum}). Keep maxSum unchanged.`,
          codeLine: code.update,
          variables: makeVariables(windowEnd),
          array: {
            values: nums,
            pointers: {
              windowStart,
              windowEnd,
            },
            highlights: nums.map((_, index) => ({
              index,
              state:
                index >= windowStart && index <= windowEnd
                  ? ('match' as const)
                  : ('visited' as const),
            })),
            window: {
              start: windowStart,
              end: windowEnd,
              label: `Window sum: ${sum}`,
            },
          },
        });

        // Remove the element at windowStart.
        const removedValue = nums[windowStart];
        sum -= removedValue;

        builder.step({
          title: 'Remove Leftmost Element',
          description: `Remove nums[${windowStart}] = ${removedValue} from the running sum. New sum = ${sum}.`,
          codeLine: code.remove,
          variables: makeVariables(windowEnd),
          array: {
            values: nums,
            pointers: {
              windowStart,
              windowEnd,
            },
            highlights: [
              {
                index: windowStart,
                state: 'compare',
                label: `Remove ${removedValue}`,
              },
              {
                index: windowEnd,
                state: 'current',
              },
            ],
            window: {
              start: windowStart,
              end: windowEnd,
              label: 'Removing leftmost element',
            },
          },
        });

        // Slide the window forward.
        windowStart++;

        builder.step({
          title: 'Slide Window Forward',
          description: `Move windowStart to index ${windowStart}. The next iteration will add a new element to the window.`,
          codeLine: code.slide,
          variables: makeVariables(windowEnd),
          array: {
            values: nums,
            pointers: {
              windowStart,
              windowEnd,
            },
            window:
              windowStart <= windowEnd
                ? {
                    start: windowStart,
                    end: windowEnd,
                    label: 'Window after sliding',
                  }
                : undefined,
          },
        });
      }
    }

    builder.step({
      title: 'Final Result',
      description: `The maximum sum of any contiguous subarray of size ${k} is ${maxSum}.`,
      codeLine: code.output,
      variables: {
        windowStart,
        windowEnd: n - 1,
        sum,
        maxSum,
        k,
      },
      array: {
        values: nums,
        highlights: nums.map((_, index) => ({
          index,
          state: 'visited' as const,
        })),
      },
    });

    return builder.build();
  },
};

export default algo03MaxSumSubarrayOfSizeK;