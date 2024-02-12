// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 6, b: 2, action: 'add', expected: null },
  { a: 6, b: 2, action: false, expected: null },
  { a: '2', b: 2, action: Action.Add, expected: null },
  { a: 2, b: true, action: Action.Add, expected: null },
  { a: '9', b: '2', action: '**', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for ($a $action $b)',
    ({ a, b, action, expected }) => {
      if (expected === null) {
        expect(simpleCalculator({ a, b, action })).toBeNull();
      } else {
        expect(simpleCalculator({ a, b, action })).toBe(expected);
      }
    },
  );
});
