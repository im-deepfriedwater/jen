const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.

// to debug failing tests, use     console.log(JSON.stringify(result));

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Declarations', () => {
  // Initialize test object for reuse.
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers: [{ value: false }],
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

  it('should correctly parse boolean literal declarations', () => {
    expected.body.statements[0].ids[0] = 'sad';
    expected.body.statements[0].initializers[0] = { value: true };
    const result = parse('sad := true');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'rich';
    expected.body.statements[0].initializers[0] = { value: false };
    const result1 = parse('rich := false');
    assert.deepEqual(result1, expected);
  });

  it('should correctly parse numeric literal declarations', () => {
    expected.body.statements[0].ids[0] = 'skillBeforeCompilers';
    expected.body.statements[0].initializers[0] = { value: 0.2 };
    const result = parse('skillBeforeCompilers := 0.2');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'skillAfterCompilers';
    expected.body.statements[0].initializers[0] = { value: 1 };
    const result1 = parse('skillAfterCompilers := 1');
    assert.equal(astCompare(result1expected), true);
  });

  it('should properly parse string literal declarations', () => {
    expected.body.statements[0].ids[0] = 'stringA';
    expected.body.statements[0].initializers[0] = { value: 'this is string A' };
    result = parse("stringA := 'this is string A'");
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'stringB';
    expected.body.statements[0].initializers[0] = { value: 's' };
    result = parse("stringB := 's'");
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].ids[0] = 'stringC';
    expected.body.statements[0].initializers = { value: '' };
    result = parse("stringC := ''");
    assert.equal(astCompare(expected, result), true);
  });
});
