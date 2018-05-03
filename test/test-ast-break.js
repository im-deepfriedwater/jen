const parse = require('../syntax/parser');
const assert = require('assert');

describe('Break', () => {
  const expected = {
    body: {
      statements: [{
        test: {
          value: true,
        },
        body: {
          statements: [{
            cases: [{
              test: {
                op: '<',
                left: { value: 1 },
                right: { value: 2 },
              },
              body: {
                statements: [{}],
              },
            }],
            alternate: null,
          }],
        },
      }],
    },
  };

  it('should correctly parse a break in a while loop', () => {
    const testProgram =
    `while true:
      if (1 < 2):
        break
    `;

    const result = parse(testProgram);
    assert.deepEqual(result, expected);
  });
  it('should correctly parse a break in a for loop', () => {
    expected.body.statements[0] = {
      ids: ['a'],
      expression: { id: 'b' },
      body: {
        statements: [{
          cases: [{
            test: {
              op: '<',
              left: { value: 1 },
              right: { value: 2 },
            },
            body: {
              statements: [{}],
            },
          }],
          alternate: null,
        }],
      },
    };
    const testProgram =
    `for a in b:
       if (1 < 2):
           break
     `;

    const result = parse(testProgram);
    assert.deepEqual(result, expected);
  });
});
