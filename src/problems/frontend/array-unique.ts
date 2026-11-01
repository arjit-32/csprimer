import type { Problem } from "../../types/problem";

const arrayUnique: Problem = {
  id: "array-unique",
  title: "Deduplicate Cart Items While Preserving Order",
  mode: "function",

  starterCode: `function solution(cartItems) {
  // Return only the first-seen product IDs in order.
  // Example: ['sku-1', 'sku-2', 'sku-1', 'sku-3', 'sku-2']
  // -> ['sku-1', 'sku-2', 'sku-3']
}`,

  tests: [
    {
      input: [["sku-1", "sku-2", "sku-1", "sku-3", "sku-2", "sku-4"]],
      expected: ["sku-1", "sku-2", "sku-3", "sku-4"],
    },
    { input: [["sku-9", "sku-9", "sku-9"]], expected: ["sku-9"] },
    { input: [["p-1", "p-2", "p-1", "p-3", "p-2", "p-4", "p-5"]], expected: ["p-1", "p-2", "p-3", "p-4", "p-5"] },
    { input: [["a", "b", "c", "b", "a", "d"]], expected: ["a", "b", "c", "d"] },
  ],
};

export default arrayUnique;
