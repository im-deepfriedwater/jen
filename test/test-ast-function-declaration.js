const parse = require('../syntax/parser');
const assert = require('assert');


/* eslint-disable no-undef */
describe('Function Declarations', () => {
  // Initialize test object for reuse.
  const expected = {
    body: {},
  };

  beforeEach(() => {
    // Setup and clear the test object before each run.
    expected.body = {
      statements: [{
        annotation: {
          id: '',
          paramTypes: [],
          resultTypes: [],
        },

        signature: {
          id: '',
          params: [],
        },

        function: {
          id: '',
          paramTypes: [],
          resultTypes: [],
          params: [],
        },

        suite: {
          statements: [
            {
              returnValue: {},
            },
          ],
        },
      },
      ],
    };
  });

  it('should correctly parse function declarations with no params', () => {
    const testProgram =
    'createMoney: void -> number\ncreateMoney (): \n    return 9001\n';
    const result = parse(testProgram);

    expected.body.statements[0].annotation = {
      id: 'createMoney',
      paramTypes: ['void'],
      resultTypes: ['number'],
    };

    expected.body.statements[0].signature = {
      id: 'createMoney',
      params: [],
    };

    expected.body.statements[0].function = {
      id: 'createMoney',
      paramTypes: ['void'],
      resultTypes: ['number'],
      params: [],
      suite: {
        statements: [
          {
            returnValue: [
              {
                value: 9001,
              },
            ],
          },
        ],
      },
    };

    expected.body.statements[0].suite = {
      statements: [
        {
          returnValue: [
            {
              value: 9001,
            },
          ],
        },
      ],
    };

    assert.deepEqual(result, expected);
  });

  it('should correctly parse function declarations with multiple params', () => {
    const testProgram =
    'spendMoney: number, string -> number, string\nspendMoney (yourMoney, id): \n    return 0, "Your Money"\n';
    const result = parse(testProgram);


    expected.body.statements[0].annotation = {
      id: 'spendMoney',
      paramTypes: ['number', 'string'],
      resultTypes: ['number', 'string'],
    };

    expected.body.statements[0].signature = {
      id: 'spendMoney',
      params: ['yourMoney', 'id'],
    };

    expected.body.statements[0].function = {
      id: 'spendMoney',
      paramTypes: ['number', 'string'],
      resultTypes: ['number', 'string'],
      params: ['yourMoney', 'id'],
      suite: {
        statements: [
          {
            returnValue: [
              {
                value: 0,
              },

              {
                value: '"Your Money"',
              },
            ],
          },
        ],
      },
    };

    expected.body.statements[0].suite = {
      statements: [
        {
          returnValue: [
            {
              value: 0,
            },

            {
              value: '"Your Money"',
            },
          ],
        },
      ],
    };
    // console.log(JSON.stringify(result));
    assert.deepEqual(result, expected);
  });
});
