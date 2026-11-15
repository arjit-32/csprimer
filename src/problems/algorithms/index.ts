import type { AlgorithmDefinition } from './types';
import binarySearch from './binary-search';
import climbingStairs from './climbing-stairs';
import containsDuplicate from './contains-duplicate';
import mergeSortedArrays from './merge-sorted-arrays';
import reverseLinkedList from './reverse-linked-list';
import runningSum from './running-sum';
import slidingWindowMaximum from './sliding-window-maximum';
import treeWithArray from './tree-with-array';
import twoSum from './two-sum';
import validParentheses from './valid-parentheses';

export * from './types';
export * from './builder';

export const algorithms: Record<string, AlgorithmDefinition> = {
  'binary-search': binarySearch,
  'climbing-stairs': climbingStairs,
  'contains-duplicate': containsDuplicate,
  'merge-sorted-arrays': mergeSortedArrays,
  'reverse-linked-list': reverseLinkedList,
  'running-sum': runningSum,
  'sliding-window-maximum': slidingWindowMaximum,
  'tree-with-array': treeWithArray,
  'two-sum': twoSum,
  'valid-parentheses': validParentheses,
};

export function getAlgorithm(id: string): AlgorithmDefinition | undefined {
  return algorithms[id];
}

export default algorithms;
