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
    let result = parse('fourteen := (4 + 3) * 2');
    assert.deepEqual(result, expected);

    expected.body.statements[0].initializers[0].op = '*';
    expected.body.statements[0].initializers[0].right = { value: 9 };
    expected.body.statements[0].initializers[0].left = { op: '-', left: { value: 2 }, right: {} };
    expected.body.statements[0].initializers[0].left.right = { op: '-', left: { value: 2 }, right: {} };
    let result = parse('fourteen := (9 * (2 - 3 + (2 / (5 + 1))))');
    assert.deepEqual(result, expected);
  });
});
