import type { Problem } from "../types/problem";

const palindromeNumber: Problem = {
  id: "3-palindrome-number",
  title: "Check if Number is Palindrome",

  starterCode: `function solution(num) {
  // Your code here
}`,

  tests: [
    { input: [121], expected: true },
    { input: [123], expected: false },
    { input: [7], expected: true }
  ],
};

export default palindromeNumber;
