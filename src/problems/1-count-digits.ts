import type { Problem } from "../types/problem";

const countDigits: Problem = {
  id: "1-count-digits",
  title: "Count Digits in an Integer",

  starterCode: `function solution(num) {
  // Your code here
}`,

  tests: [
    { input: [12345], expected: 5 },
    { input: [7], expected: 1 },
    { input: [1000], expected: 4 }
  ],
};

export default countDigits;
