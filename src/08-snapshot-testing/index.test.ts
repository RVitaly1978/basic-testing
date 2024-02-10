// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, true]);
    expect(list).toStrictEqual({
      value: 1,
      next: {
        value: true,
        next: {
          value: null,
          next: null
        }
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, [], '123', false]);
    expect(list).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": {
                "next": null,
                "value": null,
              },
              "value": false,
            },
            "value": "123",
          },
          "value": [],
        },
        "value": 1,
      }
    `);
  });
});
