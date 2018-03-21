const parse = require('../syntax/parser');
const assert = require('assert');

describe('List', () => {
  const expected = {
    body: {
      statements: [
        {
            values: [],
        },
      ],
    },
  };

  beforeEach(() => {
      // Clear out the test object before each run.
    expected.body.statements[0] = {
      values: [],
    };
  });

  it('should correctly parse a list', () => {
    expected.body.statements[0].values = ['bread', 'cheese', 'wine'];
    const result = parse('[bread, cheese, wine]');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse a list', () => {
    expected.body.statements[0].values = ['crawl', 'run', 'boolean'];
    const result = parse('[crawl, run, boolean]');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse an empty list', () => {
    expected.body.statements[0].values = [];
    const result = parse('[]');
    assert.deepEqual(result, expected);
  });

});
