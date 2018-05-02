const parse = require('../syntax/parser');
const assert = require('assert');

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

    expected.body.statements[0].ids[0] = 'sad';
    expected.body.statements[0].initializers[0] = { value: false };
    const result1 = parse('sad := false');
    assert.deepEqual(result1, expected);

    expected.body.statements[0].ids[0] = 'rich';
    expected.body.statements[0].initializers[0] = { value: false };
    const result2 = parse('rich := false');
    assert.deepEqual(result2, expected);
  });

  it('should correctly parse numeric literal declarations', () => {
    expected.body.statements[0].ids[0] = 'skillBeforeCompilers';
    expected.body.statements[0].initializers[0] = { value: 0.2 };
    const result = parse('skillBeforeCompilers := 0.2');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'skillAfterCompilers';
    expected.body.statements[0].initializers[0] = { value: 1 };
    const result1 = parse('skillAfterCompilers := 1');
    assert.deepEqual(result1, expected);
  });

  it('should properly parse string literal declarations', () => {
    expected.body.statements[0].ids[0] = 'stringA';
    expected.body.statements[0].initializers[0] = { value: "'this is string A'" };
    const result = parse("stringA := 'this is string A'");
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids[0] = 'stringB';
    expected.body.statements[0].initializers[0] = { value: "'s'" };
    const result1 = parse("stringB := 's'");
    assert.deepEqual(result1, expected);

    expected.body.statements[0].ids[0] = 'stringC';
    expected.body.statements[0].initializers[0] = { value: "''" };
    const result2 = parse("stringC := ''");
    assert.deepEqual(result2, expected);
  });
});
