const parse = require('../syntax/parser');
const assert = require('assert');

describe('Conditionals', () => {
  const expected = {
    body: {
      statements: [
        {
          cases: [
            {
              test: {
              },
              body: {
                statements: [
                  {
                  },
                ],
              },
            },
          ],
          alternate: null,
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      cases: [{}],
      alternate: null,
    };
  });
  it('should correctly parse Conditional Expressions', () => {
    expected.body.statements[0].cases[0].test = {
      op: '<',
      left: {
        id: 'x',
      },
      right: { value: 2 },
    };
    expected.body.statements[0].cases[0].body = {
      statements: [
        {
          callee: 'print',
          args: [{ value: '"test1"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = null;
    let result = parse('if (x < 2):⇨print("test1")⇦');
    assert.deepEqual(result, expected);

    expected.body.statements[0].cases[0].test = {
      op: '<',
      left: {
        id: 'x',
      },
      right: { value: 2 },
    };
    expected.body.statements[0].cases[0].body = {
      statements: [
        {
          callee: 'print',
          args: [{ value: '"test1"' }],
        },
      ],
    };
    expected.body.statements[0].cases[1] = {};
    expected.body.statements[0].cases[1].test = {
      op: '>',
      left: {
        id: 'x',
      },
      right: { value: 0 },
    };
    expected.body.statements[0].cases[1].body = {
      statements: [
        {
          callee: 'print',
          args: [{ value: '"test2"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = null;
    result = parse('if (x < 2):⇨print("test1")⇦else if x > 0:⇨print("test2")⇦');
    assert.deepEqual(result, expected);

    expected.body.statements[0].cases[0].test = {
      op: '<',
      left: {
        id: 'x',
      },
      right: { value: 2 },
    };
    expected.body.statements[0].cases[0].body = {
      statements: [
        {
          callee: 'print',
          args: [{ value: '"test1"' }],
        },
      ],
    };
    expected.body.statements[0].cases[1] = {};
    expected.body.statements[0].cases[1].test = {
      op: '>',
      left: {
        id: 'x',
      },
      right: { value: 0 },
    };
    expected.body.statements[0].cases[1].body = {
      statements: [
        {
          callee: 'print',
          args: [{ value: '"test2"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = {};
    expected.body.statements[0].alternate.statements = [
      {
        callee: 'print',
        args: [{ value: '"test3"' }],
      },
    ];
    result = parse('if (x < 2):⇨print("test1")⇦else if x > 0:⇨print("test2")⇦else:⇨print("test3")⇦');
    assert.deepEqual(result, expected);
  });
});
