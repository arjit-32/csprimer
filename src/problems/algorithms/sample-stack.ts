import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const sampleStack: AlgorithmDefinition = {
  id: 'sample-stack',
  title: 'Sample: Stack (LIFO)',
  category: "Stack",
  description: "Given a string containing characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid using a LIFO Stack.",
  visualizationTypes: ["array","stack"],
  defaultInputs: {
  "s": "()[]{}"
},
  inputSchema: [
  {
    "name": "s",
    "label": "Bracket String",
    "type": "string",
    "defaultValue": "()[]{}",
    "placeholder": "()[]{} or {[()]}",
    "description": "The string of brackets to validate"
  }
],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const builder = new StepBuilder();

    builder.step({
      "title": "Initialize Stack",
      "description": "Validate bracket sequence \"()[]{}\". Initialize an empty stack.",
      "codeLine": "Deque<Character> stack = new ArrayDeque<>();",
      "variables": {
            "inputLength": 6,
            "stackSize": 0
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [],
            "highlights": [],
            "label": "nums[]"
      }
});

    builder.step({
      "title": "Push Opening Bracket '('",
      "description": "Character at index 0 is opening bracket '('. Push it onto the stack.",
      "codeLine": "stack.push(c);",
      "variables": {
            "index": 0,
            "char": "(",
            "top": "(",
            "stackSize": 1
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 0,
                        "color": "blue"
                  }
            ],
            "highlights": [
                  {
                        "index": 0,
                        "state": "current"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [
                  "("
            ],
            "topIndex": 0,
            "action": "push",
            "activeItem": "(",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Match Found: Pop '('",
      "description": "Closing bracket ')' matches top of stack '('. Pop '(' from stack.",
      "codeLine": "stack.pop();",
      "variables": {
            "index": 1,
            "char": ")",
            "matched": "( <-> )",
            "remainingStack": 0
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 1,
                        "color": "emerald"
                  }
            ],
            "highlights": [
                  {
                        "index": 1,
                        "state": "match"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [],
            "topIndex": -1,
            "action": "pop",
            "activeItem": "(",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Push Opening Bracket '['",
      "description": "Character at index 2 is opening bracket '['. Push it onto the stack.",
      "codeLine": "stack.push(c);",
      "variables": {
            "index": 2,
            "char": "[",
            "top": "[",
            "stackSize": 1
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 2,
                        "color": "blue"
                  }
            ],
            "highlights": [
                  {
                        "index": 2,
                        "state": "current"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [
                  "["
            ],
            "topIndex": 0,
            "action": "push",
            "activeItem": "[",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Match Found: Pop '['",
      "description": "Closing bracket ']' matches top of stack '['. Pop '[' from stack.",
      "codeLine": "stack.pop();",
      "variables": {
            "index": 3,
            "char": "]",
            "matched": "[ <-> ]",
            "remainingStack": 0
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 3,
                        "color": "emerald"
                  }
            ],
            "highlights": [
                  {
                        "index": 3,
                        "state": "match"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [],
            "topIndex": -1,
            "action": "pop",
            "activeItem": "[",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Push Opening Bracket '{'",
      "description": "Character at index 4 is opening bracket '{'. Push it onto the stack.",
      "codeLine": "stack.push(c);",
      "variables": {
            "index": 4,
            "char": "{",
            "top": "{",
            "stackSize": 1
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 4,
                        "color": "blue"
                  }
            ],
            "highlights": [
                  {
                        "index": 4,
                        "state": "current"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [
                  "{"
            ],
            "topIndex": 0,
            "action": "push",
            "activeItem": "{",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Match Found: Pop '{'",
      "description": "Closing bracket '}' matches top of stack '{'. Pop '{' from stack.",
      "codeLine": "stack.pop();",
      "variables": {
            "index": 5,
            "char": "}",
            "matched": "{ <-> }",
            "remainingStack": 0
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [
                  {
                        "name": "i",
                        "index": 5,
                        "color": "emerald"
                  }
            ],
            "highlights": [
                  {
                        "index": 5,
                        "state": "match"
                  }
            ],
            "label": "Input String"
      },
      "stack": {
            "items": [],
            "topIndex": -1,
            "action": "pop",
            "activeItem": "{",
            "label": "Bracket Stack (LIFO)"
      }
});

    builder.step({
      "title": "Validation Successful: Valid Parentheses!",
      "description": "All opening brackets were matched and popped in proper order. Stack is completely empty!",
      "codeLine": "return stack.isEmpty(); // true",
      "variables": {
            "result": "Valid (true)",
            "stackSize": 0
      },
      "array": {
            "values": [
                  "(",
                  ")",
                  "[",
                  "]",
                  "{",
                  "}"
            ],
            "pointers": [],
            "highlights": [
                  {
                        "index": 0,
                        "state": "found"
                  },
                  {
                        "index": 1,
                        "state": "found"
                  },
                  {
                        "index": 2,
                        "state": "found"
                  },
                  {
                        "index": 3,
                        "state": "found"
                  },
                  {
                        "index": 4,
                        "state": "found"
                  },
                  {
                        "index": 5,
                        "state": "found"
                  }
            ],
            "label": "Input String (Valid)"
      },
      "stack": {
            "items": [],
            "label": "Bracket Stack (Empty)"
      }
});

    return builder.build();
  },
};

export default sampleStack;
