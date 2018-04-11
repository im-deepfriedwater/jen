const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('prefix', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers:
          [{
            op: '',
            operand: { value: true },
          }],
        },
      ],
    },
  };

  it('should correctly parse not', () => {
    expected.body.statements[0].ids[0] = 'bang';
    expected.body.statements[0].initializers[0].op = '!';
    let result = parse('bang := !true');
    expected.body.statements[0].used = false;

    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'not_false';
    expected.body.statements[0].initializers[0].operand = { value: false };
    result = parse('not_false := !false');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse negative prefix -', () => {
  });
});
