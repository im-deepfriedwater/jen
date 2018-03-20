const parse = require('../syntax/parser');
const assert = require('assert');

describe('While', () => {
  // Note this object was initialized to the first test but is modified and
  // reused for the second test
  const expected = {
    body: {
      statements: [
        {
          test: {
            value: true
          },
          body: {
            statements: [{
              ids: ['sheep'],
              initializers: ['ba']
            }]
          }
        },
      ],
    },
  };


  it('should correctly parse a while loop', () => {
    const result = parse('while true : \n  sheep := ba');
    assert.deepEqual(result, expected);
  });

});
