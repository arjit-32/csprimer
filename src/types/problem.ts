export type ProblemMode = "function" | "dom";

export interface TestCase {
  input: any[];
  expected: any;
}

export interface BaseProblem {
  id: string;
  title: string;
  mode?: ProblemMode;
  starterCode: string;
  tests?: TestCase[];
  html?: string;
}

export interface Problem extends BaseProblem {
  id: string;
  title: string;
  starterCode: string;
  tests: TestCase[];
}
