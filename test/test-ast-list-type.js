const parse = require('../syntax/parser');
const assert = require('assert');

describe('List Type', () => {
  const expected = {
    body: {
      statements: [{
        id: 'a',
        sumType: {
          types: [{ id: 'b' }, { listType: 'number' }],
        },
      },
      ],
    },
  };

  it('should correctly parse a list type', () => {
    const result = parse('type a: b | list number');
    assert.deepEqual(result, expected);
  });
});
