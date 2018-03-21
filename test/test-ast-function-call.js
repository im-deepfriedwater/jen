const parse = require('../syntax/parser');
const assert = require('assert');

describe('Function Call', () => {
  // Note this object was initialized to the first test but is modified and
  // reused for the second test
  const expected = {
    body: {
      statements: [{
        callee: 'eat',
        args: ['orange', 'green', 'blue'],
      }],
    },
  };

  it('should correctly parse function call', () => {
    const result = parse('eat(orange, green, blue)');
    assert.deepEqual(result, expected);
  });
});
