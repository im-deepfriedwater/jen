const parse = require('../syntax/parser');
const assert = require('assert');


/* eslint-disable no-undef */
describe('Function Declarations', () => {
  // Initialize test object for reuse.
  const expected = {
    body: {
      statements: [{
        id: 'createMoney',
        inputTypes: ['void'],
        outputTypes: ['number'],
        params: [''],
        function: {
          id: 'createMoney',
          inputTypes: ['void'],
          outputTypes: ['number'],
          params: [''],
          suite: {
            statements: [{
              returnValue: { value: 9001 },
            }],
          },
        },
      },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body = {
      statements: [{
        id: '',
        inputTypes: [''],
        outputTypes: [''],
        params: [''],
        function: {
          id: '',
          inputTypes: [''],
          outputTypes: [''],
          params: [''],
          suite: {
            statements: [{
              returnValue: { value: 0 },
            }],
          },
        },
      },
      ],
    };
  });

  it('should correctly parse function declarations with no params', () => {
    const testProgram =
    'createMoney: void -> number\ncreateMoney (): \n    return 9001\n';
    const result = parse(testProgram);
    expected.body.statements[0].id = 'createMoney';
    expected.body.statements[0].inputTypes = ['void'];
    expected.body.statements[0].outputTypes = ['number'];
    expected.body.statements[0].params = [''];
    expected.body.statements[0].function.id = 'createMoney';
    expected.body.statements[0].function.inputTypes = ['void'];
    expected.body.statements[0].function.outputTypes = ['number'];
    expected.body.statements[0].function.params = [''];
    expected.body.statements[0].function.suite = {
      statements: [
        {
          returnValue: [{ value: 9001 }],
        },
      ],
    };
    assert.deepEqual(result, expected);
  });

  it('should correctly parse function declarations with multiple params', () => {
    const testProgram =
    'spendMoney: number, string -> number, string\nspendMoney (yourMoney, id): \n    return 0, "Your Money"\n';
    const result = parse(testProgram);
    expected.body.statements[0].id = 'spendMoney';
    expected.body.statements[0].inputTypes = ['number', 'string'];
    expected.body.statements[0].outputTypes = ['number', 'string'];
    expected.body.statements[0].params = ['yourMoney', 'id'];
    expected.body.statements[0].function.id = 'spendMoney';
    expected.body.statements[0].function.inputTypes = ['number', 'string'];
    expected.body.statements[0].function.outputTypes = ['number', 'string'];
    expected.body.statements[0].function.params = ['yourMoney', 'id'];
    expected.body.statements[0].function.suite = {
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
