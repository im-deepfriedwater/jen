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
          callee: { id: 'print' },
          args: [{ value: '"test1"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = null;

    const testProgram =
`if (x < 2):
  print("test1")
`;
    const result = parse(testProgram);
    assert.deepEqual(result, expected);
  });
  it('should correctly parse if else expressions', () => {
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
          callee: { id: 'print' },
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
          callee: { id: 'print' },
          args: [{ value: '"test2"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = null;
    const testProgram =
`if (x < 2):
  print("test1")
else if x > 0:
  print("test2")`;

    const result = parse(testProgram);
    assert.deepEqual(result, expected);
  });
  it('should properly parse if else if else statements', () => {
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
          callee: { id: 'print' },
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
          callee: { id: 'print' },
          args: [{ value: '"test2"' }],
        },
      ],
    };
    expected.body.statements[0].alternate = {};
    expected.body.statements[0].alternate.statements = [
      {
        callee: { id: 'print' },
        args: [{ value: '"test3"' }],
      },
    ];
    const testProgram = `
if (x < 2):
  print("test1")
else if x > 0:
  print("test2")
else:
  print("test3")
`;
    const result = parse(testProgram);
    assert.deepEqual(result, expected);
  });
});
