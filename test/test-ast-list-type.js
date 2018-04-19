const parse = require('../syntax/parser');
const assert = require('assert');

describe('List Type', () => {
  const expected = {
    body: {
      statements: [{
        id: 'a',
        sumtype: {
          basicTypeOrId1: { id: 'b' },
          basicTypeOrId2: { listType: 'number' },
          moreBasicTypesOrIds: [],
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
