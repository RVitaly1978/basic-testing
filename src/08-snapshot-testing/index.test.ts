// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const expected = { value: 1, next: { value: null, next: null } };
    const list = generateLinkedList([1]);
    expect(list).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": null,
            "value": null,
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
