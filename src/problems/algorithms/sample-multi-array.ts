import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const sampleMultiArray: AlgorithmDefinition = {
  id: 'sample-multi-array',
  title: 'Sample: Multi-Array Coordination',
  category: 'Two Pointers',
  difficulty: 'Easy',
  description:
    'Merge nums2 into nums1 as one sorted array in O(M + N) time by populating from back to front using three pointers.',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(1) Auxiliary',
  visualizationTypes: ['array'],
  defaultInputs: {
    nums1: [1, 2, 3, 0, 0, 0],
    m: 3,
    nums2: [2, 5, 6],
    n: 3,
  },
  inputSchema: [
    {
      name: 'nums1',
      label: 'nums1 (with trailing zeroes for buffer)',
      type: 'number-array',
      defaultValue: [1, 2, 3, 0, 0, 0],
      placeholder: '1, 2, 3, 0, 0, 0',
      description: 'First sorted array with size m + n',
    },
    {
      name: 'm',
      label: 'm (active count in nums1)',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'nums2',
      label: 'nums2 (second sorted array)',
      type: 'number-array',
      defaultValue: [2, 5, 6],
      placeholder: '2, 5, 6',
      description: 'Second sorted array of size n',
    },
    {
      name: 'n',
      label: 'n (count in nums2)',
      type: 'number',
      defaultValue: 3,
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums1 = inputs.nums1;
    const nums1: number[] = Array.isArray(rawNums1) ? rawNums1.map(Number) : [1, 2, 3, 0, 0, 0];
    const rawNums2 = inputs.nums2;
    const nums2: number[] = Array.isArray(rawNums2) ? rawNums2.map(Number) : [2, 5, 6];

    let m = Math.max(0, Number(inputs.m ?? 3));
    let n = Math.max(0, Number(inputs.n ?? 3));

    const builder = new StepBuilder();

    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;

    // Step 0: Initial State
    builder.step({
      title: 'Initialize 3 Pointers at Back of Arrays',
      description:
        'To merge in-place without overwriting elements of nums1, we fill from index p = m + n - 1 backwards using pointers p1 and p2.',
      codeLine: 'int p1 = m - 1, p2 = n - 1, p = m + n - 1;',
      variables: { m, n, p1, p2, p },
      arrays: [
        {
          values: [...nums1],
          pointers: { p1: { index: p1, color: 'blue' }, p: { index: p, color: 'purple' } },
          label: 'Array 1: nums1 (Capacity m + n)',
        },
        {
          values: [...nums2],
          pointers: { p2: { index: p2, color: 'emerald' } },
          label: 'Array 2: nums2 (Size n)',
        },
      ],
    });

    while (p2 >= 0) {
      if (p1 >= 0 && nums1[p1] > nums2[p2]) {
        const val = nums1[p1];
        builder.step({
          title: `nums1[p1] (${val}) > nums2[p2] (${nums2[p2]}) -> Place in nums1[${p}]`,
          description: `Compare nums1[${p1}] (${val}) with nums2[${p2}] (${nums2[p2]}). Since ${val} is greater, place it at nums1[${p}].`,
          codeLine: 'nums1[p--] = nums1[p1--];',
          variables: { 'nums1[p1]': val, 'nums2[p2]': nums2[p2], 'Write to': `nums1[${p}] = ${val}` },
          arrays: [
            {
              values: [...nums1],
              pointers: { p1: { index: p1, color: 'blue' }, p: { index: p, color: 'purple' } },
              highlights: [{ index: p1, state: 'compare' }, { index: p, state: 'current' }],
              label: 'Array 1: nums1',
            },
            {
              values: [...nums2],
              pointers: { p2: { index: p2, color: 'emerald' } },
              highlights: [{ index: p2, state: 'compare' }],
              label: 'Array 2: nums2',
            },
          ],
        });

        nums1[p] = val;
        p1--;
        p--;
      } else {
        const val = nums2[p2];
        builder.step({
          title: `nums2[p2] (${val}) >= nums1[p1] -> Place in nums1[${p}]`,
          description: `Compare nums2[${p2}] (${val}) with nums1[${p1 >= 0 ? p1 : 0}]. Place ${val} at nums1[${p}].`,
          codeLine: 'nums1[p--] = nums2[p2--];',
          variables: { 'nums2[p2]': val, 'Write to': `nums1[${p}] = ${val}` },
          arrays: [
            {
              values: [...nums1],
              pointers: {
                ...(p1 >= 0 ? { p1: { index: p1, color: 'blue' } } : {}),
                p: { index: p, color: 'purple' },
              },
              highlights: [{ index: p, state: 'current' }],
              label: 'Array 1: nums1',
            },
            {
              values: [...nums2],
              pointers: { p2: { index: p2, color: 'emerald' } },
              highlights: [{ index: p2, state: 'compare' }],
              label: 'Array 2: nums2',
            },
          ],
        });

        nums1[p] = val;
        p2--;
        p--;
      }
    }

    // Final state
    builder.step({
      title: 'Merge Complete! In-Place Sorted Array',
      description: 'All elements from nums2 have been placed into nums1 in non-decreasing order.',
      codeLine: '// nums1 is now fully sorted in O(M + N) time',
      variables: { 'nums1 (Sorted)': JSON.stringify(nums1), status: 'Completed' },
      arrays: [
        {
          values: [...nums1],
          highlights: nums1.map((_, i) => ({ index: i, state: 'found' as const })),
          label: 'Array 1: nums1 (Sorted)',
        },
        {
          values: [...nums2],
          label: 'Array 2: nums2 (Exhausted)',
        },
      ],
    });

    return builder.build();
  },
};

export default sampleMultiArray;

