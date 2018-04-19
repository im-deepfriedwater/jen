const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Sum Types', () => {
  const expected = {
    body: {
      statements: [
        {
          id: '',
          sumtype: '',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      id: '',
      sumtype: '',
    };
  });

  it('should be correctly parsed with basic types', () => {
    expected.body.statements[0].id = 'testID';
    expected.body.statements[0].sumtype = { basicTypeOrId1: 'number', basicTypeOrId2: 'boolean', moreBasicTypesOrIds: [] };
    const result = parse('type testID: number | boolean');
    assert.deepEqual(result, expected);
  });

  it('should be correctly parsed with variable expression types', () => {
    expected.body.statements[0].id = 'testID2';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: { id: 'testType' },
      basicTypeOrId2: { id: 'testType2' },
      moreBasicTypesOrIds: [{ id: 'testType3' }],
    };
    const result = parse('type testID2: testType | testType2 | testType3');
    assert.deepEqual(result, expected);
  });

  it('should be correctly parsed with many different expression types', () => {
    expected.body.statements[0].id = 'testID3';
    expected.body.statements[0].sumtype = {
      basicTypeOrId1: 'boolean',
      basicTypeOrId2: 'string',
      moreBasicTypesOrIds: ['number', { id: 'customType' }, 'any', 'error', { listType: 'number' }],
    };
    const result = parse('type testID3: boolean | string | number | customType | any | error | list number');
    assert.deepEqual(result, expected);
  });
});
