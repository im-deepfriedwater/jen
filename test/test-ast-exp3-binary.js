const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Exp3 Binary', () => {
  const expected = {
    body: {
      statements: [
        {
          op: '^',
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
  it('should correctly parse Exp3 Binary Expressions', () => {
    expected.body.statements[0].op = '^';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    let result = parse('x ^ y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '^';
    expected.body.statements[0].left = { value: 123 };
    expected.body.statements[0].right = 'z';
    result = parse('123 ^ z');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '^';
    expected.body.statements[0].left = 'a';
    expected.body.statements[0].right = { value: 321 };
    result = parse('a ^ 321');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '^';
    expected.body.statements[0].left = {
      op: '^',
      left: {
        op: '^',
        left: {
          op: '^',
          left: { value: 123 },
          right: 'a',
        },
        right: 'b',
      },
      right: { value: 123 },
    };
    expected.body.statements[0].right = 'asd';
    result = parse('123^a^b^123^asd');
    assert.deepEqual(result, expected);
  });
});
