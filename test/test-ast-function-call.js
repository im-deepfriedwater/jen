const parse = require('../syntax/parser');
const assert = require('assert');

describe('Function Call', () => {
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
