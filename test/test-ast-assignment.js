const parse = require('../syntax/parser');
const assert = require('assert');

describe('Assignment', () => {
  // Note this object was initialized to the first test but is modified and
  // reused for the second test
  const expected = {
    body: {
      statements: [
        {
          ids: ['always'],
          initializers: [{
            callee: 'study',
            args: [],
          }],
        },
      ],
    },
  };


  it('should correctly parse function value assignment', () => {
    const result = parse('always = study()');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse assignment with multiple variables', () => {
    expected.body.statements[0].ids = ['plang1', 'plang2', 'plang3'];
    expected.body.statements[0].initializers = [
      { value: '"python"' },
      { value: '"elm"' },
      { value: '"typescript"' },
    ];
    const result = parse('plang1, plang2, plang3 = "python", "elm", "typescript"');
    assert.deepEqual(result, expected);
  });
});
