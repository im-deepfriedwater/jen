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
    expected.body.statements[0].ids[0] = 'and_test01';
    expected.body.statements[0].initializers[0].op = '&&';
    expected.body.statements[0].used = false;
    let result = parse('and_test01 := true && true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'and_test02';
    expected.body.statements[0].initializers[0].left = { value: false };
    result = parse('and_test02 := false && true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'and_test03';
    expected.body.statements[0].initializers[0].right = { value: false };
    result = parse('and_test03 := false && false');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse or ||', () => {
    expected.body.statements[0].ids[0] = 'or_test01';
    expected.body.statements[0].initializers[0].op = '||';
    expected.body.statements[0].used = false;
    let result = parse('or_test01 := false || false');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'or_test02';
    expected.body.statements[0].initializers[0].left = { value: true };
    result = parse('or_test02 := true || false');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'or_test03';
    expected.body.statements[0].initializers[0].right = { value: true };
    result = parse('or_test03 := true || true');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse xor &!&', () => {
    expected.body.statements[0].ids[0] = 'xor_test01';
    expected.body.statements[0].initializers[0].op = '&!&';
    expected.body.statements[0].initializers[0].left = { value: 1 };
    expected.body.statements[0].initializers[0].right = { value: 1 };
    expected.body.statements[0].used = false;
    let result = parse('xor_test01 := 1 &!& 1');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'xor_test02';
    expected.body.statements[0].initializers[0].left = { value: 0 };
    result = parse('xor_test02 := 0 &!& 1');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'xor_test03';
    expected.body.statements[0].initializers[0].right = { value: 0 };
    result = parse('xor_test03 := 0 &!& 0');
    assert.deepEqual(result, expected);
  });
});
