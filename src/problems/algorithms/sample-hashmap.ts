import type { AlgorithmDefinition, ExecutionStep, HashMapEntry } from './types';

export const sampleHashmap: AlgorithmDefinition = {
  id: 'sample-hashmap',
  title: 'Sample: Hash Map Lookup & Key-Value Store',
  category: 'Hash Maps',
  difficulty: 'Easy',
  description: 'Interactive demonstration of a Java HashMap storing key-value pairs with O(1) containsKey() and get() lookups.',
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
      description: 'Input numbers array',
    },
    {
      name: 'target',
      label: 'Target Sum',
      type: 'number',
      defaultValue: 9,
      placeholder: '9',
      description: 'Target sum to search complement for',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawNums = inputs.nums;
    const nums: number[] = Array.isArray(rawNums)
      ? rawNums.map((n) => Number(n)).filter((n) => !isNaN(n))
      : [2, 7, 11, 15];
    const target: number = Number(inputs.target ?? 9);

    const steps: ExecutionStep[] = [];
    const map = new Map<number, number>();

    const getEntries = (activeKey?: number, state: 'default' | 'added' | 'queried' | 'match' = 'default'): HashMapEntry[] => {
      const entries: HashMapEntry[] = [];
      map.forEach((idx, val) => {
        entries.push({
          key: val,
          value: idx,
          state: val === activeKey ? state : 'default',
        });
      });
      return entries;
    };

    // Step 0: Initialize
    steps.push({
      stepNumber: 0,
      title: 'Initialize Map & Target',
      description: 'Create an empty HashMap<Integer, Integer> to store seen numbers and their indices.',
      codeLine: 'Map<Integer, Integer> map = new HashMap<>();',
      variables: { target, 'map.size()': 0 },
      array: { values: [...nums], label: 'nums[]' },
      hashmap: {
        entries: [],
        searchKey: null,
        searchResult: null,
        label: 'HashMap<Integer, Integer> map',
      },
    });

    for (let i = 0; i < nums.length; i++) {
      const current = nums[i];
      const complement = target - current;

      // Step A: Inspect current element & calculate complement
      steps.push({
        stepNumber: steps.length,
        title: 'Inspect nums[' + i + '] = ' + current,
        description: 'Need complement = target - nums[' + i + '] = ' + target + ' - ' + current + ' = ' + complement + '.',
        codeLine: 'int complement = target - nums[' + i + ']; // ' + target + ' - ' + current + ' = ' + complement,
        variables: { i, current, complement, target },
        array: {
          values: [...nums],
          pointers: [{ name: 'i', index: i, color: 'blue' }],
          highlights: [{ index: i, state: 'current' }],
          label: 'nums[]',
        },
        hashmap: {
          entries: getEntries(),
          searchKey: complement,
          searchResult: 'searching',
          label: 'HashMap<Integer, Integer> map',
        },
      });

      // Step B: Query map
      if (map.has(complement)) {
        const compIdx = map.get(complement) ?? 0;
        steps.push({
          stepNumber: steps.length,
          title: 'Found Complement ' + complement + ' in Map!',
          description: 'map.containsKey(' + complement + ') is true! Stored at index ' + compIdx + '. Solution pair: [' + compIdx + ', ' + i + '].',
          codeLine: 'if (map.containsKey(complement)) return new int[] { map.get(complement), i };',
          variables: { i, current, complement, [`map.get(${complement})`]: compIdx },
          array: {
            values: [...nums],
            pointers: [
              { name: 'found', index: compIdx, color: 'emerald' },
              { name: 'i', index: i, color: 'emerald' },
            ],
            highlights: [
              { index: compIdx, state: 'match' },
              { index: i, state: 'match' },
            ],
            label: 'nums[]',
          },
          hashmap: {
            entries: getEntries(complement, 'match'),
            searchKey: complement,
            searchResult: 'found',
            label: 'HashMap<Integer, Integer> map',
          },
        });
        return steps;
      } else {
        steps.push({
          stepNumber: steps.length,
          title: 'Complement ' + complement + ' Not in Map',
          description: 'map.containsKey(' + complement + ') is false. Add current number ' + current + ' -> index ' + i + ' to map.',
          codeLine: 'map.put(nums[' + i + '], ' + i + ');',
          variables: { i, current, complement },
          array: {
            values: [...nums],
            pointers: [{ name: 'i', index: i, color: 'blue' }],
            label: 'nums[]',
          },
          hashmap: {
            entries: getEntries(),
            searchKey: complement,
            searchResult: 'not-found',
            label: 'HashMap<Integer, Integer> map',
          },
        });

        // Insert into map
        map.set(current, i);

        steps.push({
          stepNumber: steps.length,
          title: 'Added ' + current + ' -> ' + i + ' to Map',
          description: 'HashMap now contains ' + map.size + ' element(s). Proceeding to next index.',
          codeLine: '// Map updated with entry (' + current + ', ' + i + ')',
          variables: { i, current, 'map.size()': map.size },
          array: {
            values: [...nums],
            pointers: [{ name: 'i', index: i, color: 'blue' }],
            label: 'nums[]',
          },
          hashmap: {
            entries: getEntries(current, 'added'),
            searchKey: null,
            searchResult: null,
            label: 'HashMap<Integer, Integer> map',
          },
        });
      }
    }

    return steps;
  },
};

export default sampleHashmap;
