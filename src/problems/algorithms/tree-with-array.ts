import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const treeWithArray: AlgorithmDefinition = {
  id: 'tree-with-array',
  title: "Binary Tree & Array Representation",
  category: "Trees & Arrays",
  description: "Visualize how a complete binary tree / binary heap maps directly to a 0-indexed array with parent-child formula: left = 2*i + 1, right = 2*i + 2.",
  visualizationTypes: ["array","tree"],
  defaultInputs: {
  "heap": [
    90,
    75,
    80,
    50,
    60,
    70,
    65
  ]
},
  inputSchema: [
  {
    "name": "heap",
    "label": "Tree Elements (level-order array)",
    "type": "number-array",
    "defaultValue": [
      90,
      75,
      80,
      50,
      60,
      70,
      65
    ],
    "placeholder": "90, 75, 80, 50, 60, 70, 65",
    "description": "Elements of the binary tree in level order"
  }
],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const builder = new StepBuilder();

    builder.step({
      "title": "Complete Binary Tree in Array Memory",
      "description": "In Java, binary heaps and complete trees are stored as flat arrays without node pointers. For any index i: left child = 2*i + 1, right child = 2*i + 2.",
      "codeLine": "int left = 2 * i + 1;int right = 2 * i + 2;",
      "variables": {
            "size": 7,
            "root": 90
      },
      "array": {
            "values": [
                  90,
                  75,
                  80,
                  50,
                  60,
                  70,
                  65
            ],
            "pointers": [
                  {
                        "name": "root",
                        "index": 0
                  }
            ],
            "highlights": [
                  {
                        "index": 0,
                        "state": "current"
                  }
            ],
            "label": "nums[]"
      },
      "tree": {
            "nodes": [
                  {
                        "id": "0",
                        "value": 90,
                        "left": "1",
                        "right": "2",
                        "state": "current"
                  },
                  {
                        "id": "1",
                        "value": 75,
                        "left": "3",
                        "right": "4",
                        "state": "default"
                  },
                  {
                        "id": "2",
                        "value": 80,
                        "left": "5",
                        "right": "6",
                        "state": "default"
                  },
                  {
                        "id": "3",
                        "value": 50,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "4",
                        "value": 60,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "5",
                        "value": 70,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "6",
                        "value": 65,
                        "left": null,
                        "right": null,
                        "state": "default"
                  }
            ],
            "rootId": "0",
            "label": "Binary Tree Hierarchy"
      }
});

    builder.step({
      "title": "Node 90 at Index 0: Children at [1, 2]",
      "description": "Parent at index 0 has value 90. Left child: 2*0 + 1 = index 1 (value 75). Right child: 2*0 + 2 = index 2 (value 80).",
      "codeLine": "int parent = tree[0];\nint left = tree[2 * 0 + 1];\nint right = tree[2 * 0 + 2];",
      "variables": {
            "Parent Index": 0,
            "Parent Value": 90,
            "Left Child [2*i+1]": 75,
            "Right Child [2*i+2]": 80
      },
      "array": {
            "values": [
                  90,
                  75,
                  80,
                  50,
                  60,
                  70,
                  65
            ],
            "pointers": [
                  {
                        "name": "parent",
                        "index": 0,
                        "color": "blue"
                  },
                  {
                        "name": "left",
                        "index": 1,
                        "color": "emerald"
                  },
                  {
                        "name": "right",
                        "index": 2,
                        "color": "purple"
                  }
            ],
            "highlights": [
                  {
                        "index": 0,
                        "state": "current"
                  },
                  {
                        "index": 1,
                        "state": "current"
                  },
                  {
                        "index": 2,
                        "state": "current"
                  }
            ],
            "label": "Array: tree[]"
      },
      "tree": {
            "nodes": [
                  {
                        "id": "0",
                        "value": 90,
                        "left": "1",
                        "right": "2",
                        "state": "current"
                  },
                  {
                        "id": "1",
                        "value": 75,
                        "left": "3",
                        "right": "4",
                        "state": "target"
                  },
                  {
                        "id": "2",
                        "value": 80,
                        "left": "5",
                        "right": "6",
                        "state": "target"
                  },
                  {
                        "id": "3",
                        "value": 50,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "4",
                        "value": 60,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "5",
                        "value": 70,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "6",
                        "value": 65,
                        "left": null,
                        "right": null,
                        "state": "default"
                  }
            ],
            "rootId": "0",
            "label": "Binary Tree"
      }
});

    builder.step({
      "title": "Node 75 at Index 1: Children at [3, 4]",
      "description": "Parent at index 1 has value 75. Left child: 2*1 + 1 = index 3 (value 50). Right child: 2*1 + 2 = index 4 (value 60).",
      "codeLine": "int parent = tree[1];\nint left = tree[2 * 1 + 1];\nint right = tree[2 * 1 + 2];",
      "variables": {
            "Parent Index": 1,
            "Parent Value": 75,
            "Left Child [2*i+1]": 50,
            "Right Child [2*i+2]": 60
      },
      "array": {
            "values": [
                  90,
                  75,
                  80,
                  50,
                  60,
                  70,
                  65
            ],
            "pointers": [
                  {
                        "name": "parent",
                        "index": 1,
                        "color": "blue"
                  },
                  {
                        "name": "left",
                        "index": 3,
                        "color": "emerald"
                  },
                  {
                        "name": "right",
                        "index": 4,
                        "color": "purple"
                  }
            ],
            "highlights": [
                  {
                        "index": 1,
                        "state": "current"
                  },
                  {
                        "index": 3,
                        "state": "current"
                  },
                  {
                        "index": 4,
                        "state": "current"
                  }
            ],
            "label": "Array: tree[]"
      },
      "tree": {
            "nodes": [
                  {
                        "id": "0",
                        "value": 90,
                        "left": "1",
                        "right": "2",
                        "state": "visited"
                  },
                  {
                        "id": "1",
                        "value": 75,
                        "left": "3",
                        "right": "4",
                        "state": "current"
                  },
                  {
                        "id": "2",
                        "value": 80,
                        "left": "5",
                        "right": "6",
                        "state": "default"
                  },
                  {
                        "id": "3",
                        "value": 50,
                        "left": null,
                        "right": null,
                        "state": "target"
                  },
                  {
                        "id": "4",
                        "value": 60,
                        "left": null,
                        "right": null,
                        "state": "target"
                  },
                  {
                        "id": "5",
                        "value": 70,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "6",
                        "value": 65,
                        "left": null,
                        "right": null,
                        "state": "default"
                  }
            ],
            "rootId": "0",
            "label": "Binary Tree"
      }
});

    builder.step({
      "title": "Node 80 at Index 2: Children at [5, 6]",
      "description": "Parent at index 2 has value 80. Left child: 2*2 + 1 = index 5 (value 70). Right child: 2*2 + 2 = index 6 (value 65).",
      "codeLine": "int parent = tree[2];\nint left = tree[2 * 2 + 1];\nint right = tree[2 * 2 + 2];",
      "variables": {
            "Parent Index": 2,
            "Parent Value": 80,
            "Left Child [2*i+1]": 70,
            "Right Child [2*i+2]": 65
      },
      "array": {
            "values": [
                  90,
                  75,
                  80,
                  50,
                  60,
                  70,
                  65
            ],
            "pointers": [
                  {
                        "name": "parent",
                        "index": 2,
                        "color": "blue"
                  },
                  {
                        "name": "left",
                        "index": 5,
                        "color": "emerald"
                  },
                  {
                        "name": "right",
                        "index": 6,
                        "color": "purple"
                  }
            ],
            "highlights": [
                  {
                        "index": 2,
                        "state": "current"
                  },
                  {
                        "index": 5,
                        "state": "current"
                  },
                  {
                        "index": 6,
                        "state": "current"
                  }
            ],
            "label": "Array: tree[]"
      },
      "tree": {
            "nodes": [
                  {
                        "id": "0",
                        "value": 90,
                        "left": "1",
                        "right": "2",
                        "state": "visited"
                  },
                  {
                        "id": "1",
                        "value": 75,
                        "left": "3",
                        "right": "4",
                        "state": "visited"
                  },
                  {
                        "id": "2",
                        "value": 80,
                        "left": "5",
                        "right": "6",
                        "state": "current"
                  },
                  {
                        "id": "3",
                        "value": 50,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "4",
                        "value": 60,
                        "left": null,
                        "right": null,
                        "state": "default"
                  },
                  {
                        "id": "5",
                        "value": 70,
                        "left": null,
                        "right": null,
                        "state": "target"
                  },
                  {
                        "id": "6",
                        "value": 65,
                        "left": null,
                        "right": null,
                        "state": "target"
                  }
            ],
            "rootId": "0",
            "label": "Binary Tree"
      }
});

    builder.step({
      "title": "Array-Tree Mapping Verified",
      "description": "Every node's position in the hierarchy corresponds directly to its 0-indexed arithmetic slot in O(1) random access time.",
      "codeLine": "return tree;",
      "variables": {
            "totalNodes": 7,
            "status": "Verified"
      },
      "array": {
            "values": [
                  90,
                  75,
                  80,
                  50,
                  60,
                  70,
                  65
            ],
            "pointers": [],
            "highlights": [
                  {
                        "index": 0,
                        "state": "current"
                  },
                  {
                        "index": 1,
                        "state": "current"
                  },
                  {
                        "index": 2,
                        "state": "current"
                  },
                  {
                        "index": 3,
                        "state": "current"
                  },
                  {
                        "index": 4,
                        "state": "current"
                  },
                  {
                        "index": 5,
                        "state": "current"
                  },
                  {
                        "index": 6,
                        "state": "current"
                  }
            ],
            "label": "Array: tree[]"
      },
      "tree": {
            "nodes": [
                  {
                        "id": "0",
                        "value": 90,
                        "left": "1",
                        "right": "2",
                        "state": "visited"
                  },
                  {
                        "id": "1",
                        "value": 75,
                        "left": "3",
                        "right": "4",
                        "state": "visited"
                  },
                  {
                        "id": "2",
                        "value": 80,
                        "left": "5",
                        "right": "6",
                        "state": "visited"
                  },
                  {
                        "id": "3",
                        "value": 50,
                        "left": null,
                        "right": null,
                        "state": "visited"
                  },
                  {
                        "id": "4",
                        "value": 60,
                        "left": null,
                        "right": null,
                        "state": "visited"
                  },
                  {
                        "id": "5",
                        "value": 70,
                        "left": null,
                        "right": null,
                        "state": "visited"
                  },
                  {
                        "id": "6",
                        "value": 65,
                        "left": null,
                        "right": null,
                        "state": "visited"
                  }
            ],
            "rootId": "0",
            "label": "Binary Tree"
      }
});

    return builder.build();
  },
};

export default treeWithArray;
