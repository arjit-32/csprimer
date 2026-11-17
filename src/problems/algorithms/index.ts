import type { AlgorithmDefinition } from './types';
import algo01RunningSum from './01-running-sum';
import algo02TwoSum from './02-two-sum';
import algo03MaxSumSubarrayOfSizeK from './03-max-sum-subarray-of-size-k';
import sampleBinarySearch from './sample-binary-search';
import sampleDeque from './sample-deque';
import sampleDp from './sample-dp';
import sampleHashmap from './sample-hashmap';
import sampleLinkedList from './sample-linked-list';
import sampleMultiArray from './sample-multi-array';
import sampleSet from './sample-set';
import sampleStack from './sample-stack';
import sampleTree from './sample-tree';

export * from './types';
export * from './builder';

export const algorithms: Record<string, AlgorithmDefinition> = {
  '01-running-sum': algo01RunningSum,
  '02-two-sum': algo02TwoSum,
  '03-max-sum-subarray-of-size-k': algo03MaxSumSubarrayOfSizeK,
  'sample-binary-search': sampleBinarySearch,
  'sample-deque': sampleDeque,
  'sample-dp': sampleDp,
  'sample-hashmap': sampleHashmap,
  'sample-linked-list': sampleLinkedList,
  'sample-multi-array': sampleMultiArray,
  'sample-set': sampleSet,
  'sample-stack': sampleStack,
  'sample-tree': sampleTree,

  // Backward Compatibility Aliases
  'running-sum': algo01RunningSum,
  'two-sum': algo02TwoSum,
  'max-sum-subarray-of-size-k': algo03MaxSumSubarrayOfSizeK,
  'binary-search': sampleBinarySearch,
  'reverse-linked-list': sampleLinkedList,
  'valid-parentheses': sampleStack,
  'contains-duplicate': sampleSet,
  'climbing-stairs': sampleDp,
  'tree-with-array': sampleTree,
  'sliding-window-maximum': sampleDeque,
  'merge-sorted-arrays': sampleMultiArray,
};

export function getAlgorithm(id: string): AlgorithmDefinition | undefined {
  return algorithms[id];
}

export default algorithms;
