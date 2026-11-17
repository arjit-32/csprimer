import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const sampleSet: AlgorithmDefinition = {
  id: 'sample-set',
  title: 'Sample: HashSet Unique Elements',
  category: 'Sets & Hashing',
  description:
    'Demonstrates coupling an Array with a Set to track seen elements and verify duplicates in O(1) average lookup time.',
  visualizationTypes: ['array', 'set'],
  defaultInputs: {
    nums: [4, 7, 2, 9, 7, 5],
  },
  inputSchema: [
    {
      name: 'nums',
      label: 'Array (comma-separated)',
      type: 'number-array',
      defaultValue: [4, 7, 2, 9, 7, 5],
      placeholder: '4, 7, 2, 9, 7, 5',
      description: 'Input array with potential duplicate values',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map(Number).filter((n) => !isNaN(n))
      : [4, 7, 2, 9, 7, 5];

    const builder = new StepBuilder();
    const seenSet = new Set<number>();

    // Initial state
    builder.step({
      title: 'Initialize Array + Set Combination',
      description: 'Create an empty HashSet in Java to track seen values with O(1) contains() checks.',
      codeLine: 'Set<Integer> seen = new HashSet<>();',
      variables: { seenCount: 0 },
      array: {
        values: [...nums],
        pointers: { i: 0 },
        label: 'nums[]',
      },
      set: [],
    });

    for (let i = 0; i < nums.length; i++) {
      const val = nums[i];

      // Query Set
      if (seenSet.has(val)) {
        builder.step({
          title: `Duplicate Found: seen.contains(${val}) == true`,
          description: `Element ${val} at index ${i} was already added to the Set. Duplicate detected!`,
          codeLine: 'if (seen.contains(num)) return true;',
          variables: { i, duplicateVal: val, duplicateFound: true },
          array: {
            values: [...nums],
            pointers: { i },
            highlights: [{ index: i, state: 'match' }],
            label: 'nums[]',
          },
          set: Array.from(seenSet),
          searchElement: val,
          searchResult: 'found',
        });
        return builder.build();
      }

      builder.step({
        title: `seen.contains(${val}) == false -> Add ${val}`,
        description: `Element ${val} is not in the Set yet. Insert ${val} into the Set.`,
        codeLine: 'seen.add(num);',
        variables: { i, currentVal: val, setSize: seenSet.size + 1 },
        array: {
          values: [...nums],
          pointers: { i },
          highlights: [{ index: i, state: 'current' }],
          label: 'nums[]',
        },
        set: Array.from(seenSet),
        searchElement: val,
        searchResult: 'not-found',
      });

      seenSet.add(val);

      builder.step({
        title: `Set Updated: Added ${val}`,
        description: `Set now contains ${seenSet.size} unique element(s).`,
        codeLine: '// seen now contains: ' + Array.from(seenSet).join(', '),
        variables: { setSize: seenSet.size },
        array: {
          values: [...nums],
          pointers: { i },
          label: 'nums[]',
        },
        set: Array.from(seenSet),
      });
    }

    builder.step({
      title: 'All Elements Processed (No Duplicates)',
      description: 'Every element in the array was unique.',
      codeLine: 'return false;',
      variables: { totalUnique: seenSet.size, hasDuplicate: false },
      array: { values: [...nums], label: 'nums[]' },
      set: Array.from(seenSet),
    });

    return builder.build();
  },
};

export default sampleSet;

