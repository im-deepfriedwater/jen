const parse = require('../syntax/parser');
const assert = require('assert');

const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);
/* eslint-disable no-undef */
describe('id', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers: [{ value: true }],
        },
      ],
    },
  };

  it('should correctly parse varId', () => {
    expected.body.statements[0].ids[0] = 'lowerUPPER';
    expected.body.statements[0].initializers[0] = { value: true };
    const result = parse('lowerUPPER := true');
    assert.equal(astCompare(expected, result), true);

    // expected.body.statements[0].ids[0] = 'rich';
    // expected.body.statements[0].initializers[0] = { value: false };
    // const result1 = parse('rich := false');
    // assert.equal(astCompare(expected, result1), true);
  });
});
