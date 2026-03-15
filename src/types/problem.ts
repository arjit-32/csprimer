export interface TestCase {
  input: any[];
  expected: any;
}

export interface Problem {
  id: string;
  title: string;
  starterCode: string;
  tests: TestCase[];
}
