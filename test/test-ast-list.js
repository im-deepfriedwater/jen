const parse = require('../syntax/parser');
const assert = require('assert');

describe('List', () => {
  const expected = {
    body: {
      statements: [
        {
            values: ['bread', 'cheese', 'wine'],
        },
      ],
    },
  };

  it('should correctly parse a list', () => {
    const result = parse('[bread, cheese, wine]');
    assert.deepEqual(result, expected);
  });
});
