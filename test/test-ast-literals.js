const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.

// to debug failing tests, use     console.log(JSON.stringify(result));

const astCompare = (x, y) => {
  return JSON.stringify(x) === JSON.stringify(y);
};

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Declarations', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: ['sad'],
          initializers: [{value: true}]
        }
      ]
    }
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      ids: [],
      initializers: [{}]
    };
  });
  it('should correctly parse boolean literal declarations', () => {
    expected.body.statements[0].ids[0] = 'sad';
    expected.body.statements[0].initializers[0] = { value: true };
    let result = parse('sad := true');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'rich';
    expected.body.statements[0].initializers[0] = { value: false };
    result = parse('rich := false');
    assert.equal(astCompare(expected, result), true);
  });

  it('should correctly parse numeric literal declarations', () => {
    expected.body.statements[0].ids[0] = 'skillBeforeCompilers';
    expected.body.statements[0].initializers[0] = { value: -1 };
    let result = parse('skillBeforeCompilers := -0.2');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'skillAfterCompilers';
    expected.body.statements[0].initializers[0] = { value: 1 };
    result = parse('skillAfterCompilers := 1');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'timeForRest';
    expected.body.statements[0].initializers[0] = { value: 0.1 };
    result = parse('timeForRest := 0.1');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'timeForRestAfterBeingLate';
    expected.body.statements[0].initializers[0] = { value: -0.1 };
    result = parse('timeForRest := -0.1');
    assert.equal(astCompare(expected, result), true);
  });
});
