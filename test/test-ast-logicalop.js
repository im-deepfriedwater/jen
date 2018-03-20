const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('logicalop', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers:
          [{
            op: '',
            left: { value: true },
            right: { value: true },
          }],
        },
      ],
    },
  };


  it('should correctly parse and &&', () => {
    expected.body.statements[0].ids[0] = 'and_test';
    expected.body.statements[0].initializers[0].op = '&&';
    let result = parse('and_test := true && true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'and_test';
    expected.body.statements[0].initializers[0].op = '&&';
    expected.body.statements[0].initializers[0].left = { value: false };
    result = parse('and_test = false && true');
    assert.deepEqual(result, expected);

    // expected.body.statements[0].ids[0] = 'and_test';
    // expected.body.statements[0].initializers[0].op = '&&';
    // expected.body.statements[0].initializers[0].right = { value: false };
    // result = parse('and_test = false && false');
    // assert.deepEqual(result, expected);
  });
  //
  // it('should correctly parse constants - constId', () => {
  //   expected.body.statements[0].ids[0] = 'MARCH14';
  //   let result = parse('MARCH14 := true');
  //   assert.deepEqual(result, expected);
  //
  //   expected.body.statements[0].ids[0] = 'PIE_DAY';
  //   result = parse('PIE_DAY := true');
  //   assert.deepEqual(result, expected);
  // });
  //
  // it('should correctly parse package ids - packageId', () => {
  //   expected.body.statements[0].ids[0] = 'P_ackage';
  //   let result = parse('P_ackage := true');
  //   assert.deepEqual(result, expected);
  //
  //   expected.body.statements[0].ids[0] = 'SWELL2018';
  //   result = parse('SWELL2018 := true');
  //   assert.deepEqual(result, expected);
  //
  //   expected.body.statements[0].ids[0] = 'D__________';
  //   result = parse('D__________ := true');
  //   assert.deepEqual(result, expected);
  // });
});
