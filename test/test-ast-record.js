const parse = require('../syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Record', () => {
  const expected = {
    body: {
      statements: [
        {
          ids: 'temp',
          initializers: [
            {
              fields: [
                {
                  id: 'temp',
                  expression: { value: 1 },
                },
              ],
            },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      ids: '',
      initializers: [
        {
          fields: [
            {
              id: '',
              expression: { value: '' },
            },
          ],
        },
      ],
    };
  });
  it('should correctly parse Record variables', () => {
    expected.body.statements[0].ids = ['x'];
    expected.body.statements[0].initializers = [
      {
        fields: [
          {
            id: 'one',
            expression: { value: '1' },
          },
        ],
      },
    ];
    let result = parse('x := {one: 1}');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids = ['x'];
    expected.body.statements[0].initializers = [
      {
        fields: [
          {
            id: 'Two',
            expression: { value: '"two"' },
          },
          {
            id: 'Three',
            expression: { value: '"three"' },
          },
        ],
      },
    ];
    result = parse('x := {Two: "two", Three: "three"}');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids = ['lululemon'];
    expected.body.statements[0].initializers = [
      {
        fields: [
          {
            id: 'quarterZip',
            expression: { value: true },
          },
          {
            id: 'joggers',
            expression: { value: true },
          },
          {
            id: 'hat',
            expression: { value: false },
          },
        ],
      },
    ];
    result = parse('lululemon := {quarterZip: true, joggers: true, hat: false}');
    assert.deepEqual(result, expected);

    expected.body.statements[0].ids = ['sashimi'];
    expected.body.statements[0].initializers = [
      {
        fields: [
          {
            id: 'salmon',
            expression: { value: '"best option"' },
          },
          {
            id: 'toro',
            expression: { value: 20.99 },
          },
          {
            id: 'salmon_belly',
            expression: { value: true },
          },
        ],
      },
    ];
    result = parse('sashimi := {salmon: "best option", toro: 20.99, salmon_belly: true}');
    assert.deepEqual(result, expected);
  });
});
