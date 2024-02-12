// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(
      simpleCalculator({ a: 0.2, b: 0.1, action: Action.Add }),
    ).toBeCloseTo(0.3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 1, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 0, b: 5, action: Action.Subtract })).toBe(-5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 4, action: Action.Multiply })).toBe(12);
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate })).toBe(
      9,
    );
    expect(simpleCalculator({ a: 1, b: 10, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 1, action: 'Add' })).toBeNull();
    expect(simpleCalculator({ a: 3, b: 1, action: true })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: 1, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: 3, b: '1', action: Action.Add })).toBeNull();
  });
});
