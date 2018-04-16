// mocha test/test.js
// for individually running a single program for testing semantic analysis

const fs = require('fs');
const parse = require('../syntax/parser');
const util = require('util');


const GOOD_PROGRAMS_DIR = 'test/data/good-programs';
const BAD_PROGRAMS_DIR = 'test/data/semantic-errors';
const name = 'addFunction.jen';

describe('The semantic analyzer', () => {
  it('parses addFunction properly', () => {
    const program = parse(fs.readFileSync(`${GOOD_PROGRAMS_DIR}/${name}`, 'utf-8'));
    // console.log(util.inspect(program, { depth: null }));
    program.analyze();
  });
});
