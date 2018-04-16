const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Exp4 Binary', () => {
  const expected = {
    body: {
      statements: [
        {
          op: '<=',
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
  it('should correctly parse Exp4 Binary Expressions', () => {
    expected.body.statements[0].op = '<=';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    let result = parse('x <= y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '>=';
    expected.body.statements[0].left = { value: 123 };
    expected.body.statements[0].right = 'z';
    result = parse('123 >= z');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '>';
    expected.body.statements[0].left = { value: 321 };
    expected.body.statements[0].right = { value: 1241234 };
    result = parse('321 > 1241234');

    expected.body.statements[0].op = '<';
    expected.body.statements[0].left = 'a';
    expected.body.statements[0].right = { value: 526 };
    result = parse('a < 526');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '==';
    expected.body.statements[0].left = 'a';
    expected.body.statements[0].right = 'b';
    result = parse('a == b');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '!=';
    expected.body.statements[0].left = 'a';
    expected.body.statements[0].right = 'b';
    result = parse('a != b');
    assert.deepEqual(result, expected);

    expected.body.statements[0].op = '!=';
    expected.body.statements[0].left = {
      op: '<=',
      left: {
        op: '>',
        left: 'x',
        right: 'y',
      },
      right: { value: 123 },
    };
    expected.body.statements[0].right = {
      op: '==',
      left: {
        op: '<',
        left: 'z',
        right: { value: 3 },
      },
      right: 'u',
    };
    result = parse('(x > y <= 123) != (z < 3 == u)');
    assert.deepEqual(result, expected);
  });
});
