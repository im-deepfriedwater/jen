const parse = require('../syntax/parser');
const assert = require('assert');

describe('For', () => {
  const expected = {
    body: {
      statements: [{
        test: ['a'],
        testObject: 'b',
        body: {
          statements: [{
            op: '+',
            left: {
              value: 1,
            },
            right: {
              value: 1,
            },
          }],
        },
      }],
    },
  };

  it('should correctly parse a for loop', () => {
    const result = parse('for a in b : \n 1+1');
    assert.deepEqual(result, expected);
  });
});
