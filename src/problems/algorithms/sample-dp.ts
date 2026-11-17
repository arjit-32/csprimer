import type { AlgorithmDefinition, ExecutionStep } from './types';

export const sampleDp: AlgorithmDefinition = {
  id: 'sample-dp',
  title: 'Sample: Dynamic Programming (Climbing Stairs)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  description:
    'Calculate how many distinct ways you can climb n stairs taking 1 or 2 steps each time using a DP Table.',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  visualizationTypes: ['dptable'],
  defaultInputs: {
    n: 5,
  },
  inputSchema: [
    {
      name: 'n',
      label: 'Number of Stairs (n)',
      type: 'number',
      defaultValue: 5,
      placeholder: '5',
      description: 'The total number of steps in the staircase (between 2 and 12)',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const n = Math.max(2, Math.min(12, Number(inputs.n ?? 5)));
    const steps: ExecutionStep[] = [];

    // dp table has columns 0..n
    const colHeaders = Array.from({ length: n + 1 }, (_, i) => `i = ${i}`);
    const rowHeaders = ['Ways dp[i]'];

    const dp: (number | null)[] = new Array(n + 1).fill(null);

    // Initial step
    steps.push({
      stepNumber: 0,
      title: 'Initialize DP Table',
      description: `Target is n = ${n}. We create a DP array where dp[i] represents the number of ways to reach stair i. Base cases: dp[0] = 1 (ground), dp[1] = 1 (1 step).`,
      codeLine: 'int[] dp = new int[n + 1];\ndp[0] = 1;\ndp[1] = 1;',
      variables: { n, 'dp[0]': 1, 'dp[1]': 1 },
      dpTable: {
        colHeaders,
        rowHeaders,
        grid: [[...dp]],
        formula: 'dp[i] = dp[i - 1] + dp[i - 2]',
        label: 'DP Table: Climbing Stairs',
      },
    });

    // Step 1: Base Case 0
    dp[0] = 1;
    steps.push({
      stepNumber: steps.length,
      title: 'Base Case: dp[0] = 1',
      description: 'At the bottom stair (i = 0), there is 1 way to be there: do nothing.',
      codeLine: 'dp[0] = 1;',
      variables: { i: 0, 'dp[0]': 1 },
      dpTable: {
        colHeaders,
        rowHeaders,
        grid: [[...dp]],
        activeCell: { row: 0, col: 0 },
        highlightCells: [{ row: 0, col: 0, state: 'calculated' }],
        formula: 'Base case: dp[0] = 1',
        label: 'DP Table: Base Case 0',
      },
    });

    // Step 2: Base Case 1
    dp[1] = 1;
    steps.push({
      stepNumber: steps.length,
      title: 'Base Case: dp[1] = 1',
      description: 'To reach stair 1, there is only 1 way: take a single step of size 1.',
      codeLine: 'dp[1] = 1;',
      variables: { i: 1, 'dp[1]': 1 },
      dpTable: {
        colHeaders,
        rowHeaders,
        grid: [[...dp]],
        activeCell: { row: 0, col: 1 },
        highlightCells: [{ row: 0, col: 1, state: 'calculated' }],
        formula: 'Base case: dp[1] = 1',
        label: 'DP Table: Base Case 1',
      },
    });

    // Fill table
    for (let i = 2; i <= n; i++) {
      const prev1 = dp[i - 1]!;
      const prev2 = dp[i - 2]!;
      const current = prev1 + prev2;

      // Show dependency highlight
      steps.push({
        stepNumber: steps.length,
        title: `Calculate dp[${i}] = dp[${i - 1}] + dp[${i - 2}]`,
        description: `To reach stair ${i}, we can come from stair ${i - 1} (+1 step) or from stair ${i - 2} (+2 steps). dp[${i}] = dp[${i - 1}] (${prev1}) + dp[${i - 2}] (${prev2}) = ${current}.`,
        codeLine: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}]; // ${prev1} + ${prev2} = ${current}`,
        variables: {
          i,
          [`dp[${i - 1}]`]: prev1,
          [`dp[${i - 2}]`]: prev2,
          sum: current,
        },
        dpTable: {
          colHeaders,
          rowHeaders,
          grid: [[...dp]],
          activeCell: { row: 0, col: i },
          highlightCells: [
            { row: 0, col: i - 1, state: 'dependency' },
            { row: 0, col: i - 2, state: 'dependency' },
          ],
          formula: `dp[${i}] = dp[${i - 1}] (${prev1}) + dp[${i - 2}] (${prev2}) = ${current}`,
          label: `DP Table: Computing stair ${i}`,
        },
      });

      dp[i] = current;

      // Cell filled
      steps.push({
        stepNumber: steps.length,
        title: `Stored dp[${i}] = ${current}`,
        description: `Stair ${i} can be reached in ${current} distinct ways. Value written to table.`,
        codeLine: `dp[${i}] = ${current};`,
        variables: { i, [`dp[${i}]`]: current },
        dpTable: {
          colHeaders,
          rowHeaders,
          grid: [[...dp]],
          activeCell: { row: 0, col: i },
          highlightCells: [{ row: 0, col: i, state: 'calculated' }],
          formula: `dp[${i}] = ${current}`,
          label: 'DP Table: Value Saved',
        },
      });
    }

    // Final
    steps.push({
      stepNumber: steps.length,
      title: `Final Result: dp[${n}] = ${dp[n]}`,
      description: `Completed! There are ${dp[n]} distinct ways to climb a staircase of ${n} stairs.`,
      codeLine: `return dp[${n}]; // ${dp[n]}`,
      variables: { n, result: `${dp[n]} ways`, status: 'Complete' },
      dpTable: {
        colHeaders,
        rowHeaders,
        grid: [[...dp]],
        activeCell: { row: 0, col: n },
        highlightCells: [{ row: 0, col: n, state: 'match' }],
        formula: `Final Answer: dp[${n}] = ${dp[n]}`,
        label: 'DP Table: Solution Ready',
      },
    });

    return steps;
  },
};

export default sampleDp;

