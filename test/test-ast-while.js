const parse = require('../syntax/parser');
const assert = require('assert');

describe('While', () => {
  const expected = {
    body: {
      statements: [{
        test: {
          value: true,
        },
        body: {
          statements: [{
            ids: ['sheep'],
            initializers: ['ba'],
          }],
        },
      }],
    },
  };

  it('should correctly parse a while loop', () => {
    const result = parse('while true : \n  sheep := ba');
    assert.deepEqual(result, expected);
  });
});
