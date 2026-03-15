import type { Problem } from "../types/problem";

const countDigits: Problem = {
  id: "2-reverse-number",
  title: "Reverse a Number",

  starterCode: `function solution(num) {
  // Your code here
}`,

  tests: [
    { input: [1234], expected: 4321 },
    { input: [120], expected: 21 },
    { input: [5], expected: 5 }
  ],
};

export default countDigits;
