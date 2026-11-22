import type { AlgorithmDefinition, ExecutionStep } from './types';
import { StepBuilder } from './builder';

export const sampleStack: AlgorithmDefinition = {
  id: 'sample-stack',
  title: 'Sample: Stack (LIFO)',
  category: 'Stack',
  description:
    'Given a string containing characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid using a LIFO Stack.',
  visualizationTypes: ['array', 'stack'],
  defaultInputs: {
    s: '()[]{}',
  },
  inputSchema: [
    {
      name: 's',
      label: 'Bracket String',
      type: 'string',
      defaultValue: '()[]{}',
      placeholder: '()[]{} or {[()]}',
      description: 'The string of brackets to validate',
    },
  ],
  generateSteps: (inputs: Record<string, any>): ExecutionStep[] => {
    const rawS = inputs.s ?? '()[]{}';
    const s = String(rawS).trim() || '()[]{}';
    const builder = new StepBuilder();
    const chars = s.split('');
    const stack: string[] = [];

    const matching: Record<string, string> = {
      ')': '(',
      ']': '[',
      '}': '{',
    };

    builder.step({
      title: 'Initialize Stack',
      description: `Validate bracket sequence "${s}". Initialize an empty LIFO stack.`,
      codeLine: 'Deque<Character> stack = new ArrayDeque<>();',
      variables: { input: s, stackSize: 0 },
      array: {
        values: [...chars],
        label: 'brackets[]',
      },
      stack: {
        items: [],
        label: 'Stack (LIFO)',
      },
    });

    let isValid = true;
    for (let i = 0; i < chars.length; i++) {
      const c = chars[i];
      if (c === '(' || c === '[' || c === '{') {
        stack.push(c);
        builder.step({
          title: `Push Opening Bracket '${c}'`,
          description: `Character at index ${i} is opening bracket '${c}'. Push onto stack.`,
          codeLine: 'stack.push(c);',
          variables: { index: i, char: c, top: c, stackSize: stack.length },
          array: {
            values: [...chars],
            pointers: { i },
            highlights: [{ index: i, state: 'current' }],
            label: 'brackets[]',
          },
          stack: {
            items: [...stack],
            action: 'push',
            activeItem: c,
            label: 'Stack (LIFO)',
          },
        });
      } else if (c === ')' || c === ']' || c === '}') {
        const expected = matching[c];
        if (stack.length === 0 || stack[stack.length - 1] !== expected) {
          isValid = false;
          builder.step({
            title: `Mismatch at Index ${i}: '${c}'`,
            description: `Closing bracket '${c}' does not match top of stack. Invalid sequence!`,
            codeLine: 'if (stack.isEmpty() || stack.pop() != c) return false;',
            variables: { index: i, char: c, valid: false },
            array: {
              values: [...chars],
              pointers: { i },
              highlights: [{ index: i, state: 'compare' }],
              label: 'brackets[]',
            },
            stack: {
              items: [...stack],
              label: 'Stack (LIFO)',
            },
          });
          break;
        } else {
          const popped = stack.pop();
          builder.step({
            title: `Match Found: Pop '${popped}' for '${c}'`,
            description: `Closing bracket '${c}' matches top '${popped}'. Pop from stack.`,
            codeLine: 'stack.pop();',
            variables: { index: i, char: c, popped, stackSize: stack.length },
            array: {
              values: [...chars],
              pointers: { i },
              highlights: [{ index: i, state: 'match' }],
              label: 'brackets[]',
            },
            stack: {
              items: [...stack],
              action: 'pop',
              activeItem: popped,
              label: 'Stack (LIFO)',
            },
          });
        }
      }
    }

    if (isValid && stack.length > 0) {
      builder.step({
        title: 'Unmatched Opening Brackets Remaining',
        description: `Stack still contains ${stack.length} unmatched bracket(s). Sequence is invalid.`,
        codeLine: 'return stack.isEmpty();',
        variables: { valid: false, remaining: stack.length },
        array: {
          values: [...chars],
          label: 'brackets[]',
        },
        stack: {
          items: [...stack],
          label: 'Stack (LIFO)',
        },
      });
    } else if (isValid) {
      builder.step({
        title: 'Validation Successful: Valid Brackets!',
        description: `All brackets properly opened and closed. Stack is empty. Valid sequence!`,
        codeLine: 'return stack.isEmpty();',
        variables: { valid: true },
        array: {
          values: [...chars],
          highlights: chars.map((_, idx) => ({ index: idx, state: 'match' })),
          label: 'brackets[] (Valid)',
        },
        stack: {
          items: [],
          label: 'Stack (LIFO)',
        },
      });
    }

    return builder.build();
  },
};

export default sampleStack;
