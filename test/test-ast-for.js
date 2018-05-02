const parse = require('../syntax/parser');
const assert = require('assert');

describe('For', () => {
  const expected = {
    body: {
      statements: [{
        ids: ['a'],
        expression: { id: 'b' },
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
  it('should correctly parse a for loop with multiple function calls', () => {
    const result = parse('for n in range(1000) : \n dothisfirst() \n dothissecond()');

    expected.body.statements[0] = {
      ids: [
        'n',
      ],
      expression: {
        args: [{ value: 1000 }],
        callee: { id: 'range' },
      },
      body: {
        statements: [
          {
            args: [],
            callee: { id: 'dothisfirst' },
          },
          {
            args: [],
            callee: { id: 'dothissecond' },
          }],
      },
    };
    assert.deepEqual(result, expected);
  });
});
