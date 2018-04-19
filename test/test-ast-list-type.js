const parse = require('../syntax/parser');
const assert = require('assert');

describe('List Type', () => {
  const expected = {
    body: {
      statements: [{
        id: { id: 'a' },
        sumtype: {
          basicTypeOrId1: 'a',
          basicTypeOrId2: 'list number',
          moreBasicTypesOrIds: [],
        },
      },
      ],
    },
  };

  it('should correctly parse a list type', () => {
    const result = parse('type a: a | list number');
    assert.deepEqual(result, expected);
  });
});
