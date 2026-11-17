import type { AlgorithmDefinition, ExecutionStep, HashMapEntry } from './types';

export const algo02TwoSum: AlgorithmDefinition = {
  id: '02-two-sum',
  title: 'Two Sum',
  category: 'Arrays & Hashing',
  difficulty: 'Easy',
  description:
    'Find two numbers in the array that add up to the target sum using a hash map to achieve O(N) time complexity.',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  visualizationTypes: ['array', 'hashmap'],
  defaultInputs: {
    nums: [2, 7, 11, 15],
    target: 9,
  },
  inputSchema: [
    {
      name: 'nums',
      label: 'Array (numbers separated by commas)',
      type: 'number-array',
      defaultValue: [2, 7, 11, 15],
      placeholder: '2, 7, 11, 15',
      description: 'The list of numbers to search through',
    },
    {
      name: 'target',
      label: 'Target Sum',
      type: 'number',
      defaultValue: 9,
      placeholder: '9',
      description: 'The sum we want two numbers to add up to',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map((n) => Number(n)).filter((n) => !isNaN(n))
      : [2, 7, 11, 15];
    const target: number = Number(inputs.target ?? 9);

    const steps: ExecutionStep[] = [];
    const seenMap = new Map<number, number>();

    const getHashMapEntries = (
      activeKey?: number,
      state: 'default' | 'added' | 'queried' | 'match' = 'default'
    ): HashMapEntry[] => {
      const entries: HashMapEntry[] = [];
      seenMap.forEach((idx, val) => {
        entries.push({
          key: val,
          value: idx,
          state: val === activeKey ? state : 'default',
        });
      });
      return entries;
    };

    // Step 0: Initial State
    steps.push({
      stepNumber: 0,
      title: 'Initialize Hash Map',
      description: `Target is ${target}. We initialize an empty hash map 'seen' to store values and their indices.`,
      codeLine: 'Map<Integer, Integer> seen = new HashMap<>();',
      variables: {
        target,
        arrayLength: nums.length,
      },
      array: {
        values: [...nums],
        pointers: [],
        highlights: [],
        label: 'Array: nums',
      },
      hashmap: {
        entries: [],
        searchKey: null,
        searchResult: null,
        label: 'Hash Map: seen { value -> index }',
      },
    });

    let found = false;

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = target - num;

      // Step A: Inspect current element & calculate complement
      steps.push({
        stepNumber: steps.length,
        title: `Inspect Element nums[${i}] = ${num}`,
        description: `Current element is nums[${i}] = ${num}. We need complement = target - num = ${target} - ${num} = ${complement}. Checking if ${complement} is in the hash map.`,
        codeLine: `int complement = target - nums[i]; // ${target} - ${num} = ${complement}`,
        variables: {
          i,
          'nums[i]': num,
          complement,
          target,
        },
        array: {
          values: [...nums],
          pointers: [{ name: 'i', index: i, color: 'blue', label: `nums[${i}] = ${num}` }],
          highlights: [{ index: i, state: 'current' }],
          label: 'Array: nums',
        },
        hashmap: {
          entries: getHashMapEntries(complement, 'queried'),
          searchKey: complement,
          searchResult: 'searching',
          label: 'Hash Map: seen',
        },
      });

      if (seenMap.has(complement)) {
        const matchIdx = seenMap.get(complement)!;
        found = true;

        // Step: Found match!
        steps.push({
          stepNumber: steps.length,
          title: `Match Found! [${matchIdx}, ${i}]`,
          description: `Complement ${complement} was found in the hash map at index ${matchIdx}! The two elements are nums[${matchIdx}] (${complement}) + nums[${i}] (${num}) = ${target}. Solution indices: [${matchIdx}, ${i}].`,
          codeLine: `return new int[] { seen.get(complement), i }; // [${matchIdx}, ${i}]`,
          variables: {
            'Solution Indices': `[${matchIdx}, ${i}]`,
            'Values': `${complement} + ${num} = ${target}`,
            status: 'Success',
          },
          array: {
            values: [...nums],
            pointers: [
              { name: 'match', index: matchIdx, color: 'emerald', label: `nums[${matchIdx}] = ${complement}` },
              { name: 'i', index: i, color: 'emerald', label: `nums[${i}] = ${num}` },
            ],
            highlights: [
              { index: matchIdx, state: 'found' },
              { index: i, state: 'found' },
            ],
            label: 'Array: nums (Match Found)',
          },
          hashmap: {
            entries: getHashMapEntries(complement, 'match'),
            searchKey: complement,
            searchResult: 'found',
            label: 'Hash Map: seen (Match Found)',
          },
        });
        break;
      } else {
        // Step: Complement not found, store in hash map
        seenMap.set(num, i);
        steps.push({
          stepNumber: steps.length,
          title: `Store ${num} -> Index ${i} in Map`,
          description: `Complement ${complement} is not yet in the hash map. Store seen[${num}] = ${i} for subsequent lookups.`,
          codeLine: `seen.put(nums[i], i); // seen.put(${num}, ${i});`,
          variables: {
            i,
            'nums[i]': num,
            'Stored Entry': `${num} -> ${i}`,
            mapSize: seenMap.size,
          },
          array: {
            values: [...nums],
            pointers: [{ name: 'i', index: i, color: 'blue' }],
            highlights: [{ index: i, state: 'visited' }],
            label: 'Array: nums',
          },
          hashmap: {
            entries: getHashMapEntries(num, 'added'),
            searchKey: complement,
            searchResult: 'not-found',
            label: 'Hash Map: seen (Updated)',
          },
        });
      }
    }

    if (!found) {
      steps.push({
        stepNumber: steps.length,
        title: 'No Solution Found',
        description: `Scanned all ${nums.length} elements without finding two numbers that sum to ${target}.`,
        codeLine: 'return new int[] {};',
        variables: {
          result: 'No pair sums to target',
        },
        array: {
          values: [...nums],
          highlights: [],
          label: 'Array: nums',
        },
        hashmap: {
          entries: getHashMapEntries(),
          searchResult: 'not-found',
          label: 'Hash Map: seen',
        },
      });
    }

    return steps;
  },
};

export default algo02TwoSum;

