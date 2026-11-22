import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const algo01RunningSum: AlgorithmDefinition = {
  id: '01-running-sum',
  title: "Running Sum of 1D Array",
  category: "Arrays",
  description: "Calculates the running sum by adding each element to the previous running sum in-place.",
  visualizationTypes: ["array"],
  defaultInputs: {
  "nums": [
    1,
    2,
    3,
    4
  ]
},
  inputSchema: [
  {
    "name": "nums",
    "label": "Input Array",
    "type": "number-array",
    "defaultValue": [
      1,
      2,
      3,
      4
    ],
    "placeholder": "1, 2, 3, 4",
    "description": "Enter numbers separated by commas."
  }
],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const builder = new StepBuilder();

    builder.step({
      "array": {
            "values": [
                  1,
                  2,
                  3,
                  4
            ],
            "pointers": [
                  {
                        "name": "ulala",
                        "index": 0,
                        "color": "purple"
                  }
            ],
            "highlights": [],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Start Traversal from Index 1",
      "description": "Because we have to save prev element in it.",
      "array": {
            "values": [
                  1,
                  2,
                  3,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 1
                  }
            ],
            "highlights": [
                  {
                        "index": 1,
                        "state": "current"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Calculate Index 1",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  2,
                  3,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 1
                  },
                  {
                        "name": "previous",
                        "index": 0
                  }
            ],
            "highlights": [
                  {
                        "index": 1,
                        "state": "current"
                  },
                  {
                        "index": 0,
                        "state": "compare"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Updated Index 1",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  3,
                  3,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 1
                  }
            ],
            "highlights": [
                  {
                        "index": 1,
                        "state": "found"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Calculate Index 2",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  3,
                  3,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 2
                  },
                  {
                        "name": "previous",
                        "index": 1
                  }
            ],
            "highlights": [
                  {
                        "index": 2,
                        "state": "current"
                  },
                  {
                        "index": 1,
                        "state": "compare"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Updated Index 2",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  3,
                  6,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 2
                  }
            ],
            "highlights": [
                  {
                        "index": 2,
                        "state": "found"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Calculate Index 3",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  3,
                  6,
                  4
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 3
                  },
                  {
                        "name": "previous",
                        "index": 2
                  }
            ],
            "highlights": [
                  {
                        "index": 3,
                        "state": "current"
                  },
                  {
                        "index": 2,
                        "state": "compare"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Updated Index 3",
      "codeLine": "nums[i] = nums[i] + nums[i-1];",
      "array": {
            "values": [
                  1,
                  3,
                  6,
                  10
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 3
                  }
            ],
            "highlights": [
                  {
                        "index": 3,
                        "state": "found"
                  }
            ],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Running Sum Completed",
      "array": {
            "values": [
                  1,
                  3,
                  6,
                  10
            ],
            "pointers": [],
            "highlights": [
                  {
                        "index": 0,
                        "state": "match"
                  },
                  {
                        "index": 1,
                        "state": "match"
                  },
                  {
                        "index": 2,
                        "state": "match"
                  },
                  {
                        "index": 3,
                        "state": "match"
                  }
            ],
            "label": "nums[]"
      }
});

    return builder.build();
  },
};

export default algo01RunningSum;
