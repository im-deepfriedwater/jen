const parse = require('../syntax/parser');
const assert = require('assert');

describe('Function Call', () => {
  const expected = {
    body: {
      statements: [{
        callee: { id: 'eat' },
        args: [
          { id: 'orange' },
          { id: 'green' },
          { id: 'blue' },
        ],
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
        callee: { id: 'draw' },
        args: [
          {
            callee: { id: 'paint' },
            args: [],
          },
          {
            callee: { id: 'crayons' },
            args: [],
          },
          {
            callee: { id: 'charcoal' },
            args: [],
          },
        ],
      };
    assert.deepEqual(result, expected);
  });
});
