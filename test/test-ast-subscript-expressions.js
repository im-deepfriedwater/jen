const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Subscript Expressions', () => {
  const expected = {
    body: {
      statements: [
        {},
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      variable: '',
      subscript: '',
    };
  });
  it('should correctly parse Subscript Expressions', () => {
    expected.body.statements[0].variable = { id: 'arrayA' };
    expected.body.statements[0].subscript = { value: 0 };
    let result = parse('arrayA[0]');
    assert.deepEqual(result, expected);

    expected.body.statements[0].variable = { id: 'arrayB' };
    expected.body.statements[0].subscript = { value: 10 };
    result = parse('arrayB[10]');
    assert.deepEqual(result, expected);

    expected.body.statements[0].variable = { id: 'arrayB' };
    expected.body.statements[0].subscript = { op: '+', left: { value: 3 }, right: { value: 7 } };
    result = parse('arrayB[3 + 7]');
    assert.deepEqual(result, expected);

    expected.body.statements[0].variable = { id: 'arrayC' };
    expected.body.statements[0].subscript = { op: '+', left: { op: '/', left: { value: 9 }, right: { value: 3 } }, right: { value: 2 } };
    result = parse('arrayC[(9 / 3) + 2]');
    assert.deepEqual(result, expected);
  });
});
