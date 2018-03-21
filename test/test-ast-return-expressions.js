const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.


// to debug failing tests, use     console.log(JSON.stringify(result));

// console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-disable no-undef */
describe('Return Expressions', () => {
  const expected = {
    body: {
      statements: [
        {
          returnValue: 'temp',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      returnValue: 'temp',
    };
  });
  it('should correctly parse Return Expressions', () => {
    expected.body.statements[0].returnValue = [{ value: 10 }];
    let result = parse('return 10');
    assert.deepEqual(result, expected);

    expected.body.statements[0].returnValue = [{ value: "'test'" }];
    result = parse("return 'test'");
    assert.deepEqual(result, expected);

    expected.body.statements[0].returnValue = [{ op: '+', left: { value: 3 }, right: { value: 3 } }];
    result = parse('return 3 + 3');
    assert.deepEqual(result, expected);

    expected.body.statements[0].returnValue = [{ callee: 'functionTest', args: [] }];
    result = parse('return functionTest()');
    assert.deepEqual(result, expected);

    expected.body.statements[0].returnValue = [];
    result = parse('return');
    assert.deepEqual(result, expected);
  });
});
