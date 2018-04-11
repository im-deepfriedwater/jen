const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('parens', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers: [{}],
        },
      ],
    },
  };

  it('should correctly parse paranthesis ()', () => {
    expected.body.statements[0].ids[0] = 'fourteen';
    expected.body.statements[0].initializers[0].op = '*';
    expected.body.statements[0].initializers[0].left = { op: '+', left: { value: 4 }, right: { value: 3 } };
    expected.body.statements[0].initializers[0].right = { value: 2 };
    expected.body.statements[0].used = false;
    let result = parse('fourteen := (4 + 3) * 2');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'nested_parens';
    expected.body.statements[0].initializers[0].op = '*';
    expected.body.statements[0].initializers[0].left = { value: 9 };
    expected.body.statements[0].initializers[0].right = { op: '+', left: {}, right: {} };
    expected.body.statements[0].initializers[0].right.left = { op: '-', left: { value: 2 }, right: { value: 3 } };
    expected.body.statements[0].initializers[0].right.right = { op: '/', left: { value: 2 }, right: {} };
    expected.body.statements[0].initializers[0].right.right.right = { op: '+', left: { value: 5 }, right: { value: 1 } };
    result = parse('nested_parens := (9 * (2 - 3 + (2 / (5 + 1))))');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'sink_parens';
    expected.body.statements[0].initializers[0].op = '*';
    expected.body.statements[0].initializers[0].right = { value: 5 };
    expected.body.statements[0].initializers[0].left = { op: '*', left: { value: 5 }, right: {} };
    expected.body.statements[0].initializers[0].left.right = { op: '*', left: {}, right: { value: 2 } };
    expected.body.statements[0].initializers[0].left.right.left = { op: '*', left: { value: 10 }, right: {} };
    expected.body.statements[0].initializers[0].left.right.left.right = { op: '+', left: { value: 9 }, right: { value: 1282 } };
    result = parse('sink_parens := (5 * (10 * (9 + 1282) * 2) * 5)');
    assert.deepEqual(result, expected);
  });
});
