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

  it('should correctly parse a function call', () => {
    const result = parse('eat(orange, green, blue)');
    assert.deepEqual(result, expected);
  });
  it('should correctly parse function call with function parameters', () => {
    const result = parse('draw(paint(), crayons(), charcoal())');
    expected.body.statements[0] =
      {
        callee: 'draw',
        args: [
          { callee: 'paint', args: [] },
          { callee: 'crayons', args: [] },
          { callee: 'charcoal', args: [] },
        ],
      };
    assert.deepEqual(result, expected);
  });
});
