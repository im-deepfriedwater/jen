// // mocha test/test.js
// // for individually running a single program for testing semantic analysis
//
// /* eslint-disable */
// const fs = require('fs');
// const parse = require('../syntax/parser');
//
//
// const GOOD_PROGRAMS_DIR = 'test/data/good-programs';
// const BAD_PROGRAMS_DIR = 'test/data/semantic-errors';
// const name = 'nestedSumTypes.jen';
//
// describe('The semantic analyzer', () => {
//   it(`parses ${name} properly`, () => {
//     const program = parse(fs.readFileSync(`${GOOD_PROGRAMS_DIR}/${name}`, 'utf-8'));
//     program.analyze();
//   });
// });
