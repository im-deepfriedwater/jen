const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Exp2 Binary', () => {
  const expected = {
    body: {
      statements: [
        {
          op: '*',
          left: 'x',
          right: 'y',
        },
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
  it('should correctly parse Exp2 Binary Expressions', () => {
    expected.body.statements[0].op = '*';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    let result = parse('x * y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '%';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    result = parse('x % y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '//';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    result = parse('x // y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '/%';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    result = parse('x /% y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '/';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    result = parse('x / y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '/';
    expected.body.statements[0].left = {
      op: '/%',
      left: {
        op: '//',
        left: {
          op: '%',
          left: {
            op: '*',
            left: 'x',
            right: 'z',
          },
          right: { value: 123 },
        },
        right: { value: 321 },
      },
      right: { value: 21323 },
    };
    expected.body.statements[0].right = 'y';
    result = parse('x * z % 123 // 321 /% 21323 / y');
    assert.deepEqual(result, expected);
  });
});
