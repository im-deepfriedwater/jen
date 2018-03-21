const parse = require('../syntax/parser');
const assert = require('assert');

describe('List', () => {
  const expected = {
    body: {
      statements: [{
        values: [],
      }],
    },
  };

  beforeEach(() => {
    expected.body.statements[0] = {
      values: [],
    };
  });

  it('should correctly parse a list', () => {
    expected.body.statements[0].values = ['bread', 'cheese', 'wine'];
    const result = parse('[bread, cheese, wine]');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse a list of numbers', () => {
    expected.body.statements[0].values = [
      { value: 1 },
      { value: 5 },
      { value: 0 },
      { value: 2 },
      { value: 2 },
      { value: 2 },
    ];
    const result = parse('[1, 5, 0, 2, 2, 2]');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse an empty list', () => {
    expected.body.statements[0].values = [];
    const result = parse('[]');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse a list of different types', () => {
    expected.body.statements[0].values = [
      { value: true },
      {
        left: { value: 1 },
        op: '+',
        right: { value: 1 },
      },
      {
        args: [],
        callee: 'swim',
      },
      { value: 0 },
      { value: 34 },
    ];
    const result = parse('[true, 1+1, swim(), 0, 34]');
    assert.deepEqual(result, expected);
  });
});
