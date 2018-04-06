const parse = require('../syntax/parser');
const assert = require('assert');

describe('While', () => {
  const expected = {
    body: {
      statements: [{
        test: {
          value: true,
        },
        body: {
          statements: [{
            ids: ['sheep'],
            initializers: ['ba'],
          }],
        },
      }],
    },
  };

  it('should correctly parse a while loop', () => {
    const result = parse('while true : \n  sheep := ba');
    assert.deepEqual(result, expected);
  });
  it('should correctly parse a while loop with multiple conditionals', () => {
    expected.body.statements[0].test = {
      left: {
        left: {
          left: 'a',
          op: '==',
          right: 'b',
        },
        op: '&&',
        right: {
          left: 'grass',
          op: '==',
          right: 'green',
        },
      },
      op: '&&',
      right: {
        left: 'sky',
        op: '!=',
        right: 'blue',
      },
    };
    const result = parse('while a == b && grass == green && sky != blue  : \n  sheep := ba');
    assert.deepEqual(result, expected);
  });
});
