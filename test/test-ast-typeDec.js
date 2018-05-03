const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('TypeDec', () => {
  const expected = {
    body: {
      statements: [
        {
          id: '',
          sumType: {
            types: [],
          },
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      id: '',
      sumType: { types: [] },
    };
  });
  it('should correctly parse TypeDec Expressions', () => {
    expected.body.statements[0].id = 'x';
    expected.body.statements[0].sumType = {
      types: ['string', 'boolean']
    };
    let result = parse('type x: string | boolean');
    assert.deepEqual(result, expected);

    expected.body.statements[0].id = 'y';
    expected.body.statements[0].sumType = {
      types: ['string', 'boolean', 'number', 'error'],
    };
    result = parse('type y: string | boolean | number | error');
    assert.deepEqual(result, expected);

    expected.body.statements[0].id = 'z';
    expected.body.statements[0].sumType = {
      types: ['string', { id: 'y' }],
    };
    result = parse('type z: string | y');
    assert.deepEqual(result, expected);

    expected.body.statements[0].id = 'a';
    expected.body.statements[0].sumType = {
      types: [{ id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }, { id: 'f' }, { id: 'g' }],
    };
    result = parse('type a: b | c | d | e | f | g');
    assert.deepEqual(result, expected);
  });
});
