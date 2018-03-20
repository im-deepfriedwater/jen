const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.


// to debug failing tests, use     console.log(JSON.stringify(result));

const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);

/* eslint-disable no-undef */
describe('TypeDec', () => {
  const expected = {
    body: {
      statements: [
        {
          id: 'x',
          sumtype: {
            basicTypeOrId1: 'string',
            basicTypeOrId2: 'boolean',
            moreBasicTypesOrIds: [],
          },
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      id: 'temp',
      sumtype: {},
    };
  });
  it('should correctly parse TypeDec Expressions', () => {
    expected.body.statements[0].id = 'x';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: 'string',
      basicTypeOrId2: 'boolean',
      moreBasicTypesOrIds: [],
    };
    let result = parse('type x string | boolean');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].id = 'y';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: 'string',
      basicTypeOrId2: 'boolean',
      moreBasicTypesOrIds: ['number', 'error'],
    };
    result = parse('type y string | boolean | number | error');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].id = 'z';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: 'string',
      basicTypeOrId2: 'y',
      moreBasicTypesOrIds: [],
    };
    result = parse('type z string | y');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].id = 'a';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: 'b',
      basicTypeOrId2: 'c',
      moreBasicTypesOrIds: ['d', 'e', 'f', 'g'],
    };
    result = parse('type a b | c | d | e | f | g');
    assert.equal(astCompare(expected, result), true);
  });
});
