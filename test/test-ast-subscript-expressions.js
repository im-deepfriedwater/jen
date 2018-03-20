const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.


// to debug failing tests, use     console.log(JSON.stringify(result));

const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Subscript Expressions', () => {
  const expected = {
    body: {
      statements: [
        {
          variable: 'temp',
          subscript: 'temp',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      variable: 'temp',
      subscript: 'temp',
    };
  });
  it('should correctly parse Subscript Expressions', () => {
    expected.body.statements[0].variable = 'arrayA';
    expected.body.statements[0].subscript = { value: 0 };
    let result = parse('arrayA[0]');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].variable = 'arrayB';
    expected.body.statements[0].subscript = { value: 10 };
    result = parse('arrayB[10]');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].variable = 'arrayB';
    expected.body.statements[0].subscript = { op: '+', left: { value: 3 }, right: { value: 7 } };
    result = parse('arrayB[3 + 7]');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].variable = 'arrayC';
    expected.body.statements[0].subscript = { op: '+', left: { op: '/', left: { value: 9 }, right: { value: 3 } }, right: { value: 2 } };
    result = parse('arrayC[(9 / 3) + 2]');
    assert.equal(astCompare(expected, result), true);
  });
});
