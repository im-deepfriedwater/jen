const parse = require('../syntax/parser');
const assert = require('assert');

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

  it('should correctly parse variables - varId', () => {
    expected.body.statements[0].ids[0] = 'lowerUPPER';
    expected.body.statements[0].initializers[0] = { value: true };
    let result = parse('lowerUPPER := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = '_jen01';
    result = parse('_jen01 := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = '_1337';
    result = parse('_1337 := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'o__o';
    result = parse('o__o := true');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse constants - constId', () => {
    expected.body.statements[0].ids[0] = 'MARCH14';
    let result = parse('MARCH14 := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'PIE_DAY';
    result = parse('PIE_DAY := true');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse package ids - packageId', () => {
    expected.body.statements[0].ids[0] = 'P_ackage';
    let result = parse('P_ackage := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'SWELL2018';
    result = parse('SWELL2018 := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'D__________';
    result = parse('D__________ := true');
    assert.deepEqual(result, expected);
  });
});
