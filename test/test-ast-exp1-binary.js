const parse = require('../syntax/parser');
const assert = require('assert');

describe('Exp1 Binary', () => {
  const expected = {
    body: {
      statements: [
        {},
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      op: '',
      left: '',
      right: '',
    };
  });
  it('should correctly parse Exp1 Binary Expressions', () => {
    expected.body.statements[0].op = '+';
    expected.body.statements[0].left = { id: 'x' };
    expected.body.statements[0].right = { id: 'y' };
    let result = parse('x + y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '-';

    result = parse('x - y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '+';
    expected.body.statements[0].left = {
      op: '-',
      left: {
        op: '+',
        left: {
          op: '+',
          left: { id: 'x' },
          right: { id: 'y' },
        },
        right: { value: 3 },
      },
      right: { value: 12 },
    };
    expected.body.statements[0].right = { value: 123123 };
    result = parse('x + y + 3 - 12 + 123123');
    assert.deepEqual(result, expected);
  });
});
