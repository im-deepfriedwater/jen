const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.

// to debug failing tests, use     console.log(JSON.stringify(result));

const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Declarations', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: ['sad'],
          initializers: [{ value: true }],
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      ids: [],
      initializers: [{}],
    };
  });
  it('should correctly parse Subscript Expressions', () => {
    expected.body.statements[0].variable[0] = 'arrayA';
    expected.body.statements[0].subscript[0] = { value: 0 };
    let result = parse('arrayA[0]');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].variable[0] = 'arrayB';
    expected.body.statements[0].subscript[0] = { value: 10 };
    result = parse('arrayB[10]');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].variable[0] = 'arrayB';
    expected.body.statements[0].subscript[0] = { value: 3 + 10 };
    result = parse('arrayB[3 + 7]');
    assert.equal(astCompare(expected, result), true);
  });
});
