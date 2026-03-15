import type { Problem } from "../types/problem";

const armstrongNumber: Problem = {
  id: "4-armstrong-number",
  title: "Check if Number is Armstrong",

  starterCode: `function solution(num) {
  // Your code here
}`,

  tests: [
    { input: [153], expected: true },
    { input: [370], expected: true },
    { input: [123], expected: false }
  ],
};

export default armstrongNumber;
